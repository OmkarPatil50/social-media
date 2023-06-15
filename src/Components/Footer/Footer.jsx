import React from "react";

function Footer() {
  return (
    <div className="footer-section">
      <label htmlFor="search-bar">
        <input type="text" placeholder="Search Posts,People,Anything" />
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
