import React, { useState } from 'react';
import '../Form/SignInForm.css';

const SignInForm = ({ onSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    preventDefault();
    // Perform authentication logic here (not included in this example)
    // For simplicity, we'll assume the user is authenticated successfully
    onSignIn();
  };

  return (
    <form className="signin-form" onSubmit={handleSignIn}>
      <h2>Sign In</h2>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={() => setUsername(target.value)}
          placeholder="Enter your username"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={() => setPassword(target.value)}
          placeholder="Enter your password"
        />
      </div>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignInForm;
