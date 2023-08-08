import React, { useState } from 'react';
import "../Header/header.css";
import { SlButton, SlInput } from '@shoelace-style/shoelace/dist/react';
import ShowList from "../Main/Shows"; // Import the ShowList component

const Header = (
  {
    handleGenreChange,
    selectedGenre,
  }
) => {
  const genreMapping = {
    1: "Personal Growth",
    2: "True Crime and Investigative Journalism",
    3: "History",
    4: "Comedy",
    5: "Entertainment",
    6: "Business",
    7: "Fiction",
    8: "News",
    9: "Kids and Family",
  };

  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleClick = () => {
    setIsButtonClicked(true);
  };

  return (
    <header className="header">
      <div className="logo">
        <h2 className='name'>Podcast Retro</h2>
      </div>
      
      <nav className="navbar">
        <ul className="navList">
          <SlButton variant="primary">Home</SlButton>
          <SlButton variant="primary">About</SlButton>
          <SlButton variant="primary" onClick={handleClick}>All Shows</SlButton>
        </ul>
      </nav>
      
      <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
        <option value="">Select a Genre</option>
        {Object.keys(genreMapping).map((genreId) => (
          <option key={genreId} value={genreId}>
            {genreMapping[genreId]}
          </option>
        ))}
      </select>

      {/* Conditionally render the ShowList component */}
      {isButtonClicked && <ShowList />}
    </header>
  );
};

export default Header;
