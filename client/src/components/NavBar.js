import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

import Login from "./Login";
const buttonStyles = {
  padding: 0,
  height: "64px",
  marginLeft: "5px",
  marginRight: "5px",
};

const NavBar = () => {
  return (
    <div>
      <AppBar color="primary" position="sticky">
        <Toolbar>
          <Button
            component={Link}
            style={buttonStyles}
            to="/search"
            color="default"
          >
            Search
          </Button>
          <Button
            component={Link}
            style={buttonStyles}
            to="/saved"
            color="default"
          >
            Saved
          </Button>
          <Button style={buttonStyles} color="default">
            Log in
          </Button>
          <Login open={true} />
        </Toolbar>
      </AppBar>
      <div style={{ height: "50px" }}></div>
    </div>
  );
};

export default NavBar;
