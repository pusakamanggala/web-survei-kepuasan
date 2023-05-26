import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const MySurveyCard = ({ surveyData }) => {
  const { userRole, setSurvey, survey } = useContext(UserContext);
  const navigate = useNavigate();

  // to convert UNIX timestamp to date
  function convertUnixToDate(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); // Convert UNIX timestamp to milliseconds

    const day = date.getDate().toString().padStart(2, "0"); // Get day (with leading zero if necessary)
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (with leading zero if necessary)
    const year = date.getFullYear().toString().slice(-2); // Get year (last two digits)

    return `${day}-${month}-${year}`;
  }

  const handleSelectSurvey = () => {
    setSurvey(surveyData);
    localStorage.setItem("survey", JSON.stringify(surveyData));
    navigate(`/survei-kepuasan/survei-saya/${surveyData.idSurvei}`);
  };

  console.log("survey data di context", survey);

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md p-3 flex justify-between items-center cursor-pointer hover:scale-102 transition-all duration-300 mb-2"
      onClick={handleSelectSurvey}
    >
      <div className="flex justify-between w-full items-center">
        <div>
          {/* Survey Title */}
          <h1 className="text-secondary-color font-bold text-lg">
            {surveyData.judulSurvei}
          </h1>
          {/* Survey Class */}
          {userRole === "MAHASISWA" && (
            <h1>Kelas : {surveyData.kelas.namaKelas}</h1>
          )}

          <h1>
            Periode : {convertUnixToDate(surveyData.startDate)} -{" "}
            {convertUnixToDate(surveyData.endDate)}
          </h1>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#c20000"
          className="w-8 h-8 mr-7"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
          />
        </svg>
      </div>
    </div>
  );
};

export default MySurveyCard;
