import React, { useEffect, useState } from "react";
import useFetchQuestionByName from "../hooks/useFetchQuestionByName";
import QuestionsCard from "../components/QuestionsCard";
import useAddSurveyTemplate from "../hooks/useAddSurveyTemplate.js";
import { useNavigate } from "react-router-dom";
import AddQuestion from "../components/AddQuestion";

const AddSurveyTemplate = () => {
  const navigate = useNavigate();

  // to store survey template data
  const [surveiName, setSurveiName] = useState("");
  const [role, setRole] = useState("mahasiswa");

  // to store selected question value
  const [selectedQuestionsId, setSelectedQuestionsId] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  // to store question search value and keyword
  const [questionSearchValue, setQuestionSearchValue] = useState("");
  const [questionKeyword, setQuestionKeyword] = useState(null); // set to null prevent it to use chached data from antoher component

  // to set auto fetch question data
  const [questionAutoFetch, setQuestionAutoFetch] = useState(false);

  // to set modal state
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);

  // to add survey template using useAddSurveyTemplate hook
  const addSurveyTemplateMutation = useAddSurveyTemplate();

  // to fetch question data using useFetchQuestionByName hook
  const {
    data: questionData,
    isLoading: isQuestionLoading,
    isError: isQuestionError,
    isSuccess: isQuestionSuccess,
  } = useFetchQuestionByName({
    keyword: questionKeyword,
    autoFetch: questionAutoFetch,
  });

  // to fetch question data when questionKeyword is changed
  useEffect(() => {
    if (questionKeyword) {
      setQuestionAutoFetch(true);
    }
  }, [questionKeyword, setQuestionAutoFetch]);

  // to handle submit survey template
  const handleSubmitSurveyTemplate = (event) => {
    event.preventDefault();

    if (!surveiName || !role || !selectedQuestionsId.length) {
      alert("Harap isi semua field");
      return;
    }
    // confirm before submit
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menyimpan template survei ?. Template Tidak bisa diubah atau dihapus setelah disimpan"
    );
    if (confirmed) {
      addSurveyTemplateMutation.mutate({
        namaTemplate: surveiName,
        role: role,
        pertanyaan: selectedQuestionsId,
      });
    }
  };

  // to search questions
  const handleSearchQuestion = (event) => {
    event.preventDefault();
    setQuestionKeyword(questionSearchValue);
  };

  // to select questions
  const handleSelectQuestions = (questionId) => {
    setSelectedQuestions((prevSelected) => {
      const isSelected = prevSelected.includes(questionId);
      if (isSelected) {
        return prevSelected.filter((id) => id !== questionId);
      } else {
        return [...prevSelected, questionId];
      }
    });
  };

  // to select questions id
  const handleSelectQuestionsId = (questionId) => {
    setSelectedQuestionsId((prevSelected) => {
      const isSelected = prevSelected.includes(questionId);
      if (isSelected) {
        return prevSelected.filter((id) => id !== questionId);
      } else {
        return [...prevSelected, questionId];
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* input survei template name */}
      <div className="mb-4 grid lg:grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="surveiName"
            className="block text-gray-700 font-bold mb-2 "
          >
            Nama Template :
          </label>
          <input
            type="text"
            id="surveiName"
            name="surveiName"
            placeholder="Ex : Template Pertanyaan Survei Kepuasan Dosen 2023"
            required
            value={surveiName}
            autoComplete="off"
            onChange={(event) => setSurveiName(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus-within:shadow-md"
          />
        </div>
        {/* input survei template role */}
        <div>
          <label
            htmlFor="surveiName"
            className="block text-gray-700 font-bold mb-2"
          >
            Role :
          </label>
          <select
            title="Sasaran Survei"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(event) => setRole(event.target.value)}
            defaultValue={role}
          >
            <option value="mahasiswa">Mahasiswa</option>
            <option value="dosen">Dosen</option>
            <option value="alumni">Alumni</option>
          </select>
        </div>
      </div>
      {/* Input question */}
      <div className="pb-5">
        <label htmlFor="course" className="block text-gray-700 font-bold mb-2">
          Pertanyaan :
        </label>
        <div className=" flex h-12 items-center rounded-lg focus-within:shadow-md bg-white overflow-hidden border-2  shadow-sm">
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
          {/* search question */}
          <form className="w-full" onSubmit={handleSearchQuestion}>
            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              minLength={3}
              value={questionSearchValue}
              placeholder="Cari Pertanyaan"
              onChange={(event) => {
                setQuestionSearchValue(event.target.value);
              }}
              required
            />
          </form>
          {questionSearchValue && (
            <button
              className="cursor-pointer m-2"
              title="Hapus pencarian"
              onClick={() => {
                setQuestionSearchValue("");
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
        {isQuestionLoading && (
          <div className="ml-2 text-primary-color font-semibold">
            Mencari pertanyaan....
          </div>
        )}
        {isQuestionError && (
          <div className="ml-2 text-primary-color font-semibold">
            Terjadi kesalahan saat memproses permintaan
          </div>
        )}
        {isQuestionSuccess && (
          <div className="mt-2">
            {questionData &&
            questionData.message === "There is no record with that query" ? (
              <div className="mt-2 ml-2 flex ">
                <h1 className="text-primary-color font-semibold mr-1">
                  Pertanyaan tidak ditemukan.
                </h1>
                <h1
                  className="underline cursor-pointer text-blue-500"
                  onClick={() => setShowAddQuestionModal(true)}
                >
                  Tambah Pertanyaan Baru
                </h1>
              </div>
            ) : (
              <>
                <h1 className="text-sm text-slate-500 mb-4">
                  Pilih Pertanyaan
                </h1>
                {/*  */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
                  {questionData.data.map((question, index) => (
                    <QuestionsCard
                      key={index}
                      questions={question}
                      bgColor={
                        selectedQuestionsId.includes(
                          question.id_pertanyaan_survei
                        )
                          ? "bg-primary-color"
                          : "bg-gray-100"
                      }
                      textColor={
                        selectedQuestionsId.includes(
                          question.id_pertanyaan_survei
                        )
                          ? "text-white"
                          : "text-black"
                      }
                      // click card to add or remove question
                      onClick={() => {
                        handleSelectQuestionsId(question.id_pertanyaan_survei);
                        handleSelectQuestions(question.pertanyaan);
                      }}
                    />
                  ))}
                </div>
                {selectedQuestionsId.length > 0 &&
                  selectedQuestions.length > 0 && (
                    <h1 className="text-sm text-slate-500 mt-4">
                      Pertanyaan Terplih
                    </h1>
                  )}

                {/* show selected questions */}
                <div className="flex justify-between">
                  <div>
                    {selectedQuestions.map((question, index) => (
                      <h1 key={index}>{`${index + 1}. ${question}`}</h1>
                    ))}
                  </div>
                  {/* clear questions button */}
                  {selectedQuestionsId.length > 0 &&
                    selectedQuestions.length > 0 && (
                      <button
                        title="Hapus semua pertanyaan terpilih"
                        className="font-bold h-fit py-2 px-4 rounded text-white bg-primary-color hover:bg-secondary-color"
                        onClick={() => {
                          setSelectedQuestionsId([]);
                          setSelectedQuestions([]);
                        }}
                      >
                        Hapus Semua
                      </button>
                    )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
      {/* submit and cancel button */}
      <div className="flex justify-end">
        {/* onclick go back */}

        <button
          title="Bataklan Proses"
          className="font-bold h-fit py-2 px-4 rounded mr-2 text-white bg-primary-color hover:bg-secondary-color"
          onClick={() => navigate("/survei-kepuasan/template-survei")}
        >
          Cancel
        </button>
        <button
          title="Submit Template Survei"
          className="font-bold h-fit py-2 px-4 rounded  text-white bg-primary-color hover:bg-secondary-color"
          onClick={handleSubmitSurveyTemplate}
        >
          Submit
        </button>
      </div>
      {showAddQuestionModal && (
        <AddQuestion setIsShow={setShowAddQuestionModal} />
      )}
      {/* submit template proccess */}
      {addSurveyTemplateMutation.isLoading && (
        <div className="text-center text-primary-color text-lg font-semibold">
          Menyimpan Template Survei....
        </div>
      )}
      {addSurveyTemplateMutation.isError && (
        <div className="text-center text-primary-color text-lg font-semibold">
          Terjadi Kesalahan Saat Memproses Permintaan
        </div>
      )}
      {addSurveyTemplateMutation.isSuccess && (
        <div>
          <h1 className="text-lg font-semibold text-green-600">
            Template Survei Berhasil Disimpan
          </h1>
          {setTimeout(() => window.location.reload(), 5000)}
        </div>
      )}
    </div>
  );
};

export default AddSurveyTemplate;
