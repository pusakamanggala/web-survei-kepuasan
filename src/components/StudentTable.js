import React from "react";

const StudentTable = ({ data }) => {
  return (
    <table className="w-full border-2 ">
      <thead>
        <tr>
          <th
            scope="col"
            className="text-sm font-medium bg-secondary-color text-white px-6 py-4 text-left"
          >
            NIM
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
            Password
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-white bg-secondary-color px-6 py-4"
          >
            Angkatan
          </th>
          <th
            scope="col"
            className="text-sm font-medium text-white bg-secondary-color px-6 py-4 "
          >
            Semester
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
        {data.map((res, index) => {
          return (
            // print data to table
            <tr className="bg-gray-100 border-b" key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {res.NIM}
              </td>
              <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap">
                {res.nama}
              </td>
              <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap">
                {res.password}
              </td>
              <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap text-center">
                {res.angkatan}
              </td>
              <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap text-center">
                {res.semester}
              </td>
              {/* Actions Buttons */}
              <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap text-center w-auto">
                <button className="bg-yellow-400 text-white font-medium px-4 py-2 rounded-md mr-2 shadow-md">
                  Edit
                </button>
                <button className="bg-primary-color text-white font-medium px-4 py-2 rounded-md shadow-md">
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default StudentTable;
