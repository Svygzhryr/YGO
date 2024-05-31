import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App.tsx';
import './index.scss';
import { BrowserRouter } from 'react-router-dom';
import { setupStore } from './redux/store.ts';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={setupStore}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
