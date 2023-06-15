import React from "react";

function PostCard({
  postContent,
  likesObj,
  username,
  _id,
  userFullName,
  createdAt,
}) {
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
          <button>
            <i className="fa-light fa-heart"></i>
          </button>
          <button>
            <i className="fa-light fa-comments"></i>
          </button>
          <button>
            <i className="fa-sharp fa-light fa-share-nodes"></i>
          </button>
          <button>
            <i className="fa-light fa-bookmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
