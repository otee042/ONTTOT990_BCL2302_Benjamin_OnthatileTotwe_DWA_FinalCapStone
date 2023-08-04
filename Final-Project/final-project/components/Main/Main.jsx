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
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filter the podcasts based on the search query
  const filteredPodcasts = podcasts.filter((podcast) =>
    podcast.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="Middle-con">
      <input
        className="search-input"
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="podcast-list">
        {filteredPodcasts.map((podcast) => (
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
