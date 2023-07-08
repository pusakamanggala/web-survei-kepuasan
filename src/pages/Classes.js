import React from "react";
import ClassCard from "../components/ClassCard";
import useFetchClasses from "../hooks/useFetchClasses";
import useFetchClassByName from "../hooks/useFetchClassByName";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddCourse from "../components/AddCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faXmark,
  faBook,
  faChalkboardTeacher,
} from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";
import useNotification from "../hooks/useNotification";

const Classes = () => {
  const [keyword, setKeyword] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);

  const notify = useNotification();

  // Pagination state
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const navigate = useNavigate();

  // Declare variables for fetching data (will be assigned based on conditions)
  let fetchFunction;
  let fetchArgs;

  // If keyword is not empty, use useFetchClassByName hook
  if (keyword) {
    fetchFunction = useFetchClassByName;
    fetchArgs = { keyword };
  } else {
    fetchFunction = useFetchClasses;
    fetchArgs = {
      limit: pageSize,
      page: pageNumber,
    };
  }

  // functions to handle pagination
  const handleNextPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };
  const handlePrevPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  };
  const handleFirstPage = () => {
    setPageNumber(1);
  };
  const handleLastPage = (totalPage) => {
    setPageNumber(totalPage);
  };

  // Define function to handle page size change
  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    setPageSize(newSize);
    setPageNumber(1); // Reset page number to 1 when page size is changed
  };

  // to submit the search form
  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchValue.length < 3) {
      notify("Kata kunci pencarian minimal terdiri dari 3 karakter", "warning");
      return;
    }
    setKeyword(event.target.search.value);
  };

  const { data, isLoading, isError, isSuccess } = fetchFunction(fetchArgs);

  return (
    <div className="container mx-auto p-4">
      <Helmet>
        <title>Daftar Kelas | Web Survei Kepuasan</title>
      </Helmet>
      <div className="grid grid-flow-col-dense justify-end mb-4">
        {/* Search bar */}
        <div className=" flex h-12 md:w-72 items-center mx-2 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2 border-primary-color shadow-sm">
          <div className="grid place-items-center h-full w-12 text-gray-300">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="h-5 w-5" />
          </div>
          <form onSubmit={handleSubmit} className="w-full">
            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              placeholder="Cari Kelas"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </form>
          {keyword && (
            <button
              className="cursor-pointer m-2"
              title="Hapus pencarian"
              onClick={() => {
                setKeyword("");
                setSearchValue("");
              }}
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="h-5 w-5 text-primary-color"
              />
            </button>
          )}
        </div>
        {/* end of Search bar */}
        {/* add button */}
        <button
          title="Tambah Mata Kuliah"
          className="grid grid-flow-col-dense gap-3 ml-2 h-12 px-4 items-center  rounded-lg focus-within:shadow-lg overflow-hidden bg-primary-color hover:bg-secondary-color shadow-sm shadow-secondary-color text-white"
          onClick={() => setShowAddCourseModal(true)}
        >
          <FontAwesomeIcon className="w-5 h-5" icon={faBook} />
          <h1 className=" hidden md:block capitalize">Tambah Mata Kuliah</h1>
        </button>
        <button
          title="Tambah Kelas"
          className="grid grid-flow-col-dense gap-3 ml-2 h-12 px-4 items-center  rounded-lg focus-within:shadow-lg overflow-hidden bg-primary-color hover:bg-secondary-color shadow-sm shadow-secondary-color text-white"
          onClick={() => navigate("/kelas/tambah")}
        >
          <FontAwesomeIcon className="w-5 h-5" icon={faChalkboardTeacher} />
          <h1 className="hidden md:block capitalize">Tambah Kelas</h1>
        </button>
        {showAddCourseModal && <AddCourse setIsShow={setShowAddCourseModal} />}
      </div>
      {/* To show total classes when keyword is empty */}
      {isSuccess && keyword === "" && data.totalRecords && (
        <div className="flex justify-between text-secondary-color font-medium mx-1 mb-2">
          <h1>Total Kelas: {data.totalRecords}</h1>
          <h1>
            Halaman: {pageNumber} / {data.totalPage}
          </h1>
        </div>
      )}

      {/* end of add button */}
      {isLoading && (
        <div className="text-primary-color font-semibold">
          Memuat data kelas...
        </div>
      )}
      {isError && (
        <div className="text-primary-color font-semibold">
          Terjadi kesalahan saat memproses permintaan. Mohon muat ulang website,
          atau tunggu beberapa saat
        </div>
      )}
      {/* If data is not empty, map the data to ClassCard component, and check if kelas is not empty */}
      {isSuccess && !data.totalRecords && keyword === "" && (
        <h1 className="text-primary-color font-semibold">
          Belum ada kelas yang terdaftar
        </h1>
      )}
      {isSuccess && (
        <div>
          {data && data.data && data.data.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.data.map((kelas) => (
                <ClassCard
                  key={kelas.id_kelas}
                  kelas={kelas}
                  onClick={() => navigate(`/kelas/${kelas.id_kelas}`)}
                />
              ))}
            </div>
          ) : (
            keyword !== "" && (
              <h1 className="text-primary-color">
                Kelas <span className="font-bold">{keyword}</span> tidak
                ditemukan
              </h1>
            )
          )}
        </div>
      )}

      <div className="flex justify-between items-center mt-6">
        {/* button to set how much data is displayed  */}
        <div className="flex text-primary-color font-semibold ml-2">
          {data && data.totalRecords > 5 ? (
            <>
              <h1>Tampilkan</h1>
              <select
                title="Jumlah Data"
                name="dataLength"
                id="dataLength"
                className="text-secondary-color bg-gray-100"
                value={pageSize}
                onChange={handlePageSizeChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
              </select>
            </>
          ) : null}
        </div>
        {/* pagination buttons */}
        {data && data.totalPage && data.totalPage !== 1 && keyword === "" ? (
          <div>
            {pageNumber !== 1 ? (
              <button
                title="Pertama"
                onClick={handleFirstPage}
                disabled={pageNumber === 1}
                className={`font-bold py-2 px-4 rounded mr-2 text-white ${
                  pageNumber === 1
                    ? "bg-red-400 "
                    : "bg-red-600 hover:bg-red-700 "
                } `}
              >
                First
              </button>
            ) : null}

            <button
              title="Sebelumnya"
              onClick={handlePrevPage}
              disabled={pageNumber === 1}
              className={`font-bold py-2 px-4 rounded mr-2 text-white ${
                pageNumber === 1
                  ? "bg-red-400 "
                  : "bg-red-600 hover:bg-red-700 "
              } `}
            >
              Prev
            </button>
            <button
              title="Selanjutnya"
              onClick={handleNextPage}
              disabled={pageNumber === data.totalPage}
              className={`font-bold py-2 px-4 rounded mr-2 text-white ${
                pageNumber === data.totalPage
                  ? "bg-red-400 "
                  : "bg-red-600 hover:bg-red-700 "
              } `}
            >
              Next
            </button>
            <button
              title="Terkahir"
              onClick={() => handleLastPage(data.totalPage)}
              disabled={pageNumber === data.totalPage}
              className={`font-bold py-2 px-4 rounded mr-2 text-white ${
                pageNumber === data.totalPage
                  ? "bg-red-400 "
                  : "bg-red-600 hover:bg-red-700 "
              } `}
            >
              Last
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Classes;
