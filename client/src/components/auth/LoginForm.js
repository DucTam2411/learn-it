import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const LoginForm = () => {
    // Context
    const { loginUser } = useContext(AuthContext);
    const [alert, setAlert] = useState(null);

    // // Router
    // const history = useNavigate();

    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });
    const { username, password } = loginForm;

    const onChangeLoginForm = (event) =>
        setLoginForm({
            ...loginForm,
            [event.target.name]: event.target.value,
        });

    const login = async (event) => {
        event.preventDefault();

        try {
            const loginData = await loginUser(loginForm);
            if (!loginData.success) {
                setAlert({
                    type: "secondary",
                    message: loginData.msg,
                });
                setTimeout(() => setAlert(null), 5000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Form className="my-2" onSubmit={login}>
                <AlertMessage info={alert} />
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Username"
                        name="username"
                        value={username}
                        onChange={onChangeLoginForm}
                        required
                    />
                </Form.Group>
                <Form.Group className="mt-2">
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={onChangeLoginForm}
                        required
                    />
                </Form.Group>
                <Button variant="success" type="submit" className="mt-3">
                    Login
                </Button>
            </Form>
            <p>
                Don't have an account?{" "}
                <Link to="/register">
                    <Button variant="danger" className="ml-2">
                        {" "}
                        Register
                    </Button>
                </Link>
            </p>
        </>
    );
};

export default LoginForm;
