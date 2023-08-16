import React, { useEffect, useState, Fragment } from "react";
import "../Main/Main.css";
import { SlDetails } from "@shoelace-style/shoelace/dist/react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../Main/Carousel.css";
import supabase from "../../src/config/supabaseClient";


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

// State variables for managing component behavior
const Podcast = ({ selectedGenre }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [lastUpdatedSortOrder, setLastUpdatedSortOrder] = useState("asc");
  const [sortedPodcasts, setSortedPodcasts] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [view, setView] = useState("showList");
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [favoriteSortOrder, setFavoriteSortOrder] = useState("asc");

  // Base URL for API requests
  const BASE_URL = "https://podcast-api.netlify.app";


  // Function to fetch detailed information about a podcast
  const fetchShowDetails = async (showId) => {
    try {
      const response = await fetch(`${BASE_URL}/id/${showId}`);
      const data = await response.json();
      data.seasons = data.seasons || [];
      return data;
    } catch (error) {
      throw new Error("Error fetching show details:", error);
    }
  };

  // Effect to fetch podcast data when the component mounts
  useEffect(() => {
    setIsLoading(true);
    fetch("https://podcast-api.netlify.app/shows")
      .then((response) => response.json())
      .then((data) => {
        setPodcasts(data);
        setIsLoading(false);
      });
  }, []);

  // Effect to sort and filter podcasts based on various criteria
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
      ? sorted.filter((podcast) =>
          podcast.genres.includes(parseInt(selectedGenre))
        )
      : sorted;

    const searchFilteredPodcasts = filteredPodcasts.filter((podcast) =>
      podcast.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSortedPodcasts(searchFilteredPodcasts);
    setIsSorting(false);
  }, [podcasts, sortOrder, selectedGenre, searchQuery]);

  useEffect(() => {
    setIsSorting(true);
    const sorted = [...podcasts];
    sorted.sort((a, b) => {
      const timeA = new Date(a.updated).getTime();
      const timeB = new Date(b.updated).getTime();
      if (lastUpdatedSortOrder === "asc") {
        return timeA - timeB;
      } else {
        return timeB - timeA;
      }
    });

    const filteredPodcasts = selectedGenre
      ? sorted.filter((podcast) =>
          podcast.genres.includes(parseInt(selectedGenre))
        )
      : sorted;

    setSortedPodcasts(filteredPodcasts);
    setIsSorting(false);
  }, [podcasts, lastUpdatedSortOrder, selectedGenre]);

  // Function to get human-readable genre names
  const getGenres = (genreIds) => {
    if (!Array.isArray(genreIds)) {
      genreIds = [genreIds];
    }
    return genreIds.map((id) => genres[id - 1]).join(",");
  };

  // Function to handle clicks on a podcast show
  const handleShowClick = async (show) => {
    try {
      const showDetails = await fetchShowDetails(show.id);
      setSelectedShow(showDetails);
      setSelectedSeason(null);
      setView("showDetail");
    } catch (error) {
      console.error("Error loading show details:", error);
    }
  };

  // Function to handle click on a season to view episodes
  const handleSeasonClick = (seasonNumber) => {
    setSelectedSeason(seasonNumber);
  };

  // Function to toggle a podcast as favorite
  const toggleFavorite = (podcastId) => {
    if (favorites.includes(podcastId)) {
      setFavorites(favorites.filter((id) => id !== podcastId));
    } else {
      setFavorites([...favorites, podcastId]);
    }
  };

  // Render the component's
  return (
    <div className="Middle-con">
      {view === "showList" ? (
        <>
          <div className="carousel-container">
            <h2>You May be Interested In...</h2>
            <Carousel showArrows={false} infiniteLoop={true} autoPlay={true}>
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

          <input
            className="search-input"
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button
            className={`sort-button ${
              sortOrder === "asc" ? "active" : ""
            }`}
            onClick={() => setSortOrder("asc")}
            disabled={isLoading || isSorting}
          >
            Sort A-Z
          </button>
          <button
            className={`sort-button ${
              sortOrder === "desc" ? "active" : ""
            }`}
            onClick={() => setSortOrder("desc")}
            disabled={isLoading || isSorting}
          >
            Sort Z-A
          </button>
          <button
            className={`sort-button ${
              lastUpdatedSortOrder === "asc" ? "active" : ""
            }`}
            onClick={() => setLastUpdatedSortOrder("asc")}
            disabled={isLoading || isSorting}
          >
            Ascending
          </button>
          <button
            className={`sort-button ${
              lastUpdatedSortOrder === "desc" ? "active" : ""
            }`}
            onClick={() => setLastUpdatedSortOrder("desc")}
            disabled={isLoading || isSorting}
          >
            Descending
          </button>

          <div className="podcast-list">
            {isLoading ? (
              <p className="loading-message">Loading podcasts...</p>
            ) : sortedPodcasts.length === 0 ? (
              <p className="loading-message">No podcasts found.</p>
            ) : (
              sortedPodcasts.map((podcast) => (
                <div key={podcast.id} className="podcast-card">
                  {podcast.image && (
                    <img src={podcast.image} alt={podcast.title} />
                  )}
                  <h2>{podcast.title}</h2>
                  <h4>{getGenres(podcast.genres)}</h4>
                  <h6>Seasons: {podcast.seasons}</h6>
                  <button
                    className="view-seasons-button"
                    onClick={() => handleShowClick(podcast)}
                  >
                    View Seasons
                  </button>
                  <p>
                    Last Updated:{" "}
                    {new Date(podcast.updated).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <div>
                    <button
                      onClick={() => {
                        toggleFavorite(podcast.id)
                        
                        const addFav = async () => {
                          const { data, error } = await supabase
                            .from('favourites')
                            .insert({
                              title: podcast.title,
                              image: podcast.image,
                              description: podcast.description,
                              time: podcast.lastUpdatedSortOrder
                            })
                        }
                        addFav()
                      }}
                      className={
                        favorites.includes(podcast.id)
                          ? "favorite active"
                          : "favorite"
                      }
                    >
                      {favorites.includes(podcast.id)
                        ? "Remove from Favorites"
                        : "Add to Favorites"}
                    </button>
                  </div>
                  <SlDetails summary="Show Description">
                    {podcast.description}
                  </SlDetails>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <div className="show-detail-container">
          <button
            className="back-button"
            onClick={() => setView("showList")}
          >
            Back to Show List
          </button>
          <div>
            <h2>{selectedShow.title}</h2>
            {selectedShow.seasons &&
              selectedShow.seasons.map((season) => (
                <div className="season-container" key={season.number}>
                  <h3>Season {season.number}</h3>
                  <div className="image--">
                    <img
                      className="showImg"
                      src={season.image}
                      alt={`Season ${season.number}`}
                    />
                    <div>{season.episodes.length} Episodes</div>
                    <button
                      className="view-episodes-button"
                      onClick={() => handleSeasonClick(season.number)}
                    >
                      View Episodes
                    </button>
                  </div>
                  {selectedSeason === season.number && (
                    <ul className="episode-list">
                      {season.episodes.map((episode) => (
                        <Fragment key={episode.id}>
                          <h4>{episode.name}</h4>
                          <li>{episode.title}</li>
                          <p>{episode.description}</p>
                          <audio controls>
                            <source src={episode.file} />
                          </audio>
                        </Fragment>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="favorite-podcasts">
        <h2>Your Favorite Podcasts</h2>
        <div className="favorite-sort">
          <label htmlFor="favoriteSortOrder">Sort by: </label>
          <select
            id="favoriteSortOrder"
            value={favoriteSortOrder}
            onChange={(e) => setFavoriteSortOrder(e.target.value)}
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
            <option value="asc-last-updated">Oldest Last Updated</option>
            <option value="desc-last-updated">Newest Last Updated</option>
          </select>
        </div>
        {favorites
          .slice()
          .sort((a, b) => {
            const podcastA = podcasts.find((podcast) => podcast.id === a);
            const podcastB = podcasts.find((podcast) => podcast.id === b);

            if (favoriteSortOrder === "asc") {
              return podcastA.title.localeCompare(podcastB.title);
            } else if (favoriteSortOrder === "desc") {
              return podcastB.title.localeCompare(podcastA.title);
            } else if (favoriteSortOrder === "asc-last-updated") {
              return new Date(podcastA.updated) - new Date(podcastB.updated);
            } else if (favoriteSortOrder === "desc-last-updated") {
              return new Date(podcastB.updated) - new Date(podcastA.updated);
            }
          })
          .map((favoriteId) => {
            const favoritePodcast = podcasts.find(
              (podcast) => podcast.id === favoriteId
            );
            return (
              <div key={favoritePodcast.id} className="favorite-podcast">
                <img
                  src={favoritePodcast.image}
                  alt={favoritePodcast.title}
                />
                <h3>{favoritePodcast.title}</h3>
                <button
                  onClick={() => toggleFavorite(favoritePodcast.id)}
                  className={
                    favorites.includes(favoritePodcast.id)
                      ? "favorite active"
                      : "favorite"
                  }
                >
                  {favorites.includes(favoritePodcast.id)
                    ? "Remove from Favorites"
                    : "Add to Favorites"}
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Podcast;
