import React from "react";
import "./About.css";
import { Typography } from "@mui/material";

const About = () => {
  return (
    <>
      <div className='about'>
        <Typography
          variant='h2'
          className='about-title'
          align='center'
          sx={{ mb: "2rem" }}
        >
          About us
        </Typography>
        <Typography
          variant='h6'
          className='about-intro'
          align='center'
          sx={{ mb: "2rem" }}
        >
          Algo-Maze helps you build your confidence in solving any coding
          related question and helps you prepare for your placements
          <span role='img' aria-label='student'>
            👨🏻‍🎓.
          </span>
        </Typography>
        <Typography
          variant='h6'
          align='center'
          className='about-subintro'
          sx={{ mb: "4rem" }}
        >
          <a href='/'>Algo-Maze</a> <br />
          is your personal web-based progress tracker
          <span role='img' aria-label='join-hands'>
            📖.
          </span>
        </Typography>
        <Typography variant='h4' align='center'>
          Project by{" "}
          <a
            href='https://www.linkedin.com/in/piyush016/'
            target='_blank'
            rel='noopener noreferrer'
          >
            Piyush
          </a>{" "}
          <span role='img' aria-label='code-men'>
            👨🏻‍💻.
          </span>
        </Typography>
        <Typography variant='h5' align='center' className='text-center my-5'>
          For the{" "}
          <span role='img' aria-label='orange-heart'>
            🧡
          </span>{" "}
          to code{" "}
          <span role='img' aria-label='victory'>
            ✌🏻.
          </span>{" "}
        </Typography>
      </div>
    </>
  );
};

export default About;
