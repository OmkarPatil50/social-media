import React, { useContext, useEffect, useState } from "react";
import "./Footer.css";
import { AppContext } from "../..";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Footer() {
  const { state, dispatch } = useContext(AppContext);
  const [peopleSearchText, setPeopleSearchText] = useState("");
  const [foundPeople, setFoundPeople] = useState([]);

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

  const followUserHandler = async (id, userFirstName, userLastName) => {
    try {
      const response = await fetch(`/api/users/follow/${id}`, {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
      });
      const jsonResponse = await response.json();
      if (jsonResponse.user && jsonResponse.followUser) {
        dispatch({ type: "UPDATE_USER_DATA", payload: jsonResponse.user });

        toast.success(
          `You started following ${userFirstName} ${userLastName}`,
          {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
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

  useEffect(() => {
    const foundPeopleList = state.allUsers.filter(({ firstName, lastName }) => {
      return (
        firstName.toUpperCase().includes(peopleSearchText.toUpperCase()) ||
        lastName.toUpperCase().includes(peopleSearchText.toUpperCase())
      );
    });
    setFoundPeople(foundPeopleList);
  }, [peopleSearchText]);

  return (
    <div className="footer-section">
      <label htmlFor="search-bar" className="search-bar-label">
        <i className="fa-solid fa-magnifying-glass mag-"></i>
        <input
          type="search"
          placeholder="Search People By Their Names"
          className="footer-search-bar"
          onChange={(event) => setPeopleSearchText(event.target.value)}
        />
      </label>
      {peopleSearchText.length ? (
        <ul className="found-people-list">
          {foundPeople.map((user) => {
            return (
              <li>
                <Link to={`/users/${user._id}`} className="footer-user-head">
                  <div
                    className="avatar-image-div-nav"
                    style={{
                      backgroundColor: "gray",
                    }}
                  >
                    <img
                      src={""}
                      alt=""
                      className="avatar-image-nav"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  </div>
                  <div>
                    <p className="user-name-footer">{`${user.firstName} ${user.lastName}`}</p>
                    <p className="username-footer">@{user.username}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        ""
      )}
      <div className="to-follow-list">
        <div className="to-follow-header">
          <p className="who-to-follow-tag">Who to follow?</p>
        </div>
        <ul className="footer-user-list">
          {state.allUsers
            ?.reduce((acc, curr) => {
              return curr.followers?.some(
                (follower) => follower._id === state.userData._id
              )
                ? acc
                : [...acc, curr];
            }, [])
            .filter((user) => user.id != state.userData.id)
            .map((user) => {
              return (
                <li key={user._id} className="footer-user">
                  <Link to={`/users/${user._id}`} className="footer-user-head">
                    <div
                      className="avatar-image-div-nav"
                      style={{
                        backgroundColor: "gray",
                      }}
                    >
                      <img
                        src={""}
                        alt=""
                        className="avatar-image-nav"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    </div>
                    <div>
                      <p className="user-name-footer">{`${user.firstName} ${user.lastName}`}</p>
                      <p className="username-footer">@{user.username}</p>
                    </div>
                  </Link>

                  <button
                    onClick={() => {
                      state?.userData?.following?.some(
                        (user) => user._id === state.userProfileDetails._id
                      )
                        ? unFollowUserHandler(
                            user._id,
                            user.firstName,
                            user.lastName
                          )
                        : followUserHandler(
                            user._id,
                            user.firstName,
                            user.lastName
                          );
                    }}
                    className="follow-btn-footer"
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
  );
}

export default Footer;
