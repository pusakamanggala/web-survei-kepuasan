import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetchSurveyTemplate from "../hooks/useFetchSurveyTemplates";
import SurveyTemplateCard from "../components/SurveyTemplateCard";
import SurveyTemplatesDetails from "../components/SurveyTemplateDetails";

const SurveyTemplates = () => {
  const [role, setRole] = useState("mahasiswa"); // to store survey role template
  const navigate = useNavigate();
  const [showDetailModal, setShowDetailModal] = useState(false); // to show detail modal
  const [selectedTempalte, setSelectedTemplate] = useState(null); // to store selected template

  // to fetch survey templates using useFetchSurveyTemplate hook
  const {
    data: surveyTemplatesData,
    isLoading: isTemplatesLoading,
    isError: isTemplatesError,
  } = useFetchSurveyTemplate({
    role: role,
  });

  // to handle change role
  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  // to show template details and set selected template data
  const handleShowTemplateDetails = (template) => {
    setShowDetailModal(true);
    setSelectedTemplate(template);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        {/* Search bar */}
        {/* select dropdown */}
        <select
          title="Sasaran Survei"
          className="flex h-12 md:w-56 mx-2 items-center rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2 border-primary-color px-4 shadow-sm"
          onChange={handleChangeRole}
          value={role}
        >
          <option value="">Semua</option>
          <option value="mahasiswa">Mahasiswa</option>
          <option value="dosen">Dosen</option>
          <option value="alumni">Alumni</option>
        </select>
        {/* add button */}
        <button
          title="Tambah Mata Kuliah"
          className="flex justify-evenly ml-2 h-12 px-4 items-center  rounded-lg focus-within:shadow-lg overflow-hidden bg-primary-color hover:bg-secondary-color shadow-sm shadow-secondary-color"
          onClick={() => navigate("/survei-kepuasan/template-survei/tambah")}
        >
          <h1 className="text-white hidden sm:block capitalize">
            + Tambah Template Survei
          </h1>
        </button>
      </div>
      {/* show survey templates */}
      {isTemplatesLoading && (
        <h1 className="text-primary-color text-lg font-semibold">
          Memuat template survei...
        </h1>
      )}
      {isTemplatesError && (
        <h1 className="text-primary-color text-lg font-semibold">
          Terjadi kesalahan saat memproses permintaan...
        </h1>
      )}
      <div className="grid md:grid-cols-2 nd:gap-4 grid-cols-1 gap-2">
        {surveyTemplatesData &&
          surveyTemplatesData.data.map((template, index) => (
            <SurveyTemplateCard
              key={index}
              template={template}
              onClick={() => handleShowTemplateDetails(template)}
            />
          ))}
      </div>
      {/* show detail template */}
      {showDetailModal && (
        <SurveyTemplatesDetails
          template={selectedTempalte}
          isShow={setShowDetailModal}
        />
      )}
    </div>
  );
};

export default SurveyTemplates;
