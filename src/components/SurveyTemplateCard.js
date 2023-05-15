import React from "react";

const SurveyTemplateCard = ({
  template,
  onClick,
  bgColor = "bg-primary-color",
  textColor = "text-white",
}) => {
  return (
    <div
      className={` rounded-lg overflow-hidden shadow-md p-3 flex justify-between items-center cursor-pointer hover:scale-102 transition-all duration-300 ${bgColor} ${textColor}`}
      onClick={onClick}
    >
      <div className={`${textColor}`}>
        <h1 className=" font-bold">{template.namaTemplate}</h1>
        <h1> Tipe Survei : {template.role}</h1>
      </div>
    </div>
  );
};

export default SurveyTemplateCard;
