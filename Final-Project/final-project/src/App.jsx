import React, { useEffect, useState } from "react";
import PodcastApp from "../components/Main/Main"; 
import '@shoelace-style/shoelace/dist/themes/light.css'; 
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path'; 
import supabase from "./config/supabaseClient"; 
setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.6.0/cdn/'); 
import Signin from "../components/Form/Signin"; 
import Header from "../components/Header/header"; 
import { SlButton } from '@shoelace-style/shoelace/dist/react'; 
 

// Defining the main App functional component
function App() {
  // State to manage the selected podcast genre
  const [selectedGenre, setSelectedGenre] = useState('');
  // State to manage the login status
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Handler for changing the selected podcast genre
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  // Handler for handling user login
  const handleLogin = () => {
    setIsLoggedIn(true);
    console.log('Logged In');
  };

  // Handler for handling user logout
  const handleLogOut = () => {
    try {
      supabase.auth.signOut();
      setIsLoggedIn(false);
      console.log('Logged Out');
    } catch (error) {
      console.error('Error logging out: ', error.message);
    }
  };

  // useEffect to update isLoggedIn state when it changes
  useEffect(() => {
    if (isLoggedIn) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoggedIn]);


  return (
    <div className="App">
      {isLoggedIn ? (
        // If logged in, render the main content
        <>
          <Header 
            selectedGenre={selectedGenre}
            handleGenreChange={handleGenreChange}
          />
          <PodcastApp />
          <SlButton variant="primary" onClick={handleLogOut}>Logout</SlButton>
          {/* <ShowList/> */}
        </>
      ) : (
        // If not logged in, render the signin component
        <Signin onLogin={handleLogin} />
      )}
    </div>
  );
}

// Exporting the main App component
export default App;
