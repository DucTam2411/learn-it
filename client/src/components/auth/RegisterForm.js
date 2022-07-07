import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const RegisterForm = () => {
    // Context
    const { registerUser } = useContext(AuthContext);

    // Alert
    const [alert, setAlert] = useState(null);

    const [registerForm, setRegisterForm] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const { username, password, confirmPassword } = registerForm;

    const onChangeRegisterForm = (event) =>
        setRegisterForm({
            ...registerForm,
            [event.target.name]: event.target.value,
        });

    // Router
    const history = useNavigate();

    const register = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setAlert({
                type: "secondary",
                message: "Passwords do not match",
            });
            setTimeout(() => setAlert(null), 5000);
            return;
        }

        try {
            const registerData = await registerUser(registerForm);
            if (!registerData.success) {
                setAlert({
                    type: "secondary",
                    message: registerData.msg,
                });
                setTimeout(() => setAlert(null), 5000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Form className="my-2" onSubmit={register}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        value={username}
                        name="username"
                        onChange={onChangeRegisterForm}
                        required
                    />
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Control
                        type="text"
                        placeholder="Password"
                        value={password}
                        onChange={onChangeRegisterForm}
                        name="password"
                        required
                    />
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={onChangeRegisterForm}
                        value={confirmPassword}
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
