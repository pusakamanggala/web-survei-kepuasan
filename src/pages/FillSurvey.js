import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useFillSurvey from "../hooks/useFillSurvey";

const FillSurvey = () => {
  const { userRole, survey, userId } = useContext(UserContext);
  const { idSurvey } = useParams(); // Get survey id from the url
  const navigate = useNavigate();
  const [answer, setAnswer] = useState([]); // State for opstions answer
  const [essayAnswer, setEssayAnswer] = useState([]); // State for essay answer
  const [allAnswer, setAllAnswer] = useState([]); // State for all answer

  const fillSurveyMutation = useFillSurvey(userRole);
  // destruc survey
  const { pertanyaan } = survey;
  useEffect(() => {
    if (survey.idSurvei !== idSurvey) {
      navigate("/survei-kepuasan/survei-saya");
    }
  });

  // combine all answer
  useEffect(() => {
    setAllAnswer([...answer, ...essayAnswer]);
  }, [answer, essayAnswer]);

  const optionsQuestion = (questionId) => {
    const handleOptionChange = (event) => {
      const selectedOption = event.target.value;

      setAnswer((prevAnswer) => {
        // Check if the questionId already exists in the answer state
        const existingIndex = prevAnswer.findIndex(
          (item) => item.idPertanyaan === questionId
        );

        if (existingIndex !== -1) {
          // Update the existing answer for the questionId
          const updatedAnswer = [...prevAnswer];
          updatedAnswer[existingIndex].idOpsi = selectedOption;
          return updatedAnswer;
        } else {
          // Add a new answer for the questionId
          return [
            ...prevAnswer,
            { idPertanyaan: questionId, idOpsi: selectedOption },
          ];
        }
      });
    };

    return (
      <div className="md:w-2/4 w-full flex justify-evenly">
        <h1>Kurang</h1>
        <input
          type="radio"
          title="1"
          value={"dm0KtbQPdK0Pfazv8opf"}
          className="h-5 w-5"
          name={`question-${questionId}`}
          checked={
            answer.find((item) => item.idPertanyaan === questionId)?.idOpsi ===
            "dm0KtbQPdK0Pfazv8opf"
          }
          onChange={handleOptionChange}
        />
        <input
          type="radio"
          title="2"
          value={"21craH0rvALjqlnwcOI6"}
          className="h-5 w-5"
          name={`question-${questionId}`}
          checked={
            answer.find((item) => item.idPertanyaan === questionId)?.idOpsi ===
            "21craH0rvALjqlnwcOI6"
          }
          onChange={handleOptionChange}
        />
        <input
          type="radio"
          title="3"
          value={"6ULGZb5Vxwy9wdNNhYdc"}
          className="h-5 w-5"
          name={`question-${questionId}`}
          checked={
            answer.find((item) => item.idPertanyaan === questionId)?.idOpsi ===
            "6ULGZb5Vxwy9wdNNhYdc"
          }
          onChange={handleOptionChange}
        />
        <input
          type="radio"
          title="4"
          value={"z5OHO3jjoYXq4GHXacIR"}
          className="h-5 w-5"
          name={`question-${questionId}`}
          checked={
            answer.find((item) => item.idPertanyaan === questionId)?.idOpsi ===
            "z5OHO3jjoYXq4GHXacIR"
          }
          onChange={handleOptionChange}
        />
        <h1>Sangat Baik</h1>
      </div>
    );
  };

  const essayQuestion = (questionId) => {
    const handleEssayChange = (event) => {
      const essayValue = event.target.value;

      setEssayAnswer((prevAnswer) => {
        const existingIndex = prevAnswer.findIndex(
          (item) => item.idPertanyaan === questionId
        );

        if (existingIndex !== -1) {
          const updatedAnswer = [...prevAnswer];
          updatedAnswer[existingIndex].essay = essayValue;
          return updatedAnswer;
        } else {
          return [
            ...prevAnswer,
            {
              idPertanyaan: questionId,
              idOpsi: "rnDvcWSJ3ASo3NLe1mg7",
              essay: essayValue,
            },
          ];
        }
      });
    };

    return (
      <div className="w-full">
        <textarea
          className="w-full h-20 border-2 border-gray-300 p-2 rounded-md"
          placeholder="Tulis jawabanmu disini..."
          value={
            essayAnswer.find((item) => item.idPertanyaan === questionId)
              ?.essay || ""
          }
          onChange={handleEssayChange}
        ></textarea>
      </div>
    );
  };

  const handleSubmitSurvei = () => {
    // Check if allAnswer is empty or contains any empty string or whitespace-only string
    const hasEmptyAnswer =
      allAnswer.length === 0 ||
      allAnswer.some((answer) => {
        // Check if answer is an object with an empty string or whitespace-only string value
        return Object.values(answer).some(
          (value) => typeof value === "string" && value.trim() === ""
        );
      });

    // Check if the length of pertanyaan and allAnswer is the same
    const hasMismatchedLength = pertanyaan.length !== allAnswer.length;

    if (hasEmptyAnswer || hasMismatchedLength) {
      alert("Isi semua pertanyaan yang ada");
      return;
    }

    let data = {};

    if (userRole === "MAHASISWA" || userRole === "ALUMNI") {
      data = {
        nim: userId,
        idSurvei: survey.idSurvei,
        submissionDate: getCurrentUnixTimestamp(),
        jawaban: allAnswer,
      };
    } else if (userRole === "DOSEN") {
      data = {
        nip: userId,
        idSurvei: survey.idSurvei,
        submissionDate: getCurrentUnixTimestamp(),
        jawaban: allAnswer,
      };
    }

    // post data using hook
    fillSurveyMutation.mutate(data);
  };

  //get date in unix
  function getCurrentUnixTimestamp() {
    const currentDate = new Date();
    const unixTimestamp = Math.floor(currentDate.getTime() / 1000);
    return unixTimestamp;
  }

  // when user successfully submits the survey
  if (fillSurveyMutation.isSuccess) {
    localStorage.removeItem("survey"); // Remove the "survey" key from local storage

    // Delay the navigation by 2 seconds
    setTimeout(() => {
      navigate("/survei-kepuasan/survei-saya"); // Redirect to dashboard
    }, 2000);
  }

  return (
    <div className="w-full   p-6">
      {/* Survey info */}
      <div className="mb-5">
        <h1 className="font-bold text-xl text-secondary-color mb-2">
          {survey.judulSurvei}
        </h1>
        {userRole === "MAHASISWA" && (
          <div className="mb-2 font-semibold">
            <h1>Kelas : {survey.kelas.namaKelas}</h1>
            <h1>Dosen Pengampu : {survey.kelas.namDosen}</h1>
          </div>
        )}
        <h1 className="mb-2 ">{survey.detailSurvei}</h1>
      </div>
      {/* Survey Questions */}
      <div>
        {pertanyaan.map((question, index) => (
          <div
            key={question.idPertanyaan}
            className="mb-5 bg-white p-6 rounded-md shadow-lg"
          >
            <div className="mb-12">
              <h1 className="font-semibold text-lg text-secondary-color mb-5">
                {question.pertanyaan}
              </h1>
            </div>
            <div className="flex w-full items-center justify-center">
              {question.tipe === "OPSI"
                ? optionsQuestion(question.idPertanyaan)
                : essayQuestion(question.idPertanyaan)}
            </div>
          </div>
        ))}
      </div>
      <div className="flex w-full justify-end">
        <button
          title="Submit Survei"
          className="font-bold py-2 px-4 rounded text-white bg-primary-color hover:bg-secondary-color shadow-lg"
          onClick={handleSubmitSurvei}
        >
          Submit Jawaban
        </button>
      </div>
      {/* show fill survey status */}
      {fillSurveyMutation.isLoading && (
        <h1 className="text-center text-primary-color font-semibold">
          Menyimpang jawaban anda...
        </h1>
      )}
      {fillSurveyMutation.isError && (
        <h1 className="text-center text-secondary-color font-semibold">
          Terjadi kesalahan saat memproses permintaan !
        </h1>
      )}
      {fillSurveyMutation.isSuccess && (
        <div>
          <h1 className="text-center text-green-500 font-semibold">
            Jawaban anda berhasil disimpan !
          </h1>
          <p className="text-center">Halaman akan dialihkan dalam 2 detik</p>
        </div>
      )}
    </div>
  );
};

export default FillSurvey;
