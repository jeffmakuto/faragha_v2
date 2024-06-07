import React, { Suspense, lazy, Component, ErrorInfo, ReactNode } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import api from './utils/api';
import './assets/styles/App.css';
import Footer from './components/Footer';

// Lazy load the components for user and admin interfaces
const UserHome = lazy(() => import('./pages/UserHome'));

// Fallback UI to display in case of an error
const ErrorFallback: React.FC = () => (
  <div className="container mt-5">
    <div className="alert alert-danger" role="alert">
      <h2 className="alert-heading">Something went wrong!</h2>
      <p>Please refresh the page or try again later.</p>
    </div>
  </div>
);

// Error boundary class to catch JavaScript errors in child components
class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error) {
    // Update state to trigger fallback UI on the next render
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error and additional information to the console
    console.error('Error caught by error boundary:', error, errorInfo);

    // Log error to server using existing api
    api.post('/api/error-log', {
      error: error.toString(),
      componentStack: errorInfo.componentStack,
      // Add more context here if needed
    }).catch(err => {
      console.error('Failed to log error to server:', err);
    });
  }

  render() {
    // If an error occurred, render the fallback UI
    return this.state.hasError ? <ErrorFallback /> : this.props.children;
  }
}

// Loading Spinner component
const LoadingSpinner: React.FC = () => (
  <div className="spinner-border" role="status">
    <span className="sr-only">Loading...</span>
  </div>
);

// Main application component
const App: React.FC = () => (
  <Router>
    <div className="App">
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <div className="content">
            <Routes>
              {/* Route for the User interface */}
              <Route path="/user" element={<UserHome />} />
            </Routes>
          </div>
          <Footer /> {/* Include the Footer component */}
        </Suspense>
      </ErrorBoundary>
    </div>
  </Router>
);

export default App;
