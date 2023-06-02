import React, { useContext, useEffect, useState } from "react";
import useFetchSurveyHistoryResult from "../hooks/useFetchSurveyHistoryResult";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import UserRatingPieChart from "../components/UserRatingPieChart";

const SurveyHistoryDetail = () => {
  const { userRole } = useContext(UserContext);
  const { idSurvey } = useParams(); // get value from url params
  const [surveyData, setSurveyData] = useState(null); // state for survey data
  const [averageIkm, setAverageIkm] = useState(null); // state for average ikm
  const [totalRatings, setTotalRatings] = useState(null); // state for total ratings

  // to fetch survey result data
  const {
    data,
    isSuccess: isSurveyHistoryResultDataSuccess,
    isLoading: isSurveyHistoryResultLoading,
    isError: isSurveyHistoryResultError,
  } = useFetchSurveyHistoryResult({
    role: userRole,
    id: idSurvey,
  });

  // to get survey data for each question
  useEffect(() => {
    if (isSurveyHistoryResultDataSuccess) {
      const result = data.data.surveyData.map((e) => {
        let obj = {};
        let tempJawaban = {};

        obj["pertanyaan"] = e["pertanyaan"];
        obj["responden"] = e["jawaban"]["responden"];
        obj["totalRespon"] = e["jawaban"]["responden"];
        obj["ikm"] = e["jawaban"]["ikm"];

        tempJawaban = e["jawaban"];
        for (var prop in tempJawaban) {
          if (Object.prototype.hasOwnProperty.call(tempJawaban, prop)) {
            if (tempJawaban[prop]["opsi"] !== undefined) {
              const opsi = tempJawaban[prop]["opsi"];
              const total = tempJawaban[prop]["total"];
              obj[opsi] = total;
            }

            if (tempJawaban[prop]["opsi"] === "ESSAY") {
              const essayJSON = tempJawaban[prop]["essay"];
              if (essayJSON !== undefined) {
                obj["ESSAY"] = essayJSON;
              }
            }
          }
        }

        return obj;
      });

      setSurveyData(result);
    }
  }, [isSurveyHistoryResultDataSuccess, data]);

  // to get average ikm and total ratings
  useEffect(() => {
    const getAverageIKM = () => {
      const filteredSurveyData = surveyData.filter((survey) => !survey.ESSAY);
      const totalIkm = filteredSurveyData.reduce(
        (total, survey) => total + survey.ikm,
        0
      );
      const averageIkm = (totalIkm / filteredSurveyData.length).toFixed(2);

      return averageIkm;
    };

    const sumRatings = () => {
      const ratingsSum = surveyData.reduce(
        (sum, survey) => [
          sum[0] + survey.KURANG,
          sum[1] + survey.CUKUP,
          sum[2] + survey.BAIK,
          sum[3] + survey["SANGAT BAIK"],
        ],
        [0, 0, 0, 0]
      );

      return ratingsSum;
    };

    if (surveyData) {
      setAverageIkm(getAverageIKM());
      setTotalRatings(sumRatings());
    }
  }, [surveyData]);

  if (isSurveyHistoryResultLoading) return <h1>Loading...</h1>;

  if (isSurveyHistoryResultError) {
    return (
      <h1 className="text-primary-color font-bold">
        Terjadi kesalahan saat memproses permintaan
      </h1>
    );
  }

  return (
    <div>
      {isSurveyHistoryResultDataSuccess && (
        <>
          <div className="flex justify-between mb-4">
            <div>
              {userRole === "MAHASISWA" && (
                <>
                  <h1 className="text-lg font-bold text-primary-color ">
                    {data.data.namaKelas}
                  </h1>
                  <h1>
                    Dosen Pengampu :{" "}
                    <span className="text-primary-color font-semibold">
                      {data.data.namaDosen}
                    </span>
                  </h1>
                </>
              )}
            </div>
            {/* show average indeks kepuasan */}
            <h1 className="md:text-2xl text-lg font-bold text-primary-color mb-4">
              Indeks Kepuasan : {averageIkm}
            </h1>
          </div>
          <div className="bg-white mb-2 md:flex md:justify-evenly p-2 items-center">
            <div>
              <UserRatingPieChart rating={totalRatings} />
            </div>
            <div>
              {/* tabel predikat indeks kepuasan */}
              <table className="table-fixed border border-black md:w-96 w-full text-center mt-4 md:mt-0">
                <thead>
                  <tr className="bg-primary-color">
                    <th className="border border-black text-white">
                      Indeks Kepuasan
                    </th>
                    <th className="border border-black text-white">Predikat</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black">&lt; 1.75</td>
                    <td className="border border-black">Kurang</td>
                  </tr>
                  <tr>
                    <td className="border border-black">&lt; 2.5</td>
                    <td className="border border-black">Cukup</td>
                  </tr>
                  <tr>
                    <td className="border border-black">&lt; 3.25</td>
                    <td className="border border-black">Baik</td>
                  </tr>
                  <tr>
                    <td className="border border-black">&lt;= 4</td>
                    <td className="border border-black">Sangat Baik</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {surveyData &&
        surveyData.map((survey, index) => (
          <div key={index} className="bg-white rounded-md shadow-lg p-4 mb-2">
            <h1 className="mb-2 font-semibold text-secondary-color">
              {survey.pertanyaan}
            </h1>
            {survey.ESSAY ? (
              <ul>
                {Array.isArray(survey.ESSAY) && survey.ESSAY.length > 0
                  ? survey.ESSAY.map((essay, index) => (
                      <li key={index}>
                        <h1>
                          <span>{index + 1}.</span> {essay}
                        </h1>
                      </li>
                    ))
                  : null}
              </ul>
            ) : (
              <>
                {/* for desktop screen */}
                <table className="w-full table-fixed md:table hidden">
                  <tbody>
                    <tr>
                      <td>
                        <span className="text-slate-500">Kurang : </span>
                        {survey.KURANG}
                      </td>
                      <td>
                        <span className="text-slate-500">Cukup : </span>
                        {survey.CUKUP}
                      </td>
                      <td>
                        <span className="text-slate-500">Baik : </span>
                        {survey.BAIK}
                      </td>
                      <td>
                        <span className="text-slate-500">Sangat Baik : </span>
                        {survey["SANGAT BAIK"]}
                      </td>
                      <td>
                        <span className="text-slate-500">
                          Indeks Kepuasan :{" "}
                        </span>
                        {survey.ikm.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {/* for mobile screen */}
                <div className="md:hidden">
                  <h1>
                    <span className="text-slate-500">Kurang : </span>
                    {survey.KURANG}
                  </h1>
                  <h1>
                    <span className="text-slate-500">Cukup : </span>
                    {survey.CUKUP}
                  </h1>
                  <h1>
                    <span className="text-slate-500">Baik : </span>
                    {survey.BAIK}
                  </h1>
                  <h1>
                    <span className="text-slate-500">Sangat Baik : </span>
                    {survey["SANGAT BAIK"]}
                  </h1>
                  <h1>
                    <span className="text-slate-500">Indeks Kepuasan : </span>
                    {survey.ikm}
                  </h1>
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default SurveyHistoryDetail;
