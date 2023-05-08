import React from "react";

const QuestionsCard = ({ template, onClick }) => {
  return (
    <div
      className="rounded-lg overflow-hidden shadow-md p-3 flex justify-between items-center cursor-pointer hover:scale-102 transition-all duration-300 bg-primary-color text-white"
      onClick={onClick}
    >
      <div>
        <h1 className=" font-bold">{template.namaTemplate}</h1>
        <h1> Tipe Survei : {template.role}</h1>
      </div>
    </div>
  );
};

export default QuestionsCard;
