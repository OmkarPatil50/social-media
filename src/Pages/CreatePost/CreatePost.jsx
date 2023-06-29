import React from "react";
import "./CreatePost.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../..";

function CreatePost() {
  const { state, dispatch } = useContext(AppContext);
  const [postContent, setPostContent] = useState("");

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

  return (
    <div className="main-page">
      <Navbar />
      <div className="page-main-section">
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
      <Footer />
    </div>
  );
}

export default CreatePost;
