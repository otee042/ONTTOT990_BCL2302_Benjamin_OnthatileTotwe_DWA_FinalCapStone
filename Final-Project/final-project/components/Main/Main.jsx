import React, { useEffect, useState } from "react";
import "../Main/Main.css";
import { SlButton } from '@shoelace-style/shoelace/dist/react';

const Podcast = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [sortingOrder, setSortingOrder] = useState("A-Z"); // State variable for sorting order

  useEffect(() => {
    // Fetch data from the API after signing in
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => setPodcasts(data));
  }, []);

  const handleSortingClick = () => {
    // Toggle the sorting order when the button is clicked
    setSortingOrder(sortingOrder === "A-Z" ? "Z-A" : "A-Z");
  };

  // Function to sort the podcasts based on the sorting order
  const sortPodcasts = () => {
    const sortedPodcasts = [...podcasts].sort((a, b) => {
      if (sortingOrder === "A-Z") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });
    return sortedPodcasts;
  };

  return (
    <div className="Middle-con">
      <SlButton variant="primary" onClick={handleSortingClick} className="sortingButton">
        {sortingOrder === "A-Z" ? "A-Z" : "Z-A"}
      </SlButton>
      <div className="podcast-list">
        {sortPodcasts().map((podcast) => (
          <div key={podcast.id} className="podcast-card">
            {podcast.image && <img src={podcast.image} alt={podcast.title} />}
            <h2>{podcast.title}</h2>
            <h3>{podcast.genres}</h3>
            <h3>Seasons:{podcast.seasons}</h3>
            {/* <p>{podcast.description}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Podcast;

