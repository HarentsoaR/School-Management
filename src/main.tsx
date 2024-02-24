import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './mainStyle.css';
import 'bootstrap/dist/css/bootstrap.css';

import moment from 'moment-timezone'; // Ensure you have moment-timezone installed

// Set the default timezone to Moscow
moment.tz.setDefault('Europe/Moscow');

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
