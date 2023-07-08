import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { AppContext } from "../..";
import PostCard from "../../Components/PostCard/PostCard";
import Footer from "../../Components/Footer/Footer";
import "./Home.css";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import NavbarMobile from "../../Components/NavbarMobile/NavbarMobile";
import { useNavigate } from "react-router-dom";

function Home() {
  const { state, dispatch } = useContext(AppContext);
  const [postContent, setPostContent] = useState({
    text: "",
    image: "",
    previewImage: "",
  });
  const [showSortItems, setShowSortItems] = useState(false);
  const [homeHeading, setHomeHeading] = useState("Latest Posts");

  const navigate = useNavigate();

  const getPostData = async () => {
    try {
      const response = await fetch("/api/posts");
      const jsonResponse = await response.json();

      if (jsonResponse.posts) {
        setHomeHeading("Latest Posts");
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
        dispatch({ type: "UPDATE_PROFILE_DETAILS_OBJ", payload: {} });
        dispatch({ type: "UPDATE_SHOW_LOADER", payload: false });
      }
    } catch (err) {
      navigate("/error");
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
          console.log(jsonResponse);
          setHomeHeading("Latest Posts");
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
      navigate("/error");
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
      }
    } catch (err) {
      navigate("/error");
    }
  };

  useEffect(() => {
    getPostsFromUser();
  }, [state.userPosts]);

  return (
    <div className="main-page">
      {state.showLoader ? <Loader /> : ""}

      <Helmet>
        <title>SocialConnect | Home</title>
      </Helmet>
      <Navbar />
      <section className="page-main-section">
        {state.feedPosts?.length === 0 ? (
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
        {state.feedPosts.length ? (
          <div className="sort-section">
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
            <h1 className="homeheading">{homeHeading}</h1>
          </div>
        ) : (
          ""
        )}

        <section className="posts-section">
          <ul>
            {state.feedPosts
              ? state.feedPosts.map((post) => {
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
      <NavbarMobile />
      <Footer />
    </div>
  );
}

export default Home;
