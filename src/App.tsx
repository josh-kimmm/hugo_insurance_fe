import React from 'react';
import { Provider } from 'react-redux';
import store from './state/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Application from "./components/Application";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import './App.css';

const Router = createBrowserRouter([{
  path: "/*",
  element: <Application />,
}]);

function App() {
  return (
    <div className="App">
        <Provider store={store}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider router={Router}/>
          </LocalizationProvider>
        </Provider>
    </div>
  );
}

export default App;
