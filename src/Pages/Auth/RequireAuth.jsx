import React, { useContext } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../..";

function RequireAuth({ children }) {
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      {state.userLoggedIn ? (
        children
      ) : (
        <Navigate to="/login" state={{ from: location }} />
      )}
    </div>
  );
}

export default RequireAuth;
