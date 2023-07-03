import React, { useContext, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import { AppContext } from "../..";
import PostCard from "../../Components/PostCard/PostCard";
import "./Bookmark.css";
import { Helmet } from "react-helmet";
import Loader from "../../Components/Loader/Loader";

function Bookmark() {
  const { state, dispatch } = useContext(AppContext);

  const getBookmarkData = async () => {
    try {
      const response = await fetch("/api/users/bookmark", {
        headers: { authorization: localStorage.getItem("encodedToken") },
      });
      const jsonResponse = await response.json();
      if (jsonResponse.bookmarks) {
        dispatch({ type: "UPDATE_BOOKMARKS", payload: jsonResponse.bookmarks });
        setTimeout(
          () => dispatch({ type: "UPDATE_SHOW_LOADER", payload: false }),
          2000
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getBookmarkData();
  }, []);
  return (
    <div className="main-page">
      {state.showLoader ? <Loader /> : ""}
      <Helmet>
        <title>Sociocourt | Bookmarks</title>
      </Helmet>
      <Navbar />
      <section className="page-main-section">
        <h1>Bookmarks</h1>
        {state.userBookmarks.length === 0 ? (
          <h1 className="empty-page-tag">No Bookmarks Yet</h1>
        ) : (
          ""
        )}
        <ul>
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

export default Bookmark;
