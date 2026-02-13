// import React from 'react';
// import { Outlet } from 'react-router-dom';  // Renders child route content
// import Nav from './component/Nav';
// import Footer from './component/Footer';

// function Layout() {
//   return (
//     <>
//       <Nav />
//       <Outlet />  {/* This is where <Home />, <Category />, etc. will render */}
//       <Footer />
//     </>
//   );
// }

// export default Layout;




import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./component/Nav";
import Footer from "./component/Footer";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      <Nav />

      <main className="flex-1 w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default Layout;

