import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";

const NavPage = () => {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="fixed-top">
        <Container>
          <Navbar.Brand href="#home" className="fst-italic ">
            Welcome to your Mail Box
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavPage;
