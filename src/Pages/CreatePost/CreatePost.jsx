import React, { useEffect } from "react";
import "./CreatePost.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useState } from "react";
import { useContext } from "react";
import { AppContext } from "../..";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import PostCard from "../../Components/PostCard/PostCard";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const { state, dispatch } = useContext(AppContext);
  const [postContent, setPostContent] = useState({
    text: "",
    image: "",
    previewImage: "",
  });

  const navigate = useNavigate();

  const addPostHandler = async () => {
    try {
      if (postContent) {
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
          console.log(jsonResponse);
          dispatch({
            type: "UPDATE_POSTS",
            payload: jsonResponse.posts.sort((a, b) => {
              const dateA = new Date(a.createdAt);
              const dateB = new Date(b.createdAt);
              if (dateA > dateB) {
                return -1;
              } else if (dateB > dateA) {
                return 1;
              }
            }),
          });
          setPostContent("");
          dispatch({ type: "UPDATE_SHOW_LOADER", payload: false });
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
        }
      } else {
        setTimeout(() => {
          dispatch({ type: "UPDATE_SHOW_LOADER", payload: false });
          toast.error("Can't Post Empty Thoughts!", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }, 2000);
      }
    } catch (err) {
      navigate("/error");
    }
  };

  useEffect(() => {
    dispatch({ type: "UPDATE_SHOW_LOADER", payload: false });
  }, []);

  return (
    <div className="main-page">
      {state.showLoader ? <Loader /> : ""}
      <Helmet>
        <title>SocialConnect | New Post</title>
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
                onChange={(event) =>
                  setPostContent(() => ({
                    ...postContent,
                    text: event.target.value,
                  }))
                }
                value={postContent.text}
                className="new-post-input"
                placeholder="Write Something Interesting...!"
              />
            </label>
            {postContent.previewImage && (
              <div className="preview-image-box">
                <img
                  src={postContent.previewImage}
                  alt="Preview"
                  className="new-post-image"
                />
                <i
                  className="fa-solid fa-xmark"
                  id="delete-image-new-post"
                  onClick={() =>
                    setPostContent(() => ({
                      ...postContent,
                      previewImage: null,
                    }))
                  }
                ></i>
              </div>
            )}
            <div className="new-post-btn-section">
              <input
                type="file"
                name="file"
                id="file"
                accept="image/*"
                className="inputfile"
                onChange={(event) => {
                  setPostContent(() => ({
                    ...postContent,
                    image: event.target.files[0],
                  }));
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setPostContent(() => ({
                      ...postContent,
                      previewImage: reader.result,
                    }));
                  };
                  reader.readAsDataURL(event.target.files[0]);
                }}
              />
              <label htmlFor="file">
                <i className="fa-solid fa-image"></i>
              </label>
              <button
                type="submit"
                onClick={() => {
                  dispatch({ type: "UPDATE_SHOW_LOADER", payload: true });
                  addPostHandler();
                  setPostContent({ text: "", image: "", previewImage: "" });
                }}
                className="post-btn-home"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CreatePost;
