import React, { useEffect } from "react";
import StudentTable from "../components/StudentTable";
import LecturerTable from "../components/LecturerTable";
import AlumniTable from "../components/AlumniTable";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const UserAccount = () => {
  const navigate = useNavigate(); //initializes the navigate function provided by the useNavigate hook from the react-router-dom library
  const { role } = useParams(); //get role parameter from url
  const [keyword, setKeyword] = useState(""); //state to store the keyword of the student to be searched
  const [keywordAngkatan, setKeywordAngkatan] = useState(""); //state to store the keyword of the student to be searched

  const [searchValue, setSearchValue] = useState("");
  const [searchValueAngkatan, setSearchValueAngkatan] = useState("");

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
    setKeyword(searchValue);
    // reset the search value state and keyword state for angkatan search
    setKeywordAngkatan("");
    setSearchValueAngkatan("");
  };
  const handleSubmitAngkatan = (event) => {
    event.preventDefault();
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
      <div className="flex flex-col w-full">
        <div className="w-full h-12 flex justify-end mb-2">
          <div className="flex">
            {/* Search bar */}
            <div className=" flex h-12 md:w-72 items-center mx-2 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2 border-primary-color shadow-sm">
              <div className="grid place-items-center h-full w-12 text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <form onSubmit={handleSubmit} className="w-full">
                <input
                  className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                  type="text"
                  id="search"
                  minLength={3}
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="#ec161e"
                    className="w-5 h-5 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
            {/* end of Search bar */}
            {/* Search bar Angkatan */}
            {role === "mahasiswa" || role === "alumni" ? (
              <div className=" flex h-12 md:w-36 items-center mx-2 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2 border-primary-color shadow-sm">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <form onSubmit={handleSubmitAngkatan} className="w-full">
                  <input
                    className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                    type="number"
                    id="search"
                    min={2000}
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="#ec161e"
                      className="w-5 h-5 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            ) : null}

            {/* end of Search bar Angkatan*/}
            {/* select dropdown */}
            <select
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
              className="flex justify-evenly ml-2 h-12 px-4 items-center  rounded-lg focus-within:shadow-lg overflow-hidden bg-primary-color hover:bg-secondary-color shadow-sm shadow-secondary-color"
              onClick={() => navigate(`/pengguna/tambah/${role}`)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#ffffff"
                className="w-6 h-6 mr-0 sm:mr-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                />
              </svg>
              <h1 className="text-white hidden sm:block capitalize">
                Tambah {role}
              </h1>
            </button>
            {/* end of add button */}
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
