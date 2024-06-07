import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from './utils/store';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './config/reportWebVitals';

// Create a root element to render the React application
const rootElement = document.getElementById('root') as HTMLElement;
const root = (ReactDOM as any).createRoot(rootElement);

// Render the application
root.render(
  <React.StrictMode>
    {/* Wrap the App component with the Provider component to connect the Redux store */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

/*
  Optional: Measure performance of the application
  Pass a function to log results (e.g., reportWebVitals(console.log))
  or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
*/
reportWebVitals();
