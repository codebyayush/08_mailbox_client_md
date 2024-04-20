import React, { useRef } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";

const Login = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const confpassRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPass = passRef.current.value;
    const enteredConfPass = confpassRef.current.value;

    if (enteredConfPass !== enteredPass) {
      alert("PASSWORD MUST BE SAME");
    } else {
      const resp = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAtOoUKqAcRL7-j3jEWkFOO2cB8BIroYw4",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPass,
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (resp.ok) {
        const data = await resp.json();
        console.log("User has successfully signed up", data);
        alert("Account created");
      } else {
        const error = await resp.json();
        console.log("failed to create new account", error);
      }
    }

    emailRef.current.value = "";
    passRef.current.value = "";
    confpassRef.current.value = "";
  };

  return (
    <>
      <Container className="vh-100 d-flex flex-column justify-content-center align-items-center">
        <Container className="d-flex justify-content-center align-items-center">
          <Card className="w-25">
            <Card.Body>
              <Form onSubmit={submitHandler}>
                <h2 className="text-center">Sign Up</h2>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control
                    type="text"
                    id="email"
                    data-testid="emailinput"
                    placeholder="Enter email"
                    ref={emailRef}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <Form.Control
                    type="password"
                    id="password"
                    placeholder="Enter password"
                    ref={passRef}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="confirmpassword">
                    Confirm Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    id="confirmpassword"
                    placeholder="Confirm password"
                    ref={confpassRef}
                    required
                  />
                </Form.Group>

                <Button variant="primary" datatest_id="signup" type="submit" className="w-100">
                  Sign up
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
        <br />
        <Container className="d-flex justify-content-center align-items-center">
          <Button variant="secondary" className="w-25">
            Have an account? Login
          </Button>
        </Container>
      </Container>
    </>
  );
};

export default Login;
