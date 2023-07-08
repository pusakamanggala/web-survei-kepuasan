import React, { useState } from "react";
import useFetchQuestionByName from "../hooks/useFetchQuestionByName";
import AddQuestion from "../components/AddQuestion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faXmark,
  faCommentMedical,
} from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";
import useNotification from "../hooks/useNotification";

const Questions = () => {
  // to store search value and keyword
  const [questionKeyword, setQuestionKeyword] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const notify = useNotification();

  // to store add question modal state
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);

  // to fetch question data using useFetchQuestionByName hook
  const {
    data: questionData,
    isLoading: isQuestionLoading,
    isError: isQuestionError,
    isSuccess: isQuestionSuccess,
  } = useFetchQuestionByName({
    keyword: questionKeyword,
  });

  // to handle search question
  const handleSubmit = (event) => {
    event.preventDefault();

    // if search value is less than 3 characters, show warning notification
    if (searchValue.length < 3) {
      notify("Kata kunci pencarian minimal terdiri dari 3 karakter", "warning");
      return;
    }

    setQuestionKeyword(searchValue);
  };

  return (
    <div>
      <Helmet>
        <title>Pertanyaan Survei | Web Survei Kepuasan</title>
      </Helmet>
      <div className="flex justify-end mb-4">
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
              placeholder="Cari Pertanyaan"
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
            />
          </form>
          {questionKeyword && (
            <button
              className="cursor-pointer m-2"
              title="Hapus pencarian"
              onClick={() => {
                setQuestionKeyword("");
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
        {/* add button */}
        <button
          title="Tambah Mata Kuliah"
          className="grid grid-flow-col-dense gap-2 ml-2 h-12 px-4 items-center  rounded-lg focus-within:shadow-lg overflow-hidden bg-primary-color hover:bg-secondary-color shadow-sm shadow-secondary-color text-white"
          onClick={() => setShowAddQuestionModal(true)}
        >
          <FontAwesomeIcon className="w-5 h-5" icon={faCommentMedical} />
          <h1 className=" hidden sm:block capitalize">Tambah Pertanyaan</h1>
        </button>
        {/* show add question modal */}
        {showAddQuestionModal && (
          <AddQuestion setIsShow={setShowAddQuestionModal} />
        )}
      </div>
      {isQuestionLoading && (
        <h1 className="font-semibold">Memuat pertanyaan...</h1>
      )}
      {isQuestionError && (
        <h1 className="text-primary-color font-semibold">
          Terjadi kesalahan saat memproses permintaan.
        </h1>
      )}
      <div className="grid gap-2 md:grid-cols-2 md:gap-3 ">
        {isQuestionSuccess &&
          questionData.data &&
          questionData.data.map(({ pertanyaan, tipe }, index) => (
            <div
              key={index}
              className="rounded-md overflow-hidden shadow-md p-3 flex flex-col bg-white text-secondary-color"
            >
              <h1 className="font-semibold">{pertanyaan}</h1>
              <h1>
                Tipe: <span className="lowercase">{tipe}</span>
              </h1>
            </div>
          ))}
        {isQuestionSuccess &&
        questionData.message === "There is no record with that query" &&
        questionKeyword !== "" ? (
          <h1 className="text-primary-color font-semibold">
            Pertanyaan tidak ditemukan
          </h1>
        ) : (
          isQuestionSuccess && (
            <h1 className="text-primary-color font-semibold">
              Belum ada pertanyaan yang terdaftar
            </h1>
          )
        )}
      </div>
    </div>
  );
};

export default Questions;
