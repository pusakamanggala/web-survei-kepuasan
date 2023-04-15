import React from "react";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";
import SummaryCard from "../components/SummaryCard";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="grid grid-cols-2 lg:grid-cols-4 md:grid-cols-2  gap-4 mb-4">
        <SummaryCard
          cardTitle="Pengguna"
          cardValue="1042"
          route="/pengguna"
          icon="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
        />
        <SummaryCard
          cardTitle="Survei Aktif"
          cardValue="10"
          icon="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
        <SummaryCard
          cardTitle="Responden"
          cardValue="70"
          icon="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
        />
        <SummaryCard
          cardTitle="Survei Selesai"
          cardValue="5"
          icon="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <div className="h-60 rounded-md text-center flex justify-evenly ">
          <div className="grid grid-cols-2 grid-rows-1 gap-4 w-full ">
            <button
              title="Klik untuk melihat detail"
              onClick={() => navigate("/pengguna")}
              className="flex flex-col justify-center items-center bg-white shadow-md rounded-md hover:scale-105 hover:shadow-lg transform transition duration-500 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ec161e"
                  d="M12 3c2.21 0 4 1.79 4 4s-1.79 4-4 4s-4-1.79-4-4s1.79-4 4-4m4 10.54c0 1.06-.28 3.53-2.19 6.29L13 15l.94-1.88c-.62-.07-1.27-.12-1.94-.12s-1.32.05-1.94.12L11 15l-.81 4.83C8.28 17.07 8 14.6 8 13.54c-2.39.7-4 1.96-4 3.46v4h16v-4c0-1.5-1.6-2.76-4-3.46Z"
                />
              </svg>
              <h1 className="text-4xl ml-3 text-primary-color font-bold">
                50 <span className="font-semibold text-2xl">Dosen</span>
              </h1>
            </button>
            <button
              title="Klik untuk melihat detail"
              className="flex flex-col justify-center items-center bg-white shadow-md rounded-md hover:scale-105 hover:shadow-lg transform transition duration-500 ease-in-out"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#ec161e"
                  d="M20 17a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H9.46c.35.61.54 1.3.54 2h10v11h-9v2m4-10v2H9v13H7v-6H5v6H3v-8H1.5V9a2 2 0 0 1 2-2H15M8 4a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2a2 2 0 0 1 2 2Z"
                />
              </svg>
              <h1 className="text-4xl ml-3 text-primary-color font-bold">
                80 <span className="font-semibold text-2xl">Kelas</span>
              </h1>
            </button>
          </div>
        </div>
        <div className="h-60 bg-white items-center  p-2 rounded-md text-center flex flex-col justify-evenly shadow-md ">
          <h1 className="font-semibold text-primary-color">Responden Dosen</h1>
          <PieChart />
        </div>
        <button
          title="Klik untuk melihat detail"
          onClick={() => navigate("/pengguna")}
          className="h-60 bg-white items-center  p-2 rounded-md text-center flex flex-col justify-evenly shadow-md hover:scale-102 hover:shadow-lg transform transition duration-500 ease-in-out"
        >
          <h1 className="font-semibold text-primary-color">Jumlah Mahasiswa</h1>
          <BarChart />
        </button>
        <div className="h-60 bg-white items-center  p-2 rounded-md text-center flex flex-col justify-evenly shadow-md ">
          <h1 className="font-semibold text-primary-color">
            Responden Mahasiswa
          </h1>
          <PieChart />
        </div>

        <button
          title="Klik untuk melihat detail"
          onClick={() => navigate("/pengguna")}
          className="h-60 bg-white items-center  p-2 rounded-md text-center flex flex-col justify-evenly shadow-md hover:scale-102 hover:shadow-lg transform transition duration-500 ease-in-out"
        >
          <h1 className="font-semibold text-primary-color">Jumlah Alumni</h1>
          <BarChart />
        </button>
        <div className="h-60 bg-white items-center  p-2 rounded-md text-center flex flex-col justify-evenly shadow-md">
          <h1 className="font-semibold text-primary-color">Responden Alumni</h1>
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default Home;
