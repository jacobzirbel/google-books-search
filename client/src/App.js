import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import userContext from "./context/user-context";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Saved from "./components/Saved";
import Search from "./components/Search";
import Home from "./components/Home";
import Login from "./components/Login";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
      setUser(JSON.parse(localStorageUser));
    }
  }, []);

  return (
    <>
      {user ? (
        <p>Logged in as: {user.username}</p>
      ) : (
        <Login
          onLogin={(user) => {
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
          }}
        />
      )}
      <userContext.Provider value={user}>
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/" component={Saved} />
          <Route path="/" component={Search} />
        </Router>
      </userContext.Provider>
    </>
  );
};

export default App;
