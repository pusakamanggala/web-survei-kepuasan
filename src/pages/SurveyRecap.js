import React from "react";
import { useParams } from "react-router-dom";
import useFetchSurveyRecap from "../hooks/useFetchSurveyRecap";
import UserRatingPieChart from "../components/UserRatingPieChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExport } from "@fortawesome/free-solid-svg-icons";
import LecturerRecapBarChart from "../components/LecturerRecapBarChart";

const SurveyRecap = () => {
  const { role, survey } = useParams();
  const {
    data: surveyRecapData,
    isLoading: isSurveyRecapLoading,
    isError: isSurveyRecapError,
    isSuccess: isSurveyRecapSuccess,
  } = useFetchSurveyRecap({ role: role, survey: survey });
  if (isSurveyRecapLoading) {
    return <p>Loading...</p>;
  }
  if (isSurveyRecapError) {
    return <p>Error...</p>;
  }
  if (
    isSurveyRecapSuccess &&
    surveyRecapData.message === "There is no record with that query"
  ) {
    return <p>Belum ada respon untuk survei ini</p>;
  }

  const getRatingArray = (rating) => {
    const ratingArray = [
      rating.hasilRekap.dm0KtbQPdK0Pfazv8opf.total,
      rating.hasilRekap["21craH0rvALjqlnwcOI6"].total,
      rating.hasilRekap["6ULGZb5Vxwy9wdNNhYdc"].total,
      rating.hasilRekap.z5OHO3jjoYXq4GHXacIR.total,
    ];
    return ratingArray;
  };

  const getLecturerIkmObject = () => {
    let obj = {};
    surveyRecapData.data.forEach((item) => {
      obj[item.namaDosen] = item.hasilRekap.ikm.toFixed(2);
    });
    return obj;
  };

  const getSurveyRespondent = () => {
    let obj = {};
    surveyRecapData.data.forEach((item) => {
      obj[item.namaDosen] = item.hasilRekap.responden;
    });
    return obj;
  };

  return (
    <div className="bg-white rounded-md shadow-md p-6">
      <div className="flex justify-between mb-4 items-center">
        <h1 className="capitalize font-bold text-primary-color text-xl">
          Rekap Survey {role}
        </h1>
        <button
          type="button"
          className="flex items-center bg-primary-color shadow-md hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          <h1 className="flex">
            Ekpor <span className="hidden md:block ml-1">Rekap</span>
          </h1>
          <FontAwesomeIcon icon={faFileExport} className="ml-2" />
        </button>
      </div>
      {/* responden and ikm bar chart for student survei */}
      {role === "mahasiswa" && (
        <>
          <div className="mb-4 h-44">
            <LecturerRecapBarChart
              label="Responden"
              ikmData={getSurveyRespondent()}
            />
          </div>
          <div className="mb-4 h-44">
            <LecturerRecapBarChart
              label="Indeks Kepuasan Mahasiswa"
              ikmData={getLecturerIkmObject()}
            />
          </div>
        </>
      )}

      {role === "alumni" || role === "dosen" ? (
        <>
          {isSurveyRecapSuccess && surveyRecapData.data && (
            <>
              <div className="grid md:grid-cols-2 mb-2 items-center">
                <div className="md:mb-0 mb-4">
                  <UserRatingPieChart
                    rating={getRatingArray(surveyRecapData.data)}
                  />
                </div>
                <div>
                  <table className="table-fixed border border-black w-full mb-2">
                    <thead className="bg-primary-color text-white">
                      <tr>
                        <th className="border border-black">Bobot</th>
                        <th className="border border-black">Respon</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-black p-1">Kurang</td>
                        <td className="border border-black text-center">
                          {
                            surveyRecapData.data.hasilRekap[
                              "dm0KtbQPdK0Pfazv8opf"
                            ].total
                          }
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black p-1">Cukup</td>
                        <td className="border border-black text-center">
                          {
                            surveyRecapData.data.hasilRekap[
                              "21craH0rvALjqlnwcOI6"
                            ].total
                          }
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black p-1">Baik</td>
                        <td className="border border-black text-center">
                          {
                            surveyRecapData.data.hasilRekap[
                              "6ULGZb5Vxwy9wdNNhYdc"
                            ].total
                          }
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-black p-1">Sangat Baik</td>
                        <td className="border border-black text-center">
                          {
                            surveyRecapData.data.hasilRekap[
                              "z5OHO3jjoYXq4GHXacIR"
                            ].total
                          }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="table-fixed border bg-primary-color text-white font-semibold border-black w-full text-center">
                    <thead>
                      <tr className="border border-black">
                        <td className="border border-white">Total Respon</td>
                        <td className="border border-white">
                          {surveyRecapData.data.hasilRekap.totalRespon}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-white">Responden</td>
                        <td className="border border-white">
                          {surveyRecapData.data.hasilRekap.responden}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-white">IKM</td>
                        <td className="border border-white">
                          {surveyRecapData.data.hasilRekap.ikm.toFixed(2)}
                        </td>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>

              <h1>Respon soal terbuka</h1>
              {surveyRecapData.data &&
                surveyRecapData.data.hasilRekap[
                  "rnDvcWSJ3ASo3NLe1mg7"
                ].essay.map((essay, index) => (
                  <div key={index}>
                    <p>
                      {index + 1}. {essay}
                    </p>
                  </div>
                ))}
            </>
          )}
        </>
      ) : role === "mahasiswa" ? (
        <>
          {isSurveyRecapSuccess && surveyRecapData.data && (
            <>
              {surveyRecapData.data.map((item, index) => (
                <div className="border-t-2 border-gray-300 py-2" key={index}>
                  <h1 className="text-black text-lg mb-4">
                    Nama Dosen :{" "}
                    <span className="font-bold text-primary-color">
                      {item.namaDosen}
                    </span>
                  </h1>
                  <div className="grid md:grid-cols-2 mb-2 items-center">
                    <div className="md:mb-0 mb-4">
                      <UserRatingPieChart rating={getRatingArray(item)} />
                    </div>
                    <div>
                      <table className="table-fixed border border-black w-full mb-2">
                        <thead className="bg-primary-color text-white">
                          <tr>
                            <th className="border border-black">Bobot</th>
                            <th className="border border-black">Respon</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-black p-1">Kurang</td>
                            <td className="border border-black text-center">
                              {item.hasilRekap["dm0KtbQPdK0Pfazv8opf"].total}
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-black p-1">Cukup</td>
                            <td className="border border-black text-center">
                              {item.hasilRekap["21craH0rvALjqlnwcOI6"].total}
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-black p-1">Baik</td>
                            <td className="border border-black text-center">
                              {item.hasilRekap["6ULGZb5Vxwy9wdNNhYdc"].total}
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-black p-1">
                              Sangat Baik
                            </td>
                            <td className="border border-black text-center">
                              {item.hasilRekap["z5OHO3jjoYXq4GHXacIR"].total}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table className="table-fixed border bg-primary-color text-white font-semibold border-black w-full text-center">
                        <thead>
                          <tr className="border border-black">
                            <td className="border border-white">
                              Total Respon
                            </td>
                            <td className="border border-white">
                              {item.hasilRekap.totalRespon}
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-white">Responden</td>
                            <td className="border border-white">
                              {item.hasilRekap.responden}
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-white">IKM</td>
                            <td className="border border-white">
                              {item.hasilRekap.ikm.toFixed(2)}
                            </td>
                          </tr>
                        </thead>
                      </table>
                    </div>
                  </div>
                  <h1>Respon soal terbuka</h1>
                  {item.hasilRekap["rnDvcWSJ3ASo3NLe1mg7"].essay.map(
                    (essay, index) => (
                      <div key={index}>
                        <p>
                          {index + 1}. {essay}
                        </p>
                      </div>
                    )
                  )}
                </div>
              ))}
            </>
          )}
        </>
      ) : null}
    </div>
  );
};

export default SurveyRecap;
