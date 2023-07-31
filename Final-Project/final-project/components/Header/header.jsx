import React, { useState } from 'react';
import "../Header/header.css"; // Import the CSS file

const Header = () => {
  // State variable to keep track of the current sorting order
  const [sortingOrder, setSortingOrder] = useState('A-Z');

  // Function to handle the sorting button click
  const handleSortingClick = () => {
    // Toggle the sorting order based on the current value
    setSortingOrder((prevSortingOrder) => 
      prevSortingOrder === 'A-Z' ? 'Z-A' : 'A-Z'
    );
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="path_to_your_logo_image.png" alt="Podcast Logo" className="logoImg" />
      </div>
      <nav className="navbar">
        <ul className="navList">
          <li className="navItem">Home</li>
          <li className="navItem">About</li>
          {/* Add more navigation items as needed */}
        </ul>
      </nav>
      {/* Button to toggle sorting order */}
      <button onClick={handleSortingClick} className="sortingButton">
        Sort {sortingOrder === 'A-Z' ? 'A-Z' : 'Z-A'}
      </button>
    </header>
  );
};

export default Header;
