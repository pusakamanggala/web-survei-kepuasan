import React from "react";
import { useState } from "react";
import StudentTable from "../components/StudentTable";
import LecturerTable from "../components/LecturerTable";
import AlumniTable from "../components/AlumniTable";

const UserAccount = () => {
  //dummy data
  const dataDosen = [
    {
      nip: "123456789",
      nama: "John Doe",
      password: "123456",
    },
    {
      nip: "987654321",
      nama: "Jane Doe",
      password: "qwerty",
    },
    {
      nip: "456123789",
      nama: "Alice Smith",
      password: "password",
    },
    {
      nip: "789456123",
      nama: "Bob Johnson",
      password: "secret",
    },
    {
      nip: "321654987",
      nama: "Charlie Brown",
      password: "letmein",
    },
  ];

  const dataMahasiswa = [
    {
      id: 1,
      NIM: "001",
      nama: "John Doe",
      password: "password123",
      angkatan: 2018,
      semester: 1,
    },
    {
      id: 2,
      NIM: "002",
      nama: "Jane Smith",
      password: "pass1234",
      angkatan: 2019,
      semester: 2,
    },
    {
      id: 3,
      NIM: "003",
      nama: "Bob Johnson",
      password: "hello123",
      angkatan: 2016,
      semester: 1,
    },
    {
      id: 4,
      NIM: "004",
      nama: "Alice Lee",
      password: "world123",
      angkatan: 2023,
      semester: 2,
    },
    {
      id: 5,
      NIM: "005",
      nama: "Evelyn Davis",
      password: "qwerty123",
      angkatan: 2020,
      semester: 2,
    },
  ];

  const dataAlumni = [
    {
      nim: "123456",
      nama: "John Doe",
      angkatan: 2020,
      password: "password1",
    },
    {
      nim: "234567",
      nama: "Jane Smith",
      angkatan: 2021,
      password: "password2",
    },
    {
      nim: "345678",
      nama: "Bob Johnson",
      angkatan: 2019,
      password: "password3",
    },
    {
      nim: "456789",
      nama: "Sara Lee",
      angkatan: 2018,
      password: "password4",
    },
    {
      nim: "567890",
      nama: "Alex Wong",
      angkatan: 2017,
      password: "password5",
    },
  ];

  const [data, setData] = useState(dataMahasiswa);
  const [userType, setUserType] = useState("mahasiswa");
  const handleChangeData = (event) => {
    const selectedUserType = event.target.value;
    setUserType(selectedUserType);
    switch (selectedUserType) {
      case "mahasiswa":
        setData(dataMahasiswa);
        break;
      case "dosen":
        setData(dataDosen);
        break;
      case "alumni":
        setData(dataAlumni);
        break;
      default:
        setData([]);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="w-full h-12 flex justify-end mb-2">
          {/* Search bar */}
          <div className="flex">
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
              <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                id="search"
                placeholder="Cari Nama Pengguna"
              />
            </div>
            {/* end of Search bar */}
            {/* select dropdown */}
            <select
              className="flex h-12 md:w-56 mx-2 items-center rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2 border-primary-color px-4 shadow-sm"
              onChange={handleChangeData}
              value={userType}
            >
              <option value="mahasiswa">Mahasiswa</option>
              <option value="dosen">Dosen</option>
              <option value="alumni">Alumni</option>
            </select>
            {/* end of select dropdown */}
            {/* add button */}
            <button className="flex justify-evenly ml-2 h-12 px-4 items-center  rounded-lg focus-within:shadow-lg overflow-hidden bg-primary-color shadow-sm shadow-secondary-color ">
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

              <h1 className="text-white hidden sm:block">Tambah Pengguna</h1>
            </button>
            {/* end of add button */}
          </div>
        </div>
        <div className="sm:mx-0.5 lg:mx-0.5 p-3 bg-white rounded-md shadow-md">
          <div className="py-2 flex flex-col min-w-full">
            <div className="overflow-auto flex-grow">
              {/* Table */}
              {userType === "mahasiswa" ? (
                <StudentTable data={data} />
              ) : userType === "dosen" ? (
                <LecturerTable data={data} />
              ) : userType === "alumni" ? (
                <AlumniTable data={data} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAccount;
