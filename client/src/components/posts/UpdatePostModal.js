import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { PostContext } from "../../contexts/PostContext";

export const UpdatePostModal = () => {
    // Modal
    const {
        postState: { post },
        showUpdatePostModal,
        setShowUpdatePostModal,
        updatePost,
        setShowToast,
    } = useContext(PostContext);

    const [updatedPost, setUpdatedPost] = useState(post);

    useEffect(() => setUpdatedPost(post), [post]);

    const closeDialog = () => {
        setUpdatedPost(post);
        setShowUpdatePostModal(false);
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        const { success, msg } = await updatePost(updatedPost);
        setShowUpdatePostModal(false);
        setShowToast({
            show: true,
            message: msg,
            type: success ? "success" : "danger",
        });
    };

    const { title, description, url, status } = updatedPost;

    const onChangeNewPost = (event) => {
        setUpdatedPost({
            ...updatedPost,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Modal show={showUpdatePostModal} animation={true} onHide={closeDialog}>
            <Modal.Header closeButton>
                <Modal.Title>What do you want to learn ?</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={title}
                            onChange={onChangeNewPost}
                            required
                            aria-describedby="title-help"
                        />
                        <Form.Text id="title-help" muted={true}>
                            Required
                        </Form.Text>
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            as="textarea"
                            placeholder="Description"
                            rows={3}
                            onChange={onChangeNewPost}
                            value={description}
                            name="description"
                            className="mt-2"
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Youtube Tutorial Link"
                            name="url"
                            onChange={onChangeNewPost}
                            value={url}
                            className="mt-2 py-3"
                        />
                    </Form.Group>

                    <Form.Group className="mt-2">
                        <Form.Control
                            as="select"
                            value={status}
                            name="status"
                            onChange={onChangeNewPost}
                        >
                            <option value="TO LEARN">TO LEARN</option>
                            <option value="LEARNING">LEARNING</option>
                            <option value="LEARNED">LEARNED</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        LearnIt
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};
