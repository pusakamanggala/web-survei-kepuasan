import React, { useState } from "react";
import useFetchQuestionByName from "../hooks/useFetchQuestionByName";
import AddQuestion from "../components/AddQuestion";

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
      <div className="flex justify-end mb-4">
        {/* Search bar */}
        <div className=" flex h-12 md:w-72 items-center mx-2 rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2 border-primary-color shadow-sm">
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
              className="rounded-lg overflow-hidden shadow-md p-3 flex flex-col bg-primary-color text-white"
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