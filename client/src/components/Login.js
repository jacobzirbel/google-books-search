import React, { useState, useEffect } from "react";
import API from "../util/API";
import Switch from "@material-ui/core/Switch";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
      display: "flex",
      flexFlow: "column nowrap",
    },
  },
}));

const Login = ({ onLogin, open, handleClose }) => {
  const classes = useStyles();
  const [fields, setFields] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [validation, setValidation] = useState({
    username: true,
    password: true,
    confirmPassword: true,
  });
  const [touched, setTouched] = useState({
    username: false,
    password: false,
    confirmPassword: false,
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const { username, password, confirmPassword } = fields;

  useEffect(() => {
    // Set validation when fields change
    const valid = {
      username: username.length > 2 || !touched.username,
      password: password.length > 8 || !touched.password,
      confirmPassword:
        password === confirmPassword || !touched.confirmPassword || isLogin,
    };
    setValidation(valid);
  }, [fields]);

  const handleCreate = (e) => {
    e.preventDefault();
    API.submitCreateAccount({ username, password })
      .then((response) => {
        handleClose();
        onLogin(response.data);
      })
      .catch((error) => {
        if (error.request) {
          setErrorMsg(error.request.response);
        } else {
          setErrorMsg("error");
        }
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    API.submitLogin({ username, password })
      .then((response) => {
        handleClose();
        onLogin(response.data);
      })
      .catch((error) => {
        if (error.request) {
          setErrorMsg(error.request.response);
        } else {
          setErrorMsg("error");
        }
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTouched({ [name]: true });
    setFields({ ...fields, [name]: value });
  };

  const validateInput = (params) => {
    return (
      Object.keys(validation).every((e) => validation[e]) &&
      Object.keys(touched).every((e) => touched[e])
    );
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      className={classes.dialogHeight}
    >
      <DialogTitle id="simple-dialog-title">
        <p style={{ display: "inline", color: !isLogin ? "grey" : "" }}>
          Login
        </p>
        <Switch
          defaultChecked
          color="default"
          inputProps={{ "aria-label": "checkbox with default color" }}
          value={isLogin}
          onChange={() => {
            setIsLogin(!isLogin);
            setErrorMsg("");
            setFields({ ...fields, confirmPassword: "" });
          }}
        />
        <p style={{ display: "inline", color: isLogin ? "grey" : "" }}>
          Create Account
        </p>
      </DialogTitle>

      <form
        onSubmit={isLogin ? handleLogin : handleCreate}
        className={classes.root}
        autoComplete="off"
      >
        <TextField
          error={!validation.username}
          value={username}
          name="username"
          onChange={handleInputChange}
          type="text"
          label="Username"
          id="outlined-error-helper-text"
          helperText={!validation.username && "Username too short"}
        />

        <TextField
          error={!validation.password}
          value={password}
          name="password"
          onChange={handleInputChange}
          type="password"
          label="password"
          id="outlined-error-helper-text"
          helperText={!validation.password && "Password too short"}
        />
        <br />
        {isLogin ? (
          <div id="spacer" style={{ height: "64px" }} />
        ) : (
          <TextField
            error={!validation.confirmPassword}
            value={confirmPassword}
            name="confirmPassword"
            onChange={handleInputChange}
            type="password"
            label="confirm password"
            id="outlined-error-helper-text"
            helperText={!validation.confirmPassword && "Passwords don't match"}
          />
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={!validateInput()}
        >
          Submit
        </Button>
        {errorMsg ? <p>{errorMsg}</p> : null}
      </form>
    </Dialog>
  );
};

export default Login;
