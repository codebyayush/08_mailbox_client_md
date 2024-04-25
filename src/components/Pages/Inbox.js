import React, { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../Store";

const Inbox = () => {
  const inbox = useSelector((state) => state.mail.inboxArr);
  const dispatch = useDispatch();
console.log(inbox);
  const email = localStorage.getItem("email");
  const userMail = email.replace(/[@.]/g, "");

  useEffect(() => {
    const fetchInbox = async () => {
      const url = `https://mailbox-client-md-default-rtdb.firebaseio.com/chatbox/${userMail}/inbox.json`;
      try {
        const resp = await fetch(url);
        const data = await resp.json();
        console.log("inbox ", data);
        let inboxArr = [];

        for (let [key, value] of Object.entries(data)) {
          value.key = key;
          inboxArr.push(value);
        }

        dispatch(mailActions.inboxHandler(inboxArr));
      } catch (error) {
        console.log(error);
      }
    };
    fetchInbox();
  }, []);

  return (
    <>
      <div className="w-auto p-2 ml-2 ms-64 mt-16">
        <ListGroup>
            {/*instead of using && inbox?.map(() => {}) also works the same.  */}
          {inbox && inbox.map((mails) => (
            <ListGroup.Item action variant="light">
              {mails.subject}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </>
  );
};

export default Inbox;
