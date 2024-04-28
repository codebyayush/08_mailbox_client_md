import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { authActions } from "../../store";
import { useDispatch } from "react-redux";


const NavPage = () => {
  const dispatch = useDispatch();

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="fixed-top pb-3 mb-5 position-absolute font-medium">
        <Container className="flex justify-between">
          <Navbar.Brand href="#home" className="fst-italic">
            Welcome to your Mail Box
          </Navbar.Brand>
          <button onClick={() => dispatch(authActions.logout())} className="text-purple-900 p-2 rounded-lg bg-purple-300 transition duration-300 ease-in-out hover:bg-purple-500 hover:text-white hover:border-purple-500">Logout</button>
        </Container>
      </Navbar>
    </>
  );
};

export default NavPage;
