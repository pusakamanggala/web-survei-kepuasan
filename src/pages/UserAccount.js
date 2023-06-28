import React, { useEffect } from "react";
import StudentTable from "../components/StudentTable";
import LecturerTable from "../components/LecturerTable";
import AlumniTable from "../components/AlumniTable";
import EksportUsers from "../components/EksportUsers";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faXmark,
  faUserPlus,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";
import useNotification from "../hooks/useNotification";

const UserAccount = () => {
  const navigate = useNavigate(); //initializes the navigate function provided by the useNavigate hook from the react-router-dom library
  const { role } = useParams(); //get role parameter from url
  const [keyword, setKeyword] = useState(""); //state to store the keyword of the student to be searched
  const [keywordAngkatan, setKeywordAngkatan] = useState(""); //state to store the keyword of the student to be searched
  const [showEksportModal, setShowEksportModal] = useState(false); //state to store the visibility of the export modal

  const [searchValue, setSearchValue] = useState("");
  const [searchValueAngkatan, setSearchValueAngkatan] = useState("");

  const notify = useNotification();

  //function to handle change of user type
  const handleChangeData = (event) => {
    const selectedUserType = event.target.value;
    //reset the keyword state
    setKeyword("");
    setKeywordAngkatan("");
    //reset the search value state
    setSearchValue("");
    setSearchValueAngkatan("");

    navigate(`/pengguna/${selectedUserType}`); //navigate to selected user type
  };

  // function to submit the search form
  const handleSubmit = (event) => {
    event.preventDefault();

    if (searchValue.length < 3) {
      notify("Kata kunci pencarian minimal terdiri dari 3 karakter", "warning");
      return;
    }
    setKeyword(searchValue);

    // reset the search value state and keyword state for angkatan search
    setKeywordAngkatan("");
    setSearchValueAngkatan("");
  };
  const handleSubmitAngkatan = (event) => {
    event.preventDefault();
    if (searchValueAngkatan.length < 4) {
      notify(
        "Kata kunci angkatan minimal terdiri dari 4 digit angka",
        "warning"
      );
      return;
    }
    setKeywordAngkatan(searchValueAngkatan);
    // reset the search value state and keyword state for name/nim/nip search
    setKeyword("");
    setSearchValue("");
  };

  //useEffect hook to check if the role parameter is valid, if not redirect to 404 page
  useEffect(() => {
    if (role !== "mahasiswa" && role !== "dosen" && role !== "alumni") {
      navigate("/PageNotFound"); //redirect to 404 page
    }
  }, [role, navigate]); //dependency array to run the effect only when role or navigate changes

  return (
    <>
      <Helmet>
        <title>Akun Pengguna | Web Survei Kepuasan</title>
      </Helmet>
      <div className="flex flex-col w-full">
        <div className="flex justify-end mb-2 ">
          <div className="flex max-w-full">
            {/* Search bar */}
            <div className=" flex h-12 md:w-72 items-center mx-2 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2 border-primary-color shadow-sm">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="w-5 h-5" />
              </div>
              <form onSubmit={handleSubmit} className="w-full">
                <input
                  className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                  type="text"
                  id="search"
                  placeholder={`Cari ${
                    role === "dosen" ? "NIP" : "NIM"
                  } atau Nama`}
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                />
              </form>
              {keyword && (
                <button
                  className="cursor-pointer m-2"
                  title="Hapus pencarian"
                  onClick={() => {
                    setKeyword("");
                    setSearchValue("");
                  }}
                >
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="w-5 h-5 text-primary-color"
                  />
                </button>
              )}
            </div>
            {/* end of Search bar */}
            {/* Search bar Angkatan */}
            {role === "mahasiswa" || role === "alumni" ? (
              <div className=" flex h-12 md:w-36 items-center mx-2 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2 border-primary-color shadow-sm">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="w-5 h-5"
                  />
                </div>
                <form onSubmit={handleSubmitAngkatan} className="w-full">
                  <input
                    className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                    type="number"
                    id="search"
                    placeholder="Angkatan"
                    value={searchValueAngkatan}
                    onChange={(event) =>
                      setSearchValueAngkatan(event.target.value)
                    }
                  />
                </form>
                {keywordAngkatan && (
                  <button
                    className="cursor-pointer m-2"
                    title="Hapus pencarian"
                    onClick={() => {
                      setKeywordAngkatan("");
                      setSearchValueAngkatan("");
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="w-5 h-5 text-primary-color"
                    />
                  </button>
                )}
              </div>
            ) : null}

            {/* end of Search bar Angkatan*/}
            {/* select dropdown */}
            <select
              title="Jenis Pengguna"
              className="flex h-12 md:w-56 mx-2 items-center rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2 border-primary-color px-4 shadow-sm"
              onChange={handleChangeData}
              value={role}
            >
              <option value="mahasiswa">Mahasiswa</option>
              <option value="dosen">Dosen</option>
              <option value="alumni">Alumni</option>
            </select>
            {/* end of select dropdown */}
            {/* add button */}
            <button
              title={`Tambah ${role}`}
              className="flex justify-evenly h-12 px-4 items-center text-white  rounded-lg focus-within:shadow-lg overflow-hidden bg-primary-color hover:bg-secondary-color shadow-sm shadow-secondary-color mx-2"
              onClick={() => navigate(`/pengguna/tambah/${role}`)}
            >
              <FontAwesomeIcon
                icon={faUserPlus}
                className="w-5 h-5 mr-0 sm:mr-3 "
              />
              <h1 className="hidden sm:block capitalize">Tambah {role}</h1>
            </button>
            {/* end of add button */}
            {/* Eksport Button */}
            <button
              title={`Tambah ${role}`}
              className="flex justify-evenly ml-2 h-12 px-4 items-center text-white  rounded-lg focus-within:shadow-lg overflow-hidden bg-primary-color hover:bg-secondary-color shadow-sm shadow-secondary-color"
              onClick={() => setShowEksportModal(true)}
            >
              <FontAwesomeIcon
                icon={faFileDownload}
                className="w-5 h-5 mr-0 sm:mr-3 "
              />
              <h1 className="hidden sm:block capitalize">Ekspor {role}</h1>
            </button>
            {/* End of Export Button */}
            {/* Export Modal */}
            {showEksportModal && (
              <EksportUsers role={role} isShow={setShowEksportModal} />
            )}
          </div>
        </div>
        <div className="sm:mx-0.5 lg:mx-0.5 p-3 bg-white rounded-md shadow-md">
          <div className="py-2 flex flex-col min-w-full">
            <div className="overflow-auto flex-grow">
              {/* Table */}
              {/* conditional user table rendering based on role*/}
              {role === "mahasiswa" ? (
                <StudentTable keyword={keyword} angkatan={keywordAngkatan} />
              ) : role === "dosen" ? (
                <LecturerTable keyword={keyword} />
              ) : role === "alumni" ? (
                <AlumniTable keyword={keyword} angkatan={keywordAngkatan} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAccount;
