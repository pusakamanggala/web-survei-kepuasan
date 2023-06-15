import React, { useEffect, useState } from "react";
import useFetchSurveyTemplate from "../hooks/useFetchSurveyTemplates";
import SurveyTemplateCard from "../components/SurveyTemplateCard";
import useFetchClassByName from "../hooks/useFetchClassByName";
import ClassCard from "../components/ClassCard";
import useAddSurvei from "../hooks/useAddSurvei";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet-async";
import useNotification from "../hooks/useNotification";

const AddSurvey = () => {
  const [surveyTitle, setSurveyTitle] = useState("");
  const [surveyDetail, setSurveyDetail] = useState("");
  const [surveyTemplatesId, setSurveyTemplatesId] = useState("");
  const [surveyPeriod, setSurveyPeriod] = useState("");
  const [surveyRole, setSurveyRole] = useState("mahasiswa");
  const [surveyClass, setSurveyClass] = useState("");
  const [classSearchValue, setClassSearchValue] = useState("");
  const [classKeyword, setClassKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const notify = useNotification();

  // to add survey using useAddSurvei hook
  const addSurveiMutation = useAddSurvei();

  // to fetch class using useFetchClassByName hook
  const {
    data: classData,
    isLoading: isClassLoading,
    isError: isClassError,
    isSuccess: isClassSuccess,
    refetch: refetchClass,
  } = useFetchClassByName({
    keyword: classKeyword,
    autoFetch: false,
  });

  // to fetch survey template using useFetchSurveyTemplate hook
  const {
    data: surveyTemplateData,
    isLoading: isTemplateLoading,
    isError: isTemplateError,
  } = useFetchSurveyTemplate({ role: surveyRole });

  // to get survey start and end date in period one
  const getSurveyPeriodOne = () => {
    // get current year
    const currentYear = new Date().getFullYear();

    // period one for the student survey is the last three weeks of June
    let startOfPeriodOne =
      process.env.REACT_APP_STUDENT_SURVEY_ONE_START_DATE + currentYear;
    let endOfPeriodOne =
      process.env.REACT_APP_STUDENT_SURVEY_ONE_END_DATE + currentYear;

    // period one for the lecture survey is in early June until the end of July.
    if (surveyRole === "dosen") {
      startOfPeriodOne =
        process.env.REACT_APP_LECTURE_SURVEY_ONE_START_DATE + currentYear;
      endOfPeriodOne =
        process.env.REACT_APP_LECTURE_SURVEY_ONE_END_DATE + currentYear;
    }

    // period one for the alumni survey is in early November until the end of December.
    if (surveyRole === "alumni") {
      startOfPeriodOne =
        process.env.REACT_APP_ALUMNI_SURVEY_ONE_START_DATE + currentYear;
      endOfPeriodOne =
        process.env.REACT_APP_ALUMNI_SURVEY_ONE_END_DATE + currentYear;
    }
    return {
      startOfPeriodOne,
      endOfPeriodOne,
    };
  };

  // to get survey start and end date in period two (student survey only)
  const getSurveyPeriodTwo = () => {
    const currentYear = new Date().getFullYear();

    // period two for the student survey is the last three weeks of December
    const startOfPeriodTwo =
      process.env.REACT_APP_STUDENT_SURVEY_TWO_START_DATE + currentYear;
    const endOfPeriodTwo =
      process.env.REACT_APP_STUDENT_SURVEY_TWO_END_DATE + currentYear;

    return {
      startOfPeriodTwo,
      endOfPeriodTwo,
    };
  };

  // to convert date string to unix
  const convertEndDateToUnix = (dateString, isStartDate = false) => {
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

  // to handle search class
  const handleSearchClass = (event) => {
    event.preventDefault();
    setClassKeyword(classSearchValue);
  };

  // to handle submit add survey
  const handleSubmitAddSurvey = (event) => {
    event.preventDefault();

    if (surveyRole === "mahasiswa") {
      if (
        !surveyTitle ||
        !surveyDetail ||
        !surveyTemplatesId ||
        !surveyPeriod ||
        !surveyClass ||
        !startDate ||
        !endDate
      ) {
        notify("Mohon isi semua bidang masukan yang ada", "warning");
        return;
      }

      if (surveyTitle.trim().length < 20) {
        notify("Judul survei minimal 20 karakter", "warning");
        return;
      }

      const data = {
        judulSurvei: surveyTitle.trim(),
        detailSurvei: surveyDetail,
        idTemplate: surveyTemplatesId,
        periode: surveyPeriod,
        startDate: startDate,
        endDate: endDate,
        role: surveyRole,
        idKelas: surveyClass,
      };
      const confirmed = window.confirm(
        "Apakah anda yakin ingin menambahkan survei ini ? Survei tidak bisa diubah atau dihapus setelah ditambahkan"
      );
      if (confirmed) {
        addSurveiMutation.mutate(data);
      }
    }
    if (surveyRole === "dosen" || surveyRole === "alumni") {
      if (
        !surveyTitle ||
        !surveyDetail ||
        !surveyTemplatesId ||
        !surveyPeriod ||
        !startDate ||
        !endDate
      ) {
        notify("Mohon isi semua bidang masukan yang ada", "warning");
        return;
      }

      if (surveyTitle.trim().length < 20) {
        notify("Judul survei minimal 20 karakter", "warning");
        return;
      }

      const data = {
        judulSurvei: surveyTitle.trim(),
        detailSurvei: surveyDetail,
        idTemplate: surveyTemplatesId,
        periode: surveyPeriod,
        startDate: startDate,
        endDate: endDate,
        role: surveyRole,
      };
      const confirmed = window.confirm(
        "Apakah anda yakin ingin menambahkan survei ini ? Survei tidak bisa diubah atau dihapus setelah ditambahkan"
      );
      if (confirmed) {
        addSurveiMutation.mutate(data);
      }
    }
  };

  // to get survey period value and convert it to unix
  const handleSurveyPeriod = (event) => {
    event.preventDefault();
    setSurveyPeriod(event.target.value);
    if (event.target.value === "1") {
      setStartDate(convertEndDateToUnix(startOfPeriodOne, true));
      setEndDate(convertEndDateToUnix(endOfPeriodOne));
    }
    if (event.target.value === "2") {
      setStartDate(convertEndDateToUnix(startOfPeriodTwo, true));
      setEndDate(convertEndDateToUnix(endOfPeriodTwo));
    }
  };

  // to handle role change
  const handleRoleChange = (event) => {
    event.preventDefault();
    setSurveyRole(event.target.value);
    setSurveyTemplatesId("");
    setSurveyPeriod("");
    setStartDate("");
    setEndDate("");
    setSurveyClass("");
    setSurveyTitle("");
    setSurveyDetail("");
    setClassKeyword("");
    setSurveyClass("");
    setClassSearchValue("");
  };

  // to refetch class data when classKeyword is changed and not empty
  useEffect(() => {
    if (classKeyword) {
      refetchClass();
      setSurveyClass("");
    }
  }, [classKeyword, refetchClass]);

  // destructuring survey period one and two value
  const { startOfPeriodOne, endOfPeriodOne } = getSurveyPeriodOne();
  const { startOfPeriodTwo, endOfPeriodTwo } = getSurveyPeriodTwo();

  // if add survey mutation is success, delete all data
  useEffect(() => {
    if (addSurveiMutation.isSuccess) {
      setSurveyTitle("");
      setSurveyDetail("");
      setSurveyTemplatesId("");
      setSurveyPeriod("");
      setStartDate("");
      setEndDate("");
      setSurveyClass("");
    }
  }, [addSurveiMutation.isSuccess]);

  // to show notification when add survey mutation is error or success
  useEffect(() => {
    if (addSurveiMutation.isError) {
      notify("Terjadi kesalahan saat menambahkan survei", "error", false);
      addSurveiMutation.reset(); // reset add survey mutation
    }
    if (addSurveiMutation.isSuccess) {
      notify("Survei berhasil ditambahkan", "success", false);

      // reset all data
      setSurveyTemplatesId("");
      setSurveyPeriod("");
      setStartDate("");
      setEndDate("");
      setSurveyClass("");
      setSurveyTitle("");
      setSurveyDetail("");
      setClassKeyword("");
      setSurveyClass("");
      setClassSearchValue("");

      addSurveiMutation.reset(); // reset add survey mutation
    }
  }, [addSurveiMutation, notify]);

  return (
    <div>
      <Helmet>
        <title>Tambah Survei | Web Survei Kepuasan</title>
      </Helmet>
      <div className="mb-4 grid lg:grid-cols-2 gap-3">
        {/* Input survey title */}
        <div>
          <label
            htmlFor="surveyTitle"
            className="block text-gray-700 font-bold mb-2 "
          >
            Judul Survei :
          </label>
          <input
            type="text"
            id="surveyTitle"
            name="surveyTitle"
            placeholder="Ex : Survei Kepuasan Mahasiswa Mata Kuliah Fisika"
            required
            value={surveyTitle}
            autoComplete="off"
            onChange={(event) => setSurveyTitle(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus-within:shadow-md"
          />
        </div>
        {/* input survei role */}
        <div>
          <label
            htmlFor="surveyRole"
            className="block text-gray-700 font-bold mb-2"
          >
            Role :
          </label>
          <select
            title="Sasaran Survei"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(event) => handleRoleChange(event)}
            defaultValue={surveyRole}
          >
            <option value="mahasiswa">Mahasiswa</option>
            <option value="dosen">Dosen</option>
            <option value="alumni">Alumni</option>
          </select>
        </div>
      </div>
      {/* choose survey period */}
      <div>
        <label
          htmlFor="surveyPeriod"
          className="block text-gray-700 font-bold "
        >
          Periode Survei :
        </label>
        <select
          title="Periode Survei"
          className=" h-12 w-full items-center rounded-lg focus-within:shadow-md bg-white overflow-hidden border-2  shadow-sm"
          value={surveyPeriod}
          onChange={(event) => {
            handleSurveyPeriod(event);
          }}
        >
          <option value="">Pilih Periode</option>

          <option value="1">
            Periode 1 ( {startOfPeriodOne} - {endOfPeriodOne} )
          </option>
          {surveyRole === "mahasiswa" && (
            <option value="2">
              Periode 2 ( {startOfPeriodTwo} - {endOfPeriodTwo} )
            </option>
          )}
        </select>
      </div>
      {/* input survey  detail*/}
      <div>
        <label
          htmlFor="surveyDetail"
          className="block text-gray-700 font-bold my-2 "
        >
          Detail Survei :
        </label>
        <textarea
          type="text"
          id="surveyDetail"
          name="surveyDetail"
          placeholder="Ex : Survei Kepuasan Kinerja Dosen Kelas Fisika - A Tahun Ajaran 2020/2021"
          required
          value={surveyDetail}
          maxLength={200}
          autoComplete="off"
          onChange={(event) => setSurveyDetail(event.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-20 leading-tight focus:outline-none focus:shadow-outline focus-within:shadow-md"
        />
      </div>
      {/* Select survey template */}
      <div className="mb-2">
        <label
          htmlFor="surveyTemplate"
          className="block text-gray-700 font-bold mb-2 "
        >
          Pilih Template Survei :
        </label>
        {/* show survey template data*/}
        {isTemplateLoading && (
          <h1 className="text-black font-semibold">
            Memuat template survei...
          </h1>
        )}
        {isTemplateError && (
          <h1 className="text-primary-color font-semibold">
            Terjadi kesalahan saat memuat template survei
          </h1>
        )}
        <div className="grid md:grid-cols-2 md:gap-4 gap-2">
          {surveyTemplateData &&
            surveyTemplateData.data.map((template, index) => (
              <SurveyTemplateCard
                key={index}
                template={template}
                bgColor={
                  template.idTemplate === surveyTemplatesId
                    ? "bg-primary-color"
                    : "bg-white"
                }
                textColor={
                  template.idTemplate === surveyTemplatesId
                    ? "text-white"
                    : "text-black"
                }
                onClick={() => setSurveyTemplatesId(template.idTemplate)}
              />
            ))}
        </div>
      </div>
      {/* search class */}
      {surveyRole === "mahasiswa" && (
        <div>
          <label
            htmlFor="surveyTemplate"
            className="block text-gray-700 font-bold mb-2 "
          >
            Pilih Kelas :
          </label>
          <div className=" flex h-12 items-center rounded-lg focus-within:shadow-md bg-white overflow-hidden border-2  shadow-sm">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="h-5 w-5" />
            </div>
            <form className="w-full" onSubmit={handleSearchClass}>
              <input
                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                type="text"
                id="search"
                minLength={2}
                value={classSearchValue}
                placeholder="Cari Kelas"
                onChange={(event) => {
                  setClassSearchValue(event.target.value);
                }}
                required
              />
            </form>
          </div>
          {/* show search result */}
          {isClassLoading && (
            <div className="ml-2 text-black font-semibold">
              Mencari Kelas....
            </div>
          )}
          {isClassError && (
            <div className="ml-2 text-primary-color font-semibold">
              Terjadi kesalahan saat memuat kelas
            </div>
          )}
          {isClassSuccess && (
            <div>
              {classData &&
              classData.message === "There is no record with that query" ? (
                <div className="mt-2 ml-2 flex ">
                  <h1 className="text-primary-color font-semibold mr-1">
                    Pertanyaan tidak ditemukan.
                  </h1>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                    {classData &&
                      classData.data.map((kelas, index) => (
                        <ClassCard
                          key={index}
                          kelas={kelas}
                          onClick={() => setSurveyClass(kelas.id_kelas)}
                          bgColor={
                            surveyClass === kelas.id_kelas
                              ? "bg-primary-color"
                              : "bg-white"
                          }
                          textColor={
                            surveyClass === kelas.id_kelas
                              ? "text-white"
                              : "text-black"
                          }
                        />
                      ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
      {/* submit and cancel button */}
      <div className="w-full flex justify-end mt-11">
        <button
          title="Submit"
          className="bg-primary-color hover:bg-secondary-color text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={(event) => handleSubmitAddSurvey(event)}
        >
          Submit
        </button>
      </div>

      {/* show add survei process message */}
      {addSurveiMutation.isLoading && (
        <div className="text-black font-bold mb-3 text-center">
          Sedang menyimpan survey...
        </div>
      )}
    </div>
  );
};

export default AddSurvey;
