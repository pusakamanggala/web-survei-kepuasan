import React from "react";
import { useParams } from "react-router-dom";
import useFetchSurveyRecap from "../hooks/useFetchSurveyRecap";
import UserRatingPieChart from "../components/UserRatingPieChart";
import LecturerRecapBarChart from "../components/LecturerRecapBarChart";
import ExportSurveyRecapButton from "../components/ExportSurveyRecapButton";
import { Helmet } from "react-helmet-async";

const SurveyRecap = () => {
  const { role, survey } = useParams();
  const {
    data: surveyRecapData,
    isLoading: isSurveyRecapLoading,
    isError: isSurveyRecapError,
    isSuccess: isSurveyRecapSuccess,
  } = useFetchSurveyRecap({ role: role, survey: survey });

  // to set page title
  const PageTitle = () => {
    return (
      <Helmet>
        <title>
          Rekap Survei {role.charAt(0).toUpperCase() + role.slice(1)} | Web
          Survei Kepuasan
        </title>
      </Helmet>
    );
  };

  if (isSurveyRecapLoading) {
    return (
      <>
        <PageTitle />
        <p>Memuat data rekapitulasi survei...</p>
      </>
    );
  }
  if (isSurveyRecapError) {
    return (
      <>
        <PageTitle />
        <p className="text-primary-color">
          Terjadi kesalahan saat memproses permintaan !
        </p>
      </>
    );
  }
  if (
    isSurveyRecapSuccess &&
    surveyRecapData.message === "There is no record with that query"
  ) {
    return (
      <>
        <PageTitle />
        <p>Belum ada respon untuk survei ini</p>
      </>
    );
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
        {role === "mahasiswa" ? (
          <ExportSurveyRecapButton
            tableIds={surveyRecapData.data.map((item) => item.namaDosen)}
            fileName={`Rekap Survei ${
              role.charAt(0).toUpperCase() + role.slice(1)
            }`}
          />
        ) : (
          <ExportSurveyRecapButton
            tableIds={[`rekap survei ${role}`]}
            fileName={`Rekap Survei ${
              role.charAt(0).toUpperCase() + role.slice(1)
            }`}
          />
        )}
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
                  <table
                    id={`rekap survei ${role}`}
                    className="table-fixed w-full mb-2"
                  >
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
                      <tr>
                        <td className="py-2"></td>
                        <td></td>
                      </tr>
                      <tr className="border border-white font-semibold p-1 text-center bg-primary-color text-white">
                        <td className="border border-white font-semibold p-1 text-center bg-primary-color text-white">
                          Total Respon
                        </td>
                        <td className="border border-white font-semibold p-1 text-center bg-primary-color text-white">
                          {surveyRecapData.data.hasilRekap.totalRespon}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-white font-semibold p-1 text-center bg-primary-color text-white">
                          Responden
                        </td>
                        <td className="border border-white font-semibold p-1 text-center bg-primary-color text-white">
                          {surveyRecapData.data.hasilRekap.responden}
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-white font-semibold p-1 text-center bg-primary-color text-white">
                          IKM
                        </td>
                        <td className="border border-white font-semibold p-1 text-center bg-primary-color text-white">
                          {surveyRecapData.data.hasilRekap.ikm.toFixed(2)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
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
                      <table
                        id={item.namaDosen}
                        className="table-fixed w-full mb-2"
                      >
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
                          <tr>
                            <td className="py-2"></td>
                            <td></td>
                          </tr>
                          <tr className="border border-white font-semibold p-1 text-center bg-primary-color text-white">
                            <td className="border border-white font-semibold p-1 text-center bg-primary-color text-white">
                              Total Respon
                            </td>
                            <td className="border border-white font-semibold p-1 text-center bg-primary-color text-white">
                              {item.hasilRekap.totalRespon}
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-white font-semibold p-1 text-center bg-primary-color text-white">
                              Responden
                            </td>
                            <td className="border border-white font-semibold p-1 text-center bg-primary-color text-white">
                              {item.hasilRekap.responden}
                            </td>
                          </tr>
                          <tr>
                            <td className="border border-white font-semibold p-1 text-center bg-primary-color text-white">
                              IKM
                            </td>
                            <td className="border border-white font-semibold p-1 text-center bg-primary-color text-white">
                              {item.hasilRekap.ikm.toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
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
