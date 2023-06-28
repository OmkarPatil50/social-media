import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { AppContext } from "../..";
import PostCard from "../../Components/PostCard/PostCard";
import Footer from "../../Components/Footer/Footer";
import "./Home.css";

function Home() {
  const { state, dispatch } = useContext(AppContext);
  const [postContent, setPostContent] = useState("");
  const [showSortItems, setShowSortItems] = useState(false);
  const [homeHeading, setHomeHeading] = useState("Oldest Posts");

  const getPostData = async () => {
    try {
      const response = await fetch("/api/posts");
      const jsonResponse = await response.json();

      if (jsonResponse.posts) {
        dispatch({ type: "UPDATE_POSTS", payload: jsonResponse.posts });
        dispatch({ type: "UPDATE_PROFILE_DETAILS_OBJ", payload: {} });
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
  }, [state.userData]);

  return (
    <div className="home-page">
      <Navbar />
      <section className="home-page-section">
        <div className="section-new-post">
          <label htmlFor="profile-pic">
            <img src="/" alt="" className="profile-pic" />
          </label>
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
        <h1>{homeHeading}</h1>
        <button
          onClick={() => {
            setShowSortItems(!showSortItems);
          }}
        >
          <i className="fa-solid fa-sort"></i>
        </button>
        {showSortItems ? (
          <div>
            <button
              onClick={() => {
                setHomeHeading("Latest Posts");
                dispatch({ type: "SORT_BY_DATE_LATEST" });
              }}
            >
              Latest
            </button>
            <button
              onClick={() => {
                setHomeHeading("Oldest Posts");
                dispatch({ type: "SORT_BY_DATE_OLDEST" });
              }}
            >
              Oldest
            </button>
            <button
              onClick={() => {
                setHomeHeading("Trending Posts");
                dispatch({ type: "SORT_BY_TRENDING" });
              }}
            >
              Trending
            </button>
          </div>
        ) : (
          ""
        )}
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
                <li key={id}>
                  <PostCard post={post} />
                </li>
              );
            })}
          </ul>
        </section>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
