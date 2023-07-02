import React from "react";
import "./CreatePost.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../..";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

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
        toast.success("New Post Created Successfully!", {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setPostContent("");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="main-page">
      <Helmet>
        <title>Sociocourt | New Post</title>
      </Helmet>
      <Navbar />
      <div className="page-main-section">
        <div className="section-new-post">
          <div
            className="avatar-image-div-nav"
            style={{
              backgroundColor: state.userData.image ? "" : "gray",
            }}
          >
            <img
              src={state.userData.image}
              alt=""
              className="avatar-image-nav"
              onError={(e) => (e.target.style.display = "none")}
            />
          </div>
          <div className="new-post-input-section">
            <label htmlFor="new-post">
              <textarea
                required
                onChange={(event) => setPostContent(event.target.value)}
                value={postContent}
                className="new-post-input"
                placeholder="Write Something Interesting...!"
              />
            </label>
            <button
              type="submit"
              onClick={addPostHandler}
              className="post-btn-home"
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreatePost;
