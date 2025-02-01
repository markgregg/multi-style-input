import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { MultiStyledInputApp } from './components/MultiStyledInputApp/MultiStyledInputApp';
import './index.less';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<MultiStyledInputApp />} />
        <Route path="/smartViews" element={<MultiStyledInputApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
