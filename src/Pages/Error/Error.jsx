import React, { useContext, useEffect } from "react";
import { AppContext } from "../..";
import "./Error.css";
import { Helmet } from "react-helmet";

function Error() {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({ type: "UPDATE_SHOW_LOADER", payload: false });
  });
  return (
    <div className="error-page">
      <Helmet>
        <title>SocialConnect | Error </title>
      </Helmet>
      <h1>It's not you, It's us..!</h1>
      <div className="error-img"></div>
    </div>
  );
}

export default Error;
