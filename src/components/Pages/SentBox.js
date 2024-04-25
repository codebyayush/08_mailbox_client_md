import React, { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../Store";

const SentBox = () => {
  const sentMailArray = useSelector((state) => state.mail.sentArr);
  const dispatch = useDispatch();

  const email = localStorage.getItem("email");
  const userMail = email.replace(/[@.]/g, "");

  useEffect(() => {
    const fetchSentBox = async () => {
      const url = `https://mailbox-client-md-default-rtdb.firebaseio.com/chatbox/${userMail}/sent.json`;
      try {
        const resp = await fetch(url);
        const data = await resp.json();
        console.log("sentArr ", data);
        let newArr = [];

        for (let [key, value] of Object.entries(data)) {
          value.key = key;
          newArr.push(value);
        }
        dispatch(mailActions.sentHandler(newArr));
      } catch (error) {
        console.log(error);
      }
    };
    fetchSentBox();
  }, []);

  console.log("sent mail array",sentMailArray);

  return (
    <div className="w-auto p-2 ml-2 ms-64 mt-16">
      <ListGroup>
        {sentMailArray && sentMailArray.map((mails) => (
          <ListGroup.Item action variant="light">
            {mails.subject}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default SentBox;
