import React, { useState } from "react";
import useFetchLecturers from "../hooks/useFetchLecturers";
import useFetchUserById from "../hooks/useFetchUserById";
import useFetchUserByName from "../hooks/useFetchUserByName";
import { useParams } from "react-router-dom";
import EditUser from "./EditUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faAngleLeft,
  faAnglesRight,
  faAnglesLeft,
  faArrowDownShortWide,
  faArrowDownWideShort,
} from "@fortawesome/free-solid-svg-icons";

const LecturerTable = ({ keyword }) => {
  // get role from url
  const { role } = useParams();

  // Set initial state values for sorting
  const [isAsc, setIsAsc] = useState(true);
  const [orderBy, setOrderBy] = useState("nip");

  const [selectedLecturer, setSelectedLecturer] = useState({}); // State to hold lecturer data

  const [showEditModal, setShowEditModal] = useState(false); // State to show/hide edit modal

  const [pageNumber, setPageNumber] = useState(1); // Set initial page number to 1
  const [pageSize, setPageSize] = useState(5); // Set initial page size to 5

  const isMobile = window.innerWidth <= 768; // Check if screen width is less than or equal to 768px

  // Function to determine whether to show sort arrow
  const shouldShowArrow = (param) => {
    return (
      // Check if sorting by specified parameter and if data is an array
      orderBy === param &&
      Array.isArray(lecturerData.data) &&
      // Check if data array length is greater than 1
      lecturerData.data.length !== 1 &&
      keyword === ""
    );
  };

  // Define functions to handle pagination
  const handleNextPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };
  const handlePrevPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  };
  const handleFirstPage = () => {
    setPageNumber(1);
  };
  const handleLastPage = (totalPage) => {
    setPageNumber(totalPage);
  };

  // Define function to handle page size change
  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    setPageSize(newSize);
    setPageNumber(1); // Reset page number to 1 when page size is changed
  };

  // Declare variables for fetching data (will be assigned based on conditions)
  let fetchFunction;
  let fetchArgs;

  if (keyword) {
    // Check if keyword contains only numbers
    if (/^\d+$/.test(keyword)) {
      fetchFunction = useFetchUserById; // Use fetch function to search by NIM
      fetchArgs = { role: role, id: keyword }; // Set the NIM argument
    } else {
      fetchFunction = useFetchUserByName; // Use fetch function to search by name
      fetchArgs = { role: role, keyword: keyword }; // Set the keyword argument
    }
  } else {
    // Use default fetch function and arguments if no keyword is provided
    fetchFunction = useFetchLecturers;
    fetchArgs = {
      sortBy: isAsc ? "asc" : "desc", // Set the sorting order
      orderBy: orderBy, // Set the field to sort by
      limit: pageSize, // Set the number of items per page
      page: pageNumber, // Set the initial page number
    };
  }

  // Execute the fetchFunction and assign the resulting data, loading state, and error state to variables
  const { data: lecturerData, isLoading, isError } = fetchFunction(fetchArgs);

  // Show loading text while data is being fetched
  if (isLoading) return <div className="text-primary-color">Loading...</div>;

  // Show error message if an error occurred while fetching data
  if (isError)
    return (
      <div className="text-primary-color">
        Terjadi kesalahan saat memproses permintaan. Mohon muat ulang website,
        atau tunggu beberapa saat
      </div>
    );

  if (lecturerData.message === "There is no record")
    return (
      <div className="text-primary-color">Belum ada dosen yang terdaftar</div>
    );

  // Show message if no record is found with the given Name or NIP
  if (lecturerData.message === "There is no record with that id")
    return (
      <div className="text-primary-color">
        Dosen dengan NIP <span className="font-bold">{keyword}</span> tidak
        ditemukan
      </div>
    );
  if (lecturerData.message === "There is no record with that query")
    return (
      <div className="text-primary-color">
        Dosen <span className="font-bold">{keyword}</span> tidak ditemukan
      </div>
    );

  return (
    <div className="mb-5 lg:mb-0">
      {/* To show total users when keyword is empty */}
      {keyword === "" ? (
        <div className="flex justify-between text-secondary-color font-medium mx-1">
          <h1>Total Mahasiswa : {lecturerData.totalRecords}</h1>
          <h1>
            Halaman : {pageNumber} / {lecturerData.totalPage}
          </h1>
        </div>
      ) : null}
      {/* Table */}
      <table className="w-full border-2 ">
        <thead>
          <tr>
            <th
              scope="col"
              className="text-sm font-medium bg-secondary-color text-white px-6 py-4 text-left cursor-pointer"
              onClick={() => {
                setIsAsc(!isAsc);
                setOrderBy("nip");
              }}
            >
              NIP
              {shouldShowArrow("nip") && (
                <FontAwesomeIcon
                  icon={isAsc ? faArrowDownShortWide : faArrowDownWideShort}
                  className="ml-2"
                />
              )}
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-white bg-secondary-color px-6 py-4 text-left cursor-pointer"
              onClick={() => {
                setIsAsc(!isAsc);
                setOrderBy("nama");
              }}
            >
              Nama
              {shouldShowArrow("nama") && (
                <FontAwesomeIcon
                  icon={isAsc ? faArrowDownShortWide : faArrowDownWideShort}
                  className="ml-2"
                />
              )}
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-white bg-secondary-color px-6 py-4 text-left"
            >
              Telp
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-white bg-secondary-color px-6 py-4 text-center"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {/* map data */}
          {Array.isArray(lecturerData.data) ? (
            lecturerData.data.map((res, index) => (
              // print data to table
              <tr className="bg-gray-100 border-b" key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {res.nip}
                </td>
                <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap">
                  {res.nama}
                </td>
                <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap">
                  {res.telepon}
                </td>
                {/* Actions Buttons */}
                <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap text-center w-auto">
                  <button
                    title="Edit data dosen"
                    className="mr-2 bg-yellow-400 text-white font-medium px-4 py-2 rounded-md shadow-md"
                    onClick={() => {
                      setSelectedLecturer(res);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>
                  {/* EditUser component */}
                  {showEditModal && (
                    <EditUser
                      setIsShow={setShowEditModal}
                      userData={selectedLecturer}
                      role={role}
                    />
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr className="bg-gray-100 border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {lecturerData.data.nip}
              </td>
              <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap">
                {lecturerData.data.nama}
              </td>
              <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap">
                {lecturerData.data.telepon}
              </td>
              {/* Actions Buttons */}
              <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap text-center w-auto">
                <button
                  className="mr-2 bg-yellow-400 text-white font-medium px-4 py-2 rounded-md shadow-md"
                  onClick={() => {
                    setSelectedLecturer(lecturerData.data);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </button>
                {/* EditUser component */}
                {showEditModal && (
                  <EditUser
                    setIsShow={setShowEditModal}
                    userData={selectedLecturer}
                    role={role}
                  />
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-between items-center pt-6 w-full">
        {/* button to set how much data is displayed  */}
        <div className="flex text-primary-color font-semibold ml-2">
          {lecturerData && lecturerData.totalRecords > 5 ? (
            <>
              <h1>Tampilkan</h1>
              <select
                title="Jumlah Data"
                name="dataLength"
                id="dataLength"
                className="text-secondary-color"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
            </>
          ) : null}
        </div>
        {lecturerData &&
        lecturerData.totalPage &&
        lecturerData.totalPage !== 1 ? (
          <div>
            {pageNumber !== 1 ? (
              <button
                title="Pertama"
                onClick={handleFirstPage}
                disabled={pageNumber === 1}
                className={`font-bold py-2 px-4 rounded mr-2 text-white ${
                  pageNumber === 1
                    ? "bg-red-400 "
                    : "bg-red-600 hover:bg-red-700 "
                } `}
              >
                {isMobile ? <FontAwesomeIcon icon={faAnglesLeft} /> : "First"}
              </button>
            ) : null}

            <button
              title="Sebelumnya"
              onClick={handlePrevPage}
              disabled={pageNumber === 1}
              className={`font-bold py-2 px-4 rounded mr-2 text-white ${
                pageNumber === 1
                  ? "bg-red-400 "
                  : "bg-red-600 hover:bg-red-700 "
              } `}
            >
              {isMobile ? <FontAwesomeIcon icon={faAngleLeft} /> : "Prev"}
            </button>
            <button
              title="Selanjutnya"
              onClick={handleNextPage}
              disabled={pageNumber === lecturerData.totalPage}
              className={`font-bold py-2 px-4 rounded mr-2 text-white ${
                pageNumber === lecturerData.totalPage
                  ? "bg-red-400 "
                  : "bg-red-600 hover:bg-red-700 "
              } `}
            >
              {isMobile ? <FontAwesomeIcon icon={faAngleRight} /> : "Next"}
            </button>
            <button
              title="Terakhir"
              onClick={() => handleLastPage(lecturerData.totalPage)}
              disabled={pageNumber === lecturerData.totalPage}
              className={`font-bold py-2 px-4 rounded mr-2 text-white ${
                pageNumber === lecturerData.totalPage
                  ? "bg-red-400 "
                  : "bg-red-600 hover:bg-red-700 "
              } `}
            >
              {isMobile ? <FontAwesomeIcon icon={faAnglesRight} /> : "Last"}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LecturerTable;
