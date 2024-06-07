import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Importing useDispatch hook
import { signupRequest } from '../actions/authActions'; // Importing signup action creator

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch(); // Initializing useDispatch hook

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault(); // Preventing default form submission behavior
    dispatch(signupRequest(email, username, password)); // Dispatching signup action with email, username, and password
  };

  return (
    <div className="container">
      <h1>Signup</h1>
      <form onSubmit={handleSignup}> {/* Using onSubmit event to trigger handleSignup */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
