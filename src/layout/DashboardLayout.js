import React, { useContext, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import useFetchUserById from "../hooks/useFetchUserById";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";

const DashboardLayout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();
  const { id, role, idSurvey, survey } = useParams(); // get value from url params
  const [autoFetch, setAutoFetch] = useState(false); // state to trigger useFetchUserById

  const { userRole, userId } = useContext(UserContext); // get logged in user role and id from user context

  //get user name using useFetchUserById
  const { data: userData, isSuccess: isUserDataSuccess } = useFetchUserById({
    role: userRole,
    id: userId,
    autoFetch: autoFetch,
  });

  const [pageTitle, setPageTitle] = useState(""); // state for page title

  useEffect(() => {
    if (
      location.pathname ===
      `/survei-kepuasan/riwayat-survei/hasil-survei/${idSurvey}`
    ) {
      setPageTitle("Hasil Survei");
    } else {
      setPageTitle(Helmet.peek().title.split(" | ")[0]);
    }
  }, [location.pathname, idSurvey]);

  // only fetch user data when role is not ADMIN
  useEffect(() => {
    if (userRole) {
      if (userRole !== "ADMIN") {
        setAutoFetch(true);
      }
    }
  }, [userRole, setAutoFetch]);

  // to handle sign out
  const handleSignOut = () => {
    const confirmed = window.confirm("Apakah anda yakin ingin keluar ?"); // Display confirmation dialog

    if (confirmed) {
      document.cookie = `Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${process.env.REACT_APP_COOKIE_DOMAIN}`; // set cookie expiration date to past
      localStorage.removeItem("survey"); // Remove the "survey" key from local storage
      window.location.reload();
    }
  };

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Show toggle button on mobile */}
      <button
        title="Buka Menu"
        type="button"
        className="lg:hidden border-2 border-white bg-primary-color p-2 rounded-full fixed bottom-4 right-4 z-10 shadow-sm shadow-secondary-color"
        onClick={handleToggleSidebar}
      >
        <FontAwesomeIcon
          icon={showSidebar ? faXmark : faBars}
          className="text-white h-6 w-6 flex"
        />
      </button>
      {/* Render sidebar conditionally */}
      <div
        className={`${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 transform lg:relative lg:translate-x-0 transition duration-200 ease-in-out bg-primary-color z-50`}
      >
        <Sidebar />
      </div>
      <div className="flex flex-col flex-1 w-full bg-secondary-color">
        <header className="bg-secondary-color py-4">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 flex justify-between">
            <h1 className="text-white text-xl font-bold capitalize">
              {pageTitle}
            </h1>
            <div className="flex justify-center items-center">
              {/* show user name when fetch is success */}
              {isUserDataSuccess && (
                <h1 className="text-white text-lg font-semibold">
                  {userData.data.nama}
                </h1>
              )}
              {/* name set to ADMIN when user role is ADMIN */}
              {userRole === "ADMIN" && (
                <h1 className="text-white text-lg font-semibold">ADMIN</h1>
              )}
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="w-5 h-5 ml-2 cursor-pointer text-white"
                onClick={handleSignOut}
              />
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-gray-100 lg:rounded-tl-3xl">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
