import React, { useContext } from "react";
import { AppContext } from "../..";
import "./Lander.css";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function Landing() {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const getSignupData = async () => {
    try {
      if (
        state.userSignupData.firstName.length &&
        state.userSignupData.lastName.length &&
        state.userSignupData.userName.length &&
        state.userSignupData.userPassword.length
      ) {
        const response = await fetch("/api/auth/signup", {
          method: "POST",
          body: JSON.stringify({
            firstName: state.userSignupData.firstName,
            lastName: state.userSignupData.lastName,
            username: state.userSignupData.userName,
            password: state.userSignupData.userPassword,
          }),
        });

        const jsonResponse = await response.json();

        localStorage.setItem("encodedToken", jsonResponse.encodedToken);

        if (jsonResponse.encodedToken) {
          dispatch({ type: "UPDATE_USER_LOGGEDIN", payload: true });
          dispatch({
            type: "UPDATE_USER_DATA",
            payload: jsonResponse.createdUser,
          });
          navigate("/");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="landing-page">
      <Helmet>
        <title>Sociocourt | Signup</title>
      </Helmet>
      <section className="app-info">
        <h1 className="app-heading">
          <span>Socio</span>court
        </h1>
        <div className="app-quotes-container">
          <p className="app-quote">
            <span className="app-quotes-span">Follow</span>PEOPLE AROUND THE
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
          <Link to="/login" className="already-have-account-link">
            Already have an account?{" "}
            <i className="fa-solid fa-chevron-right"></i>
          </Link>
        </button>
      </section>
      <section className="sign-up-section">
        <h2 className="section-header">
          <span>Sign</span>up
        </h2>
        <div className="sign-up-details">
          <div className="name-section">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              required
              onChange={(event) =>
                dispatch({
                  type: "UPDATE_FIRST_NAME",
                  payload: event.target.value,
                })
              }
              value={state.userSignupData.firstName}
            />
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              required
              onChange={(event) =>
                dispatch({
                  type: "UPDATE_LAST_NAME",
                  payload: event.target.value,
                })
              }
              value={state.userSignupData.lastName}
            />
          </div>
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            required
            onChange={(event) =>
              dispatch({ type: "UPDATE_USERNAME", payload: event.target.value })
            }
            value={state.userSignupData.userName}
          />
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            required
            onChange={(event) =>
              dispatch({
                type: "UPDATE_USER_EMAIL",
                payload: event.target.value,
              })
            }
            value={state.userSignupData.userEmail}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            required
            onChange={(event) =>
              dispatch({
                type: "UPDATE_USER_PASSWORD",
                payload: event.target.value,
              })
            }
            value={state.userSignupData.userPassword}
          />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            required
            onChange={(event) =>
              dispatch({
                type: "UPDATE_USER_CONFIRM_PASSWORD",
                payload: event.target.value,
              })
            }
            value={state.userSignupData.userConfirmPassword}
          />
          <label htmlFor="terms-and-conditions">
            <input
              type="checkbox"
              checked={state.userSignupData.isSignupConditionsChecked}
              required
              name="terms-and-conditions"
              className="terms-and-conditions-checkbox"
              onChange={(event) =>
                dispatch({
                  type: "UPDATE_SIGNUP_CONDITIONS_CHECK",
                  payload: event.target.checked,
                })
              }
            />
            I accept all Terms & Conditions
          </label>
          <button type="submit" onClick={getSignupData} className="sign-up-btn">
            Create New Account
          </button>
          <button
            type="submit"
            className="sign-up-btn"
            onClick={() =>
              dispatch({
                type: "UPDATE_USER_SIGNUP_DATA",
                payload: {
                  firstName: "Test",
                  lastName: "Admin",
                  userName: "testUser",
                  userEmail: "testUser@gmail.com",
                  userPassword: "12345",
                  userConfirmPassword: "12345",
                  isSignupConditionsChecked: true,
                },
              })
            }
          >
            Fill Test Credentials
          </button>
        </div>
      </section>
    </div>
  );
}

export default Landing;
