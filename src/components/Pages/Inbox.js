import React, { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../Store";
import { Card } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const Inbox = () => {
  const inbox = useSelector((state) => state.mail.inboxArr);
  const dispatch = useDispatch();
  console.log(inbox);
  const email = localStorage.getItem("email");
  const userMail = email.replace(/[@.]/g, "");

  const handleMailClick = async (mail) => {
        const resp = await fetch(`https://mailbox-client-md-default-rtdb.firebaseio.com/chatbox/${userMail}/inbox/${mail.key}.json`, {
            method: "PUT",
            body: JSON.stringify({
                mailText: mail.mailText,
                read: true,
                sentTo: mail.sentTo,
                subject: mail.subject,
            })
        })
        if(resp.ok){
            const data = await resp.json();
            console.log('click data',data);
        }else{
            const error = await resp.json();
            console.log('click error',error);
        }
  }

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
        <Card>
          <ListGroup>
            {/*instead of using && inbox?.map(() => {}) also works the same.  */}
            {inbox &&
              inbox.map((mails) => (
                <NavLink to={`/inbox/${mails.key}`} onClick={() => handleMailClick(mails)}>
                  <ListGroup.Item action variant={mails.read ? 'light' : 'primary'}>
                        {mails.subject}
                    </ListGroup.Item>
                </NavLink>
              ))}
          </ListGroup>
        </Card>
      </div>
    </>
  );
};

export default Inbox;