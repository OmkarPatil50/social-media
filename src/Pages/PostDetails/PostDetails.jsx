import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../..";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { Helmet } from "react-helmet";
import PostDetailsCard from "../../Components/PostDetailsCard/PostDetailsCard";
import NavbarMobile from "../../Components/NavbarMobile/NavbarMobile";

function PostDetails() {
  const { postID } = useParams();
  const { state, dispatch } = useContext(AppContext);

  const getPostDetails = async () => {
    try {
      const response = await fetch(`/api/posts/${postID}`);
      const jsonResponse = await response.json();
      if (jsonResponse.post) {
        dispatch({
          type: "UPDATE_POST_DETAILS_OBJ",
          payload: jsonResponse.post,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const {
    content,
    createdAt,
    id,
    likes,
    updatedAt,
    userFullName,
    username,
    _id,
  } = state.userPostDetails;

  useEffect(() => {
    getPostDetails();
  }, [state.userPosts]);
  return (
    <div className="main-page">
      <Helmet>
        <title>Sociocourt | Post</title>
      </Helmet>
      <Navbar />
      <PostDetailsCard post={state.userPostDetails} />
      <NavbarMobile />
      <Footer />
    </div>
  );
}

export default PostDetails;
