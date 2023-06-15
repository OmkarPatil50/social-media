import React, { useContext } from "react";
import { AppContext } from "../..";

function PostCard({
  postContent,
  likesObj,
  username,
  _id,
  userFullName,
  createdAt,
}) {
  const { state, dispatch } = useContext(AppContext);

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

  return (
    <div className="post-card">
      <div className="user-profile-pic">
        <img src="/" alt="" />
      </div>
      <div className="post-main-section">
        <div className="name-tab">
          <h2>{userFullName}</h2>
          <p>{username}</p>
          <p>{createdAt.slice(10)}</p>
        </div>
        <section className="post-content">{postContent}</section>
        <div className="btn-section-postcard">
          <button
            onClick={
              likesObj.likeCount === 0 ? likePostHandler : dislikePostHandler
            }
          >
            <i className="fa-solid fa-heart"></i>
            <p>{likesObj.likeCount}</p>
          </button>
          <button>
            <i className="fa-solid fa-comments"></i>
          </button>
          <button>
            <i className="fa-sharp fa-solid fa-share-nodes"></i>
          </button>
          <button>
            <i className="fa-solid fa-bookmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
