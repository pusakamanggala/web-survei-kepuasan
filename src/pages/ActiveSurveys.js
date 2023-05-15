import React from "react";
import { useNavigate } from "react-router-dom";

const ActiveSurveys = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-end mb-4">
        {/* Search bar */}
        {/* select dropdown */}
        <select className="flex h-12 md:w-56 mx-2 items-center rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2 border-primary-color px-4 shadow-sm">
          <option value="">Semua</option>
          <option value="mahasiswa">Mahasiswa</option>
          <option value="dosen">Dosen</option>
          <option value="alumni">Alumni</option>
        </select>
        {/* add button */}
        <button
          title="Tambah Survei"
          className="flex justify-evenly ml-2 h-12 px-4 items-center  rounded-lg focus-within:shadow-lg overflow-hidden bg-primary-color hover:bg-secondary-color shadow-sm shadow-secondary-color"
          onClick={() => navigate("/survei-kepuasan/survei-aktif/tambah")}
        >
          <h1 className="text-white hidden sm:block capitalize">
            + Tambah Survei
          </h1>
        </button>
      </div>
      <div>Active Surveys List Here</div>
    </div>
  );
};

export default ActiveSurveys;
