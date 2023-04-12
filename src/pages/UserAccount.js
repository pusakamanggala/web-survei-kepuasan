import React from "react";

const UserAccount = () => {
  // const [usersData, setUsersData] = useState([]);

  //dummy data
  const data = [
    {
      id: 1,
      NIM: "001",
      nama: "John Doe",
      password: "password123",
      kelas: ["CSCI101", "CSCI102", "CSCI201"],
      angkatan: 2018,
      semester: 1,
    },
    {
      id: 2,
      NIM: "002",
      nama: "Jane Smith",
      password: "pass1234",
      kelas: ["MATH201", "MATH202"],
      angkatan: 2019,
      semester: 2,
    },
    {
      id: 3,
      NIM: "003",
      nama: "Bob Johnson",
      password: "hello123",
      kelas: ["PHYS101", "PHYS102", "PHYS201"],
      angkatan: 2016,
      semester: 1,
    },
    {
      id: 4,
      NIM: "004",
      nama: "Alice Lee",
      password: "world123",
      kelas: ["CHEM201", "CHEM202", "CHEM301", "CHEM302"],
      angkatan: 2023,
      semester: 2,
    },
    {
      id: 5,
      NIM: "005",
      nama: "Evelyn Davis",
      password: "qwerty123",
      kelas: ["ARTS101", "ARTS102", "ARTS201"],
      angkatan: 2020,
      semester: 2,
    },
    {
      id: 6,
      NIM: "006",
      nama: "Michael Green",
      password: "letmein123",
      kelas: ["BUS101"],
      angkatan: 2017,
      semester: 1,
    },
    {
      id: 7,
      NIM: "007",
      nama: "Samantha Parker",
      password: "football123",
      kelas: ["ENG101", "ENG102"],
      angkatan: 2022,
      semester: 2,
    },
    {
      id: 8,
      NIM: "008",
      nama: "Richard Kim",
      password: "baseball123",
      kelas: ["MATH101", "MATH102", "MATH201"],
      angkatan: 2016,
      semester: 2,
    },
    {
      id: 9,
      NIM: "009",
      nama: "Grace Chen",
      password: "guitar123",
      kelas: ["MUSC101", "MUSC201"],
      angkatan: 2021,
      semester: 1,
    },
    {
      id: 10,
      NIM: "010",
      nama: "David Wang",
      password: "password123",
      kelas: ["CSCI201", "CSCI202", "CSCI301"],
      angkatan: 2018,
      semester: 2,
    },
  ];

  // //fetch users data from API
  // useEffect(() => {
  //   setUsersData(data);
  // }, []);

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="w-full h-12 flex justify-end mb-2">
          {/* Search bar */}
          <div className="flex">
            <div className=" flex h-12 md:w-72 items-center mx-2 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2 border-primary-color">
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
            <select className="flex h-12 md:w-56 mx-2 items-center rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2 border-primary-color px-4">
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
        <div className="sm:mx-0.5 lg:mx-0.5 p-3 bg-white rounded-md">
          <div className="py-2 flex flex-col min-w-full">
            <div className="overflow-auto flex-grow">
              {/* Table */}
              <table className="w-full relative border-2 z-10 ">
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
                      className="text-sm font-medium text-white bg-secondary-color px-6 py-4 text-left"
                    >
                      Kelas
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
                  </tr>
                </thead>
                <tbody>
                  {/* map data */}
                  {data.map((res, index) => {
                    return (
                      // print data to table
                      <tr className="bg-gray-100 border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {res.NIM}
                        </td>
                        <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap">
                          {res.nama}
                        </td>
                        <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap">
                          {res.password}
                        </td>
                        <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap">
                          {res.kelas.join(", ")}
                        </td>
                        <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap text-center">
                          {res.angkatan}
                        </td>
                        <td className="text-sm text-gray-900 font-base px-6 py-4 whitespace-nowrap text-center">
                          {res.semester}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAccount;
