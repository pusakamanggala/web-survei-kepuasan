import React, { useContext } from "react";
import useFetchSurveyHistory from "../hooks/useFetchSurveyHistory";
import { UserContext } from "../context/UserContext";

const SurveyHistory = () => {
  const { userRole, userId } = useContext(UserContext);

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

  if (isSurveyHistoryLoading) return <h1>Loading...</h1>;
  if (isSurveyHistoryError)
    return (
      <h1 className="text-primary-color font-bold">
        Terjadi kesalahan saat memproses permintaan
      </h1>
    );

  return (
    <div>
      {isSurveyHistorySuccess &&
        surveyHistory.data.map((survey, index) => (
          <div
            className="bg-white rounded-lg overflow-hidden shadow-md p-3 flex justify-between items-center cursor-pointer hover:scale-102 transition-all duration-300 mb-2"
            key={index}
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
