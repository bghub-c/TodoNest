import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import configStore from './Global_state-redux/ConfigStore'; // Ensure correct path and filename
import App from './App'; // Your main application component
import './index.css';
(async () => {
  const store = await configStore(); // Create the Redux store
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
})();