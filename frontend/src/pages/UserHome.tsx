import React, { useEffect, FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';

import { fetchAboutData } from '../actions/aboutActions';
import '../assets/styles/Home.css';
import About from '../components/About';
import Login from './Login';
import Signup from './Signup';
import { RootState } from '../reducers/rootReducer';

const mapStateToProps = (state: RootState) => ({
  data: state.about.data,
  loading: state.about.loading,
  error: state.about.error,
});

const mapDispatchToProps = {
  fetchAboutData,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
type HomeProps = PropsFromRedux;

const Home: FC<HomeProps> = ({ fetchAboutData, loading, error }) => {
  useEffect(() => {
    fetchAboutData();
  }, [fetchAboutData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="home-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">Faragha</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item"><Link className="nav-link" to="/user">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/signup">Signup</Link></li>
            </ul>
          </div>
        </div>
      </nav>

      <section id="home" className="jumbotron text-center">
        <h1 className="display-4">Welcome to Faragha</h1>
        <p className="lead">Your go-to place for data protection and privacy tools</p>
      </section>

      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default connector(Home);
