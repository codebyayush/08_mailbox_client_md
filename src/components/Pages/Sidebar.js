import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Sidebar = () => {

  const unreadMails = useSelector(state => state.mail.unreadMailCount)


  return (
    <div className=" w-64 bg-purple-500 h-screen position-fixed">
      <div className="mt-2 p-1">
        <NavLink to="/compose" className="">
          <button className=" text-lg w-full mb-1 text-white rounded-md bg-purple-800 font-medium">
            Compose
          </button>
        </NavLink>
        <br />
        <NavLink to="/inbox" className="">               
          <button className=" text-lg w-full mb-1 text-white rounded-md bg-purple-800 font-medium">
            Inbox  {unreadMails}
          </button>
        </NavLink>
        <br />
        <NavLink to="/sent" className="">
        <button className=" text-lg w-full mb-1 text-white rounded-md bg-purple-800 font-medium">
          Sent
        </button>
        </NavLink>
        <br />
      </div>
    </div>
  );
};

export default Sidebar;
