import React, { useEffect, useState } from "react";
import "../Main/Main.css";
import { SlDetails } from "@shoelace-style/shoelace/dist/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../Main/Carousel.css";

// Define an array of genres
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

// Define the Podcast component
const Podcast = ({ selectedGenre }) => {
  // State variables for managing podcast data and loading states
  const [podcasts, setPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state for initial data fetch
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedPodcasts, setSortedPodcasts] = useState([]);
  const [isSorting, setIsSorting] = useState(false); // Loading state for sorting

  // Fetch podcast data from an API when the component mounts
  useEffect(() => {
    setIsLoading(true);
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => {
        setPodcasts(data);
        setIsLoading(false);
      });
  }, []);

  // Effect to sort and filter podcasts based on user selections
  useEffect(() => {
    setIsSorting(true);
    const sorted = [...podcasts];
    sorted.sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (sortOrder === "asc") {
        return titleA.localeCompare(titleB);
      } else {
        return titleB.localeCompare(titleA);
      }
    });

    const filteredPodcasts = selectedGenre
      ? podcasts.filter((podcast) =>
          podcast.genres.includes(parseInt(selectedGenre))
        )
      : podcasts;

    setSortedPodcasts(sorted);
    setIsSorting(false);
  }, [podcasts, sortOrder, selectedGenre]);

  // Function to retrieve genre names based on genre IDs
  const getGenres = (genreIds) => {
    if (!Array.isArray(genreIds)) {
      genreIds = [genreIds];
    }
    return genreIds.map((id) => genres[id - 1]).join(",");
  };

  // Filter podcasts based on search query and sorted order
  const filteredPodcasts = sortedPodcasts.filter((podcast) =>
    podcast.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // JSX markup for the component's UI
  return (
    <div className="Middle-con">
      <div className="carousel-container">
        <h2>You May be Interested In...</h2>
        <Carousel showArrows={false} infiniteLoop={true} autoPlay={true}>
          {/* Display carousel slides for recommended podcasts */}
          {podcasts.map((podcast) => (
            <div className="carousel-slide" key={podcast.id}>
              <img
                src={podcast.image}
                alt={`Podcast - ${podcast.title}`}
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Search input */}
      <input
        className="search-input"
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* Sort buttons */}
      <button
        className={`sort-button ${sortOrder === "asc" ? "active" : ""}`}
        onClick={() => setSortOrder("asc")}
        disabled={isLoading || isSorting}
      >
        Sort A-Z
      </button>
      <button
        className={`sort-button ${sortOrder === "desc" ? "active" : ""}`}
        onClick={() => setSortOrder("desc")}
        disabled={isLoading || isSorting}
      >
        Sort Z-A
      </button>

      {/* Display list of podcasts */}
      <div className="podcast-list">
        {isLoading ? (
          <p className="loading-message">Loading podcasts...</p>
        ) : (
          filteredPodcasts.map((podcast) => (
            <div key={podcast.id} className="podcast-card">
              {/* Display podcast information */}
              {podcast.image && (
                <img src={podcast.image} alt={podcast.title} />
              )}
              <h2>{podcast.title}</h2>
              <h4> {getGenres(podcast.genres)} </h4>
              <h6>Seasons: {podcast.seasons}</h6>
              <p>
                Last Updated:{" "}
                {new Date(podcast.updated).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              {/* Display podcast description */}
              <SlDetails summary="Show Description">
                {podcast.description}
              </SlDetails>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Podcast;
