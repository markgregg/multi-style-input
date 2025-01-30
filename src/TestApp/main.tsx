import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { SmartInputApp } from './components/SmartInputApp/SmartInputApp';
import './index.less';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<SmartInputApp />} />
        <Route path="/smartViews" element={<SmartInputApp />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
