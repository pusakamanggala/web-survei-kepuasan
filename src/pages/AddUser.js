import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAddStudent from "../hooks/useAddStudent";
import useAddAlumni from "../hooks/useAddAlumni";
import useAddLecturer from "../hooks/useAddLecturer";
import useImportStudent from "../hooks/useImportStudent";
import useImportLecturer from "../hooks/useImportLecturer";
import useImportAlumni from "../hooks/useImportAlumni";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";
import useNotification from "../hooks/useNotification";
import student_file_template from "../sample_file/import_student_template.xlsx";
import lecturer_file_template from "../sample_file/import_lecturer_template.xlsx";
import alumni_file_template from "../sample_file/import_alumni_template.xlsx";

const AddUser = () => {
  const navigate = useNavigate();
  const { role } = useParams(); // get role from url params

  const notify = useNotification();

  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [telepon, setTelepon] = useState("");
  const [inputType, setInputType] = useState("manual");
  const [selectedFile, setSelectedFile] = useState(null);
  const [tahunLulus, setTahunLulus] = useState("");
  const [nip, setNip] = useState("");
  const [fileTemplate, setFileTemplate] = useState(null);

  // useMutation to add user data manually
  const addStudentMutation = useAddStudent(); // call addStudent mutation
  const addAlumniMutation = useAddAlumni(); // useMutation to add alumni
  const addLecturerMutation = useAddLecturer(); // useMutation to add lecturer

  // useMutation to import user data from excel file
  const importStudentMutation = useImportStudent(); // call importStudent mutation
  const importLecturerMutation = useImportLecturer(); // call importLecturer mutation
  const importAlumniMutation = useImportAlumni(); // call importAlumni mutation

  useEffect(() => {
    if (role === "mahasiswa") {
      setFileTemplate(student_file_template);
    }
    if (role === "dosen") {
      setFileTemplate(lecturer_file_template);
    }
    if (role === "alumni") {
      setFileTemplate(alumni_file_template);
    }
  }, [role]);

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
        notify("Harap isi semua bidang masukan yang wajib diisi", "warning");
        return;
      }
    } else if (role === "alumni") {
      if (!nim || !tahunLulus) {
        notify("Harap isi semua bidang masukan yang wajib diisi", "warning");
        return;
      }
    } else if (role === "dosen") {
      if (!nama || !nip || !password) {
        notify("Harap isi semua bidang masukan yang wajib diisi", "warning");
        return;
      }
    }

    if (role === "mahasiswa") {
      // Create student data object
      const studentData = { nama, nim, password, angkatan, telepon };

      // Call addStudent mutation to submit the data
      addStudentMutation.mutate(studentData);
    } else if (role === "alumni") {
      // Validate the tahunKelulusan
      const tahunRegex = /^\d{4}$/; // Regex pattern for 4-digit number
      if (!tahunRegex.test(tahunLulus)) {
        // Handle validation error (e.g., display an error message)
        notify("Tahun kelulusan harus berupa 4 digit angka", "warning");
        return;
      }

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

  // to show notification when the manual add mutation is success or error
  useEffect(() => {
    const hooks = [addAlumniMutation, addStudentMutation, addLecturerMutation];
    const isSuccess = hooks.some((hook) => hook.isSuccess);
    const isError = hooks.some((hook) => hook.isError);

    if (isSuccess) {
      notify(`${role} berhasil ditambahkan`, "success", false);

      // Reset the input fields
      setAngkatan("");
      setNama("");
      setNim("");
      setPassword("");
      setTelepon("");
      setTahunLulus("");
      setNip("");

      hooks.forEach((hook) => hook.reset()); // reset the hooks
    }

    if (isError) {
      if (
        hooks.some(
          (hook) =>
            hook.isError &&
            hook.error &&
            hook.error.message === "Failed to fetch"
        )
      ) {
        notify("Terjadi kesalahan saat memproses permintaan", "error", false);
        hooks.forEach((hook) => hook.reset()); // reset the hooks
        return;
      }

      if (role === "mahasiswa") {
        notify(`${addStudentMutation.error.message}`, "error", false);
      }
      if (role === "dosen") {
        notify(`${addLecturerMutation.error.message}`, "error", false);
      }
      if (role === "alumni") {
        notify(`${addAlumniMutation.error.message}`, "error", false);
      }

      hooks.forEach((hook) => hook.reset()); // reset the hooks
    }
  }, [
    addStudentMutation,
    addAlumniMutation,
    addLecturerMutation,
    notify,
    role,
  ]);

  // to show notification when the import mutation is success or error
  useEffect(() => {
    const hooks = [
      importAlumniMutation,
      importStudentMutation,
      importLecturerMutation,
    ];
    const isSuccess = hooks.some((hook) => hook.isSuccess);
    const isError = hooks.some((hook) => hook.isError);

    if (isSuccess) {
      notify(`${role} berhasil diimpor`, "success", false);
      setSelectedFile(null); // Reset the input fields
      hooks.forEach((hook) => hook.reset()); // reset the hooks
    }

    if (isError) {
      notify(
        `${
          role.charAt(0).toUpperCase() + role.slice(1)
        } gagal diimpor. Pastikan format file dan tabel sudah sesuai dengan ketentuan.`,
        "error",
        false
      );
      hooks.forEach((hook) => hook.reset()); // reset the hooks
    }
  }, [
    importAlumniMutation,
    importStudentMutation,
    importLecturerMutation,
    notify,
    role,
  ]);

  // import user
  if (inputType === "bulk") {
    return (
      <div>
        <div className="flex justify-end w-full mb-2">
          <button
            title="Tambah secara manual"
            className="flex justify-evenly h-12 px-4 items-center  rounded-lg focus-within:shadow-lg overflow-hidden bg-primary-color hover:bg-secondary-color shadow-sm shadow-secondary-color"
            onClick={() => setInputType("manual")}
          >
            <FontAwesomeIcon
              icon={faUserPlus}
              className="mr-0 sm:mr-4 text-white w-5 h-5"
            />
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
                  accept=".xlsx"
                  onChange={handleFileInputChange}
                  className="appearance-none border border-gray-400 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline-gray focus:border-gray-500"
                />
              </div>
              <div>
                <h1 className="text-primary-color font-semibold">
                  * Pastikan tabel excel sudah sesuai dengan template yang
                  disediakan, dan tidak ada duplikasi data pada file excel
                  maupun database.
                </h1>
                <a
                  className="underline"
                  href={fileTemplate}
                  download={`template_file_import_${role}`}
                >
                  Download Template
                </a>
              </div>
              <div className="flex justify-end mt-4">
                <button
                  title="Batal"
                  className="bg-primary-color mr-2 hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={() => navigate(`/pengguna/${role}`)}
                >
                  Cancel
                </button>
                <button
                  title="Impor"
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
        {importAlumniMutation.isLoading ||
          importStudentMutation.isLoading ||
          (importLecturerMutation.isLoading && (
            <h1 className="text-center font-semibold">Mengimpor {role}...</h1>
          ))}
      </div>
    );
  }

  // add user manually
  return (
    <div>
      <Helmet>
        <title>
          {`Tambah ${
            role.charAt(0).toUpperCase() + role.slice(1)
          } | Web Survei Kepuasan`}
        </title>
      </Helmet>

      {/* button for import excel menu*/}
      <div className="flex justify-end w-full mb-2">
        <button
          title="Impor Excel"
          className="flex justify-evenly h-12 px-4 mb-2 items-center  rounded-lg focus-within:shadow-lg overflow-hidden bg-primary-color hover:bg-secondary-color shadow-sm shadow-secondary-color"
          onClick={() => setInputType("bulk")}
        >
          <FontAwesomeIcon
            icon={faFileArrowUp}
            className="w-5 h-5 mr-0 sm:mr-4 text-white"
          />
          <h1 className="text-white hidden sm:block">Import Excel</h1>
        </button>
      </div>
      {role === "mahasiswa" ? (
        <div className="bg-white p-6 rounded-lg">
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
              value={nama}
              autoComplete="off"
              onChange={(event) => setNama(capitalizeName(event.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="nim" className="block text-gray-700 font-bold mb-2">
              NIM :
            </label>
            <input
              type="number"
              id="nim"
              name="nim"
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
              <span className="text-gray-400 font-medium">(opsional)</span> :
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
              title="Batal"
              className="bg-primary-color mr-2 hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => navigate(`/pengguna/${role}`)}
            >
              Cancel
            </button>
            <button
              title="Submit"
              type="submit"
              className="bg-primary-color hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      ) : role === "dosen" ? (
        <div className="bg-white p-6 rounded-lg">
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
              value={nama}
              onChange={(event) => setNama(capitalizeName(event.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="nip" className="block text-gray-700 font-bold mb-2">
              NIP :
            </label>
            <input
              type="number"
              id="nip"
              name="nip"
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
              <span className="text-gray-400 font-medium">(opsional)</span> :
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
              title="Batal"
              className="bg-primary-color mr-2 hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => navigate(`/pengguna/${role}`)}
            >
              Cancel
            </button>
            <button
              title="Submit"
              type="submit"
              className="bg-primary-color hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      ) : role === "alumni" ? (
        <div className="bg-white p-6 rounded-lg">
          <div className="mb-4"></div>
          <div className="mb-4">
            <label htmlFor="nim" className="block text-gray-700 font-bold mb-2">
              NIM :
            </label>
            <input
              type="number"
              id="nim"
              name="nim"
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
              Tahun Lulus :
            </label>
            <input
              type="number"
              id="tahunLulus"
              name="tahunLulus"
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
              title="Batal"
              className="bg-primary-color mr-2 hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => navigate(`/pengguna/${role}`)}
            >
              Cancel
            </button>
            <button
              title="Submit"
              type="submit"
              className="bg-primary-color hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      ) : null}
      {(addStudentMutation.isLoading ||
        addAlumniMutation.isLoading ||
        addLecturerMutation.isLoading) && (
        <h1 className="text-center font-semibold mt-2">
          Menambahkan {role}...
        </h1>
      )}
    </div>
  );
};

export default AddUser;
