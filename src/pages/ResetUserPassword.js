import React, { useState, useEffect } from "react";
import useResetUserPassword from "../hooks/useResetUserPassword";
import useNotification from "../hooks/useNotification";
import { Helmet } from "react-helmet-async";

const ResetUserPassword = () => {
  const [userRole, setUserRole] = useState("mahasiswa");
  const [userId, setUserId] = useState("");

  const resetUserPasswordMutation = useResetUserPassword(userRole);

  const notify = useNotification();

  const handleResetUserPassword = (event) => {
    event.preventDefault();

    if (!userId) return notify("Masukkan NIM/NIP", "warning");
    const confirm = window.confirm(
      `Apakah anda yakin ingin mengatur ulang password pengguna ?`
    );
    if (confirm) {
      resetUserPasswordMutation.mutate({ id: userId });
    }
  };

  function handleOnChangeUserId(event) {
    const input = event.target.value;
    const sanitizedInput = input.replace(/[^0-9-]/g, ""); // Remove characters that are not numbers or hyphens
    setUserId(sanitizedInput); // Update the state with the sanitized input
  }

  useEffect(() => {
    if (resetUserPasswordMutation.isSuccess) {
      notify("Password berhasil diatur ulang", "success", false);
      setUserId("");
      resetUserPasswordMutation.reset();
    }
    if (resetUserPasswordMutation.isError) {
      if (
        resetUserPasswordMutation.error.message ===
        "There is no record with that query"
      ) {
        notify("NIM/NIP tidak ditemukan", "error", false);
      } else {
        notify("Terjadi kesalahan saat memproses permintaan", "error", false);
      }

      resetUserPasswordMutation.reset();
    }
  }, [resetUserPasswordMutation, notify]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Helmet>
        <title>Atur Ulang Kata Sandi Pengguna | Web Survei Kepuasan</title>
      </Helmet>
      <div className="mb-4 grid lg:grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="user id"
            className="block text-gray-700 font-bold mb-2 "
          >
            {userRole === "mahasiswa" || userRole === "alumni" ? "NIM" : "NIP"}
          </label>
          <input
            type="text"
            id="user id"
            name="user id"
            placeholder={
              userRole === "mahasiswa" || userRole === "alumni"
                ? "Masukkan NIM"
                : "Masukkan NIP"
            }
            value={userId}
            autoComplete="off"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus-within:shadow-md"
            onChange={handleOnChangeUserId}
          />
        </div>
        <div>
          <label
            htmlFor="user role"
            className="block text-gray-700 font-bold mb-2"
          >
            Jenis Pengguna :
          </label>
          <select
            title="Jenis Pengguna"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option value="mahasiswa">Mahasiswa</option>
            <option value="dosen">Dosen</option>
            <option value="alumni">Alumni</option>
          </select>
        </div>
      </div>
      <div className="text-secondary-color">
        <h1>Catatan :</h1>
        <p>Password akan diatur ulang menjadi NIM atau NIP pengguna</p>
      </div>
      {/* submit and cancel button */}
      <div className="flex justify-end">
        {/* onclick go back */}

        <button
          title="Bataklan Proses"
          className="font-bold h-fit py-2 px-4 rounded mr-2 text-white bg-primary-color hover:bg-secondary-color"
        >
          Cancel
        </button>
        <button
          title="Submit Template Survei"
          className="font-bold h-fit py-2 px-4 rounded  text-white bg-primary-color hover:bg-secondary-color"
          onClick={handleResetUserPassword}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ResetUserPassword;
