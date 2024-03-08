import React from 'react';
import ReactDOM from 'react-dom/client';
import { SkeletonTheme } from 'react-loading-skeleton';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';

import './index.css';
import 'react-loading-skeleton/dist/skeleton.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <App />
      </SkeletonTheme>
    </BrowserRouter>
  </React.StrictMode>,
);
