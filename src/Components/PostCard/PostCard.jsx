import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../..";
import { Link } from "react-router-dom";
import "./PostCard.css";

function PostCard({ post }) {
  const { content, likes, username, id, firstName, lastName, createdAt, _id } =
    post;
  const { state, dispatch } = useContext(AppContext);

  const [showEditWindow, setShowEditWindow] = useState(false);
  const [newPostData, setNewPostData] = useState("");

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
      }
    } catch (err) {
      console.error(err);
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
      }
    } catch (err) {
      console.error(err);
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
      }
    } catch (err) {
      console.error(err);
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
      }
    } catch (err) {
      console.error(err);
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
      }
    } catch (err) {
      console.error(err);
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
      }
    } catch (err) {
      console.error(err);
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
      console.error(err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [state.userData]);

  const getImage = () => {
    return state.allUsers?.reduce(
      ((acc, curr) => {
        return curr._id == post._id ? (acc = curr.image) : acc;
      },
      "")
    );
  };

  const isUsersPost = (userId) => {
    return userId === state.userData._id;
  };

  return (
    <div className="post-card">
      <div
        className="avatar-image-div-nav"
        style={{
          backgroundColor: post.image ? "" : "gray",
        }}
      >
        <img
          src={getImage}
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
                    setNewPostData("");
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <label htmlFor="edit-post" className="edit-post-label">
                  New Post Content:
                </label>
                <input
                  type="text"
                  defaultValue={post.content}
                  onChange={(event) => setNewPostData(event.target.value)}
                  className="edit-post-input"
                />
                <button
                  onClick={() => {
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
        <Link to={`/posts/${id}`} className="post-content">
          {content}
        </Link>
        <div className="btn-section-postcard">
          <button
            onClick={
              likes.likedBy?.some((likedPost) => likedPost._id == _id)
                ? dislikePostHandler
                : likePostHandler
            }
          >
            <i
              className={`fa-${
                likes.likedBy?.some((likedPost) => likedPost._id == _id)
                  ? "solid"
                  : "regular"
              } fa-heart`}
            ></i>
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
              deletePostHandler();
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
