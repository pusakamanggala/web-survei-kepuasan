import React, { useEffect, useState } from "react";
import useFetchQuestionByName from "../hooks/useFetchQuestionByName";
import QuestionsCard from "../components/QuestionsCard";
import useAddSurveyTemplate from "../hooks/useAddSurveyTemplate.js";
import { useNavigate } from "react-router-dom";
import AddQuestion from "../components/AddQuestion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";
import useNotification from "../hooks/useNotification";

const AddSurveyTemplate = () => {
  const navigate = useNavigate();

  const notify = useNotification();

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
      notify("Mohon isi semua bidang masukan yang ada", "warning");
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
    // check if keyword is empty or less than 3 character
    if (questionSearchValue.trim().length < 3) {
      notify("Kata kunci pencarian minimal terdiri dari 3 karakter", "warning");
      return;
    }
    setQuestionKeyword(questionSearchValue);
  };

  // get questions id from selectedQuestions
  useEffect(() => {
    if (selectedQuestions.length) {
      const questionsId = selectedQuestions.map((question) => question.id);
      setSelectedQuestionsId(questionsId);
    }
  }, [selectedQuestions]);

  // to select questions
  const handleSelectQuestions = (question) => {
    setSelectedQuestions((prevSelected) => {
      const isSelected = prevSelected.some(
        (selectedQuestion) =>
          selectedQuestion.id === question.id_pertanyaan_survei
      );

      if (isSelected) {
        return prevSelected.filter(
          (selectedQuestion) =>
            selectedQuestion.id !== question.id_pertanyaan_survei
        );
      } else {
        return [
          ...prevSelected,
          {
            id: question.id_pertanyaan_survei,
            pertanyaan: question.pertanyaan,
          },
        ];
      }
    });
  };

  // to show notification when add survey template mutation is success or error
  useEffect(() => {
    if (addSurveyTemplateMutation.isSuccess) {
      notify("Template survei berhasil ditambahkan", "success", false);
      setQuestionKeyword(null);
      setQuestionSearchValue("");
      setSurveiName("");
      setSelectedQuestionsId([]);
      setSelectedQuestions([]);
      setQuestionAutoFetch(false);
      addSurveyTemplateMutation.reset();
    }
    if (addSurveyTemplateMutation.isError) {
      notify(
        "Terjadi kesalahan saat menambahkan template survei",
        "error",
        false
      );
      addSurveyTemplateMutation.reset();
    }
  }, [addSurveyTemplateMutation, notify]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <Helmet>
        <title>Tambah Template Survei | Web Survei Kepuasan</title>
      </Helmet>
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
            Tujuan Survei :
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
            <FontAwesomeIcon icon={faMagnifyingGlass} className="h-5 w-5" />
          </div>
          {/* search question */}
          <form className="w-full" onSubmit={handleSearchQuestion}>
            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              value={questionSearchValue}
              placeholder="Cari Pertanyaan"
              onChange={(event) => {
                setQuestionSearchValue(event.target.value);
              }}
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
              <FontAwesomeIcon
                icon={faXmark}
                className="h-5 w-5 text-primary-color"
              />
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
                        // handleSelectQuestionsId(question.id_pertanyaan_survei);
                        handleSelectQuestions(question);
                      }}
                    />
                  ))}
                </div>
              </>
            )}
            {selectedQuestionsId.length > 0 && selectedQuestions.length > 0 && (
              <h1 className="text-sm text-slate-500 mt-4">
                Pertanyaan Terplih
              </h1>
            )}
            {/* show selected questions */}
            <div className="flex justify-between">
              <div>
                {selectedQuestions.map((question, index) => (
                  <h1 key={index}>{`${index + 1}. ${question.pertanyaan}`}</h1>
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
        <div className="text-center text-black font-semibold">
          Menyimpan template survei....
        </div>
      )}
    </div>
  );
};

export default AddSurveyTemplate;
