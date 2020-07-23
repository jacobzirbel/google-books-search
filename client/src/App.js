import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Saved from "./components/Saved";
import Search from "./components/Search";
import Home from "./components/Home";
import Login from "./components/Login";
const App = () => {
  return (
    <>
      <Login></Login>
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/saved" component={Saved} />
        <Route path="/search" component={Search} />
      </Router>
    </>
  );
};

export default App;
