import React from "react";
import { Card } from "react-bootstrap";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewEmail = () => {
  const sentMails = useSelector((state) => state.mail.sentArr);
  const inboxMails = useSelector((state) => state.mail.inboxArr);
  const { mailId } = useParams();
  const clickedMail = inboxMails.find((mail) => mail.key === mailId);
  const mailText = clickedMail.mailText;
  console.log(clickedMail);
  console.log(inboxMails);

  return (
    <>
      <div className="w-auto p-2 ml-2 ms-64 mt-16">
        <Card className="text-center">
          <h2>{clickedMail.subject}</h2>
          <br />
          <div dangerouslySetInnerHTML={{ __html: mailText }} />
        </Card>
      </div>
    </>
  );
};

export default ViewEmail;
