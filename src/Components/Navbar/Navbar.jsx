import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar-section">
      <nav>
        <Link to="/home">
          {" "}
          <i className="fa-solid fa-house"></i>Home
        </Link>
        <Link to="/explore">
          <i className="fa-solid fa-regular fa-rocket"></i>Explore
        </Link>
        <Link to="/bookmark">
          {" "}
          <i className="fa-solid fa-bookmark"></i>Bookmark
        </Link>
        <Link to="/profile">
          <i className="fa-solid fa-user"></i>Profile
        </Link>
      </nav>
      <button>Create New Post</button>
      <div className="profile-sub-section">
        <label htmlFor="profile-pic">
          <img src="/" alt="" />
        </label>
        <div className="user-profile-details-nav">
          <h2>User Full Name</h2>
          <p>user username</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
