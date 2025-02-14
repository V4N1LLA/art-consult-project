import React from 'react';
import ReactDOM from 'react-dom/client'; // 'react-dom/client'로 변경
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
