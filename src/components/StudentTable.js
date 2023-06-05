import React, { useState } from "react";
import useFetchStudents from "../hooks/useFetchStudents";
import useFetchUserById from "../hooks/useFetchUserById";
import useFetchUserByName from "../hooks/useFetchUserByName";
import { useParams } from "react-router-dom";
import GraduateStudent from "./GraduateStudent";
import EditUser from "./EditUser";

const StudentTable = ({ keyword, angkatan }) => {
  // Set initial state values for sorting
  const [isAsc, setIsAsc] = useState(true);
  const [orderBy, setOrderBy] = useState("nim");

  const [showGraduateModal, setShowGraduateModal] = useState(false); // state to open and close graduate student modal

  const [showEditModal, setShowEditModal] = useState(false); // state to open and close edit student modal

  const [pageNumber, setPageNumber] = useState(1); // Set initial page number to 1
  const [pageSize, setPageSize] = useState(5); // Set initial page size to 5

  const [selectedStudent, setSelectedStudent] = useState(null); // state to store selected student data

  // get role from url
  const { role } = useParams();

  // Function to determine whether to show sort arrow
  const shouldShowArrow = (param) => {
    return (
      // Check if sorting by specified parameter and if data is an array
      orderBy === param &&
      Array.isArray(studentData.data) &&
      // Check if data array length is greater than 1
      studentData.data.length !== 1 &&
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
    fetchFunction = useFetchStudents;
    fetchArgs = {
      sortBy: isAsc ? "asc" : "desc", // Set the sorting order
      orderBy: orderBy, // Set the field to sort by
      limit: pageSize, // Set the number of items per page
      page: pageNumber, // Set the initial page number
      angkatan: angkatan, // Set the angkatan filter
    };
  }

  // Execute the fetchFunction and assign the resulting data, loading state, and error state to variables
  const { data: studentData, isLoading, isError } = fetchFunction(fetchArgs);

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

  // Show message if no record is found with the given Name or NIM

  if (studentData.message === "There is no record with that id")
    return (
      <div className="text-primary-color">
        Mahasiswa dengan NIM <span className="font-bold">{keyword}</span> tidak
        ditemukan
      </div>
    );
  if (studentData.message === "There is no record")
    return (
      <div className="text-primary-color">
        Angkatan <span className="font-bold">{angkatan}</span> tidak ditemukan
      </div>
    );
  if (studentData.message === "There is no record with that query")
    return (
      <div className="text-primary-color">
        Mahasiswa <span className="font-bold">{keyword}</span> tidak ditemukan
      </div>
    );

  return (
    <div>
      {/* To show total users when keyword is empty */}
      {keyword === "" ? (
        <div className="flex justify-between text-secondary-color font-medium mx-1">
          <h1>Total Mahasiswa : {studentData.totalRecords}</h1>
          <h1>
            Halaman : {pageNumber} / {studentData.totalPage}
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
                <svg
                  className="inline-block h-3 w-3 stroke-white text-white ml-2"
                  viewBox="0 0 8 8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="white"
                    d={isAsc ? "M8 6L4 2 0 6" : "M0 2l4 4 4-4"}
                  ></path>
                </svg>
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
                <svg
                  className="inline-block h-3 w-3 stroke-white text-white ml-2"
                  viewBox="0 0 8 8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="white"
                    d={isAsc ? "M8 6L4 2 0 6" : "M0 2l4 4 4-4"}
                  ></path>
                </svg>
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
                <svg
                  className="inline-block h-3 w-3 stroke-white text-white ml-2"
                  viewBox="0 0 8 8"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="white"
                    d={isAsc ? "M8 6L4 2 0 6" : "M0 2l4 4 4-4"}
                  ></path>
                </svg>
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
              className="text-sm font-medium text-white bg-secondary-color px-6 py-4 text-center"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(studentData.data) ? (
            studentData.data.map((res, index) => (
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
                {/* Actions Buttons */}
                <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap text-center w-auto">
                  <button
                    title="Edit data mahasiswa"
                    className="mr-2 bg-yellow-400 text-white font-medium px-4 py-2 rounded-md shadow-md"
                    onClick={() => {
                      setSelectedStudent(res);
                      setShowEditModal(true);
                    }}
                  >
                    Edit
                  </button>
                  {/* EditStudent component */}
                  {showEditModal && (
                    <EditUser
                      setIsShow={setShowEditModal}
                      userData={selectedStudent}
                      role={role}
                    />
                  )}
                  <button
                    title="Luluskan mahasiswa"
                    className="bg-green-500 text-white font-medium px-4 py-2 rounded-md shadow-md"
                    onClick={() => {
                      setSelectedStudent(res);
                      setShowGraduateModal(true);
                    }}
                  >
                    Luluskan
                  </button>
                  {/* GraduateStudent component */}
                  {showGraduateModal && (
                    <GraduateStudent
                      nama={selectedStudent.nama}
                      nim={selectedStudent.nim}
                      angkatan={selectedStudent.angkatan}
                      setIsShow={setShowGraduateModal}
                    />
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr className="bg-gray-100 border-b">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {studentData.data.nim}
              </td>
              <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap">
                {studentData.data.nama}
              </td>
              <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap text-center">
                {studentData.data.angkatan}
              </td>
              <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap">
                {studentData.data.telepon}
              </td>
              {/* Actions Buttons */}
              <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap text-center w-auto">
                <button
                  title="Edit data mahasiswa"
                  className="mr-2 bg-yellow-400 text-white font-medium px-4 py-2 rounded-md shadow-md"
                  onClick={() => {
                    setSelectedStudent(studentData.data);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </button>
                {/* EditStudent component */}
                {showEditModal && (
                  <EditUser
                    setIsShow={setShowEditModal}
                    userData={selectedStudent}
                    role={role}
                  />
                )}
                <button
                  title="Luluskan mahasiswa"
                  className="bg-green-500 text-white font-medium px-4 py-2 rounded-md shadow-md"
                  onClick={() => {
                    setSelectedStudent(studentData.data);
                    setShowGraduateModal(true);
                  }}
                >
                  Luluskan
                </button>
                {/* GraduateStudent component */}
                {showGraduateModal && (
                  <GraduateStudent
                    nama={selectedStudent.nama}
                    nim={selectedStudent.nim}
                    angkatan={selectedStudent.angkatan}
                    setIsShow={setShowGraduateModal}
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
          {studentData && studentData.totalRecords > 5 ? (
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
        {/* pagination buttons */}
        {studentData && studentData.totalPage !== 1 && keyword === "" ? (
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
                First
              </button>
            ) : null}

            <button
              onClick={handlePrevPage}
              disabled={pageNumber === 1}
              className={`font-bold py-2 px-4 rounded mr-2 text-white ${
                pageNumber === 1
                  ? "bg-red-400 "
                  : "bg-red-600 hover:bg-red-700 "
              } `}
            >
              Prev
            </button>
            <button
              title="Selanjutnya"
              onClick={handleNextPage}
              disabled={pageNumber === studentData.totalPage}
              className={`font-bold py-2 px-4 rounded mr-2 text-white ${
                pageNumber === studentData.totalPage
                  ? "bg-red-400 "
                  : "bg-red-600 hover:bg-red-700 "
              } `}
            >
              Next
            </button>
            <button
              onClick={() => handleLastPage(studentData.totalPage)}
              disabled={pageNumber === studentData.totalPage}
              className={`font-bold py-2 px-4 rounded mr-2 text-white ${
                pageNumber === studentData.totalPage
                  ? "bg-red-400 "
                  : "bg-red-600 hover:bg-red-700 "
              } `}
            >
              Last
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default StudentTable;
