import React, { useState, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUsers,
  faChalkboardTeacher,
  faClipboardList,
  faComment,
  faComments,
  faFileCirclePlus,
  faFileCircleCheck,
  faArrowRightFromBracket,
  faUser,
  faFile,
  faClockRotateLeft,
  faAngleRight,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [subMenu, setSubMenu] = useState(false);
  const location = useLocation();

  const { userRole } = useContext(UserContext);

  // to handle sign out
  const handleSignOut = () => {
    const confirmed = window.confirm("Apakah anda yakin ingin keluar ?"); // Display confirmation dialog

    if (confirmed) {
      document.cookie = `Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${process.env.REACT_APP_COOKIE_DOMAIN}`; // set cookie expiration date to past
      localStorage.removeItem("survey"); // Remove the "survey" key from local storage
      window.location.reload();
    }
  };

  return (
    <div className="bg-primary-color w-64 px-2 pt-4 pb-8 text-white h-full">
      <div className="flex justify-center">
        <span className="text-white text-3xl font-semibold py-6">Logo</span>
      </div>
      {/* sidebar menu */}
      <div className="h-full overflow-y-auto pb-12">
        <NavLink
          to="/beranda"
          className={({ isActive }) =>
            isActive ? "active" : "inActive hover:bg-red-500"
          }
        >
          <FontAwesomeIcon icon={faHouse} className="w-5 h-5 mr-4" />
          <h1>Beranda</h1>
        </NavLink>
        {(userRole === "MAHASISWA" ||
          userRole === "ALUMNI" ||
          userRole === "DOSEN") && (
          <NavLink
            to="/profil"
            className={({ isActive }) =>
              isActive ? "active" : "inActive hover:bg-red-500"
            }
          >
            <FontAwesomeIcon icon={faUser} className="w-5 h-5 mr-4" />
            <h1>Profil Saya</h1>
          </NavLink>
        )}
        {userRole === "ADMIN" && (
          <>
            <NavLink
              to="/pengguna/mahasiswa"
              className={({ isActive }) =>
                isActive ||
                location.pathname === "/pengguna/dosen" ||
                location.pathname === "/pengguna/alumni" ||
                location.pathname === "/pengguna/tambah/mahasiswa" ||
                location.pathname === "/pengguna/tambah/alumni" ||
                location.pathname === "/pengguna/tambah/dosen"
                  ? "active"
                  : "inActive hover:bg-red-500"
              }
            >
              <FontAwesomeIcon icon={faUsers} className="w-5 h-5 mr-4" />
              <h1>Pengguna</h1>
            </NavLink>
            <NavLink
              to="/kelas"
              className={({ isActive }) =>
                isActive ? "active" : "inActive hover:bg-red-500"
              }
            >
              <FontAwesomeIcon
                icon={faChalkboardTeacher}
                className="w-5 h-5 mr-4"
              />
              <h1>Daftar Kelas</h1>
            </NavLink>
          </>
        )}
        <button
          title="Survei Kepuasan"
          type="button"
          className="p-5 flex w-full items-center relative hover:bg-red-500"
          onClick={() => setSubMenu(!subMenu)}
        >
          <FontAwesomeIcon icon={faClipboardList} className="w-5 h-5 mr-4" />
          <h1>Survei Kepuasan</h1>
          <FontAwesomeIcon
            icon={subMenu ? faAngleDown : faAngleRight}
            className="w-4 h-4 absolute right-5"
          />
        </button>
        {/* survei sub menu */}

        {/* admin menu */}
        {userRole === "ADMIN" && (
          <div className={`px-3 ${subMenu ? "" : "hidden"}`}>
            <NavLink
              to="/survei-kepuasan/pertanyaan"
              className={({ isActive }) =>
                isActive ? "active" : "inActive hover:bg-red-500"
              }
            >
              <FontAwesomeIcon icon={faComment} className="w-5 h-5 mr-4" />
              <h1>Pertanyaan Survei</h1>
            </NavLink>
            <NavLink
              to="/survei-kepuasan/template-survei"
              className={({ isActive }) =>
                isActive ? "active" : "inActive hover:bg-red-500"
              }
            >
              <FontAwesomeIcon icon={faComments} className="w-5 h-5 mr-4" />
              <h1>Template Survei</h1>
            </NavLink>
            <NavLink
              to="/survei-kepuasan/tambah-survei"
              className={({ isActive }) =>
                isActive ? "active" : "inActive hover:bg-red-500"
              }
            >
              <FontAwesomeIcon
                icon={faFileCirclePlus}
                className="w-5 h-5 mr-4"
              />
              <h1>Tambah Survei</h1>
            </NavLink>
            <NavLink
              to="/survei-kepuasan/laporan-survei"
              className={({ isActive }) =>
                isActive ? "active" : "inActive hover:bg-red-500"
              }
            >
              <FontAwesomeIcon
                icon={faFileCircleCheck}
                className="w-5 h-5 mr-4"
              />
              <h1>Laporan Survei</h1>
            </NavLink>
          </div>
        )}
        {/* student, lecturer, and alumni menu */}
        {(userRole === "MAHASISWA" ||
          userRole === "ALUMNI" ||
          userRole === "DOSEN") && (
          <div className={`px-3 ${subMenu ? "" : "hidden"}`}>
            <NavLink
              to="/survei-kepuasan/survei-saya"
              className={({ isActive }) =>
                isActive ? "active" : "inActive hover:bg-red-500"
              }
            >
              <FontAwesomeIcon icon={faFile} className="w-5 h-5 mr-4" />
              <h1>Survei Saya</h1>
            </NavLink>
            <NavLink
              to="/survei-kepuasan/riwayat-survei"
              className={({ isActive }) =>
                isActive ? "active" : "inActive hover:bg-red-500"
              }
            >
              <FontAwesomeIcon
                icon={faClockRotateLeft}
                className="w-5 h-5 mr-4"
              />
              <h1>Riwayat Survei</h1>
            </NavLink>
          </div>
        )}
        {/*end of survei sub menu */}

        <button
          title="Keluar"
          type="button"
          className="p-5 flex w-full items-center hover:bg-red-500"
          onClick={handleSignOut}
        >
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            className="w-5 h-5 mr-4"
          />
          <h1>Sign Out</h1>
        </button>
      </div>
      {/* sidebar menu */}
    </div>
  );
};

export default Sidebar;
