import React, { useRef, useState } from "react";
import { Button, FormGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import JoditEditor from "jodit-react";

const Chatbox = () => {
  const emailRef = useRef();
  const subRef = useRef();

  const userEmail = localStorage.getItem("email");
  const userMail = userEmail.replace(/[@.]/g, "");

  //jodit editor
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const url = `https://mailbox-client-md-default-rtdb.firebaseio.com/chatbox/${userMail}.json`;

    const enteredMail = emailRef.current.value;
    const enteredSub = subRef.current.value;
    const enteredText = editor.current.value;

    const mailObj = {
      sentTo: enteredMail,
      subject: enteredSub,
      mailText: enteredText,
    };

    try {
      const resp = await fetch(url, {
        method: "POST",
        body: JSON.stringify(mailObj),
        headers: {'Content-Type': 'application/json'}
      });

      if (resp.ok) {
        const data = await resp.json();
        console.log("email sent", data);
      } else {
        const error = await resp.json();
        console.log("Error sending mail", error);
      }
    } catch (error) {
      console.log(error);
    }

    emailRef.current.value = "";
    subRef.current.value = "";
    setContent("");

  };

  const deleteHandler = () => {
    emailRef.current.value = "";
    subRef.current.value = "";
    setContent("");
  };

  return (
    <>
      <div className="d-flex justify-content-center align-content-center mt-5">
        <Form
          className="mt-4 w-50 border border-secondary p-3 rounded-3"
          onSubmit={submitHandler}
        >
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label htmlFor="email">Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              ref={emailRef}
              id="email"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="subject">Subject</Form.Label>
            <Form.Control
              type="text"
              id="subject"
              ref={subRef}
              placeholder="Subject"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" htmlFor='editor' controlId="exampleForm.ControlTextarea1">
            {/* <Form.Control as="textarea" placeholder="Enter mail" rows={8} /> */}
            <JoditEditor
              id='editor'
              ref={editor}
              value={content}
              tabIndex={2}
              onChange={handleEditorChange}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-between ">
            <FormGroup>
              <Button type="submit">Send</Button>
            </FormGroup>
            <FormGroup>
              <Button className="btn btn-secondary" onClick={deleteHandler}>
                Delete
              </Button>
            </FormGroup>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Chatbox;
