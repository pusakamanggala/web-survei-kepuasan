import React, { useState } from "react";
import useFetchAlumni from "../hooks/useFetchAlumni";
import useFetchUserById from "../hooks/useFetchUserById";
import useFetchUserByName from "../hooks/useFetchUserByName";
import { useParams } from "react-router-dom";
import EditUser from "./EditUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownWideShort,
  faArrowDownShortWide,
  faAngleRight,
  faAngleLeft,
  faAnglesRight,
  faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons";

const AlumniTable = ({ keyword, angkatan }) => {
  // Set initial state values for sorting
  const [isAsc, setIsAsc] = useState(true);
  const [orderBy, setOrderBy] = useState("nim");
  const [pageNumber, setPageNumber] = useState(1); // Set initial page number to 1
  const [pageSize, setPageSize] = useState(5); // Set initial page size to 5

  const [showEditModal, setShowEditModal] = useState(false); // State to show/hide edit modal
  const [selectedAlumni, setSelectedAlumni] = useState(null); // State to store selected alumni data

  const isMobile = window.innerWidth <= 768; // Check if screen width is less than or equal to 768px

  // get role from url
  const { role } = useParams();

  // Function to determine whether to show sort arrow
  const shouldShowArrow = (param) => {
    return (
      // Check if sorting by specified parameter and if data is an array
      orderBy === param &&
      Array.isArray(alumniData.data) &&
      // Check if data array length is greater than 1
      alumniData.data.length !== 1 &&
      // Check if keyword is empty
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
    fetchFunction = useFetchAlumni;
    fetchArgs = {
      sortBy: isAsc ? "asc" : "desc", // Set the sorting order
      orderBy: orderBy, // Set the field to sort by
      limit: pageSize, // Set the number of items per page
      page: pageNumber, // Set the initial page number
      angkatan: angkatan, // Set the angkatan
    };
  }

  // Execute the fetchFunction and assign the resulting data, loading state, and error state to variables
  const { data: alumniData, isLoading, isError } = fetchFunction(fetchArgs);

  // Show loading text while data is being fetched
  if (isLoading)
    return (
      <div className="text-primary-color font-semibold">
        Memuat data alumni...
      </div>
    );

  // Show error message if an error occurred while fetching data
  if (isError)
    return (
      <div className="text-primary-color font-semibold">
        Terjadi kesalahan saat memproses permintaan. Mohon muat ulang website,
        atau tunggu beberapa saat
      </div>
    );

  // show message if there is no record in database
  if (alumniData.message === "There is no record" && angkatan === "")
    return (
      <div className="text-primary-color">Belum ada alumni yang terdaftar</div>
    );

  // Show message if no record is found with the given Name or NIM
  if (alumniData.message === "There is no record with that id")
    return (
      <div className="text-primary-color">
        Alumni dengan NIM <span className="font-bold">{keyword}</span> tidak
        ditemukan
      </div>
    );
  if (alumniData.message === "There is no record with that query")
    return (
      <div className="text-primary-color">
        Alumni <span className="font-bold">{keyword}</span> tidak ditemukan
      </div>
    );

  // Show message if no record is found with the given angkatan
  if (alumniData.message === "There is no record" && angkatan !== "")
    return (
      <div className="text-primary-color">
        Angkatan <span className="font-bold">{angkatan}</span> tidak ditemukan
      </div>
    );

  return (
    <div className="mb-5 lg:mb-0">
      {/* To show total users when keyword is empty */}
      {keyword === "" ? (
        <div className="flex justify-between text-secondary-color font-medium mx-1">
          <h1>Total Alumni : {alumniData.totalRecords}</h1>
          <h1>
            Halaman : {pageNumber} / {alumniData.totalPage}
          </h1>
        </div>
      ) : null}
      {/* Table */}
      <table className="w-full border-2 ">
        <thead>
          <tr>
            <th
              scope="col"
              className="text-sm font-medium bg-secondary-color text-white px-6 py-4 text-left cursor-pointer "
              title="Urutkan berdasarkan NIM"
              onClick={() => {
                setIsAsc(!isAsc);
                setOrderBy("nim");
              }}
            >
              NIM
              {shouldShowArrow("nim") && (
                <FontAwesomeIcon
                  icon={isAsc ? faArrowDownShortWide : faArrowDownWideShort}
                  className="ml-2"
                />
              )}
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-white bg-secondary-color px-6 py-4 text-left cursor-pointer"
              title="Urutkan berdasarkan nama"
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
              className="text-sm font-medium text-white bg-secondary-color px-6 py-4 cursor-pointer "
              title="Urutkan berdasarkan angkatan"
              onClick={() => {
                setIsAsc(!isAsc);
                setOrderBy("angkatan");
              }}
            >
              Angkatan
              {shouldShowArrow("angkatan") && (
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
              Telepon
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-white bg-secondary-color px-6 py-4"
            >
              Tahun Lulus
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
          {Array.isArray(alumniData.data) ? (
            alumniData.data.map((res, index) => (
              // print data to table
              <tr className="bg-gray-100 border-b" key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {res.nim}
                </td>
                <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap">
                  {res.nama}
                </td>
                <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap text-center">
                  {res.angkatan}
                </td>
                <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap">
                  {res.telepon}
                </td>
                <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap text-center">
                  {res.tahun_kelulusan}
                </td>
                {/* Actions Buttons */}
                <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap text-center w-auto">
                  <button
                    title="Edit data alumni"
                    className="mr-2 bg-yellow-400 text-white font-medium px-4 py-2 rounded-md shadow-md"
                    onClick={() => {
                      setSelectedAlumni(res);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>
                  {/* EditUser component */}
                  {showEditModal && (
                    <EditUser
                      setIsShow={setShowEditModal}
                      userData={selectedAlumni}
                      role={role}
                    />
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr className="bg-gray-100 border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {alumniData.data.nim}
              </td>
              <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap">
                {alumniData.data.nama}
              </td>
              <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap text-center">
                {alumniData.data.angkatan}
              </td>
              <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap">
                {alumniData.data.telepon}
              </td>
              <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap text-center">
                {alumniData.data.tahun_kelulusan}
              </td>
              {/* Actions Buttons */}
              <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap text-center w-auto">
                <button
                  title="Edit data alumni"
                  className="mr-2 bg-yellow-400 text-white font-medium px-4 py-2 rounded-md shadow-md"
                  onClick={() => {
                    setSelectedAlumni(alumniData.data);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </button>
                {/* EditUser component */}
                {showEditModal && (
                  <EditUser
                    setIsShow={setShowEditModal}
                    userData={selectedAlumni}
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
          {alumniData && alumniData.totalRecords > 5 ? (
            <>
              <h1 className="hidden md:block">Tampilkan</h1>
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
        {/* pagination buttons */}
        {alumniData && alumniData.totalPage !== 1 && keyword === "" ? (
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
              disabled={pageNumber === alumniData.totalPage}
              className={`font-bold py-2 px-4 rounded mr-2 text-white ${
                pageNumber === alumniData.totalPage
                  ? "bg-red-400 "
                  : "bg-red-600 hover:bg-red-700 "
              } `}
            >
              {isMobile ? <FontAwesomeIcon icon={faAngleRight} /> : "Next"}
            </button>
            <button
              title="Terakhir"
              onClick={() => handleLastPage(alumniData.totalPage)}
              disabled={pageNumber === alumniData.totalPage}
              className={`font-bold py-2 px-4 rounded mr-2 text-white ${
                pageNumber === alumniData.totalPage
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

export default AlumniTable;
