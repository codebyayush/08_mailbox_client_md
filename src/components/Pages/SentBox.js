import React, { useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useDispatch, useSelector } from "react-redux";
import { mailActions } from "../../Store";
import { Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { MdDelete } from "react-icons/md";



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

  async function deleteHandler(id) {
    const url = `https://mailbox-client-md-default-rtdb.firebaseio.com/chatbox/${userMail}/sent/${id}.json`;
    const resp = await fetch(url, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    })

    if(resp.ok){
      const data = await resp.json();
      console.log("SENT MAIL DELETED", data)
      dispatch(mailActions.sentBoxDeleteHandler(id))
    }else{
      const error = await resp.json();
      console.log("ERROR DELETING", error);
    }
  }

  return (
    <div className="w-auto p-2 ml-2 ms-64 mt-16">
      <Card>
        <ListGroup>
          {
            sentMailArray?.map((mails) => (
              <ListGroup.Item action variant="light">
                <div className="flex justify-between">
                    <NavLink to={`/sent/${mails.key}`}>
                      {mails.subject}
                    </NavLink>
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
  );
};

export default SentBox;
