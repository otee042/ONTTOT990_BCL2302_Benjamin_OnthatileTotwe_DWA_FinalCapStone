import React, { useEffect, useState } from "react";
import PodcastApp from "../components/Main/Main";
import '@shoelace-style/shoelace/dist/themes/light.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';
import supabase from "./config/supabaseClient";
setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.6.0/cdn/');
import Signin from "../components/Form/Signin";
import Header from "../components/Header/header";
import { SlButton } from '@shoelace-style/shoelace/dist/react';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  

  const handleLogin = () => {

    setIsLoggedIn(true)
    console.log('In')

  }

  const handleLogOut = () => {

    try{

      supabase.auth.signOut()
      setIsLoggedIn(false)
      console.log('off')
    }catch(error){

      console.error('Error logging out: ', error.messsage)
    }
  }

  useEffect(()=>{

    if(isLoggedIn){
      setIsLoggedIn(true)
    }else{
      setIsLoggedIn(false)
    }
  }, [isLoggedIn])

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
        <Header />
        <PodcastApp />
        <SlButton variant="primary" onClick={handleLogOut}>Logout</SlButton>
        </>
      ) : (
        <Signin onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
