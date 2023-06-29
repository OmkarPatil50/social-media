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
          <Link className="nav-items" to="/">
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
          <Link className="nav-items" to={`/users/${state.userData._id}`}>
            <i className="fa-solid fa-user"></i>Profile
          </Link>
        </nav>
        <Link to="/createpost" className="btn-new-post">
          Create New Post
        </Link>
      </div>

      <Link to={`/users/${state.userData._id}`} className="profile-sub-section">
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
