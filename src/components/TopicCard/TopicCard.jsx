import React from "react";
import "./TopicCard.css";

const TopicCard = (props) => {
  const handleShowQuestions = () => {
    props.onSelectTopic(props.topic); // Call the prop function to pass the selected topic
  };

  return (
    <div className="testimotionals">
      <div className="card">
        <div className="layer"></div>
        <div className="content">
          <div className="details">
            <h2>{props.topic}</h2>
          </div>
          <p>{props.text}</p>
          <div className="button-cont">
            <div className="panel blue">
              <a href={props.link} target="_blank" rel="noreferrer">
                <button>Learn More?</button>
              </a>
            </div>
            <div className="panel pink">
              {/* <a href={props.url}> */}
                <button onClick={handleShowQuestions}>Solve Questions?</button>
              {/* </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
