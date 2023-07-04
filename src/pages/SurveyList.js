import React, { useState } from "react";
import useFetchSurveyList from "../hooks/useFetchSurveyList";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const SurveyList = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("mahasiswa");
  const [startDate, setStartDate] = useState(
    process.env.REACT_APP_STUDENT_SURVEY_ONE_START_DATE +
      new Date().getFullYear().toString()
  );
  const [endDate, setEndDate] = useState(
    process.env.REACT_APP_STUDENT_SURVEY_ONE_END_DATE +
      new Date().getFullYear().toString()
  );
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [period, setPeriod] = useState("1");

  const convertDateToUnix = (dateString, isStartDate = false) => {
    const [day, month, year] = dateString.split("-");
    let hour = 23;
    let minute = 59;
    let second = 0;
    if (isStartDate) {
      hour = minute = 0;
      second = 1;
    }
    const dateObject = new Date(year, month - 1, day, hour, minute, second);
    return Math.floor(dateObject.getTime() / 1000);
  };

  const {
    data: surveyListData,
    isLoading: isSurveyListLoading,
    isError: isSurveyListError,
    isSuccess: isSurveyListSuccess,
  } = useFetchSurveyList({
    role: role,
    startDate: convertDateToUnix(startDate, true),
    endDate: convertDateToUnix(endDate),
  });

  const handleSeeSurveyResult = (survey) => {
    if (role === "mahasiswa") {
      navigate(
        `/survei-kepuasan/laporan-survei/${role}/${survey.id_survei_mahasiswa}`
      );
    }
    if (role === "dosen") {
      navigate(
        `/survei-kepuasan/laporan-survei/${role}/${survey.id_survei_dosen}`
      );
    }
    if (role === "alumni") {
      navigate(
        `/survei-kepuasan/laporan-survei/${role}/${survey.id_survei_alumni}`
      );
    }
  };

  const handleChangePeriod = (e) => {
    if (role === "mahasiswa") {
      if (e.target.value === "1") {
        setStartDate(
          process.env.REACT_APP_STUDENT_SURVEY_ONE_START_DATE + year
        );
        setEndDate(process.env.REACT_APP_STUDENT_SURVEY_ONE_END_DATE + year);
      } else if (e.target.value === "2") {
        setStartDate(
          process.env.REACT_APP_STUDENT_SURVEY_TWO_START_DATE + year
        );
        setEndDate(process.env.REACT_APP_STUDENT_SURVEY_TWO_END_DATE + year);
      }
    } else if (role === "dosen") {
      if (e.target.value === "1") {
        setStartDate(
          process.env.REACT_APP_LECTURE_SURVEY_ONE_START_DATE + year
        );
        setEndDate(process.env.REACT_APP_LECTURE_SURVEY_ONE_END_DATE + year);
      }
    } else if (role === "alumni") {
      if (e.target.value === "1") {
        setStartDate(process.env.REACT_APP_ALUMNI_SURVEY_ONE_START_DATE + year);
        setEndDate(process.env.REACT_APP_ALUMNI_SURVEY_ONE_END_DATE + year);
      }
    }
    setPeriod(e.target.value);
  };

  const handleChangeRole = (e) => {
    if (e.target.value === "mahasiswa") {
      setRole(e.target.value);
      setPeriod("1");
      setStartDate(process.env.REACT_APP_STUDENT_SURVEY_ONE_START_DATE + year);
      setEndDate(process.env.REACT_APP_STUDENT_SURVEY_ONE_END_DATE + year);
    } else if (e.target.value === "dosen") {
      setRole(e.target.value);
      setPeriod("1");
      setStartDate(process.env.REACT_APP_LECTURE_SURVEY_ONE_START_DATE + year);
      setEndDate(process.env.REACT_APP_LECTURE_SURVEY_ONE_END_DATE + year);
    } else if (e.target.value === "alumni") {
      setRole(e.target.value);
      setPeriod("1");
      setStartDate(process.env.REACT_APP_ALUMNI_SURVEY_ONE_START_DATE + year);
      setEndDate(process.env.REACT_APP_ALUMNI_SURVEY_ONE_END_DATE + year);
    }
  };

  const handleYearSubmit = (e) => {
    e.preventDefault();
    if (role === "mahasiswa") {
      setStartDate(process.env.REACT_APP_STUDENT_SURVEY_ONE_START_DATE + year);
      setEndDate(process.env.REACT_APP_STUDENT_SURVEY_ONE_END_DATE + year);
    } else if (role === "dosen") {
      setStartDate(process.env.REACT_APP_LECTURE_SURVEY_ONE_START_DATE + year);
      setEndDate(process.env.REACT_APP_LECTURE_SURVEY_ONE_END_DATE + year);
    } else if (role === "alumni") {
      setStartDate(process.env.REACT_APP_ALUMNI_SURVEY_ONE_START_DATE + year);
      setEndDate(process.env.REACT_APP_ALUMNI_SURVEY_ONE_END_DATE + year);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Laporan Survei | Web Survei Kepuasan</title>
      </Helmet>
      <div className="flex justify-end mb-4">
        {/* Search bar */}
        {/* select role dropdown */}
        <select
          title="Sasaran Survei"
          className="flex h-12 md:w-56 mx-2 items-center rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2 border-primary-color px-4 shadow-sm"
          value={role}
          onChange={handleChangeRole}
        >
          <option value="mahasiswa">Mahasiswa</option>
          <option value="dosen">Dosen</option>
          <option value="alumni">Alumni</option>
        </select>
        {/* select period dropdown */}
        <select
          title="Periode Survei"
          className="flex h-12 md:w-56 mx-2 items-center rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2 border-primary-color px-4 shadow-sm"
          value={period}
          onChange={handleChangePeriod}
        >
          <option value="1">Periode 1</option>
          {role === "mahasiswa" && <option value="2">Periode 2</option>}
        </select>
        {/* input year */}
        <form
          className="h-12 w-32 ml-2 items-center rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2 border-primary-color px-4 shadow-sm"
          onSubmit={handleYearSubmit}
        >
          <input
            className="peer h-full w-full outline-none pr-2"
            type="number"
            id="search"
            min={2023}
            placeholder="Tahun"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </form>
      </div>
      {isSurveyListLoading && (
        <div className="font-semibold">Memuat survei...</div>
      )}
      {isSurveyListError && (
        <div className="text-primary-color font-semibold">
          Terjadi kesalahan saat memproses permintaan
        </div>
      )}
      {isSurveyListSuccess &&
        surveyListData.data &&
        surveyListData.data.length > 0 && (
          <>
            <div className="flex justify-between items-center">
              <h1>
                Survei Periode {startDate} - {endDate}
              </h1>
              {/* survei recap for student survei */}
              {role === "mahasiswa" && (
                <button
                  title="Rekap Survei"
                  className="bg-primary-color shadow-md hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-2"
                  onClick={() =>
                    navigate(
                      `/survei-kepuasan/laporan-survei/rekap-survei/${role}/startDate=${convertDateToUnix(
                        startDate,
                        true
                      )}&endDate=${convertDateToUnix(endDate)}`
                    )
                  }
                >
                  Rekap Survei
                </button>
              )}
            </div>
            {surveyListData.data.map((survey, index) => (
              <div
                className="bg-white rounded-lg overflow-hidden shadow-md p-3 flex justify-between items-center mb-2"
                key={index}
              >
                <div>
                  <h1 className="text-secondary-color font-bold text-lg">
                    {survey.judul_survei}
                  </h1>
                </div>
                <div>
                  <button
                    onClick={() => handleSeeSurveyResult(survey)}
                    className="bg-primary-color shadow-md hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Lihat Hasil
                  </button>
                  {/* survey recap button for alumni or lecturer */}
                  {(role === "alumni" || role === "dosen") && (
                    <button
                      title="Rekap Survei"
                      className="bg-primary-color shadow-md hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                      onClick={() =>
                        navigate(
                          `/survei-kepuasan/laporan-survei/rekap-survei/${role}/id=${
                            survey[`id_survei_${role}`]
                          }`
                        )
                      }
                    >
                      Rekap Survei
                    </button>
                  )}
                </div>
              </div>
            ))}
          </>
        )}
      {isSurveyListSuccess &&
        surveyListData.message &&
        surveyListData.message === "There is no record with that query" && (
          <div className="text-primary-color font-semibold">
            Tidak ada survei pada periode {startDate} - {endDate}
          </div>
        )}
    </div>
  );
};

export default SurveyList;
