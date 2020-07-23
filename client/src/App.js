import React, { useState, useEffect } from "react";
import "./App.css";
import UserContext from "./context/user-context";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Saved from "./components/Saved";
import Search from "./components/Search";
import Home from "./components/Home";
import Login from "./components/Login";
import API from "./util/API";

const App = () => {
  console.log("render app");
  const [user, setUser] = useState(null);
  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    let localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
      let user = JSON.parse(localStorageUser);
      setUser(user);
      getAllBooks(user.id);
    }
  }, []);

  const getAllBooks = (userId) => {
    API.getAllBooks(userId).then((response) => {
      setSavedBooks(response.data);
    });
  };

  const handleLogin = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    getAllBooks(user.id);
  };

  const handleLogout = (params) => {};

  return (
    <>
      {user ? (
        <p>Logged in as: {user.username}</p>
      ) : (
        <Login onLogin={handleLogin} onLogout={handleLogout} />
      )}
      <UserContext.Provider
        value={{ user, setUser, savedBooks, setSavedBooks }}
      >
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/" component={Saved} />
          <Route path="/" component={Search} />
        </Router>
      </UserContext.Provider>
    </>
  );
};

export default App;
