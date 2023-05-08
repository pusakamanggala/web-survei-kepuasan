import React from "react";

const SurveyTemplatesDetails = (props) => {
  const { template, isShow } = props; //

  const { namaTemplate, role, pertanyaan } = template; // to get namaTemplate, role, and pertanyaan from template

  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-auto  bg-gray-900 bg-opacity-50 z-50 ">
      <div className="flex justify-center items-center h-full ">
        <div className="modal p-6 max-h-screen overflow-y-auto bg-white shadow-md rounded-md relative ">
          {/* Close Button */}
          <button
            title="Tutup"
            className="absolute top-3 right-3   hover:scale-125"
            onClick={() => isShow(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#ec161e"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <h1 className="font-semibold text-primary-color">{namaTemplate}</h1>
          <h1 className="mb-2">Jenis Survei : {role}</h1>
          <h1>Pertanyaan :</h1>
          {pertanyaan.map((item, index) => {
            return (
              <h1 key={index}>
                {index + 1}. {item.pertanyaan}{" "}
                <span className="text-primary-color font-semibold">
                  ({item.tipe})
                </span>
              </h1>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SurveyTemplatesDetails;
