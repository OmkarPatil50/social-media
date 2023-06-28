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
  }, [state.allUsers, state.userData]);

  const followUserHandler = async (id) => {
    try {
      const response = await fetch(`/api/users/follow/${id}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
      });
      const jsonResponse = await response.json();
      if (jsonResponse.user && jsonResponse.followUser) {
        dispatch({ type: "UPDATE_USER_DATA", payload: jsonResponse.user });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const unFollowUserHandler = async (id) => {
    try {
      const response = await fetch(`/api/users/unfollow/${id}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
      });
      const jsonResponse = await response.json();

      if (jsonResponse.user && jsonResponse.followUser) {
        dispatch({ type: "UPDATE_USER_DATA", payload: jsonResponse.user });
      }
    } catch (err) {
      console.error(err);
    }
  };

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

          <ul>
            {state.allUsers
              ?.reduce((acc, curr) => {
                return curr.followers?.some(
                  (follower) => follower._id === state.userData._id
                )
                  ? [...acc]
                  : [...acc, curr];
              }, [])
              .map((user) => {
                return (
                  <li>
                    <img src="/" alt="" />
                    <p>{`${user.firstName} ${user.lastName}`}</p>
                    <button
                      onClick={() => {
                        state?.userData?.following?.some(
                          (user) => user._id === state.userProfileDetails._id
                        )
                          ? unFollowUserHandler(user._id)
                          : followUserHandler(user._id);
                      }}
                    >
                      {user.followers?.some(
                        (follower) => follower._id === state.userData._id
                      )
                        ? "Unfollow"
                        : "Follow"}
                    </button>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
