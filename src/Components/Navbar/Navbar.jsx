import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { AppContext } from "../..";

function Navbar() {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className="navbar-section">
      <div className="navigation-section">
        <nav>
          <Link className="nav-items" to="/home">
            {" "}
            <i className="fa-solid fa-house"></i>Home
          </Link>
          <Link className="nav-items" to="/explore">
            <i className="fa-solid fa-regular fa-rocket"></i>Explore
          </Link>
          <Link className="nav-items" to="/bookmark">
            {" "}
            <i className="fa-solid fa-bookmark"></i>Bookmark
          </Link>
          <Link className="nav-items" to="/profile">
            <i className="fa-solid fa-user"></i>Profile
          </Link>
        </nav>
        <button className="btn-new-post">Create New Post</button>
      </div>

      <div className="profile-sub-section">
        <label htmlFor="profile-pic">
          <img src="/" alt="" className="profile-pic" />
        </label>
        <div className="nav-user-profile-details">
          <h2 className="nav-user-full-name">{`${state.userData.firstName} ${state.userData.lastName}`}</h2>
          <p className="nav-username">@{state.userData.username}</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
