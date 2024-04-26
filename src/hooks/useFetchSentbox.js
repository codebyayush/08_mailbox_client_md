import { useEffect } from "react";
import { mailActions } from "../Store";
import { useDispatch, useSelector } from "react-redux";

const useFetchSentbox = (url) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    const fetchSentBox = async () => {
      try {
        const resp = await fetch(url);
        const data = await resp.json();
        console.log("sentbox ", data);
        let sentArr = [];

        for (let [key, value] of Object.entries(data)) {
          value.key = key;
          sentArr.push(value);
        }
        dispatch(mailActions.sentHandler(sentArr));
      } catch (error) {
        console.log(error);
      }
    };
    // const intervalId = setInterval(fetchSentBox, 2000); // set interval to call fetchInbox every 2 seconds
    // return () => clearInterval(intervalId);

    fetchSentBox();
  }, []);
};

export default useFetchSentbox;
