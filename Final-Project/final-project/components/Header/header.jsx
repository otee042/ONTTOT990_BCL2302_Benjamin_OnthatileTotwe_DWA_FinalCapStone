import React, { useState } from 'react';
import "../Header/header.css"; // Import the CSS file
import { SlButton } from '@shoelace-style/shoelace/dist/react';


const Header = () => {
  // State variable to keep track of the current sorting order
  const [sortingOrder, setSortingOrder] = useState('A-Z');

  // Function to handle the sorting button click
  const handleSortingClick = () => {
    // Toggle the sorting order based on the current value
    setSortingOrder((prevSortingOrder) => 
      prevSortingOrder === 'A-Z' ? 'Z-A' : 'A-Z'
    );
    // const App = () => (
    //   <>
    //     <SlButton variant="default" outline>
    //       Default
    //     </SlButton>
    //     <SlButton variant="primary" outline>
    //       Primary
    //     </SlButton>
    //     <SlButton variant="success" outline>
    //       Success
    //     </SlButton>
    //     <SlButton variant="neutral" outline>
    //       Neutral
    //     </SlButton>
    //     <SlButton variant="warning" outline>
    //       Warning
    //     </SlButton>

    //   </>
    // );
    
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
          <SlButton variant="warning" outline>
          Warning
        </SlButton>
        <SlButton variant="default">Default</SlButton>
        <SlButton variant="primary">Primary</SlButton>
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
