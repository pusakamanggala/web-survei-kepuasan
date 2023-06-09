import React, { useContext } from "react";
import useFetchUserById from "../hooks/useFetchUserById";
import { UserContext } from "../context/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";

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
      <Helmet>
        <title>Profil Saya | Web Survei Kepuasan</title>
      </Helmet>
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
              className="bg-primary-color flex p-2 rounded-md text-white shadow-md items-center"
            >
              <FontAwesomeIcon icon={faKey} className="w-5 h-5" />
              <h1 className="hidden md:block ml-2">Ganti Password</h1>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
