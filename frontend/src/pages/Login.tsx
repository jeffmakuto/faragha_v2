import React, { useState } from 'react';
import { useDispatch } from 'react-redux'; // Importing useDispatch hook
import { loginRequest } from '../actions/authActions'; // Importing login action creator

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch(); // Initializing useDispatch hook

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Preventing default form submission behavior
    dispatch(loginRequest(identifier, password)); // Dispatching login action with identifier and password
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}> {/* Using onSubmit event to trigger handleLogin */}
        <div className="mb-3">
          <label htmlFor="identifier" className="form-label">Username or Email address</label>
          <input type="text" className="form-control" id="identifier" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
