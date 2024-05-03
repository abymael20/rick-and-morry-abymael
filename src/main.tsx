import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Episodes from './episodes.tsx'
import Button from './button.tsx'
import './index.css'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path='/' element= {<Button />}/>
      <Route path="/App" element={<App />}/>
      <Route path="/episodes" element={<Episodes />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
