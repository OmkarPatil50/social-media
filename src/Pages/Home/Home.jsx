import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { AppContext } from "../..";
import PostCard from "../../Components/PostCard/PostCard";
import Footer from "../../Components/Footer/Footer";
import "./Home.css";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";

function Home() {
  const { state, dispatch } = useContext(AppContext);
  const [postContent, setPostContent] = useState("");
  const [showSortItems, setShowSortItems] = useState(false);
  const [homeHeading, setHomeHeading] = useState("Latest Posts");

  const getPostData = async () => {
    try {
      const response = await fetch("/api/posts");
      const jsonResponse = await response.json();

      if (jsonResponse.posts) {
        dispatch({ type: "UPDATE_POSTS", payload: jsonResponse.posts });
        dispatch({ type: "UPDATE_PROFILE_DETAILS_OBJ", payload: {} });
        dispatch({ type: "UPDATE_SHOW_LOADER", payload: false });
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getPostData();
  }, [state.userData]);

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
          dispatch({ type: "UPDATE_POSTS", payload: jsonResponse.posts });
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
      console.error(err);
    }
  };

  const getUserProfileDetails = async () => {
    try {
      const response = await fetch(`/api/users/${state.userData._id}`);
      const jsonResponse = await response.json();
      if (jsonResponse.user) {
        dispatch({
          type: "UPDATE_PROFILE_DETAILS_OBJ",
          payload: jsonResponse.user,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserProfileDetails();
  }, [state.userProfileDetails]);

  const getPostsFromUser = async () => {
    try {
      const response = await fetch(
        `/api/posts/user/${state.userData.username}`
      );
      const jsonResponse = await response.json();
      if (jsonResponse.posts) {
        dispatch({
          type: "UPDATE_SPECIFIED_USER_POSTS",
          payload: jsonResponse.posts,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPostsFromUser();
  }, [state.userPosts]);

  return (
    <div className="main-page">
      {state.showLoader ? <Loader /> : ""}

      <Helmet>
        <title>Sociocourt | Home</title>
      </Helmet>
      <Navbar />
      <section className="page-main-section">
        {state.specifiedUserPosts?.length === 0 ? (
          <h1 className="empty-page-tag">Let's Create Some Posts...!</h1>
        ) : (
          ""
        )}
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
              onClick={() => {
                dispatch({ type: "UPDATE_SHOW_LOADER", payload: true });
                addPostHandler();
              }}
              className="post-btn-home"
            >
              Post
            </button>
          </div>
        </div>
        {state.specifiedUserPosts.length ? (
          <>
            <h1>{homeHeading}</h1>
            <div className="sort-btn-section">
              <button
                onClick={() => {
                  setShowSortItems(!showSortItems);
                }}
                className="sort-items-toggle"
              >
                <i className="fa-solid fa-sort"></i>
              </button>
              {showSortItems ? (
                <div className="sort-items-toggle-btn-div">
                  <button
                    className="sort-type-btn"
                    onClick={() => {
                      setHomeHeading("Latest Posts");
                      dispatch({ type: "SORT_BY_DATE_LATEST" });
                      dispatch({ type: "UPDATE_SHOW_LOADER", payload: true });

                      setTimeout(() => {
                        dispatch({
                          type: "UPDATE_SHOW_LOADER",
                          payload: false,
                        });

                        toast.success("Sorted By Date Successfully!", {
                          position: "bottom-center",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                        });
                      }, 1000);
                    }}
                  >
                    Latest
                  </button>
                  <button
                    className="sort-type-btn"
                    onClick={() => {
                      setHomeHeading("Oldest Posts");
                      dispatch({ type: "SORT_BY_DATE_OLDEST" });
                      dispatch({ type: "UPDATE_SHOW_LOADER", payload: true });

                      setTimeout(() => {
                        dispatch({
                          type: "UPDATE_SHOW_LOADER",
                          payload: false,
                        });

                        toast.success("Sorted By Date Successfully!", {
                          position: "bottom-center",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                        });
                      }, 1000);
                    }}
                  >
                    Oldest
                  </button>
                  <button
                    className="sort-type-btn"
                    onClick={() => {
                      setHomeHeading("Trending Posts");
                      dispatch({ type: "SORT_BY_TRENDING" });
                      dispatch({ type: "UPDATE_SHOW_LOADER", payload: true });

                      setTimeout(() => {
                        dispatch({
                          type: "UPDATE_SHOW_LOADER",
                          payload: false,
                        });

                        toast.success("Sorted By Trending Successfully!", {
                          position: "bottom-center",
                          autoClose: 3000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: false,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                        });
                      }, 1000);
                    }}
                  >
                    Trending
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </>
        ) : (
          ""
        )}

        <section className="posts-section">
          <ul>
            {state.specifiedUserPosts
              ? state.specifiedUserPosts.map((post) => {
                  const {
                    content,
                    likes,
                    username,
                    _id,
                    id,
                    userFullName,
                    createdAt,
                  } = post;

                  return (
                    <li key={id}>
                      <PostCard post={post} />
                    </li>
                  );
                })
              : ""}
          </ul>
        </section>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
