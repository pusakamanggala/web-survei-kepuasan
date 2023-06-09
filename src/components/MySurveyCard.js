import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const MySurveyCard = ({ surveyData }) => {
  const { userRole, setSurvey } = useContext(UserContext);
  const navigate = useNavigate();

  // to convert UNIX timestamp to date
  function convertUnixToDate(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); // Convert UNIX timestamp to milliseconds

    const day = date.getDate().toString().padStart(2, "0"); // Get day (with leading zero if necessary)
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (with leading zero if necessary)
    const year = date.getFullYear().toString().slice(-2); // Get year (last two digits)

    return `${day}-${month}-${year}`;
  }

  // to select survey and save it to localStorage
  const handleSelectSurvey = () => {
    setSurvey(surveyData);
    localStorage.setItem("survey", JSON.stringify(surveyData));
    navigate(`/survei-kepuasan/survei-saya/${surveyData.idSurvei}`);
  };

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

        <FontAwesomeIcon
          icon={faPaperPlane}
          className="text-primary-color w-8 h-8 mr-7 rotate-45"
        />
      </div>
    </div>
  );
};

export default MySurveyCard;
