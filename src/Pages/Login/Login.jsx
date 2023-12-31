import React, { useContext, useState } from "react";
import { AppContext } from "../..";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch } = useContext(AppContext);

  const navigate = useNavigate();

  const getLoginDetails = async () => {
    try {
      if (username.length && password.length) {
        const response = await fetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
          }),
        });

        const jsonResponse = await response.json();
        localStorage.setItem("encodedToken", jsonResponse.encodedToken);

        if (jsonResponse.encodedToken) {
          dispatch({ type: "UPDATE_USER_LOGGEDIN", payload: true });
          dispatch({
            type: "UPDATE_USER_DATA",
            payload: jsonResponse.foundUser,
          });
          toast.success("Logged In Successfully!", {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => navigate("/"), 1000);
        } else {
          dispatch({ type: "UPDATE_SHOW_LOADER", payload: false });
          toast.error("Invalid Credentials!", {
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
        dispatch({ type: "UPDATE_SHOW_LOADER", payload: false });
        toast.error("Please Fill All Credentials!", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      navigate("/error");
    }
  };

  return (
    <div className="landing-page">
      <Helmet>
        <title>SocialConnect | Login</title>
      </Helmet>
      {state.showLoader ? <Loader /> : ""}
      <section className="app-info">
        <h1 className="app-heading">
          <span>Social</span>Connect
        </h1>
        <div className="app-quotes-container">
          <p className="app-quote">
            <span className="app-quotes-span">FOLLOW</span> PEOPLE AROUND THE
            GLOBE
          </p>
          <p className="app-quote">
            <span className="app-quotes-span">CONNECT</span> WITH YOUR FRIENDS
          </p>
          <p className="app-quote">
            <span className="app-quotes-span">SHARE</span> WHAT YOU ARE THINKING
          </p>
        </div>
        <button className="already-have-account-btn">
          <Link to="/signup" className="already-have-account-link">
            Create New Account? <i className="fa-solid fa-chevron-right"></i>
          </Link>
        </button>
      </section>
      <section className="sign-up-section">
        <h2 className="section-header">
          <span>Log</span>In
        </h2>
        <div className="sign-up-details">
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            required
            onChange={(event) => setUsername(event.target.value)}
            value={username}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
          <button
            type="submit"
            onClick={() => {
              dispatch({ type: "UPDATE_SHOW_LOADER", payload: true });
              getLoginDetails();
            }}
            className="sign-up-btn"
          >
            Login
          </button>
          <button
            className="sign-up-btn"
            onClick={() => {
              setUsername("adarshbalika");
              setPassword("adarshBalika123");
              dispatch({ type: "UPDATE_SHOW_LOADER", payload: true });
              setTimeout(
                () => dispatch({ type: "UPDATE_SHOW_LOADER", payload: false }),
                1000
              );
            }}
          >
            Fill Test Credentials
          </button>
        </div>
        <button className="already-have-account-btn-mobile-view">
          <Link to="/signup" className="already-have-account-link">
            Create New Account? <i className="fa-solid fa-chevron-right"></i>
          </Link>
        </button>
      </section>
    </div>
  );
}

export default Login;
