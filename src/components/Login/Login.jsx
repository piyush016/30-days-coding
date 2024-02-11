import React, { useState, useEffect } from "react";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// For Form
import IconTextField from "../IconTextField/IconTextField";
import { Box, Typography } from "@mui/material";

// Icons
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Key from "@mui/icons-material/Key";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const [showAlert, setShowAlert] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  const handleLogin = () => {
    console.log("Values:", values);

    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((res) => {
        setShowAlert(true);
        setLoginSuccess(true);
        navigate("/");
      })
      .catch((err) => {
        setShowAlert(true);
        setLoginSuccess(false);
        setErrorMessage(err.message);
      });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Alert
  useEffect(() => {
    const alertLoginSuccess = () => {
      toast.success("Login Successful!", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    };

    const alertLoginError = () => {
      toast.error(errorMessage, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    };

    if (showAlert) {
      if (loginSuccess) {
        setTimeout(() => {
          alertLoginSuccess();
        }, 500);
      } else {
        alertLoginError();
      }
    }
  }, [showAlert, loginSuccess, errorMessage]);

  return (
    <form className="form-login" onSubmit={handleFormSubmit}>
      <Box
        className="container"
        sx={{
          maxWidth: "500px",
          mx: "auto",
          my: 7,
          py: 2,
          px: 2,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <Typography variant="h3">
          <b>Have an account?</b>
        </Typography>
        <Typography variant="h4" style={{ marginBottom: 20 }}>
          Log in to continue!
        </Typography>

        <IconTextField
          sx={{ color: "white" }}
          label="Email ID"
          type="email"
          placeholder="Enter your email."
          iconStart={<AccountCircle sx={{ color: "#fa2185" }} />}
          required
          autoComplete="off"
          value={values.email}
          onChange={handleChange("email")}
        />

        <IconTextField
          label="Password"
          type={values.showPassword ? "text" : "password"}
          placeholder="Enter your password."
          onChange={handleChange("password")}
          iconStart={<Key sx={{ color: "#fa2185" }} />}
          value={values.password}
          required
          iconEnd={
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {values.showPassword ? (
                <VisibilityOff sx={{ color: "#fa2185" }} />
              ) : (
                <Visibility sx={{ color: "#fa2185" }} />
              )}
            </IconButton>
          }
        />
        <Typography
          variant="body2"
          style={{ color: "#fb9701", fontWeight: "bold" }}
        >
          <Link to="/forgot-password">Forgot Password?</Link>
        </Typography>

        <div className="panel pink">
          <button className="btn2">Login</button>
        </div>
        <div className="panel borderless">
          <Link to="/signup">
            <button className="btn2">Don't have an account?</button>
          </Link>
        </div>
      </Box>
    </form>
  );
};

export default Login;
