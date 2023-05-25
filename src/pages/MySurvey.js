import React, { useContext } from "react";
import useFetchSurvey from "../hooks/useFetchSurvey";
import MySurveyCard from "../components/MySurveyCard";
import { UserContext } from "../context/UserContext";

const MySurvey = () => {
  const { userId, userRole } = useContext(UserContext);

  const {
    data: surveyData,
    isLoading: isSurveyLoading,
    isError: isSurveyError,
    isSuccess: isSurveySuccess,
  } = useFetchSurvey({
    role: userRole,
    id: userId,
  });

  console.log(surveyData);
  return (
    <div>
      {isSurveyLoading && <h1>Loading...</h1>}
      {isSurveyError && <h1>Error...</h1>}
      {isSurveySuccess && (
        <>
          {surveyData.message === "There is no record" ? (
            <h1>Tidak ada survei yang tersedia</h1>
          ) : (
            <>
              {surveyData.data.survei.map((survey) => (
                <MySurveyCard key={survey.idSurvei} surveyData={survey} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MySurvey;
