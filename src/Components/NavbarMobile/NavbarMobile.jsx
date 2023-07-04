import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../..";
import { ToastContainer, toast } from "react-toastify";
import "./NavbarMobile.css";

function NavbarMobile() {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch({ type: "UPDATE_USER_LOGGEDIN", payload: false });
    dispatch({
      type: "UPDATE_USER_DATA",
      payload: {},
    });

    toast.success("Logged Out Successfully!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/login");
  };

  return (
    <div className="navbar-mobile-section">
      <NavLink
        activeclassname="active"
        className="nav-items-mobile"
        to="/"
        onClick={() => {
          dispatch({ type: "UPDATE_SHOW_LOADER", payload: true });
        }}
      >
        {" "}
        <i className="fa-solid fa-house"></i>
      </NavLink>
      <NavLink
        activeclassname="active"
        className="nav-items-mobile"
        to="/explore"
        onClick={() => {
          dispatch({ type: "UPDATE_SHOW_LOADER", payload: true });
        }}
      >
        <i className="fa-solid fa-regular fa-rocket"></i>
      </NavLink>
      <NavLink
        activeclassname="active"
        className="nav-items-mobile"
        to="/bookmark"
        onClick={() => {
          dispatch({ type: "UPDATE_SHOW_LOADER", payload: true });
        }}
      >
        {" "}
        <i className="fa-solid fa-bookmark"></i>
      </NavLink>
      <NavLink
        activeclassname="active"
        className="nav-items-mobile"
        to={`/users/${state.userData._id}`}
        onClick={() => {
          dispatch({ type: "UPDATE_SHOW_LOADER", payload: true });
        }}
      >
        <i className="fa-solid fa-user"></i>
      </NavLink>

      <div className="nav-items-mobile">
        <i
          className="fa-solid fa-right-from-bracket"
          onClick={logoutHandler}
        ></i>
      </div>
    </div>
  );
}

export default NavbarMobile;
