import React, { useContext } from "react";
import { Navbar, Button, Nav } from "react-bootstrap";
import learnItLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const NavbarMenu = () => {
    const {
        authState: {
            user: { username },
        },
        logoutUser,
    } = useContext(AuthContext);

    const logout = () => logoutUser();
    const myNav = (
        <Navbar expand="lg" bg="primary" variant="dark">
            <Navbar.Brand className="font-weight-bolder text-white ms-2 ">
                <img
                    src={learnItLogo}
                    alt="learnItLogo"
                    width="30"
                    height="30"
                    className="mr-2 my-auto"
                />
                {"  "}
                LearnIt
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link
                        className="font-weight-bolder text-white"
                        to="/dashboard"
                        as={Link}
                    >
                        Dashboard
                    </Nav.Link>
                    <Nav.Link to="/about" as={Link}>
                        About
                    </Nav.Link>
                </Nav>

                <Nav>
                    <Nav.Link
                        className="font-weight-bolder text-white my-2 me-2"
                        disable="true"
                    >
                        Welcome<b> {username}</b>
                    </Nav.Link>
                    <Button
                        variant="secondary"
                        onClick={logout}
                        className="font-weight-bolder text-white me-3"
                    >
                        <img
                            src={logoutIcon}
                            alt="logoIcon"
                            width={32}
                            height={32}
                            className="me-2"
                        />{" "}
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );

    return myNav;
};

export default NavbarMenu;
