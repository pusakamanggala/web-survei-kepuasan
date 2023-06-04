import React from "react";

const SurveyList = () => {
  return (
    <div>
      <div className="flex justify-end mb-4">
        {/* Search bar */}
        {/* select role dropdown */}
        <select className="flex h-12 md:w-56 mx-2 items-center rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2 border-primary-color px-4 shadow-sm">
          <option value="mahasiswa">Mahasiswa</option>
          <option value="dosen">Dosen</option>
          <option value="alumni">Alumni</option>
        </select>
        {/* select period dropdown */}
        <select className="flex h-12 md:w-56 mx-2 items-center rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2 border-primary-color px-4 shadow-sm">
          <option value="">Pilih Periode</option>
          <option value="">1</option>
          <option value="">2</option>
        </select>
        {/* input year */}
        <form className="h-12 w-40 mx-2 items-center rounded-lg focus-within:shadow-lg bg-white overflow-hidden border-2 border-primary-color px-4 shadow-sm">
          <input
            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="number"
            id="search"
            min={2000}
            placeholder="Tahun"
          />
        </form>
      </div>
      <div>Surveys List Here (title + id)</div>
    </div>
  );
};

export default SurveyList;
