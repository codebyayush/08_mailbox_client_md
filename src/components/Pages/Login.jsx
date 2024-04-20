import React, { useRef } from "react";
import { Container, Card, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store";

const Login = () => {
  const dispatch = useDispatch();
  const toggleLogin = useSelector(state => state.auth.loginToggle);

  const emailRef = useRef();
  const passRef = useRef();
  const confpassRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    if(toggleLogin){
      //login to existing
      const enteredEmail = emailRef.current.value;
      const enteredPass = passRef.current.value;

      const resp = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAtOoUKqAcRL7-j3jEWkFOO2cB8BIroYw4",
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

      if(resp.ok){
          const data = await resp.json();
          console.log('logged in successfully...', data);
          localStorage.setItem('idToken', data.idToken)
          dispatch(authActions.login(data.idToken))
      }else{
          const error = await resp.json();
          console.log('login failed,', error);
      }
    }else{
      //create new account
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
      confpassRef.current.value = "";
    }

    emailRef.current.value = "";
    passRef.current.value = "";
  };

  return (
    <>
      <Container className="vh-100 d-flex flex-column justify-content-center align-items-center">
        <Container className="d-flex justify-content-center align-items-center">
          <Card className="w-25">
            <Card.Body>
              <Form onSubmit={submitHandler}>
                <h2 className="text-center">
                  {!toggleLogin ? "Sign Up" : "Login"}
                </h2>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="email">Email</Form.Label>
                  <Form.Control
                    type="text"
                    id="email"
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
                {!toggleLogin && (
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
                )}

                <Button variant="primary" type="submit" className="w-100">
                  {!toggleLogin ? "Sign up" : "Login"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Container>
        <br />
        <Container className="d-flex justify-content-center align-items-center">
          <Button
            variant="secondary"
            className="w-25"
            onClick={() => dispatch(authActions.toggle())}
          >
            {!toggleLogin
              ? "Have an account? Login"
              : "New User? Create an account"}
          </Button>
        </Container>
      </Container>
    </>
  );
};

export default Login;
