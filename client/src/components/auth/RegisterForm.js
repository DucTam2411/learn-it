import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const RegisterForm = () => {
    return (
        <>
            <Form className="my-2">
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        required
                    />
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Control
                        type="text"
                        placeholder="Password"
                        name="password"
                        required
                    />
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Control
                        type="text"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        required
                    />
                </Form.Group>
                <Button variant="success" type="submit" className="mt-3">
                    Register
                </Button>
            </Form>
            <p>
                Already have an account?{" "}
                <Link to="/login">
                    <Button variant="danger" className="ml-2">
                        {" "}
                        Login
                    </Button>
                </Link>
            </p>
        </>
    );
};

export default RegisterForm;
