import React, { useState } from 'react';
import "../Header/header.css"; // Import the CSS file
import { SlButton, SlInput } from '@shoelace-style/shoelace/dist/react';



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

        <SlButton variant="primary">Home</SlButton>
        <SlButton variant="primary">About</SlButton>

        
          {/* Add more navigation items as needed */}
        </ul>
      </nav>
      {/* Button to toggle sorting order */}
      <div className='searchButton'>
          <SlInput  type='text'  placeholder='Search Podcast' width='30px'/>
          <SlButton variant="primary">Search</SlButton>
      </div>
    </header>
  );
};

export default Header;
