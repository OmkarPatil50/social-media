import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-section">
      <label htmlFor="search-bar">
        <i className="fa-solid fa-magnifying-glass mag-"></i>
        <input
          type="text"
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
