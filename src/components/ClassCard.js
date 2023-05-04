import React from "react";
import { useNavigate } from "react-router-dom";

const ClassCard = ({ kelas }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md p-3 flex justify-between items-center cursor-pointer hover:scale-102 transition-all duration-300"
      onClick={() => navigate(`/kelas/${kelas.id_kelas}`)}
    >
      <div>
        <h1 className="text-secondary-color font-bold text-lg">
          {kelas.nama_kelas}
        </h1>
        <h1>
          Pengampu :{" "}
          <span className="text-secondary-color font-semibold ">
            {kelas.nama_dosen}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default ClassCard;
