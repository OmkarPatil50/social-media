import React, { useContext, useState } from "react";
import { AppContext } from "../..";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  const { content, likes, username, _id, firstName, lastName, createdAt } =
    post;
  const { state, dispatch } = useContext(AppContext);

  const [showEditWindow, setShowEditWindow] = useState(false);
  const [newPostData, setNewPostData] = useState("");

  const likePostHandler = async () => {
    try {
      const response = await fetch(`/api/posts/like/${_id}`, {
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
      const response = await fetch(`/api/posts/dislike/${_id}`, {
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
      const response = await fetch(`/api/posts/${_id}`, {
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
      const response = await fetch(`/api/posts/edit/${_id}`, {
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
      const response = await fetch(`/api/users/bookmark/${_id}`, {
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
      const response = await fetch(`/api/users/remove-bookmark/${_id}`, {
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

  return (
    <div className="post-card">
      <div className="user-profile-pic">
        <img src="/" alt="" />
      </div>
      <div className="post-main-section">
        <div className="name-tab">
          <Link to={`/users/${_id}`}>{`${firstName} ${lastName}`}</Link>
          <p>{username}</p>
          <p>{createdAt}</p>
          <div className="post-options">
            <p
              onClick={() =>
                dispatch({
                  type: "SHOW_POST_OPTIONS",
                  payload: !state.showPostOptions,
                })
              }
            >
              ...
            </p>
            {state.showPostOptions ? (
              <>
                <button
                  className="post-control-btn"
                  onClick={() => {
                    deletePostHandler();
                    dispatch({
                      type: "SHOW_POST_OPTIONS",
                      payload: !state.showPostOptions,
                    });
                  }}
                >
                  Delete
                </button>
                <button
                  className="post-control-btn"
                  onClick={() => {
                    setShowEditWindow(true);
                  }}
                >
                  Edit
                  {showEditWindow ? (
                    <div className="edit-window">
                      <input
                        type="text"
                        defaultValue={post.content}
                        onChange={(event) => setNewPostData(event.target.value)}
                      />
                      <button
                        onClick={() => {
                          editPostHandler();
                        }}
                      >
                        Update Post
                      </button>
                    </div>
                  ) : (
                    ""
                  )}
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <Link to={`/posts/${_id}`} className="post-content">
          {content}
        </Link>
        <div className="btn-section-postcard">
          <button
            onClick={
              likes.likeCount === 0 ? likePostHandler : dislikePostHandler
            }
          >
            <i className="fa-solid fa-heart"></i>
            <p>{likes.likeCount}</p>
          </button>
          <button>
            <i className="fa-solid fa-comments"></i>
          </button>
          <button
            onClick={() =>
              state.userBookmarks?.some((book) => book._id === _id)
                ? removePostFromBookmarkHandler()
                : bookmarkPostHandler()
            }
          >
            <i className="fa-solid fa-bookmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
