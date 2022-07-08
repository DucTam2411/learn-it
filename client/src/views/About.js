import React from "react";
import { Row, Col, Button } from "react-bootstrap";

const About = () => {
    return (
        <Row
            className="mt-5"
            style={{
                marginRight: "10px",
                marginLeft: "10px",
            }}
        >
            <Col className="text-center">
                <Button
                    variant="primary"
                    href="https://www.linhkien.shop"
                    size="lg"
                >
                    Visit my channel for more tutorials
                </Button>
            </Col>
        </Row>
    );
};

export default About;
