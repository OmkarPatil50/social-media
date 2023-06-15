import React, { useContext, useState } from "react";
import { AppContext } from "../..";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch } = useContext(AppContext);

  const getLoginDetails = async () => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const jsonResponse = await response.json();
      console.log(jsonResponse);
      localStorage.setItem("encodedToken", jsonResponse.encodedToken);

      if (jsonResponse.encodedToken) {
        dispatch({ type: "UPDATE_USER_LOGGEDIN", payload: true });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      <h1>Sociocourt</h1>
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
      <button type="submit" onClick={getLoginDetails}>
        Login
      </button>
      <button
        onClick={() => {
          setUsername("adarshbalika");
          setPassword("adarshBalika123");
        }}
      >
        Fill Test Credentials
      </button>
    </div>
  );
}

export default Login;
