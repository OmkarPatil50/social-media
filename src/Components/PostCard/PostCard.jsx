import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../..";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./PostCard.css";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";

function PostCard({ post }) {
  const {
    content,
    likes,
    username,
    id,
    firstName,
    lastName,
    createdAt,
    _id,
    postImage,
  } = post;
  const { state, dispatch } = useContext(AppContext);

  const location = useLocation();
  const navigate = useNavigate();

  const [showEditWindow, setShowEditWindow] = useState(false);
  const [newPostData, setNewPostData] = useState({
    text: "",
  });

  const likePostHandler = async () => {
    try {
      const response = await fetch(`/api/posts/like/${id}`, {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("encodedToken"),
        },
      });
      const jsonResponse = await response.json();
      if (jsonResponse.posts) {
        dispatch({ type: "UPDATE_POSTS", payload: jsonResponse.posts });
        toast.success("You Liked the Post!", {
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

  const dislikePostHandler = async () => {
    try {
      const response = await fetch(`/api/posts/dislike/${id}`, {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("encodedToken"),
        },
      });
      const jsonResponse = await response.json();
      if (jsonResponse.posts) {
        dispatch({ type: "UPDATE_POSTS", payload: jsonResponse.posts });
        toast.error("You Disliked the post!", {
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

  const deletePostHandler = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          authorization: localStorage.getItem("encodedToken"),
        },
      });
      const jsonResponse = await response.json();
      if (jsonResponse.posts) {
        dispatch({ type: "UPDATE_POSTS", payload: jsonResponse.posts });
        dispatch({ type: "UPDATE_SHOW_LOADER", payload: false });

        toast.error("Post Deleted Successfully!", {
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

  const deletePostFromBookmarkHandler = async () => {
    try {
      const response2 = await fetch(`/api/users/remove-bookmark/${id}`, {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("encodedToken"),
        },
      });
      const jsonResponse2 = await response2.json();

      if (jsonResponse2.bookmarks) {
        dispatch({
          type: "UPDATE_BOOKMARKS",
          payload: jsonResponse2.bookmarks,
        });
      }

      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          authorization: localStorage.getItem("encodedToken"),
        },
      });
      const jsonResponse = await response.json();

      if (jsonResponse.posts) {
        dispatch({ type: "UPDATE_POSTS", payload: jsonResponse.posts });
        dispatch({ type: "UPDATE_SHOW_LOADER", payload: false });

        toast.error("Post Deleted Successfully!", {
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

  const editPostHandler = async () => {
    try {
      const response = await fetch(`/api/posts/edit/${id}`, {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("encodedToken"),
        },
        body: JSON.stringify({ postData: newPostData }),
      });
      const jsonResponse = await response.json();
      if (jsonResponse.posts) {
        dispatch({ type: "UPDATE_POSTS", payload: jsonResponse.posts });
        dispatch({
          type: "SHOW_POST_OPTIONS",
          payload: !state.showPostOptions,
        });
        setShowEditWindow(false);
        dispatch({ type: "UPDATE_SHOW_LOADER", payload: false });
        toast.success("Post Edited Successfully!", {
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

  const bookmarkPostHandler = async () => {
    try {
      const response = await fetch(`/api/users/bookmark/${id}`, {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("encodedToken"),
        },
      });
      const jsonResponse = await response.json();
      if (jsonResponse.bookmarks) {
        dispatch({ type: "UPDATE_BOOKMARKS", payload: jsonResponse.bookmarks });
        toast.success("Added to Bookmark!", {
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

  const removePostFromBookmarkHandler = async () => {
    try {
      const response = await fetch(`/api/users/remove-bookmark/${id}`, {
        method: "POST",
        headers: {
          authorization: localStorage.getItem("encodedToken"),
        },
      });
      const jsonResponse = await response.json();

      if (jsonResponse.bookmarks) {
        dispatch({ type: "UPDATE_BOOKMARKS", payload: jsonResponse.bookmarks });
        toast.error("Removed from Bookmark!", {
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

  const getAllUsers = async () => {
    try {
      const response = await fetch("/api/users");
      const jsonResponse = await response.json();
      if (jsonResponse.users) {
        dispatch({ type: "UPDATE_ALL_USERS", payload: jsonResponse.users });
      }
    } catch (err) {
      navigate("/error");
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [state.userData]);

  const isUsersPost = (userId) => {
    return userId === state.userData._id;
  };

  return (
    <div className="post-card">
      <div
        className="avatar-image-div-nav"
        style={{
          backgroundColor: state.allUsers.find((user) => {
            return user._id === post._id;
          })?.image
            ? ""
            : "gray",
        }}
      >
        <img
          src={
            state.allUsers.find((user) => {
              return user._id === post._id;
            })?.image
          }
          alt=""
          className="avatar-image-nav"
          onError={(e) => (e.target.style.display = "none")}
        />
      </div>
      <div className="post-main-section">
        <div className="name-tab">
          <section>
            <Link
              to={`/users/${_id}`}
              className="name-tab-items user-full-name-postcard"
            >{`${firstName} ${lastName}`}</Link>
            <p className="name-tab-items username-postcard">@{username}</p>
            <p className="name-tab-items post-time">{createdAt}</p>
          </section>

          {showEditWindow ? (
            <div className="edit-page">
              <div className="edit-window">
                <button
                  className="close-btn"
                  onClick={() => {
                    setShowEditWindow(false);
                    setNewPostData({
                      text: "",
                      image: postImage,
                      previewImage: postImage,
                    });
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <label htmlFor="edit-post" className="edit-post-label">
                  New Post Content:
                </label>
                <textarea
                  type="text"
                  defaultValue={post.content}
                  onChange={(event) =>
                    setNewPostData(() => ({
                      ...newPostData,
                      text: event.target.value,
                    }))
                  }
                  className="edit-post-input"
                />
                <label htmlFor="edit-post" className="edit-post-label"></label>

                <button
                  onClick={() => {
                    dispatch({ type: "UPDATE_SHOW_LOADER", payload: true });

                    setTimeout(() => {
                      dispatch({
                        type: "UPDATE_SHOW_LOADER",
                        payload: false,
                      });
                    }, 1000);
                    editPostHandler();
                  }}
                  className="update-post-btn"
                >
                  Update Post
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <Link
          to={`/posts/${id}`}
          onClick={() =>
            dispatch({
              type: "UPDATE_SHOW_LOADER",
              payload: true,
            })
          }
          className="post-content"
        >
          {content}
        </Link>
        {postImage && (
          <div className="post-image-div">
            <img src={postImage} alt="post-image" className="post-image" />
          </div>
        )}
        <div className="btn-section-postcard">
          <button
            onClick={
              likes.likedBy?.some(
                (likedPost) => likedPost._id == state.userData._id
              )
                ? dislikePostHandler
                : likePostHandler
            }
          >
            <i
              className={`fa-${
                likes.likedBy?.some(
                  (likedPost) => likedPost._id == state.userData._id
                )
                  ? "solid"
                  : "regular"
              } fa-heart`}
              style={{
                color: likes.likedBy?.some(
                  (likedPost) => likedPost._id == state.userData._id
                )
                  ? "#ff3b30"
                  : "#2f4f4f",
              }}
            ></i>{" "}
            {likes.likeCount}
          </button>
          <button>
            <i className="fa-regular fa-comments"></i>
          </button>
          <button
            onClick={() =>
              state.userBookmarks?.some((post) => post.id === id)
                ? removePostFromBookmarkHandler()
                : bookmarkPostHandler()
            }
          >
            <i
              className={`fa-${
                state.userBookmarks?.some((post) => post.id === id)
                  ? "solid"
                  : "regular"
              } fa-bookmark`}
              style={{
                color: state.userBookmarks?.some((post) => post.id === id)
                  ? "#ff3b30"
                  : "#2f4f4f",
              }}
            ></i>
          </button>

          <button
            disabled={!isUsersPost(_id)}
            className="edit-btn-postcard"
            onClick={() => {
              setShowEditWindow(true);
              setNewPostData(post.content);
            }}
            style={{ opacity: !isUsersPost(_id) ? "0.3" : "1" }}
          >
            <i className="fa-solid fa-pencil"></i>
          </button>

          <button
            onClick={() => {
              dispatch({ type: "UPDATE_SHOW_LOADER", payload: true });
              setTimeout(() => {
                dispatch({
                  type: "UPDATE_SHOW_LOADER",
                  payload: false,
                });
              }, 1000);
              state.userBookmarks?.some((post) => post.id === id)
                ? deletePostFromBookmarkHandler()
                : deletePostHandler();

              dispatch({
                type: "SHOW_POST_OPTIONS",
                payload: !state.showPostOptions,
              });
            }}
            disabled={!isUsersPost(_id)}
            style={{ opacity: !isUsersPost(_id) ? "0.3" : "1" }}
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
