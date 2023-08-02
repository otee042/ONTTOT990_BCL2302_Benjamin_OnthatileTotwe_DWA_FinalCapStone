import React, { useState } from "react";
import SigninForm from "../components/Form/SignInForm";
import PodcastApp from "../components/Main/Main";
import '@shoelace-style/shoelace/dist/themes/light.css';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path';
setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.6.0/cdn/');



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSignIn = (email, password) => {
    // In a real-world scenario, you would perform authentication here.
    // For this example, we'll assume the user is authenticated if the email is "user@example.com" and the password is "password".
    if (email === "user@example.com" && password === "password") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <PodcastApp />
      ) : (
        <SigninForm onSignIn={handleSignIn} />
      )}
    </div>
  );
}

export default App;
