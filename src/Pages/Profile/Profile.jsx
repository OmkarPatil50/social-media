import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../..";
import "./Profile.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import PostCard from "../../Components/PostCard/PostCard";

function Profile() {
  const { userId } = useParams();
  const { state, dispatch } = useContext(AppContext);

  const getUserProfileDetails = async () => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      const jsonResponse = await response.json();
      if (jsonResponse.user) {
        dispatch({
          type: "UPDATE_PROFILE_DETAILS_OBJ",
          payload: jsonResponse.user,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserProfileDetails();
  }, [state.userProfileDetails]);

  const getPostsFromUser = async () => {
    try {
      const response = await fetch(
        `/api/posts/user/${state.userProfileDetails.username}`
      );
      const jsonResponse = await response.json();
      if (jsonResponse.posts) {
        dispatch({
          type: "UPDATE_SPECIFIED_USER_POSTS",
          payload: jsonResponse.posts,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPostsFromUser();
  }, [state.userProfileDetails, state.userPosts]);

  const followUserHandler = async () => {
    try {
      const response = await fetch(
        `/api/users/follow/${state.userProfileDetails._id}`,
        {
          method: "POST",
          headers: { authorization: localStorage.getItem("encodedToken") },
        }
      );
      const jsonResponse = await response.json();
      if (jsonResponse.user && jsonResponse.followUser) {
        dispatch({ type: "UPDATE_USER_DATA", payload: jsonResponse.user });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const unFollowUserHandler = async () => {
    try {
      const response = await fetch(
        `/api/users/unfollow/${state.userProfileDetails._id}`,
        {
          method: "POST",
          headers: { authorization: localStorage.getItem("encodedToken") },
        }
      );
      const jsonResponse = await response.json();

      if (jsonResponse.user && jsonResponse.followUser) {
        dispatch({ type: "UPDATE_USER_DATA", payload: jsonResponse.user });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="user-profile-page">
      <Navbar />
      <div className="user-profile-main-section">
        <div className="user-profile-pic">
          <img src="/" alt="" />
        </div>
        <h1>
          {`${state.userProfileDetails?.firstName} ${state.userProfileDetails?.lastName}`}
        </h1>
        <p>@{state.userProfileDetails.username}</p>
        <button
          onClick={() => {
            state?.userData?.following?.some(
              (user) => user._id === state.userProfileDetails._id
            )
              ? unFollowUserHandler()
              : followUserHandler();
          }}
        >
          {state?.userData?.following?.some(
            (user) => user._id === state.userProfileDetails._id
          )
            ? "Unfollow"
            : "Follow"}
        </button>
        <div className="following-section">
          <p>
            {state.userProfileDetails.followers
              ? state.userProfileDetails.followers.length
              : 0}{" "}
            Followers
          </p>
          <p>
            {state.userProfileDetails.following
              ? state.userProfileDetails.following.length
              : 0}{" "}
            Following
          </p>
        </div>
      </div>
      <div className="user-posts-section">
        <ul>
          {state.specifiedUserPosts
            ? state.specifiedUserPosts.map((post) => {
                const {
                  content,
                  likes,
                  username,
                  _id,
                  userFullName,
                  createdAt,
                } = post;

                return (
                  <li key={_id}>
                    <PostCard post={post} />
                  </li>
                );
              })
            : "No Posts Found"}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
