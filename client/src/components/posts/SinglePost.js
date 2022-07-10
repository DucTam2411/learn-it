import { Card, Row, Col, Badge } from "react-bootstrap";
import ActionButton from "./ActionButton";

import React from "react";

const SinglePost = ({ post: { _id, status, title, description, url } }) => {
    let variantVar =
        status === "LEARNED"
            ? "success"
            : status === "LEARNING"
            ? "warning"
            : "danger";

    return (
        <Card className="shadow-sm" border={variantVar}>
            <Card.Body>
                <Card.Title>
                    <Row>
                        <Col>
                            <p className="post-title">{title}</p>
                            <Badge bg={variantVar}>{status}</Badge>
                        </Col>
                        <Col className="text-end">
                            <ActionButton url={url} _id={_id} />
                        </Col>
                    </Row>
                </Card.Title>
                <Card.Text>{description}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default SinglePost;
