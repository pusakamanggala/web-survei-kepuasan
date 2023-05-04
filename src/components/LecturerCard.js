import React from "react";

const LecturerCard = ({ lecturer, onClick, bgColor, textColor }) => {
  return (
    <div
      className={` rounded-lg overflow-hidden shadow-md p-3 flex justify-between items-center cursor-pointer hover:scale-102 transition-all duration-300 ${bgColor} ${textColor}`}
      onClick={onClick}
    >
      <div className={`${textColor}`}>
        <h1 className=" font-bold text-lg">{lecturer.nama}</h1>
        <h1>{lecturer.nip}</h1>
      </div>
    </div>
  );
};

export default LecturerCard;
