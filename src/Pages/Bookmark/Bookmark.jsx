import React, { useContext, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { AppContext } from "../..";
import PostCard from "../../Components/PostCard/PostCard";

function Bookmark() {
  const { state, dispatch } = useContext(AppContext);

  const getBookmarkData = async () => {
    try {
      const response = await fetch("/api/users/bookmark", {
        headers: { authorization: localStorage.getItem("encodedToken") },
      });
      const jsonResponse = await response.json();
      console.log(jsonResponse.bookmarks);
      if (jsonResponse.bookmarks) {
        dispatch({ type: "UPDATE_BOOKMARKS", payload: jsonResponse.bookmarks });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBookmarkData();
  }, []);
  return (
    <div className="bookmark-page">
      <Navbar />
      <section className="bookmark">
        {state.userBookmarks.map((post) => {
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
              <PostCard post={post} />
            </li>
          );
        })}
      </section>
      <Footer />
    </div>
  );
}

export default Bookmark;
