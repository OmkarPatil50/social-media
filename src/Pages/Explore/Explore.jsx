import React, { useContext } from "react";
import { AppContext } from "../..";
import PostCard from "../../Components/PostCard/PostCard";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { useEffect } from "react";

function Explore() {
  const { state, dispatch } = useContext(AppContext);
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

  useEffect(() => {
    getPostData();
  }, [state.userData]);

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
  }, [state.userProfileDetails, state.userPosts]);

  return (
    <div className="home-page">
      <Navbar />
      <section className="home-page-section">
        <h1>Explore</h1>
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

      <Footer />
    </div>
  );
}

export default Explore;
