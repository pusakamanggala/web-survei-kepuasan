import React from "react";
import BarChart from "../components/BarChart";
import SummaryCard from "../components/SummaryCard";
import { useNavigate } from "react-router-dom";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";

const HomeAdmin = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2  gap-4 mb-4">
        <SummaryCard
          cardTitle="Mahasiswa"
          cardValue="1042"
          route="/pengguna/mahasiswa"
          icon={faUserAlt}
        />
        <SummaryCard
          cardTitle="Dosen"
          cardValue="1042"
          route="/pengguna/dosen"
          icon={faUserTie}
        />
        <SummaryCard
          cardTitle="Alumni"
          cardValue="1042"
          route="/pengguna/alumni"
          icon={faUserGraduate}
        />
        <SummaryCard
          cardTitle="Kelas"
          cardValue="1042"
          route="/kelas"
          icon={faChalkboardTeacher}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <button
          title="Klik untuk melihat detail"
          onClick={() => navigate("/pengguna/mahasiswa")}
          className="h-60 bg-white items-center  p-2 rounded-md text-center flex flex-col justify-evenly shadow-md hover:scale-102 hover:shadow-lg transform transition duration-500 ease-in-out"
        >
          <h1 className="font-semibold text-primary-color">
            Mahasiswa / Angkatan
          </h1>
          <BarChart />
        </button>
        <button
          title="Klik untuk melihat detail"
          onClick={() => navigate("/pengguna/alumni")}
          className="h-60 bg-white items-center  p-2 rounded-md text-center flex flex-col justify-evenly shadow-md hover:scale-102 hover:shadow-lg transform transition duration-500 ease-in-out"
        >
          <h1 className="font-semibold text-primary-color">
            Alumni / Angkatan
          </h1>
          <BarChart />
        </button>
      </div>
    </div>
  );
};

export default HomeAdmin;
