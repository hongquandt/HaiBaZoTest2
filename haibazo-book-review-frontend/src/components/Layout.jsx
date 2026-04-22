import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <div className="bg-white p-6 rounded shadow-sm">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default Layout;
