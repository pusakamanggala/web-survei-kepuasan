import React, { useEffect, useState } from "react";
import useFetchUserByName from "../hooks/useFetchUserByName";
import LecturerCard from "../components/LecturerCard";
import useFetchCourseByName from "../hooks/useFetchCourseByName";
import CourseCard from "../components/CourseCard";
import { useNavigate } from "react-router-dom";
import useAddClass from "../hooks/useAddClass";

const AddClass = () => {
  const navigate = useNavigate();
  const [dosenSearchValue, setDosenSearchValue] = useState("");

  const [namaDosen, setNamaDosen] = useState("");
  const [selectedNamaDosen, setSelectedNamaDosen] = useState("");
  const [selectedNip, setSelectedNip] = useState("");
  const [namaKelas, setNamaKelas] = useState("");
  const [endDate, setEndDate] = useState("");

  const [courseSearchValue, setCourseSearchValue] = useState("");
  const [course, setCourse] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const addClassMutation = useAddClass();

  const {
    data: lecturerData,
    isLoading: isLoadingDosen,
    isError: isErrorDosen,
    isSuccess: isSuccessDosen,
    refetch: refetchDosen,
  } = useFetchUserByName({
    role: "dosen",
    keyword: dosenSearchValue,
    autoFetch: false,
  });

  const {
    data: courseData,
    isLoading: isLoadingCourse,
    isError: isErrorCourse,
    isSuccess: isSuccessCourse,
    refetch: refetchCourse,
  } = useFetchCourseByName({
    keyword: courseSearchValue,
    autoFetch: false,
  });

  const handleSubmitClass = (event) => {
    event.preventDefault();

    if (!namaKelas || !endDate || !selectedNip || !selectedCourse) {
      alert("Semua field harus diisi");
      return;
    }

    const data = {
      idDosen: selectedNip,
      namaDosen: selectedNamaDosen,
      idMatkul: selectedCourse,
      namaKelas: namaKelas,
      endDate: convertEndDateToUnix(endDate),
    };

    addClassMutation.mutate(data);
  };

  const handleSearchDosen = (event) => {
    event.preventDefault();
    setNamaDosen(dosenSearchValue);
  };
  const handleSearchCourse = (event) => {
    event.preventDefault();
    setCourse(courseSearchValue);
  };

  const convertEndDateToUnix = (dateString) => {
    const [year, month, day] = dateString.split("-");
    const hour = 23;
    const minute = 59;
    const second = 0;
    const dateObject = new Date(year, month - 1, day, hour, minute, second);
    return Math.floor(dateObject.getTime() / 1000);
  };

  useEffect(() => {
    if (course) {
      refetchCourse();
    }
  }, [course, refetchCourse]);

  useEffect(() => {
    if (namaDosen) {
      refetchDosen();
    }
  }, [namaDosen, refetchDosen]);

  if (addClassMutation.isLoading) {
    return <p>Loading...</p>;
  }

  if (addClassMutation.isError) {
    return <p>Error...</p>;
  }

  if (addClassMutation.isSuccess) {
    setTimeout(() => {
      window.location.reload(); // reload the page
    }, 5000); // set timeout to 5 seconds

    return (
      <div className="text-green-500 font-bold text-xl ml-2 capitalize">
        <h1>Kelas Berhasil Ditambahkan</h1>
        <p className="text-black font-normal text-base">
          Anda akan dialihkan dalam 5 detik
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* input class name */}
      <div className="mb-4 grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="namaKelas"
            className="block text-gray-700 font-bold mb-2"
          >
            Nama Kelas :
          </label>
          <input
            type="text"
            id="namaKelas"
            name="namaKelas"
            required
            value={namaKelas}
            autoComplete="off"
            onChange={(event) => setNamaKelas(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* input class  period */}
        <div className="mb-4">
          <label
            htmlFor="classExpire"
            className="block text-gray-700 font-bold mb-2"
          >
            Expire :
          </label>

          <input
            type="date"
            id="endDate"
            name="endDate"
            required
            value={endDate}
            autoComplete="off"
            onChange={(event) => setEndDate(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      {/* Input Dosen */}
      <div className="pb-5">
        <label
          htmlFor="dosenPengampu"
          className="block text-gray-700 font-bold mb-2"
        >
          Dosen Pengampu :
        </label>
        <div className=" flex h-12 items-center rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2  shadow-sm">
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
          <form className="w-full" onSubmit={handleSearchDosen}>
            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              min={1}
              value={dosenSearchValue}
              placeholder="Cari Nama Dosen"
              onChange={(event) => {
                setDosenSearchValue(event.target.value);
              }}
              required
            />
          </form>
          {dosenSearchValue && (
            <button
              className="cursor-pointer m-2"
              title="Hapus pencarian"
              onClick={() => {
                setDosenSearchValue("");
                setSelectedNamaDosen("");
                setSelectedNip("");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="#ec161e"
                className="w-5 h-5 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        {/* Show Dosen Name */}
        {isLoadingDosen && <div>Loading....</div>}
        {isErrorDosen && <div>Error....</div>}
        {isSuccessDosen && (
          <div className="mt-2">
            {lecturerData &&
            lecturerData.message === "There is no record with that query" ? (
              <div className="mt-2 text-primary-color">
                Dosen tidak ditemukan
              </div>
            ) : (
              <>
                <h1 className="text-sm text-slate-500 mb-1">Pilih Dosen</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                  {lecturerData.data.map((lecturer) => (
                    <LecturerCard
                      lecturer={lecturer}
                      bgColor={
                        lecturer.nama === selectedNamaDosen
                          ? "bg-primary-color"
                          : "bg-gray-100"
                      }
                      textColor={
                        lecturer.nama === selectedNamaDosen
                          ? "text-white"
                          : "text-black"
                      }
                      onClick={() => {
                        setSelectedNamaDosen(lecturer.nama);
                        setSelectedNip(lecturer.nip);
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
      {/* Input Mata Kuliah */}
      <div className="pb-5">
        <label htmlFor="course" className="block text-gray-700 font-bold mb-2">
          Mata Kuliah :
        </label>
        <div className=" flex h-12 items-center rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2  shadow-sm">
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
          <form className="w-full" onSubmit={handleSearchCourse}>
            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              min={1}
              value={courseSearchValue}
              placeholder="Cari Nama Mata Kuliah"
              onChange={(event) => {
                setCourseSearchValue(event.target.value);
              }}
              required
            />
          </form>
          {courseSearchValue && (
            <button
              className="cursor-pointer m-2"
              title="Hapus pencarian"
              onClick={() => {
                setCourseSearchValue("");
                setSelectedCourse("");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="#ec161e"
                className="w-5 h-5 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        {/* Show Course Name */}
        {isLoadingCourse && <div>Loading....</div>}
        {isErrorCourse && <div>Error....</div>}
        {isSuccessCourse && (
          <div className="mt-2">
            {courseData &&
            courseData.message === "There is no record with that query" ? (
              <div className="mt-2 text-primary-color">
                Mata kuliah tidak ditemukan
              </div>
            ) : (
              <>
                <h1 className="text-sm text-slate-500 mb-1">
                  Pilih Mata kuliah
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                  {courseData.data.map((course) => (
                    <CourseCard
                      course={course}
                      bgColor={
                        course.id_matkul === selectedCourse
                          ? "bg-primary-color"
                          : "bg-gray-100"
                      }
                      textColor={
                        course.id_matkul === selectedCourse
                          ? "text-white"
                          : "text-black"
                      }
                      onClick={() => {
                        setSelectedCourse(course.id_matkul);
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <div className="w-full flex justify-end">
        <button
          className="bg-primary-color mr-2 hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => navigate(`/kelas`)}
        >
          Cancel
        </button>
        <button
          className="bg-primary-color hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSubmitClass}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddClass;
