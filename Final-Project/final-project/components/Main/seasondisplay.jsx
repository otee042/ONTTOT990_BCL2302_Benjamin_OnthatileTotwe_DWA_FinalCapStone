import React from 'react';

const seasondisplay = ({ season }) => {
  return (
    <div className="season-display">
      <h3>Season {season.number}</h3>
      {season.episodes.map((episode) => (
        <div key={episode.id} className="episode-card">
          <h4>{episode.title}</h4>
          <p>{episode.description}</p>
          <audio controls>
            <source src={episode.audio} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ))}
    </div>
  );
};

export default seasondisplay;
