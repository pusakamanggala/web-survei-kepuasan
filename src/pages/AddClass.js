import React, { useEffect, useState } from "react";
import useFetchUserByName from "../hooks/useFetchUserByName";
import LecturerCard from "../components/LecturerCard";
import useFetchCourseByName from "../hooks/useFetchCourseByName";
import CourseCard from "../components/CourseCard";
import { useNavigate } from "react-router-dom";
import useAddClass from "../hooks/useAddClass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";
import useNotification from "../hooks/useNotification";

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

  const notify = useNotification();

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
      notify("Isi semua formulir terlebih dahulu", "warning");
      return;
    }

    if (namaKelas.length < 3) {
      notify("Nama kelas minimal 3 karakter", "warning");
      return;
    }

    // Validate the end date
    const currentDate = new Date();
    const selectedEndDate = new Date(endDate);

    if (selectedEndDate < currentDate) {
      notify("Tanggal kadaluarsa tidak boleh kurang dari hari ini", "warning");
      return;
    }

    // Display a confirmation dialog
    const confirmed = window.confirm(
      "Apakah anda yakin ingin menambahkan kelas ini?. Kelas tidak bisa dihapus atau diperbarui setelah ditambahkan"
    );

    if (!confirmed) {
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

  useEffect(() => {
    if (addClassMutation.isError) {
      notify("Gagal menambahkan kelas", "error", false);
      addClassMutation.reset();
    }
    if (addClassMutation.isSuccess) {
      notify(`Kelas ${namaKelas} berhasil ditambahkan`, "success", false);
      setNamaDosen("");
      setSelectedNamaDosen("");
      setSelectedNip("");
      setNamaKelas("");
      setEndDate("");
      setCourse("");
      setSelectedCourse("");
      setDosenSearchValue("");
      setCourseSearchValue("");
      addClassMutation.reset();
    }
  }, [addClassMutation.isError, notify, addClassMutation, namaKelas]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Helmet>
        <title>Tambah Kelas | Web Survei Kepuasan</title>
      </Helmet>
      {/* input class name */}
      <div className="mb-2 grid grid-cols-2 gap-3">
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
            maxLength={30}
            placeholder="Ex : Kalkulus - A"
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
            <FontAwesomeIcon icon={faMagnifyingGlass} className="h-5 w-5" />
          </div>
          <form className="w-full" onSubmit={handleSearchDosen}>
            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              minLength={3}
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
              <FontAwesomeIcon
                icon={faXmark}
                className="h-5 w-5 text-primary-color"
              />
            </button>
          )}
        </div>
        {/* Show Dosen Name */}
        {isLoadingDosen && (
          <h1 className="font-semibold mt-2">Memuat dosen...</h1>
        )}
        {isErrorDosen && (
          <h1 className="font-semibold mt-2 text-primary-color">
            Terjadi kesalahan saat memproses permintaan.
          </h1>
        )}
        {isSuccessDosen && (
          <div className="mt-2">
            {lecturerData &&
            lecturerData.message === "There is no record with that query" ? (
              <div className="mt-2 text-primary-color font-semibold">
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
            <FontAwesomeIcon icon={faMagnifyingGlass} className="h-5 w-5" />
          </div>
          <form className="w-full" onSubmit={handleSearchCourse}>
            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              minLength={3}
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
              <FontAwesomeIcon
                icon={faXmark}
                className="h-5 w-5 text-primary-color"
              />
            </button>
          )}
        </div>
        {/* Show Course Name */}
        {isLoadingCourse && (
          <h1 className="font-semibold mt-2">Memuat mata kuliah...</h1>
        )}
        {isErrorCourse && (
          <h1 className="font-semibold mt-2 text-primary-color">
            Terjadi kesalahan saat memproses permintaan.
          </h1>
        )}
        {isSuccessCourse && (
          <div className="mt-2">
            {courseData &&
            courseData.message === "There is no record with that query" ? (
              <div className="mt-2 text-primary-color font-semibold">
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
          title="Batal"
          className="bg-primary-color mr-2 hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => navigate(`/kelas`)}
        >
          Cancel
        </button>
        <button
          title="Submit"
          className="bg-primary-color hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleSubmitClass}
        >
          Submit
        </button>
      </div>
      {addClassMutation.isLoading && (
        <h1 className="font-semibold mt-2 text-center">
          Sedang menambahkan kelas...
        </h1>
      )}
    </div>
  );
};

export default AddClass;
