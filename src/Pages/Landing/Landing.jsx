import React, { useContext } from "react";
import { AppContext } from "../..";
import "./Lander.css";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";

function Landing() {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const getSignupData = async () => {
    try {
      if (
        state.userSignupData.firstName.length &&
        state.userSignupData.lastName.length &&
        state.userSignupData.userName.length &&
        state.userSignupData.userPassword.length &&
        state.userSignupData.isSignupConditionsChecked
      ) {
        if (
          state.userSignupData.userPassword ===
          state.userSignupData.userConfirmPassword
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
            toast.success("Signed Up Successfully!", {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            dispatch({ type: "UPDATE_SHOW_LOADER", payload: false });

            navigate("/");
          } else {
            setTimeout(
              () => dispatch({ type: "UPDATE_SHOW_LOADER", payload: false }),
              1000
            );

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
          setTimeout(
            () => dispatch({ type: "UPDATE_SHOW_LOADER", payload: false }),
            1000
          );
          toast.error("Password Must Match Confirm Password!", {
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
        setTimeout(
          () => dispatch({ type: "UPDATE_SHOW_LOADER", payload: false }),
          1000
        );
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
      {state.showLoader ? <Loader /> : ""}
      <Helmet>
        <title>Sociocourt | Signup</title>
      </Helmet>
      <section className="app-info">
        <h1 className="app-heading">
          <span>Socio</span>court
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
          <button
            type="submit"
            onClick={() => {
              dispatch({ type: "UPDATE_SHOW_LOADER", payload: true });
              getSignupData();
            }}
            className="sign-up-btn"
          >
            Create New Account
          </button>
          <button
            type="submit"
            className="sign-up-btn"
            onClick={() => {
              dispatch({ type: "UPDATE_SHOW_LOADER", payload: true });
              setTimeout(
                () => dispatch({ type: "UPDATE_SHOW_LOADER", payload: false }),
                1000
              );
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
              });
            }}
          >
            Fill Test Credentials
          </button>
        </div>
        <button className="already-have-account-btn-mobile-view">
          <Link to="/login" className="already-have-account-link">
            Already have an account?{" "}
            <i className="fa-solid fa-chevron-right"></i>
          </Link>
        </button>
      </section>
    </div>
  );
}

export default Landing;
