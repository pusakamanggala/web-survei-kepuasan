import React from "react";
import SurveyMenuImg from "../img/surveyMenu.png";
import SidebarButtonImg from "../img/mobileSidebarButton.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-white rounded-md p-6 shadow-md">
      <div className="text-center text-primary-color text-xl font-semibold mb-10">
        <h1>Selamat Datang di Website Survei Kepuasan</h1>
        <h1>Prodi Matematika UIN Malang</h1>
      </div>

      <div className="my-2 ">
        <h1 className="text-primary-color font-semibold">
          Bagaimana cara mengisi survei ?
        </h1>
        <div className="md:flex items-center flex-row border-b-2 pb-2">
          <img
            src={SurveyMenuImg}
            alt=""
            className="w-52 mr-5 m-2 rounded-md"
          />
          <div>
            <li>
              Silahkan klik menu "
              <span
                className="text-primary-color cursor-pointer font-semibold"
                onClick={() => navigate("/survei-kepuasan/survei-saya")}
              >
                Survei Saya
              </span>
              " yang terletak pada sidebar
            </li>
            <li>Lalu klik salah satu survei yang akan anda isi</li>
            <li>
              Setelah selesai mengisi semua pertanyaan yang ada, silahkan klik
              tombol "Submit Jawaban"
            </li>
          </div>
        </div>

        <div className="border-b-2 flex items-center mt-2 pb-2">
          <img
            src={SidebarButtonImg}
            alt=""
            className="w-20 mr-5 m-2 rounded-md"
          />
          <h1>
            Pada tampilan mobile, klik tombol yang berada di kanan bawah layar
            anda untuk membuka atau menutup sidebar.
          </h1>
        </div>
      </div>
      <div>
        <h1>
          Catatan : Untuk pengguna baru mohon ganti password default anda di
          menu "
          <span
            className="text-primary-color cursor-pointer font-semibold"
            onClick={() => navigate("/profil")}
          >
            Profil Saya
          </span>
          " .
        </h1>
      </div>
    </div>
  );
};

export default Home;
