import React from "react";
import useFetchClassDetails from "../hooks/useFetchClassDetails";
import { useParams } from "react-router-dom";
import { useState } from "react";
import AddStudentToClass from "../components/AddStudentToClass";
import useDeleteStudentFromClass from "../hooks/useDeleteStudentFromClass";
import { useNavigate } from "react-router-dom";

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

  const handleDeleteStudent = (nim) => {
    if (window.confirm("Apakah anda yakin ingin menghapus mahasiswa ini?")) {
      deleteStudentFromClassMutation.mutate(
        {
          classId: id,
          nim: nim,
        },
        {
          onSuccess: () => {
            window.location.reload();
            alert("Berhasil menghapus mahasiswa dari kelas");
          },
          onError: () => {
            alert("Gagal menghapus mahasiswa dari kelas");
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
    return <h1>Loading...</h1>;
  }

  if (isFetchClassError) {
    return (
      <div>
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
          <h1>Something went wrong...</h1>
        )}
      </div>
    );
  }

  const dummyData = {
    success: true,
    message: "Your record has been saved successfully",
    data: {
      idKelas: "aJ99r6nBzJY190j1c5nO",
      namaKelas: "Kalkulus - A",
      namaDosen: "karina",
      StartDate: 1681895016,
      endDate: 1684980545,
      idMatkul: "Qs9OPwh1jusKxMdIdw7K",
      namaMatkul: "Kalkulus",
      mahasiswa: [
        { nim: "10293809", nama: "pusaka" },
        { nim: "192837", nama: "roni" },
        { nim: "82374", nama: "lina" },
        { nim: "837281", nama: "sari" },
        { nim: "173648", nama: "rani" },
        { nim: "19273", nama: "putra" },
        { nim: "172836", nama: "nina" },
        { nim: "234856", nama: "susi" },
        { nim: "293847", nama: "ani" },
        { nim: "182736", nama: "dewi" },
        { nim: "283746", nama: "kiki" },
        { nim: "192736", nama: "joko" },
        { nim: "284736", nama: "budi" },
        { nim: "193746", nama: "hadi" },
        { nim: "384756", nama: "huda" },
        { nim: "275839", nama: "siti" },
        { nim: "374659", nama: "andi" },
        { nim: "948375", nama: "nita" },
        { nim: "293746", nama: "dina" },
        { nim: "174958", nama: "rizky" },
        { nim: "385746", nama: "vina" },
        { nim: "183746", nama: "gina" },
        { nim: "283746", nama: "yani" },
        { nim: "193756", nama: "agus" },
        { nim: "284758", nama: "rio" },
        { nim: "193648", nama: "edi" },
        { nim: "284638", nama: "rudi" },
        { nim: "293756", nama: "rama" },
        { nim: "174859", nama: "julie" },
        { nim: "385738", nama: "farah" },
        { nim: "293758", nama: "nadia" },
        { nim: "384758", nama: "amir" },
        { nim: "183746", nama: "bella" },
        { nim: "283746", nama: "tia" },
        { nim: "193746", nama: "arif" },
        { nim: "284759", nama: "koko" },
        { nim: "193746", nama: "riska" },
        { nim: "293746", nama: "tika" },
        { nim: "174857", nama: "wati" },
        { nim: "385746", nama: "fani" },
        { nim: "183746", nama: "wulan" },
      ],
    },
  };
  const { namaDosen, StartDate, endDate, namaKelas, mahasiswa } = data.data;

  return (
    <div className="bg-white rounded shadow-md p-4 text-secondary-color">
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
            className="flex justify-evenly ml-2 h-12 px-4 items-center  rounded-lg focus-within:shadow-lg overflow-hidden bg-primary-color hover:bg-secondary-color shadow-sm shadow-secondary-color"
            onClick={() => {
              setSelectedClass(data.data);
              setShowModal(true);
            }}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 scale-x-[-1]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                  />
                </svg>
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
