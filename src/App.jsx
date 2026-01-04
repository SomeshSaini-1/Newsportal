import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Pages/Home';
import Details from './Pages/Details';
import Category from './Pages/Category';
import Layout from './Layout';  // Import the new Layout

const router = createBrowserRouter([
  {
    path: "/",  // Root layout route
    element: <Layout />,  // Wraps all children
    children: [
      {
        index: true,  // Renders at "/" (home)
        element: <Home />,
      },
      {
        path: "details",  // Full path: "/details"
        element: <Details />,
      },
      {
        path: "category/:data",  // Full path: "/category/some-data"
        element: <Category />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;  // Just this – no manual <Nav /> or <Footer />
}

export default App;