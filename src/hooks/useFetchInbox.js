import { useEffect } from "react";
import { mailActions } from "../store";
import { useDispatch, useSelector } from "react-redux";

const useFetchInbox = (url) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(!isLoggedIn){
      return
    }

    const fetchInbox = async () => {
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
    // const intervalId = setInterval(fetchInbox, 2000); // set interval to call fetchInbox every 2 seconds
    // return () => clearInterval(intervalId);

    fetchInbox();
  }, []);
};

export default useFetchInbox;
