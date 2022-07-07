import React, { useContext } from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Auth = ({ authRoute }) => {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);
    let body;

    if (authLoading) {
        body = (
            <div className="d-flex justify-content-center mt-2 ">
                <Spinner animation="border" variant="info" />
            </div>
        );
    } else if (isAuthenticated) {
        return <Navigate to="/dashboard" replace={true} />;
    }

    body = (
        <>
            <br />
            {authRoute === "login" && <LoginForm />}
            {authRoute === "register" && <RegisterForm />}
        </>
    );
    return (
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>
                        <b> LearnIt</b>{" "}
                    </h1>
                    <h5>Keep track of what you are learning</h5> {body}
                </div>
            </div>
        </div>
    );
};

export default Auth;
