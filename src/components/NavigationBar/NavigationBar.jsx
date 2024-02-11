import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationBar.css";
import { AiTwotoneHome, AiFillBug } from "react-icons/ai";
import { FaUserAstronaut } from "react-icons/fa";
import { MdTopic } from "react-icons/md";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { GiPlastron } from "react-icons/gi";

const NavigationBar = ({ isLoggedIn }) => {
  const [click, setClick] = React.useState(false);
  const handleClick = () => setClick(!click);

  return (
    <div>
      <div className="nav-container">
        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink
              to="/report-problem"
              className={click ? "nav-items active" : "nav-items"}
              onClick={click ? handleClick : null}
            >
              <AiFillBug />
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/topic"
              className={click ? "nav-items active" : "nav-items"}
              onClick={click ? handleClick : null}
            >
              <MdTopic />
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/"
              className={click ? "nav-items active" : "nav-items"}
              onClick={click ? handleClick : null}
            >
              <AiTwotoneHome />
            </NavLink>
          </li>

          <li className="nav-item">
            {isLoggedIn ? (
              <NavLink
                to="/profile"
                className={click ? "nav-items active" : "nav-items"}
                onClick={click ? handleClick : null}
              >
                <GiPlastron />
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className={click ? "nav-items active" : "nav-items"}
                onClick={click ? handleClick : null}
              >
                <FaUserAstronaut />
              </NavLink>
            )}
          </li>

          <li className="nav-item">
            <NavLink
              to="/about"
              className={click ? "nav-items active" : "nav-items"}
              onClick={click ? handleClick : null}
            >
              <BsFillInfoCircleFill />
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavigationBar;
