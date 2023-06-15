import React from "react";
import useFetchClassDetails from "../hooks/useFetchClassDetails";
import { useParams } from "react-router-dom";
import { useState } from "react";
import AddStudentToClass from "../components/AddStudentToClass";
import useDeleteStudentFromClass from "../hooks/useDeleteStudentFromClass";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUserMinus } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";
import useNotification from "../hooks/useNotification";

const ClassDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // get class id from url
  const [seLectedClass, setSelectedClass] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // delete student from class
  const deleteStudentFromClassMutation = useDeleteStudentFromClass();

  const {
    data,
    isLoading: isFetchClassLoading,
    isError: isFetchClassError,
    error,
  } = useFetchClassDetails({ id });

  const notify = useNotification();

  const handleDeleteStudent = (nim) => {
    if (window.confirm("Apakah anda yakin ingin menghapus mahasiswa ini?")) {
      deleteStudentFromClassMutation.mutate(
        {
          classId: id,
          nim: nim,
        },
        {
          onSuccess: () => {
            notify(`Berhasil menghapus mahasiswa ${nim} dari kelas`, "success");
          },
          onError: () => {
            notify(
              `Gagal menghapus mahasiswa ${nim} dari kelas`,
              "error",
              false
            );
          },
        }
      );
    }
  };

  const convertUnixTime = (unixTime) => {
    const date = new Date(unixTime * 1000);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };
  if (isFetchClassLoading) {
    return (
      <>
        <Helmet>
          <title>Detail Kelas | Web Survei Kepuasan</title>
        </Helmet>
        <h1>Loading...</h1>
      </>
    );
  }

  if (isFetchClassError) {
    return (
      <div>
        <Helmet>
          <title>Detail Kelas | Web Survei Kepuasan</title>
        </Helmet>
        {error.message === "Kelas ini belum memiliki mahasiswa" ? (
          <>
            <h1>
              {error.message}. Harap masukan minimal 1 mahasiswa ke kelas ini
            </h1>
            <AddStudentToClass
              kelas={id}
              setIsShow={() => navigate("/kelas")}
            />
          </>
        ) : (
          <h1 className="text-primary-color font-semibold">
            Terjadi kesalahan saat memproses permintaan.
          </h1>
        )}
      </div>
    );
  }

  console.log(isFetchClassError);

  const { namaDosen, StartDate, endDate, namaKelas, mahasiswa } = data.data;

  return (
    <div className="bg-white rounded shadow-md p-4 text-secondary-color">
      <Helmet>
        <title>Detail Kelas | Web Survei Kepuasan</title>
      </Helmet>
      {isFetchClassLoading && <h1>Loading...</h1>}
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-lg">{namaKelas}</h1>
          <h1 className="mb-5 font-semibold">Dosen Pengampu : {namaDosen}</h1>
          <h1 className="mb-5 font font-semibold">
            Periode : {convertUnixTime(StartDate)} - {convertUnixTime(endDate)}
          </h1>
        </div>
        <div>
          {/* add button */}
          <button
            title="Tambah Mahasiswa"
            className="flex justify-evenly ml-2 h-12 px-4 items-center  rounded-lg focus-within:shadow-lg overflow-hidden bg-primary-color hover:bg-secondary-color shadow-sm shadow-secondary-color"
            onClick={() => {
              setSelectedClass(data.data);
              setShowModal(true);
            }}
          >
            <FontAwesomeIcon
              icon={faUserPlus}
              className="mr-0 sm:mr-4 text-white"
            />
            <h1 className="text-white hidden sm:block capitalize">
              Tambah Mahasiswa
            </h1>
          </button>
          {/* end of add button */}
          {showModal && (
            <AddStudentToClass
              kelas={seLectedClass.idKelas}
              setIsShow={setShowModal}
            />
          )}
        </div>
      </div>

      <div className="flex justify-between border-b-2 mb-3 ">
        <h1>Mahasiswa : </h1>
        <h1>Total Mahasiswa : {mahasiswa.length}</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mahasiswa.map(({ nim, nama }) => (
          <div key={nim} className="col-span-1">
            <div className="flex justify-between items-center p-2 rounded border-primary-color border-2 shadow-md">
              <div>
                <h1 className="font-semibold">{nama}</h1>
                <h1>{nim}</h1>
              </div>
              {/* delete button */}
              <button
                title="Hapus Mahasiswa"
                onClick={() => handleDeleteStudent(nim)}
                className="w-6 h-6 hover:scale-125"
              >
                <FontAwesomeIcon
                  icon={faUserMinus}
                  className="w-6 h-6 scale-x-[-1]"
                />
              </button>
              {/* end of delete button */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassDetails;
