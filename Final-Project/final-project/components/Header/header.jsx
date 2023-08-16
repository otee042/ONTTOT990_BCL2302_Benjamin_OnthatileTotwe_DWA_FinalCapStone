// Import necessary modules and components
import React, { useState } from 'react';
import "../Header/header.css"; // Import the CSS file for styling
import { SlButton, SlInput } from '@shoelace-style/shoelace/dist/react'; // Import Shoelace UI components
import ShowList from "../Main/Shows"; // Import the ShowList component

// Header component definition
const Header = (
  {
    handleGenreChange,
    selectedGenre,
  }
) => {
  // Mapping of genre IDs to their corresponding names
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

  // State to track whether the button is clicked or not
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  // Function to handle button click
  const handleClick = () => {
    setIsButtonClicked(true);
  };

  // JSX representing the Header component
  return (
    <header className="header">
      <div className="logo">
        <h2 className='name'>Podcast Retro</h2>
      </div>
      
      {/* Navigation bar */}
      <nav className="navbar">
        <ul className="navList">
          {/* Buttons for navigation */}
          <SlButton variant="primary">Home</SlButton>
          <SlButton variant="primary">About</SlButton>
          <SlButton variant="primary" onClick={handleClick}>All Shows</SlButton>
        </ul>
      </nav>
      
      {/* Dropdown to select genre */}
      <select id="genre" value={selectedGenre} onChange={handleGenreChange}>
        <option value="">Select a Genre</option>
        {/* Loop through genreMapping to create genre options */}
        {Object.keys(genreMapping).map((genreId) => (
          <option key={genreId} value={genreId}>
            {genreMapping[genreId]}
          </option>
        ))}
      </select>

      {/* Conditionally render the ShowList component if the button is clicked */}
      {isButtonClicked && <ShowList />}
    </header>
  );
};

// Export the Header component as the default export
export default Header;
