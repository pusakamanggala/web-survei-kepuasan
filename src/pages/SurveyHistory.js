import React, { useContext } from "react";
import useFetchSurveyHistory from "../hooks/useFetchSurveyHistory";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const SurveyHistory = () => {
  const { userRole, userId } = useContext(UserContext);

  const navigate = useNavigate();

  const {
    data: surveyHistory,
    isSuccess: isSurveyHistorySuccess,
    isLoading: isSurveyHistoryLoading,
    isError: isSurveyHistoryError,
  } = useFetchSurveyHistory({ role: userRole, id: userId });

  // to convert UNIX timestamp to date
  const convertUnixToDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000); // Convert UNIX timestamp to milliseconds

    const day = date.getDate().toString().padStart(2, "0"); // Get day (with leading zero if necessary)
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (with leading zero if necessary)
    const year = date.getFullYear().toString().slice(-2); // Get year (last two digits)

    return `${day}-${month}-${year}`;
  };

  const handleSeeSurveyResult = (survey) => {
    if (userRole === "MAHASISWA") {
      navigate(
        `/survei-kepuasan/riwayat-survei/hasil-survei/${survey.id_survei_mahasiswa}`
      );
    }
    if (userRole === "DOSEN") {
      navigate(
        `/survei-kepuasan/riwayat-survei/hasil-survei/${survey.id_survei_dosen}`
      );
    }
    if (userRole === "ALUMNI") {
      navigate(
        `/survei-kepuasan/riwayat-survei/hasil-survei/${survey.id_survei_alumni}`
      );
    }
  };

  return (
    <div>
      <Helmet>
        <title>Riwayat Survei | Web Survei Kepuasaan</title>
      </Helmet>
      {isSurveyHistoryLoading && <h1>Memuat riwayat survei...</h1>}
      {isSurveyHistoryError && (
        <h1 className="text-primary-color font-bold">
          Terjadi kesalahan saat memproses permintaan
        </h1>
      )}
      {isSurveyHistorySuccess &&
        surveyHistory.message === "There is no record with that query" && (
          <h1 className="font-bold">Belum ada survei yang diisi</h1>
        )}
      {isSurveyHistorySuccess &&
        surveyHistory.data &&
        surveyHistory.data.map((survey, index) => (
          <div
            className="bg-white rounded-lg overflow-hidden shadow-md p-3 flex justify-between items-center cursor-pointer hover:scale-102 transition-all duration-300 mb-2"
            key={index}
            onClick={() => handleSeeSurveyResult(survey)}
          >
            <div>
              <h1 className="text-secondary-color font-bold text-lg">
                {survey.judul_survei}
              </h1>
              <h1>
                Periode : {convertUnixToDate(survey.start_date)} -{" "}
                {convertUnixToDate(survey.end_date)}
              </h1>
              <h1 className="mt-2">
                Disubmit : {convertUnixToDate(survey.submission_date)}
              </h1>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SurveyHistory;
