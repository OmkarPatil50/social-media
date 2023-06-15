import React from "react";

function Navbar() {
  return (
    <div className="navbar">
      <nav>
        <p>
          {" "}
          <i className="fa-solid fa-house"></i>Home
        </p>
        <p>
          <i className="fa-sharp fa-regular fa-rocket"></i>Explore
        </p>
        <p>
          {" "}
          <i className="fa-light fa-bookmark"></i>Bookmark
        </p>
        <p>
          <i className="fa-regular fa-user"></i>Profile
        </p>
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
