import React, { useState } from "react";
import API from "../util/API";
import Switch from "@material-ui/core/Switch";

const Login = ({ onLogin }) => {
  console.log("render login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const handleCreate = (e) => {
    e.preventDefault();
    API.submitCreateAccount({ username, password })
      .then((response) => {
        onLogin(response.data);
      })
      .catch((error) => {
        setErrorMsg(error.request.response);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    API.submitLogin({ username, password })
      .then((response) => {
        onLogin(response.data);
      })
      .catch((error) => {
        setErrorMsg(error.request.response);
      });
  };

  const handleLogout = () => {};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") return setUsername(value);
    if (name === "password") return setPassword(value);
    if (name === "confirm-password") return setConfirmPassword(value);
    alert("oops");
  };

  const validateInput = (params) => {
    return false;
  };

  return (
    <div>
      <p>{isLogin ? "Login" : "Create Account"}</p>
      <Switch
        defaultChecked
        color="default"
        inputProps={{ "aria-label": "checkbox with default color" }}
        value={isLogin}
        onChange={() => {
          setIsLogin(!isLogin);
          setErrorMsg("");
          setConfirmPassword("");
        }}
      />
      <form onSubmit={isLogin ? handleLogin : handleCreate}>
        <input
          value={username}
          name="username"
          onChange={handleInputChange}
          type="text"
          placeholder="username"
        />
        <input
          value={password}
          name="password"
          onChange={handleInputChange}
          type="password"
          placeholder="password"
        />
        {isLogin ? null : (
          <input
            value={confirmPassword}
            name="confirm-password"
            onChange={handleInputChange}
            type="password"
            placeholder="confirm-password"
          />
        )}
        <button type="submit" disabled={validateInput()}>
          Submit
        </button>
        {errorMsg ? <p>{errorMsg}</p> : null}
      </form>
    </div>
  );
};

export default Login;
