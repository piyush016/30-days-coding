import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword"
import Profile from "./components/Profile/Profile";
import Topic from "./components/Topic/Topic";
import ReportProblem from "./components/ReportProblem/ReportProblem";

import { auth } from "./firebase";
import { Box } from "@mui/material";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      setUser(user);
      setLoading(false);
    });

    // Clean up the subscription
    return () => {
      unsubscribe();
    };
  }, []);

  const renderLoading = () => (
    <Box
      className="loading-container"
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box className="loading-spinner">
        <ClimbingBoxLoader size={30} color="#eb1777" />
      </Box>
    </Box>
  );

  const renderContent = () => {
    if (loading) {
      return renderLoading();
    } else {
      return (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="forgot-password" element={<ForgotPassword/>}/>
          <Route exact path="/signup" element={<Signup />} />
          <Route
            exact
            path="/profile"
            element={<Profile userId={user?.uid} />}
          />
          <Route exact path="/topic" element={<Topic />} />
          <Route exact path="/report-problem" element={<ReportProblem user={user}/>} />
        </Routes>
      );
    }
  };

  return (
    <Router>
      {renderContent()}
      <NavigationBar isLoggedIn={isLoggedIn} />
      <ToastContainer />
    </Router>
  );
}

export default App;
