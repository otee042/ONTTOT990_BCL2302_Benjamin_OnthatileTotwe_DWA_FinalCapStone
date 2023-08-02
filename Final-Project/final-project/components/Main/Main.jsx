import React, { useEffect, useState } from "react";
import "../Main/Main.css";

const Podcast = () => {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    // Fetch data from the API after signing in 
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => setPodcasts(data));
  }, []);

  return (
    <div className="Middle-con">
          <div className="podcast-list">
            {podcasts.map((podcast) => (
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
