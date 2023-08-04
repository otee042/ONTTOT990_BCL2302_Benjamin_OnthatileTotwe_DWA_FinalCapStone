import React, { useRef, useState } from "react";
import Podcast from "../Main/Main";
import Header from "../Header/header";
import "./SigninForm.css";
import supabase from '../../src/config/supabaseClient'

const SigninForm = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [message, setMessage] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [signupMessage, setSignupMessage] = useState("");

  const handleSignIn = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage("Sign-in failed. Please check your credentials.");
      } else {
        setIsSignedIn(true);
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
      setMessage("Sign-in failed. Please try again later.");
    }

    // Clear the form fields after handling the form submission.
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setSignupMessage("Sign-up failed. Please try again with a different email.");
      } else {
        setIsSignUp(false);
        setSignupMessage("Sign-up successful!");
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
      setSignupMessage("Sign-up failed. Please try again later.");
    }

    // Clear the form fields after handling the form submission.
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  if (isSignedIn) {
    // Render the podcast app if the user is signed in
    return (
      <div>
        <Header />
        <Podcast />
      </div>
    );
  }

  return (
    <div className="signin-form-container">
      {isSignUp ? (
        <div>
          <h2>Sign Up</h2>
          <form className="signin-form" onSubmit={handleSignUp}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" ref={emailRef} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" ref={passwordRef} required />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          {signupMessage && <p>{signupMessage}</p>}
          <p>
            Already have an account?{" "}
            <button onClick={() => setIsSignUp(false)}>Sign In</button>
          </p>
        </div>
      ) : (
        <div>
          <h2>Sign In</h2>
          <form className="signin-form" onSubmit={handleSignIn}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" ref={emailRef} required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" ref={passwordRef} required />
            </div>
            <button type="submit">Sign In</button>
          </form>
          {message && <p>{message}</p>}
          <p>
            Don't have an account?{" "}
            <button onClick={() => setIsSignUp(true)}>Sign Up</button>
          </p>
        </div>
      )}
    </div>
  );
};

export default SigninForm;
