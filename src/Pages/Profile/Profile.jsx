import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../..";
import "./Profile.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import PostCard from "../../Components/PostCard/PostCard";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import NavbarMobile from "../../Components/NavbarMobile/NavbarMobile";

function Profile() {
  const { userId } = useParams();
  const { state, dispatch } = useContext(AppContext);

  const [editProfileContainer, setEditProfileContainer] = useState({
    showContainer: false,
    bio: state.userData?.userBio,
    url: state.userData?.userPortfolioUrl,
    password: state.userData.password,
    image: null,
    previewImage: state.userData.image,
  });

  const navigate = useNavigate();

  const getUserProfileDetails = async () => {
    try {
      const response = await fetch(`/api/users/${userId}`);
      const jsonResponse = await response.json();
      if (jsonResponse.user) {
        dispatch({
          type: "UPDATE_PROFILE_DETAILS_OBJ",
          payload: jsonResponse.user,
        });
        setTimeout(
          () => dispatch({ type: "UPDATE_SHOW_LOADER", payload: false }),
          2000
        );
      }
    } catch (err) {
      navigate("/error");
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
        setTimeout(
          () => dispatch({ type: "UPDATE_SHOW_LOADER", payload: false }),
          2000
        );
      }
    } catch (err) {
      navigate("/error");
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
        setTimeout(
          () => dispatch({ type: "UPDATE_SHOW_LOADER", payload: false }),
          2000
        );
        toast.success(
          `You started following ${state.userProfileDetails.firstName} ${state.userProfileDetails.lastName}`,
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
      navigate("/error");
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
        setTimeout(
          () => dispatch({ type: "UPDATE_SHOW_LOADER", payload: false }),
          2000
        );
        toast.error(
          `You Unfollowed ${state.userProfileDetails.firstName} ${state.userProfileDetails.lastName}`,
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
      navigate("/error");
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
        setTimeout(
          () => dispatch({ type: "UPDATE_SHOW_LOADER", payload: false }),
          2000
        );
        dispatch({ type: "UPDATE_USER_DATA", payload: jsonResponse.user });
        toast.success("User Bio Updated Successfully!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      navigate("/error");
    }
  };

  return (
    <div className="main-page">
      {state.showLoader ? <Loader /> : ""}
      {state.userProfileDetails._id == state.userData._id ? (
        <Helmet>
          <title>SocialConnect | Profile</title>
        </Helmet>
      ) : (
        <Helmet>
          <title>SocialConnect | User</title>
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
              <i className="fa-solid fa-globe"></i>{" "}
              {state.userProfileDetails.userPortfolioUrl}
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
                dispatch({ type: "UPDATE_SHOW_LOADER", payload: true });

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
                      dispatch({ type: "UPDATE_SHOW_LOADER", payload: true });

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
                      dispatch({ type: "UPDATE_SHOW_LOADER", payload: true });

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
          {state.specifiedUserPosts.length === 0 ? (
            <h3 className="empty-profile-page-tag">No Posts Found...!</h3>
          ) : (
            ""
          )}
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
      <NavbarMobile />
      <Footer />
    </div>
  );
}

export default Profile;
