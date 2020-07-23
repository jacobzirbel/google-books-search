import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import UserContext from "./context/user-context";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Saved from "./components/Saved";
import Search from "./components/Search";
import Home from "./components/Home";
import Login from "./components/Login";
import API from "./util/API";

const App = () => {
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  useEffect(() => {
    let localStorageUser = localStorage.getItem("user");
    if (localStorageUser) {
      let user = JSON.parse(localStorageUser);
      setUser(user);
      getAllBooks(user.id);
    }
  }, []);

  const getAllBooks = (userId) => {
    console.log("getting all books..." + userId);
    API.getAllBooks(userId).then((response) => {
      setBooks(response.data);
    });
  };

  return (
    <>
      {user ? (
        <p>Logged in as: {user.username}</p>
      ) : (
        <Login
          onLogin={(user) => {
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user);
            getAllBooks(user.id);
          }}
        />
      )}
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
          <Route path="/" exact component={Home} />
          <Route path="/" render={() => <Saved books={books} />} />
          <Route path="/" component={Search} />
        </Router>
      </UserContext.Provider>
    </>
  );
};

export default App;
