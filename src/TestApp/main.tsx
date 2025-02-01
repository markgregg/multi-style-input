import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { MultiStyleInputApp } from './components/MultiStyledInputApp';
import './index.less';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<MultiStyleInputApp />} />
        <Route path="/smartViews" element={<MultiStyleInputApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
