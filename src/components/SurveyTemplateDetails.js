import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

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
            <FontAwesomeIcon
              icon={faXmark}
              className="w-6 h-6 text-primary-color"
            />
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
