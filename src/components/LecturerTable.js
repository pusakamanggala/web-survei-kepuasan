import React from "react";
import useFetchLecturers from "../hooks/useFetchLecturers";
import useFetchUserById from "../hooks/useFetchUserById";
import useFetchUserByName from "../hooks/useFetchUserByName";
import { useParams } from "react-router-dom";

const LecturerTable = ({ keyword }) => {
  // get role from url
  const { role } = useParams();

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
      limit: 10, // Set the number of items per page
      page: 1, // Set the initial page number
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
    <table className="w-full border-2 ">
      <thead>
        <tr>
          <th
            scope="col"
            className="text-sm font-medium bg-secondary-color text-white px-6 py-4 text-left"
          >
            NIP
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-white bg-secondary-color px-6 py-4 text-left"
          >
            Nama
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
                <button className="bg-yellow-400 text-white font-medium px-4 py-2 rounded-md shadow-md">
                  Edit
                </button>
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

export default LecturerTable;
