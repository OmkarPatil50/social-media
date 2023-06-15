import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { AppContext } from "../..";
import PostCard from "../../Components/PostCard/PostCard";

function Home() {
  const { state, dispatch } = useContext(AppContext);
  const [postContent, setPostContent] = useState("");

  const getPostData = async () => {
    try {
      const response = await fetch("/api/posts");
      const jsonResponse = await response.json();

      if (jsonResponse.posts) {
        dispatch({ type: "UPDATE_POSTS", payload: jsonResponse.posts });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addPostHandler = async () => {
    try {
      const response = await fetch("/api/posts/", {
        method: "POST",
        body: JSON.stringify({
          postData: postContent,
        }),
        headers: {
          authorization: localStorage.getItem("encodedToken"),
        },
      });
      const jsonResponse = await response.json();
      if (jsonResponse.posts) {
        dispatch({ type: "UPDATE_POSTS", payload: jsonResponse.posts });
        setPostContent("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <div className="home-page">
      <Navbar />
      <section className="home-page-section">
        <div className="section-new-post">
          <label htmlFor="new-post">
            <input
              type="text"
              required
              onChange={(event) => setPostContent(event.target.value)}
              value={postContent}
            />
          </label>
          <button type="submit" onClick={addPostHandler}>
            Post
          </button>
        </div>
        <h1>Latest Posts</h1>
        <section className="posts-section">
          <ul>
            {state.userPosts.map((post) => {
              const {
                content,
                createdAt,
                id,
                likes,
                updatedAt,
                userFullName,
                username,
                _id,
              } = post;
              return (
                <li key={_id}>
                  <PostCard
                    postContent={content}
                    likesObj={likes}
                    username={username}
                    _id={_id}
                    userFullName={userFullName}
                    createdAt={createdAt}
                  />
                </li>
              );
            })}
          </ul>
        </section>
      </section>
    </div>
  );
}

export default Home;
