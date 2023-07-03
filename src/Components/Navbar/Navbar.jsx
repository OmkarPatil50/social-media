import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { AppContext } from "../..";

function Navbar() {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className="navbar-section">
      <div className="navigation-section">
        <nav>
          <NavLink
            activeClassName="active"
            className="nav-items"
            exact
            to="/"
            onClick={() => {
              dispatch({ type: "UPDATE_SHOW_LOADER", payload: true });
            }}
          >
            {" "}
            <i className="fa-solid fa-house"></i>Home
          </NavLink>
          <NavLink
            activeClassName="active"
            className="nav-items"
            to="/explore"
            onClick={() => {
              dispatch({ type: "UPDATE_SHOW_LOADER", payload: true });
            }}
          >
            <i className="fa-solid fa-regular fa-rocket"></i>Explore
          </NavLink>
          <NavLink
            activeClassName="active"
            className="nav-items"
            to="/bookmark"
            onClick={() => {
              dispatch({ type: "UPDATE_SHOW_LOADER", payload: true });
            }}
          >
            {" "}
            <i className="fa-solid fa-bookmark"></i>Bookmark
          </NavLink>
          <NavLink
            activeClassName="active"
            className="nav-items"
            to={`/users/${state.userData._id}`}
            onClick={() => {
              dispatch({ type: "UPDATE_SHOW_LOADER", payload: true });
            }}
          >
            <i className="fa-solid fa-user"></i>Profile
          </NavLink>
        </nav>
        <Link
          to="/createpost"
          className="btn-new-post"
          onClick={() => {
            dispatch({ type: "UPDATE_SHOW_LOADER", payload: true });
          }}
        >
          Create New Post
        </Link>
      </div>

      <Link
        to={`/users/${state.userData._id}`}
        className="profile-sub-section"
        onClick={() => {
          dispatch({ type: "UPDATE_SHOW_LOADER", payload: true });
        }}
      >
        <div
          className="avatar-image-div-nav"
          style={{
            backgroundColor: state.userData.image ? "" : "gray",
          }}
        >
          <img
            src={state.userData?.image}
            alt=""
            className="avatar-image-nav"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>

        <div className="nav-user-profile-details">
          <h2 className="nav-user-full-name">{`${state.userData.firstName} ${state.userData.lastName}`}</h2>
          <p className="nav-username">@{state.userData.username}</p>
        </div>
      </Link>
    </div>
  );
}

export default Navbar;
