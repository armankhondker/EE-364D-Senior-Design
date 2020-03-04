import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import '.././App.css';

function StickNavbar() {
    return(
        <Navbar className="background-nav" variant="dark" fixed="top">
            <Navbar.Brand href="/">RGK Connect Matching</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="Student">Students</Nav.Link>
                <Nav.Link href="Community">Organizations</Nav.Link>
                <Nav.Link href="Admin">Admin</Nav.Link>
                <Nav.Link href="About">About</Nav.Link>
                <Nav.Link className="login" href="Login">Login</Nav.Link>
            </Nav>
        </Navbar>
    );
}

export default StickNavbar;