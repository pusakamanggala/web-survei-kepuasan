import React, { useEffect, useState } from "react";
import useUpdateUser from "../hooks/useUpdateUser";

const EditUser = (props) => {
  const { setIsShow, userData, role } = props;

  // to store user data
  const [nama, setNama] = useState("");
  const [telepon, setTelepon] = useState("");
  const [status, setStatus] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [tahunLulus, setTahunLulus] = useState("");
  const [id, setId] = useState("");

  // to update user using useUpdateUser hook
  const updateUserMutation = useUpdateUser({ role, id });

  // to set state value when role or userData changed
  useEffect(() => {
    // mahasiswa, alumni, or dosen have different data
    if (role === "mahasiswa") {
      setNama(userData.nama);
      setId(userData.nim);
      setTelepon(userData.telepon);
      setStatus(userData.status);
      setAngkatan(userData.angkatan);
    } else if (role === "dosen") {
      setNama(userData.nama);
      setId(userData.nip);
      setTelepon(userData.telepon);
      setStatus("AKTIF");
    } else if (role === "alumni") {
      setNama(userData.nama);
      setId(userData.nim);
      setTelepon(userData.telepon);
      setAngkatan(userData.angkatan);
      setTahunLulus(userData.tahun_kelulusan);
    }
  }, [role, userData]);

  // to handle update user
  const handleUpdateUser = () => {
    let data = {};

    // check if nama is empty
    if (!nama) {
      alert("Nama tidak boleh kosong");
      return;
    }

    // set data based on role
    if (role === "mahasiswa") {
      data = {
        nama,
        telepon,
        status,
        angkatan,
      };
    } else if (role === "dosen") {
      data = {
        nama,
        telepon,
        status,
      };
    } else if (role === "alumni") {
      data = {
        nama,
        telepon,
      };
    }

    // call updateUser mutation
    updateUserMutation.mutate(data);
  };

  // Handle user status change
  const handleStatusChange = (e) => {
    const newStatus = e.target.value;

    // show confirmation dialog before change status to non aktif
    const confirmed = window.confirm(
      `Apakah anda yakin akan mengubah status ${role} ? \nStatus NON AKTIF bersifat permanen`
    );
    // if user confirmed, change status
    if (confirmed) {
      setStatus(newStatus);
    }
  };

  // Reload page after 2 seconds when the update is successful
  if (updateUserMutation.isSuccess) {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full  bg-gray-900 bg-opacity-50 z-40">
      <div className="flex justify-center items-center h-full">
        <div className="modal p-6 w-96 bg-white text-left shadow-md rounded-md ">
          <h1 className="text-center font-bold text-base mb-4 capitalize">
            Perbarui Data {role}
          </h1>
          {/* use id (NIM / NIP) */}
          <div className="mb-2">
            <label
              htmlFor="userID"
              className="block text-gray-700 font-bold mb-2 "
            >
              {role === "dosen" ? "NIP :" : "NIM :"}
            </label>
            <input
              type="text"
              id="userID"
              name="userID"
              required
              value={id}
              autoComplete="off"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus-within:shadow-md"
              disabled
            />
          </div>
          {/* User Name */}
          <div className="mb-2">
            <label
              htmlFor="userName"
              className="block text-gray-700 font-bold mb-2 "
            >
              Nama :
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              required
              value={nama}
              autoComplete="off"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus-within:shadow-md"
              onChange={(e) => setNama(e.target.value)}
            />
          </div>
          {/* user phone number */}
          <div className="mb-2">
            <label
              htmlFor="userPhone"
              className="block text-gray-700 font-bold mb-2 "
            >
              Telepon :
            </label>
            <input
              type="number"
              id="userPhone"
              name="userPhone"
              required
              value={telepon}
              autoComplete="off"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus-within:shadow-md"
              onChange={(e) => setTelepon(e.target.value)}
            />
          </div>
          {/* student or alumni batch*/}
          {role === "mahasiswa" || role === "alumni" ? (
            <div className="mb-2">
              <label
                htmlFor="angkatan"
                className="block text-gray-700 font-bold mb-2 "
              >
                Angkatan :
              </label>
              <input
                type="number"
                id="angkatan"
                name="angkatan"
                required
                value={angkatan}
                autoComplete="off"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus-within:shadow-md"
                onChange={(e) => setAngkatan(e.target.value)}
                // disbaled if role is alumni
                disabled={role === "alumni"}
              />
            </div>
          ) : null}

          {/* user status (only for student or dosen) */}
          {role === "mahasiswa" || role === "dosen" ? (
            <div className="mb-2">
              <label
                htmlFor="userStatus"
                className="block text-gray-700 font-bold mb-2 "
              >
                Status :
              </label>
              <div>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio  h-5 w-5"
                    value="AKTIF"
                    checked={status === "AKTIF"}
                    onChange={handleStatusChange}
                  />
                  <span className="ml-2 text-green-500">AKTIF</span>
                </label>
                <label className="inline-flex items-center ml-6">
                  <input
                    type="radio"
                    className="form-radio text-red-600 h-5 w-5"
                    value="NONAKTIF"
                    checked={status === "NONAKTIF"}
                    onChange={handleStatusChange}
                  />
                  <span className="ml-2 text-primary-color">NON AKTIF</span>
                </label>
              </div>
            </div>
          ) : null}
          {/* alumni graduate year (return null when role is not alumni) */}
          {role === "alumni" ? (
            <div className="mb-2">
              <label
                htmlFor="tahunLulus"
                className="block text-gray-700 font-bold mb-2 "
              >
                Tahun Lulus :
              </label>
              <input
                type="number"
                id="tahunLulus"
                name="tahunLulus"
                required
                value={tahunLulus}
                autoComplete="off"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus-within:shadow-md"
                disabled
              />
            </div>
          ) : null}
          {/* cancel and submit button */}
          <div className="mt-5 flex justify-end">
            <button
              title="Batal"
              className="font-bold py-2 px-4 rounded mr-2 text-white bg-primary-color hover:bg-secondary-color"
              onClick={() => setIsShow(false)}
            >
              Batal
            </button>
            <button
              title="Tambahkan Mahasiswa ke Kelas"
              className="font-bold py-2 px-4 rounded text-white bg-primary-color hover:bg-secondary-color"
              onClick={handleUpdateUser}
            >
              Submit
            </button>
          </div>
          {/* update status */}
          <div className="text-center font-semibold">
            {updateUserMutation.isLoading && (
              <h1 className="mt-4 text-secondary-color">
                Memproses Permintaan ....
              </h1>
            )}
            {updateUserMutation.isError && (
              <h1 className="mt-4 text-primary-color">
                Terjadi kesalahan saat memproses permintaan !
              </h1>
            )}
            {updateUserMutation.isSuccess && (
              <>
                <h1 className="text-green-500 mt-4 ">
                  Berhasil memperbarui pengguna
                </h1>
                <h1 className="text-green-500 text-xs">
                  Memuat ulang halaman dalam 2 detik...
                </h1>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
