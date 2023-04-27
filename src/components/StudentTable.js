import React, { useState } from "react";
import useFetchStudents from "../hooks/useFetchStudents";
import useFetchUserById from "../hooks/useFetchUserById";
import useFetchUserByName from "../hooks/useFetchUserByName";
import { useParams } from "react-router-dom";

const StudentTable = ({ keyword, angkatan }) => {
  // Set initial state values for sorting
  const [isAsc, setIsAsc] = useState(true);
  const [orderBy, setOrderBy] = useState("nim");

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
      limit: 10, // Set the number of items per page
      page: 1, // Set the initial page number
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
            className="text-sm font-medium text-white bg-secondary-color px-6 py-4"
          >
            Status
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
              <td
                className={`text-sm font-medium px-6 py-4 whitespace-nowrap text-center ${
                  res.status === "Aktif"
                    ? "text-red-500"
                    : res.status === "Lulus"
                    ? "text-blue-500"
                    : "text-green-500"
                }`}
              >
                {res.status}
              </td>
              {/* Actions Buttons */}
              <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap text-center w-auto">
                <button className="bg-yellow-400 text-white font-medium px-4 py-2 rounded-md shadow-md">
                  Edit
                </button>
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
            <td
              className={`text-sm font-medium px-6 py-4 whitespace-nowrap text-center ${
                studentData.data.status === "Aktif"
                  ? "text-red-500"
                  : studentData.data.status === "Lulus"
                  ? "text-blue-500"
                  : "text-green-500"
              }`}
            >
              {studentData.data.status}
            </td>
            {/* Actions Buttons */}
            <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap text-center w-auto">
              <button className="bg-yellow-400 text-white font-medium px-4 py-2 rounded-md shadow-md">
                Edit
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default StudentTable;
