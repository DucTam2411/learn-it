import React from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";

const Auth = ({ authRoute }) => {
    let body;

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
