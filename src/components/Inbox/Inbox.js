import React, { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../store";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import useFetchInbox from "../../hooks/useFetchInbox";

const Inbox = () => {
  const inbox = useSelector((state) => state.mail.inboxArr);
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");
  const userMail = email.replace(/[@.]/g, "");

  const url = `https://mailbox-client-md-default-rtdb.firebaseio.com/chatbox/${userMail}/inbox.json`;

  //using useFetchInbox to get the data from firebase 
  //and then update the inboxArr inside redux store.
  useFetchInbox(url);

  const handleMailClick = async (mail) => {
    const resp = await fetch(
      `https://mailbox-client-md-default-rtdb.firebaseio.com/chatbox/${userMail}/inbox/${mail.key}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          mailText: mail.mailText,
          read: true,
          sentTo: mail.sentTo,
          subject: mail.subject,
        }),
      }
    );
    if (resp.ok) {
      const data = await resp.json();
      console.log("click data", data);
    } else {
      const error = await resp.json();
      console.log("click error", error);
    }
  };

  const deleteHandler = async (id) => {
    const resp = await fetch(
      `https://mailbox-client-md-default-rtdb.firebaseio.com/chatbox/${userMail}/inbox/${id}.json`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (resp.ok) {
      const data = await resp.json();
      console.log("Mail Deleted", data);
      dispatch(mailActions.inboxDeleteHandler(id))
    } else {
      const error = await resp.json();
      console.log("ERROR DELTING", error);
    }
  };

  return (
    <>
      <div className="w-auto p-2 ml-2 ms-64 mt-16">
        <Card>
          <ListGroup>
            {/*instead of using &&, inbox?.map(() => {}) also works the same. only runs inbox is non-empty  */}
            {inbox &&
              inbox.map((mails) => (
                <ListGroup.Item
                  action
                  variant={mails.read ? "light" : "primary"}
                >
                  <div className="flex justify-between">
                    <div className="flex">
                        <div className="-ms-2 mr-1">
                            {mails.read ? "" : "●"}
                        </div>
                        <NavLink
                        to={`/inbox/${mails.key}`}
                        onClick={() => handleMailClick(mails)}
                        >
                            {mails.subject}
                        </NavLink>
                    </div>
                    <button onClick={() => deleteHandler(mails.key)}>
                      <div className="mr-4">
                        <MdDelete />
                      </div>
                    </button>
                  </div>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Card>
      </div>
    </>
  );
};

export default Inbox;
