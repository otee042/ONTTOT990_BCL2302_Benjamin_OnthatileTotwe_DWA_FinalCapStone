import React, { useState, useEffect } from 'react';
import '../Main/Main.css';

const Main = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Fetch data from the API
    fetch('https://podcast-api.netlify.app/shows')
      .then((res) => res.json())
      .then((data) => {
        setPodcasts(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('Error fetching data.');
        setLoading(false);
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="podcast-container">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <div className="podcast-list">
          {podcasts.map((podcast) => (
            <div key={podcast.id} className="podcast-card">
              {podcast.image && <img src={podcast.image} alt={podcast.title} />}
              <h2>{podcast.title}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Main;
