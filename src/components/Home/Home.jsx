import React from "react";
import Typewriter from "typewriter-effect";
import background from "../../assets/lim.jpg";

import "./Home.css";

const Home = () => {
  return (
    <div className="Home">
      <img className="background-img" alt="background" src={background} />

      <h1 className="heading">30 DAYS DSA CHEATSHEET</h1>

      <h2 className="subheading">
        <Typewriter
          options={{
            strings: [
              "Array",
              "Linked List",
              "Matrix",
              "String",
              "Searching",
              "Sorting",
              "Trees",
              "BST",
              "Greedy Algorithm",
              "Stacks",
              "Queues",
              "Heaps",
              "Graphs",
              "DP",
            ],
            delay: 50,
            deleteSpeed: 75,
            autoStart: true,
            loop: true,
            pauseFor: 500,
          }}
        />
      </h2>
    </div>
  );
};

export default Home;
