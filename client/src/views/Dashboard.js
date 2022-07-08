import React, { useCallback, useContext, useEffect } from "react";
import { PostContext } from "../contexts/PostContext";
import { Spinner } from "react-bootstrap";
const Dashboard = () => {
    // Contexts
    const {
        postState: { posts, postLoading },
        getPosts,
    } = useContext(PostContext);

    // Start: Get all posts
    useEffect(() => {
        getPosts();
        console.log(posts);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let body = null;

    if (postLoading) {
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        );
    }

    return (
        <div>
            <h1>Minty</h1>
            <p className="lead">A fresh feel</p>
        </div>
    );
};

export default Dashboard;
