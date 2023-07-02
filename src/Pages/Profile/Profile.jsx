import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../..";
import "./Profile.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import PostCard from "../../Components/PostCard/PostCard";
import { Helmet } from "react-helmet";

function Profile() {
  const { userId } = useParams();
  const { state, dispatch } = useContext(AppContext);

  const [editProfileContainer, setEditProfileContainer] = useState({
    showContainer: false,
    bio: "",
    url: "",
    password: state.userData.password,
    image: null,
    previewImage: null,
  });

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

  const editUserBioHandler = async () => {
    try {
      const response = await fetch("/api/users/edit", {
        method: "POST",
        headers: { authorization: localStorage.getItem("encodedToken") },
        body: JSON.stringify({
          userData: {
            userBio: editProfileContainer.bio,
            userPortfolioUrl: editProfileContainer.url,
            password: editProfileContainer.password,
            avatar: editProfileContainer.previewImage,
          },
        }),
      });
      const jsonResponse = await response.json();
      if (jsonResponse.user) {
        dispatch({ type: "UPDATE_USER_DATA", payload: jsonResponse.user });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="main-page">
      {state.userProfileDetails._id == state.userData._id ? (
        <Helmet>
          <title>Sociocourt | Profile</title>
        </Helmet>
      ) : (
        <Helmet>
          <title>Sociocourt | User</title>
        </Helmet>
      )}

      <Navbar />
      <div className="page-main-section">
        <div className="profile-page-header">
          <div
            className="avatar-image-div"
            style={{
              backgroundColor: state.userProfileDetails.image ? "" : "gray",
            }}
          >
            <img
              src={state.userProfileDetails?.image}
              className="avatar-image"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
          <h1 className="user-name-profile">
            {`${state.userProfileDetails?.firstName} ${state.userProfileDetails?.lastName}`}
          </h1>
          <p className="username-profile">
            @{state.userProfileDetails.username}
          </p>

          {state.userProfileDetails.userBio ? (
            <p className="user-profile-details-bio">
              {state.userProfileDetails.userBio}
            </p>
          ) : (
            ""
          )}

          {state.userProfileDetails.userPortfolioUrl ? (
            <p className="user-profile-details-url">
              @{state.userProfileDetails.userPortfolioUrl}
            </p>
          ) : (
            ""
          )}

          {state.userProfileDetails._id == state.userData._id ? (
            <button
              className="edit-profile-btn"
              onClick={() => {
                setEditProfileContainer(() => ({
                  ...editProfileContainer,
                  showContainer: !editProfileContainer.showContainer,
                }));
              }}
            >
              Edit Profile
            </button>
          ) : (
            <button
              className="edit-profile-btn"
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
          )}

          <div className="following-section-profile">
            <p className="following-section-count">
              {state.userProfileDetails.followers
                ? state.userProfileDetails.followers.length
                : 0}{" "}
              Followers
            </p>
            <p className="following-section-count">
              {state.userProfileDetails.following
                ? state.userProfileDetails.following.length
                : 0}{" "}
              Following
            </p>
          </div>
          {state.userProfileDetails._id == state.userData._id &&
          editProfileContainer.showContainer ? (
            <div className="edit-profile-container">
              <div className="edit-profile-box">
                <label htmlFor="update-avatar"></label>
                <input
                  type="file"
                  name="img"
                  id="img"
                  accept="image/*"
                  className="file-input-profile"
                  onError={(e) => (e.target.style.display = "none")}
                  onChange={(event) => {
                    setEditProfileContainer(() => ({
                      ...editProfileContainer,
                      image: event.target.files[0],
                    }));
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setEditProfileContainer(() => ({
                        ...editProfileContainer,
                        previewImage: reader.result,
                      }));
                    };
                    reader.readAsDataURL(event.target.files[0]);
                  }}
                />
                {editProfileContainer.previewImage && (
                  <div>
                    <img
                      src={editProfileContainer.previewImage}
                      alt="Preview"
                      className="avatar-image"
                    />
                    <i
                      className="fa-solid fa-xmark"
                      onClick={() =>
                        setEditProfileContainer(() => ({
                          ...editProfileContainer,
                          previewImage: null,
                        }))
                      }
                    ></i>
                  </div>
                )}
                <label htmlFor="bio">Update Bio : </label>
                <input
                  type="text"
                  required
                  onChange={(event) => {
                    setEditProfileContainer(() => ({
                      ...editProfileContainer,
                      bio: event.target.value,
                    }));
                  }}
                  defaultValue={state.userProfileDetails?.userBio}
                />
                <label htmlFor="portfolio-link">Update Portfolio Link : </label>
                <input
                  type="email"
                  required
                  onChange={(event) => {
                    setEditProfileContainer(() => ({
                      ...editProfileContainer,
                      url: event.target.value,
                    }));
                  }}
                  defaultValue={state.userProfileDetails?.userPortfolioUrl}
                />

                <label htmlFor="password">Change Password : </label>
                <input
                  type="text"
                  required
                  onChange={(event) => {
                    setEditProfileContainer(() => ({
                      ...editProfileContainer,
                      password: event.target.value,
                    }));
                  }}
                  defaultValue={state.userProfileDetails?.password}
                />

                <div className="btn-section">
                  <button
                    type="submit"
                    className="save-btn-profile"
                    onClick={() => {
                      editUserBioHandler();
                      setEditProfileContainer(() => ({
                        ...editProfileContainer,
                        showContainer: false,
                      }));
                    }}
                  >
                    Save
                  </button>
                  <button
                    type="reset"
                    className="save-btn-profile"
                    onClick={() => {
                      setEditProfileContainer(() => ({
                        ...editProfileContainer,
                        showContainer: false,
                      }));
                    }}
                  >
                    Discard
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="user-posts-section">
          <ul>
            {state.specifiedUserPosts
              ? state.specifiedUserPosts.map((post) => {
                  const {
                    content,
                    likes,
                    username,
                    id,
                    userFullName,
                    createdAt,
                  } = post;

                  return (
                    <li key={id}>
                      <PostCard post={post} />
                    </li>
                  );
                })
              : "No Posts Found"}
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
