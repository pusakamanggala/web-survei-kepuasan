import React, { useEffect } from "react";
import { useState } from "react";
import useAddQuestion from "../hooks/useAddQuestion";
import useNotification from "../hooks/useNotification";

const AddQuestion = (props) => {
  const { setIsShow } = props; // to set is show modal or not

  // to store question and question type
  const [question, setQuestion] = useState("");
  const [questionType, setQuestionType] = useState(null);

  const notify = useNotification(); // to show notification

  const addQuestionMutation = useAddQuestion(); // to add question using useAddQuestion hook

  // to handle submit question
  const handleSumbtiQuestion = (event) => {
    event.preventDefault();
    // form cannot be empty before submit
    if (question.trim().length === 0 || !questionType) {
      notify("Pertanyaan dan jenis pertanyaan tidak boleh kosong", "warning");
      return;
    }
    // question must have length between 10 and 200
    if (question.trim().length < 10 || question.trim().length > 200) {
      notify(
        "Pertanyaan harus memiliki panjang 10 sampai 200 karakter",
        "warning"
      );
      return;
    }
    // data to add question
    const data = {
      payload: [
        {
          tipe: questionType,
          pertanyaan: question,
        },
      ],
    };
    // sending data using addQuestionMutation
    addQuestionMutation.mutate(data);
  };

  useEffect(() => {
    if (addQuestionMutation.isSuccess) {
      notify("Berhasil menambahkan pertanyaan", "success", false);
      setQuestion("");
      setQuestionType(null);
      addQuestionMutation.reset();
    }
    if (addQuestionMutation.isError) {
      notify("Terjadi kesalahan dalam memproses permintaan", "error", false);
      addQuestionMutation.reset();
    }
  }, [addQuestionMutation, notify, setIsShow]);

  return (
    <div className="fixed top-0 left-0 w-full h-full text-primary-color bg-gray-900 bg-opacity-50 z-40">
      <div className="flex justify-center items-center h-full">
        <div className="modal p-6 w-96 bg-white shadow-md rounded-md relative">
          {/* input question */}
          <div>
            <h1 className="text-center mb-4">Tambah Pertanyaan Baru</h1>
            <textarea
              value={question}
              placeholder="Masukan Pertanyaan"
              className="w-full border-2 border-primary-color rounded-md h-20 text-sm text-gray-700 p-2"
              onChange={(event) => setQuestion(event.target.value)}
              required
            />
          </div>
          {/* input question type */}
          <h1 className="my-2">Jenis Pertanyaan</h1>
          <div className="flex">
            <label className="mr-2">
              <input
                type="radio"
                name="questionType"
                value="opsi"
                onChange={(event) => setQuestionType(event.target.value)}
                checked={questionType === "opsi"}
                className="mr-2"
              />
              Opsi
            </label>
            <label>
              <input
                type="radio"
                name="questionType"
                value="essay"
                onChange={(event) => setQuestionType(event.target.value)}
                checked={questionType === "essay"}
                className="mr-2"
              />
              Essay
            </label>
          </div>
          {/* cancel and submit button */}
          <div className="mt-5 flex justify-end">
            <button
              title="Batal"
              className="font-bold py-2 px-4 rounded mr-2 text-white bg-primary-color hover:bg-secondary-color"
              onClick={() => {
                setIsShow(false);
              }}
            >
              Batal
            </button>
            <button
              title="Tambahkan Mahasiswa ke Kelas"
              className="font-bold py-2 px-4 rounded text-white bg-primary-color hover:bg-secondary-color"
              onClick={handleSumbtiQuestion}
            >
              Tambah
            </button>
          </div>
          {/* to show response message */}
          <div className="mt-4 text-center">
            {addQuestionMutation.isLoading && (
              <p className="text-black font-semibold">
                Menambahkan pertanyaan...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;
