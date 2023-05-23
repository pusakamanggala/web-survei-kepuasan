import React, { useContext } from "react";
import useFetchUserById from "../hooks/useFetchUserById";
import { UserContext } from "../context/UserContext";

const MyProfile = () => {
  const { userId, userRole } = useContext(UserContext);

  const {
    data: userData,
    isSuccess: isUserDataSuccess,
    isLoading: isUserDataLoading,
    isError: isUserDataError,
  } = useFetchUserById({
    role: userRole,
    id: userId,
  });

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      {isUserDataLoading && <h1>Loading...</h1>}
      {isUserDataError && <h1>Error...</h1>}
      {isUserDataSuccess && (
        <div className="">
          <table className="w-full">
            <tbody>
              <tr>
                <td>Nama</td>
                <td>:</td>
                <td>{userData.data.nama}</td>
              </tr>
              {(userRole === "ALUMNI" || userRole === "MAHASISWA") && (
                <>
                  <tr>
                    <td>NIM</td>
                    <td>:</td>
                    <td>{userData.data.nim}</td>
                  </tr>
                  <tr>
                    <td>Angkatan</td>
                    <td>:</td>
                    <td>{userData.data.angkatan}</td>
                  </tr>
                </>
              )}
              {userRole === "DOSEN" && (
                <tr>
                  <td>NIP</td>
                  <td>:</td>
                  <td>{userData.data.nip}</td>
                </tr>
              )}
              <tr>
                <td>Telepon</td>
                <td>:</td>
                <td>{userData.data.telepon}</td>
              </tr>
              {userRole === "ALUMNI" && (
                <tr>
                  <td>Tahun Lulus</td>
                  <td>:</td>
                  <td>{userData.data.tahun_kelulusan}</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="flex justify-end">
            <button
              title="Ganti Password"
              className="bg-primary-color flex p-2 rounded-md text-white shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                />
              </svg>
              <h1 className="hidden md:block ml-2">Ganti Password</h1>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
