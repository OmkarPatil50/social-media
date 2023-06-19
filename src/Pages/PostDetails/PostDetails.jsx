import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../..";
import PostCard from "../../Components/PostCard/PostCard";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

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
  }, []);
  return (
    <div className="post-details-page">
      <Navbar />
      <PostCard
        postContent={content}
        likesObj={likes}
        username={username}
        _id={_id}
        userFullName={userFullName}
        createdAt={createdAt}
      />
      <Footer />
    </div>
  );
}

export default PostDetails;