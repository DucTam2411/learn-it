import React, { useCallback, useContext, useEffect } from "react";
import { PostContext } from "../contexts/PostContext";
import { AuthContext, AUthContext } from "../contexts/AuthContext";
import { Spinner, Card, Button, Row, Col } from "react-bootstrap";
import SinglePost from "../components/posts/SinglePost";

const Dashboard = () => {
    // Contexts
    const {
        authState: {
            user: { username },
        },
    } = useContext(AuthContext);

    const {
        postState: { posts, postLoading },
        getPosts,
    } = useContext(PostContext);

    // Start: Get all posts
    useEffect(() => {
        getPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let body = null;

    if (postLoading) {
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        );
    } else if (posts.length === 0) {
        body = (
            <>
                <Card className="text-center mx-5 my-5">
                    <Card.Header as="h1">Hi {username}</Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome to LearnIt</Card.Title>
                        <Card.Text>
                            Click the button button to track your first skill to
                            learn
                        </Card.Text>
                        <Button variant="primary">LearnIt</Button>
                    </Card.Body>
                </Card>
            </>
        );
    } else {
        body = (
            <>
                <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
                    {posts.map((post) => (
                        <Col key={post.id} className="my-2">
                            <SinglePost post={post} />
                        </Col>
                    ))}
                </Row>
            </>
        );
    }

    return body;
};

export default Dashboard;
