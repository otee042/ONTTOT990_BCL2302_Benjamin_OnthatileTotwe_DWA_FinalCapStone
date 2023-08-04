import React, { useEffect, useState } from "react";
import "../Main/Main.css";
import { SlDetails } from '@shoelace-style/shoelace/dist/react';

const genres = [
  "Personal Growth",
  "True Crime and Investigative Journalism",
  "History",
  "Comedy",
  "Entertainment",
  "Business",
  "Fiction",
  "News",
  "Kids and Family",
];

const Podcast = () => {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    // Fetch data from the API after signing in
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => setPodcasts(data));
  }, []);

  const getGenres = (genreIds) => {
    if (!Array.isArray(genreIds)) {
      genreIds = [genreIds];
    }
    return genreIds.map((id) => genres[id - 1]).join(",");
  };

  return (
    <div className="Middle-con">
      <div className="podcast-list">
        {podcasts.map((podcast) => (
          <div key={podcast.id} className="podcast-card">
            {podcast.image && <img src={podcast.image} alt={podcast.title} />}
            <h2>{podcast.title}</h2>
            <h4> {getGenres(podcast.genres)} </h4>
            <h6>Seasons:{podcast.seasons}</h6>
            <SlDetails summary="Show Description">
              {podcast.description}
            </SlDetails>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Podcast;
