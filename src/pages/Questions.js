import React, { useState } from "react";
import useFetchQuestionByName from "../hooks/useFetchQuestionByName";
import AddQuestion from "../components/AddQuestion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";

const Questions = () => {
  // to store search value and keyword
  const [questionKeyword, setQuestionKeyword] = useState("");
  const [searchValue, setSearchValue] = useState("");

  // to store add question modal state
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);

  // to fetch question data using useFetchQuestionByName hook
  const {
    data: questionData,
    isLoading: isQuestionLoading,
    isError: isQuestionError,
  } = useFetchQuestionByName({
    keyword: questionKeyword,
  });

  // to handle search question
  const handleSubmit = (event) => {
    event.preventDefault();
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
              minLength={3}
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
          className="flex justify-evenly ml-2 h-12 px-4 items-center  rounded-lg focus-within:shadow-lg overflow-hidden bg-primary-color hover:bg-secondary-color shadow-sm shadow-secondary-color"
          onClick={() => setShowAddQuestionModal(true)}
        >
          <h1 className="text-white hidden sm:block capitalize">
            + Tambah Pertanyaan
          </h1>
        </button>

        {/* show add question modal */}
        {showAddQuestionModal && (
          <AddQuestion setIsShow={setShowAddQuestionModal} />
        )}
      </div>
      {isQuestionLoading && <h1>Loading...</h1>}
      {isQuestionError && <h1>Error...</h1>}
      <div className="grid gap-2 md:grid-cols-2 md:gap-3 ">
        {questionData && questionData.data ? (
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
          ))
        ) : (
          <h1>Data tidak ada</h1>
        )}
      </div>
    </div>
  );
};

export default Questions;
