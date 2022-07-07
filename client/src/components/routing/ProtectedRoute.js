import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { Spinner } from "react-bootstrap";

const ProtectedRoute = ({ element, ...rest }) => {
    const {
        authState: { authLoading, isAuthenticated },
    } = useContext(AuthContext);

    console.log(authLoading, isAuthenticated);

    if (authLoading)
        return (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        );

    return isAuthenticated ? element : <Navigate to="/login" replace={true} />;
};

export default ProtectedRoute;
