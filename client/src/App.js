import React, { useState, useEffect } from "react";
import "./App.css";
import UserContext from "./context/user-context";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Saved from "./components/Saved";
import Search from "./components/Search";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import API from "./util/API";
import Container from "@material-ui/core/Container";

const App = () => {
  const [user, setUser] = useState(null);
  const [savedBooks, setSavedBooks] = useState([]);

  // check for user, load saved books
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

  const handleLogout = (params) => {
    localStorage.clear();
    setSavedBooks([]);
    setUser(null);
  };

  return (
    <>
      <UserContext.Provider
        value={{ user, setUser, savedBooks, setSavedBooks }}
      >
        <Router>
          <NavBar
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            loggedIn={!!user}
          />
          <Container>
            <Route path="/" exact component={Home} />
            <Route path="/saved" component={Saved} />
            <Route path="/search" component={Search} />
          </Container>
        </Router>
        <div style={{ height: "50px" }}></div>
      </UserContext.Provider>
    </>
  );
};

export default App;
/*    {user ? (
        <p>
          Logged in as: {user.username}{" "}
          <button onClick={handleLogout}>Logout</button>
        </p>
      ) : (
        <Login onLogin={handleLogin} onLogout={handleLogout} />
      )} */
