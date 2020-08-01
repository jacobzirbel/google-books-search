import React, { useState } from "react";
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

const NavBar = ({ handleLogin, handleLogout, loggedIn }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
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
          <Button
            style={{ ...buttonStyles }}
            onClick={
              loggedIn
                ? handleLogout
                : () => {
                    setDialogOpen(true);
                  }
            }
            color={loggedIn ? "secondary" : "default"}
          >
            {loggedIn ? "Log out" : "Log in"}
          </Button>
          <Login
            open={dialogOpen}
            onLogin={handleLogin}
            handleClose={() => {
              console.log("handleclose");
              setDialogOpen(false);
            }}
          />
        </Toolbar>
      </AppBar>
      {/* <div style={{ height: "50px" }}></div> */}
    </div>
  );
};

export default NavBar;
