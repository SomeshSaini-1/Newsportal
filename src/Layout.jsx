import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./component/Nav";
import Footer from "./component/Footer";
import { Rightbar } from "./component/Rightbar";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      <Nav />

      <div className="flex-1 w-full">
        <div className="max-w-[160rem] mx-auto flex">
          {/* Main content area */}
          <main className="flex-1 min-w-0">
            <Outlet />
          </main>

          {/* Trending Now sidebar – visible on lg+ screens, sticky */}
          <aside className="sticky top-6 w-[340px] xl:w-[380px]  px-4 py-6">
          
              <Rightbar />
               
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Layout;
