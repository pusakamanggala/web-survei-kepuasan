import React from "react";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();
  const { role } = useParams();

  let pageTitle;
  switch (location.pathname) {
    case "/beranda":
      pageTitle = "Beranda";
      break;
    case `/pengguna/${role}`:
      pageTitle = `${role}`;
      break;
    default:
      pageTitle = "Halaman Tidak Ditemukan";
  }

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Show toggle button on mobile */}
      <button
        className="lg:hidden bg-primary-color p-2 rounded-full fixed bottom-4 right-4 z-10 shadow-md shadow-secondary-color"
        onClick={handleToggleSidebar}
      >
        {showSidebar ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#ffffff"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#ffffff"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>
      {/* Render sidebar conditionally */}
      <div
        className={`${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 transform lg:relative lg:translate-x-0 transition duration-200 ease-in-out bg-primary-color z-50`}
      >
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 w-full">
        <header className="bg-secondary-color py-4">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
            <h1 className="text-white text-xl font-bold capitalize">
              {pageTitle}
            </h1>
            <div className="flex justify-center items-center">
              <h1 className="text-white text-lg font-semibold">John Doe</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#ffffff"
                className="w-6 h-6 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
