import React from "react";
import EksportUsersButton from "./EksportUsersButton";
import useFetchAlumni from "../hooks/useFetchAlumni";
import useFetchLectures from "../hooks/useFetchLecturers";
import useFetchStudents from "../hooks/useFetchStudents";

const EksportUsers = ({ role, isShow }) => {
  let fetchFunction;

  if (role === "alumni") {
    fetchFunction = useFetchAlumni;
  } else if (role === "dosen") {
    fetchFunction = useFetchLectures;
  } else if (role === "mahasiswa") {
    fetchFunction = useFetchStudents;
  }

  // fetch all user data
  const { data, isLoading, isError, isSuccess } = fetchFunction({
    sortBy: "asc",
    orderBy: "nim",
    limit: "1",
    page: "1",
    angkatan: "",
    fetchAll: true,
  }); // parameter doesnt matter because when fetchAll is true, it will ignore all other parameters

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-40">
      <div className="flex justify-center items-center h-full">
        <div className="modal p-6 bg-white shadow-md rounded-md">
          {isLoading && <h1>Memuat semua data {role}...</h1>}
          {isError && (
            <h1 className="text-primary-color">
              Terjadi kesalahan saat memproses permintaan
            </h1>
          )}
          {isSuccess && (
            <div className="flex flex-col justify-center items-center">
              <h1 className="mb-4"> Jumlah Data : {data.data.length}</h1>
              <div className="flex">
                <button
                  title="Batal"
                  className="flex justify-evenly ml-2 h-12 px-4 items-center text-white  rounded-lg focus-within:shadow-lg overflow-hidden bg-primary-color hover:bg-secondary-color shadow-sm shadow-secondary-color"
                  onClick={() => isShow(false)}
                >
                  <h1 className="capitalize">Batal</h1>
                </button>
                <EksportUsersButton data={data.data} role={role} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EksportUsers;
