import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAddStudent from "../hooks/useAddStudent";
import useAddAlumni from "../hooks/useAddAlumni";
import useAddLecturer from "../hooks/useAddLecturer";
import useImportStudent from "../hooks/useImportStudent";
import useImportLecturer from "../hooks/useImportLecturer";
import useImportAlumni from "../hooks/useImportAlumni";

const AddUser = () => {
  const navigate = useNavigate();
  const { role } = useParams(); // get role from url params

  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [telepon, setTelepon] = useState("");
  const [inputType, setInputType] = useState("manual");
  const [selectedFile, setSelectedFile] = useState(null);
  const [tahunLulus, setTahunLulus] = useState("");
  const [nip, setNip] = useState("");

  // useMutation to add user data manually
  const addStudentMutation = useAddStudent(); // call addStudent mutation
  const addAlumniMutation = useAddAlumni(); // useMutation to add alumni
  const addLecturerMutation = useAddLecturer(); // useMutation to add lecturer

  // useMutation to import user data from excel file
  const importStudentMutation = useImportStudent(); // call importStudent mutation
  const importLecturerMutation = useImportLecturer(); // call importLecturer mutation
  const importAlumniMutation = useImportAlumni(); // call importAlumni mutation

  // To capitalize the first letter of each word in name
  const capitalizeName = (name) => {
    return name
      .toLowerCase()
      .replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
  };

  // handle submit button
  const handleSubmit = (event) => {
    event.preventDefault();

    // To check if all required fields are filled
    if (role === "mahasiswa") {
      if (!nama || !nim || !password || !angkatan) {
        alert("Harap isi semua bidang yang wajib diisi");
        return;
      }
    } else if (role === "alumni") {
      if (!nim || !tahunLulus) {
        alert("Harap isi semua bidang yang wajib diisi");
        return;
      }
    } else if (role === "dosen") {
      if (!nama || !nip || !password) {
        alert("Harap isi semua bidang yang wajib diisi");
        return;
      }
    }

    if (role === "mahasiswa") {
      // Create student data object
      const studentData = { nama, nim, password, angkatan, telepon };

      // Call addStudent mutation to submit the data
      addStudentMutation.mutate(studentData);
    } else if (role === "alumni") {
      // Create alumni data object
      const alumniData = { nim, tahunKelulusan: tahunLulus };

      // Call addAlumni mutation to submit the data
      addAlumniMutation.mutate(alumniData);
    } else if (role === "dosen") {
      // Create dosen data object
      const dosenData = { nama, nip, password, telepon };

      // Call addAlumni mutation to submit the data
      addLecturerMutation.mutate(dosenData);
    }
  };

  // Handle file input change
  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Handle import button
  const handleImport = (event) => {
    event.preventDefault(); // prevent default form submission

    //check user role then call the import mutation
    if (role === "mahasiswa") {
      importStudentMutation.mutate(selectedFile);
    }
    if (role === "dosen") {
      importLecturerMutation.mutate(selectedFile);
    }
    if (role === "alumni") {
      importAlumniMutation.mutate(selectedFile);
    }

    setSelectedFile(null); // Reset the input file
  };

  if (inputType === "bulk") {
    return (
      <div>
        {importStudentMutation.isLoading ||
        importAlumniMutation.isLoading ||
        importLecturerMutation.isLoading ? (
          <div className="font-bold text-xl ml-2 capitalize">
            Menambahkan {role}...
          </div>
        ) : (
          <>
            {importStudentMutation.isError ||
            importAlumniMutation.isError ||
            importLecturerMutation.isError ? (
              <div className="text-secondary-color font-bold text-xl ml-2 capitalize">
                {role} gagal diimpor
              </div>
            ) : null}

            {importStudentMutation.isSuccess ||
            importAlumniMutation.isSuccess ||
            importLecturerMutation.isSuccess ? (
              <div className="text-green-500 font-bold text-xl ml-2 capitalize">
                {role} Berhasil Ditambahkan
              </div>
            ) : null}
            <div className="flex justify-end w-full mb-2">
              <button
                className="flex justify-evenly h-12 px-4 items-center  rounded-lg focus-within:shadow-lg overflow-hidden bg-primary-color hover:bg-secondary-color shadow-sm shadow-secondary-color"
                onClick={() => setInputType("manual")}
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
                <h1 className="text-white hidden sm:block">Add Manual</h1>
              </button>
            </div>
            <div className="w-full">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-medium mb-4 capitalize">
                  Impor {role}
                </h2>
                <form onSubmit={handleImport}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 font-medium mb-2"
                      htmlFor="file-input"
                    >
                      Pilih file excel
                    </label>
                    <input
                      id="file-input"
                      type="file"
                      accept=".xlsx, .xls"
                      onChange={handleFileInputChange}
                      className="appearance-none border border-gray-400 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-gray focus:border-gray-500"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      className="bg-primary-color mr-2 hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={() => navigate(`/pengguna/${role}`)}
                    >
                      Cancel
                    </button>
                    <button
                      disabled={selectedFile === null}
                      type="submit"
                      className={`${
                        selectedFile === null
                          ? "bg-red-400"
                          : "bg-primary-color  hover:bg-secondary-color "
                      }  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"`}
                    >
                      Import
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div>
      {addStudentMutation.isLoading ||
      addAlumniMutation.isLoading ||
      addLecturerMutation.isLoading ? (
        <div className="font-bold text-xl ml-2 capitalize">
          Menambahkan {role}...
        </div>
      ) : (
        <>
          {addStudentMutation.isError ||
          addAlumniMutation.isError ||
          addLecturerMutation.isError ? (
            <div className="text-secondary-color font-bold text-xl ml-2 capitalize">
              {role} gagal di tambahkan
            </div>
          ) : null}

          {addStudentMutation.isSuccess ||
          addAlumniMutation.isSuccess ||
          addLecturerMutation.isSuccess ? (
            <div className="text-green-500 font-bold text-xl ml-2 capitalize">
              {role} Berhasil Ditambahkan
            </div>
          ) : null}

          {/* button for import excel menu*/}
          <div className="flex justify-end w-full mb-2">
            <button
              className="flex justify-evenly h-12 px-4 items-center  rounded-lg focus-within:shadow-lg overflow-hidden bg-primary-color hover:bg-secondary-color shadow-sm shadow-secondary-color"
              onClick={() => setInputType("bulk")}
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
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              <h1 className="text-white hidden sm:block">Import Excel</h1>
            </button>
          </div>
          {role === "mahasiswa" ? (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg">
              <div className="mb-4">
                <label
                  htmlFor="nama"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Nama :
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  required
                  value={nama}
                  autoComplete="off"
                  onChange={(event) =>
                    setNama(capitalizeName(event.target.value))
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <h1>{nama}</h1>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="nim"
                  className="block text-gray-700 font-bold mb-2"
                >
                  NIM :
                </label>
                <input
                  type="number"
                  id="nim"
                  name="nim"
                  required
                  value={nim}
                  onChange={(event) => {
                    const value = event.target.value;
                    setNim(value);
                    setPassword(value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Password :
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  required
                  disabled={true}
                  value={nim}
                  autoComplete="current-password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="angkatan"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Angkatan :
                </label>
                <input
                  type="number"
                  id="angkatan"
                  name="angkatan"
                  required
                  min={1000}
                  value={angkatan}
                  onChange={(event) => setAngkatan(event.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="telepon"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Telepon{" "}
                  <span className="text-gray-400 font-medium">(opsional)</span>{" "}
                  :
                </label>
                <input
                  type="number"
                  id="telepon"
                  name="telepon"
                  value={telepon}
                  onChange={(event) => setTelepon(event.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="w-full flex justify-end">
                <button
                  className="bg-primary-color mr-2 hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => navigate(`/pengguna/${role}`)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary-color hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </form>
          ) : role === "dosen" ? (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg">
              <div className="mb-4">
                <label
                  htmlFor="nama"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Nama :
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  required
                  value={nama}
                  onChange={(event) =>
                    setNama(capitalizeName(event.target.value))
                  }
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="nip"
                  className="block text-gray-700 font-bold mb-2"
                >
                  NIP :
                </label>
                <input
                  type="number"
                  id="nip"
                  name="nip"
                  required
                  value={nip}
                  onChange={(event) => {
                    const value = event.target.value;
                    setNip(value);
                    setPassword(value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Password :
                </label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  required
                  disabled={true}
                  value={nip}
                  autoComplete="current-password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="telepon"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Telepon{" "}
                  <span className="text-gray-400 font-medium">(opsional)</span>{" "}
                  :
                </label>
                <input
                  type="number"
                  id="telepon"
                  name="telepon"
                  value={telepon}
                  onChange={(event) => setTelepon(event.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="w-full flex justify-end">
                <button
                  className="bg-primary-color mr-2 hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => navigate(`/pengguna/${role}`)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary-color hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </form>
          ) : role === "alumni" ? (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg">
              <div className="mb-4"></div>
              <div className="mb-4">
                <label
                  htmlFor="nim"
                  className="block text-gray-700 font-bold mb-2"
                >
                  NIM :
                </label>
                <input
                  type="number"
                  id="nim"
                  name="nim"
                  required
                  value={nim}
                  onChange={(event) => {
                    const value = event.target.value;
                    setNim(value);
                    setPassword(value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="tahunLulus"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Taun Lulus :
                </label>
                <input
                  type="number"
                  id="tahunLulus"
                  name="tahunLulus"
                  required
                  value={tahunLulus}
                  onChange={(event) => {
                    const value = event.target.value;
                    setTahunLulus(value);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="w-full flex justify-end">
                <button
                  className="bg-primary-color mr-2 hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => navigate(`/pengguna/${role}`)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary-color hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </form>
          ) : null}
        </>
      )}
    </div>
  );
};

export default AddUser;
