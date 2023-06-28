import React, { useContext, useEffect } from "react";
import "./Footer.css";
import { AppContext } from "../..";

function Footer() {
  const { state, dispatch } = useContext(AppContext);

  const getAllUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const jsonResponse = await response.json();
      if (jsonResponse.users) {
        dispatch({ type: "UPDATE_ALL_USERS", payload: jsonResponse.users });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [state.allUsers]);

  return (
    <div className="footer-section">
      <label htmlFor="search-bar">
        <i className="fa-solid fa-magnifying-glass mag-"></i>
        <input
          type="search"
          placeholder="Search Posts,People,Anything"
          className="footer-search-bar"
        />
      </label>
      <div className="to-follow-list">
        <div className="to-follow-header">
          <p>Who to follow?</p>
          <p>Show More</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
