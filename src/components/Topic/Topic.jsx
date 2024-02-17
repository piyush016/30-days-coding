import React from "react";
import TopicCard from "../TopicCard/TopicCard";
import { datatopic } from "./data";
import "./Topic.css";

const Topic = () => {
  const cards = datatopic.map((item) => {
    return (
      <TopicCard
        className='h-100'
        key={item.id}
        topic={item.dsatopic}
        text={item.text}
        link={item.link}
        url={item.url}
      />
    );
  });

  return (
    <>
      <div className='cards d-flex'>
        <section className='mx-3 h-100 row row-cols-1 row-cols-md-2 row-cols-lg-3 mt-3 grids'>
          {cards}
        </section>
      </div>
    </>
  );
};

export default Topic;
