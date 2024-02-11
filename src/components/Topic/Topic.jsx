import React, { useState } from "react";
import TopicCard from "../TopicCard/TopicCard";
import TableView from "../Table/Table";
import { datatopic } from "./data";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import "./Topic.css";
import { Button } from "@mui/material";

const Topic = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const handleTopicSelection = (topic) => {
    console.log("Selected Topic:", topic);
    setSelectedTopic(topic);
  };

  const handleGoBack = () => {
    setSelectedTopic(null);
  };

  const cards = datatopic.map((item) => {
    return (
      <TopicCard
        className="h-100"
        key={item.id}
        topic={item.dsatopic}
        text={item.text}
        link={item.link}
        url={item.url}
        onSelectTopic={handleTopicSelection}
      />
    );
  });

  return (
    <>
      {selectedTopic ? (
        <>
          <Button variant="outlined" color="secondary"   onClick={handleGoBack} sx={{borderRadius: "10%", margin:"0.5rem 0rem 0rem 0.5rem"}}> <ArrowBackIosIcon/></Button>
          <TableView topic={selectedTopic} />
        </>
      ) : (
        <div className="cards d-flex">
          <section className="mx-3 h-100 row row-cols-1 row-cols-md-2 row-cols-lg-3 mt-3 grids">
            {cards}
          </section>
        </div>
      )}
    </>
  );
};

export default Topic;
