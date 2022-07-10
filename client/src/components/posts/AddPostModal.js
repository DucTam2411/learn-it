import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { PostContext } from "../../contexts/PostContext";
const AddPostModal = () => {
    // Modal
    const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
        useContext(PostContext);
    const closeModal = () => {
        resetAddPostData();
    };

    // State
    const [newPost, setNewPost] = useState({
        title: "",
        description: "",
        url: "",
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        const { success, msg } = await addPost(newPost);
        resetAddPostData();
        setShowToast({
            show: true,
            message: msg,
            type: success ? "success" : "danger",
        });
    };

    const resetAddPostData = () => {
        setNewPost({
            title: "",
            description: "",
            url: "",
            status: "TO LEARN",
        });
        setShowAddPostModal(false);
    };

    const onChangeNewPost = (event) => {
        setNewPost({
            ...newPost,
            [event.target.name]: event.target.value,
        });
    };
    const { title, description, url } = newPost;

    return (
        <Modal show={showAddPostModal} animation={true} onHide={closeModal}>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
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

export default AddPostModal;
