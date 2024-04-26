import React from "react";
import { Card } from "react-bootstrap";

import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

const ViewEmail = () => {
  const location = useLocation();
  const sentMails = useSelector((state) => state.mail.sentArr);
  const inboxMails = useSelector((state) => state.mail.inboxArr);
  const { mailId } = useParams();

   // Determine if the mail is from 'sent' or 'inbox' based on the URL;
   //we get the url path using useLocation();
  const mailSource = location.pathname.includes('/sent/') ? sentMails : inboxMails;
  const clickedMail = mailSource.find((mail) => mail.key === mailId);
  
  if(!clickedMail){
    return <div>Mail not found.</div>
  }
  
  const mailText = clickedMail.mailText;
  
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