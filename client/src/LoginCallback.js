import React, { useEffect } from "react";
import axios from "axios";

const LoginCallback = ({ location }) => {
  useEffect(() => {
    const code = (location.search.match(/code=([^&]+)/) || [])[1];
    const state = (location.search.match(/state=([^&]+)/) || [])[1];
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/oauth`, { code, state })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        throw error;
      });
  }, [location]);

  return <h1>LoginCallback</h1>;
};

export default LoginCallback;
