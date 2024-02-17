import React from "react";
import "./TopicCard.css";
import { useNavigate } from "react-router";

const TopicCard = (props) => {
  const navigate = useNavigate();
  const handleShowQuestions = () => {
    navigate(`/topic/${props.topic}`);
  };

  return (
    <div className='testimotionals'>
      <div className='card'>
        <div className='layer'></div>
        <div className='content'>
          <div className='details'>
            <h2>{props.topic}</h2>
          </div>
          <p>{props.text}</p>
          <div className='button-cont'>
            <div className='panel blue'>
              <a href={props.link} target='_blank' rel='noreferrer'>
                <button>Learn More?</button>
              </a>
            </div>
            <div className='panel pink'>
              <button onClick={handleShowQuestions}>Solve Questions?</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicCard;
