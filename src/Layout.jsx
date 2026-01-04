import React from 'react';
import { Outlet } from 'react-router-dom';  // Renders child route content
import Nav from './component/Nav';
import Footer from './component/Footer';

function Layout() {
  return (
    <>
      <Nav />
      <Outlet />  {/* This is where <Home />, <Category />, etc. will render */}
      <Footer />
    </>
  );
}

export default Layout;