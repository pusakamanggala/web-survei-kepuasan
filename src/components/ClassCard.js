import React from "react";

const ClassCard = ({
  kelas,
  onClick,
  bgColor = "bg-white",
  textColor = "text-secondary-color",
}) => {
  return (
    <div
      className={` " rounded-lg overflow-hidden shadow-md p-3 flex justify-between items-center cursor-pointer hover:scale-102 transition-all duration-300" ${bgColor}`}
      onClick={onClick}
    >
      <div>
        <h1 className={`"text-secondary-color font-bold text-lg" ${textColor}`}>
          {kelas.nama_kelas}
        </h1>
        <h1>
          Pengampu :{" "}
          <span className={`" font-semibold " ${textColor}`}>
            {kelas.nama_dosen}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default ClassCard;
