import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Profile from "./components/Profile/Profile"; // Modified import
import Topic from "./components/Topic/Topic";
import ReportProblem from "./components/ReportProblem/ReportProblem";
import { auth } from "./firebase";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Button,
} from "@mui/material";

function ProtectedRoute({ element, path }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
    });

    // Clean up the subscription
    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <Box
        className='loading-container'
        display='flex'
        justifyContent='center'
        alignItems='center'
        height='100vh'
      >
        <Box className='loading-spinner'>
          <ClimbingBoxLoader size={30} color='#eb1777' />
        </Box>
      </Box>
    );
  }

  if (!isLoggedIn && !showLoginDialog) {
    return (
      <>
        <div
          style={{
            backdropFilter: "blur(10px)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {element}
        </div>
        <Dialog open={!isLoggedIn} onClose={() => setShowLoginDialog(false)}>
          <DialogContent>
            <div>You need to log in to access this page.</div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => navigate("/")} color='primary'>
              Close
            </Button>
            <Button
              onClick={() => {
                setShowLoginDialog(false);
                navigate("/login");
              }}
              color='primary'
              autoFocus
            >
              Log In
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }

  return element;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    // Clean up the subscription
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/forgot-password' element={<ForgotPassword />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route
          exact
          path='/profile'
          element={<Profile userId={auth.currentUser?.uid} />}
        />
        <Route path='/topic' element={<ProtectedRoute element={<Topic />} />} />
        <Route
          path='/report-problem'
          element={
            <ProtectedRoute
              element={<ReportProblem user={auth.currentUser} />}
            />
          }
        />
      </Routes>
      <NavigationBar isLoggedIn={isLoggedIn} />
      <ToastContainer />
    </Router>
  );
}

export default App;
