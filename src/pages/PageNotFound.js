import React from "react";
import PageNoutFoundImage from "../img/404.jpg";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-white flex flex-col justify-center">
      <Helmet>
        <title>Halaman Tidak Ditemukan | Web Survei Kepuasan</title>
      </Helmet>
      <img
        src={PageNoutFoundImage}
        alt="404 Page Not Found"
        className="h-1/2 mx-auto "
      />

      <h1
        onClick={() => navigate("/beranda")}
        className="text-center text-xl  cursor-pointer text-gray-400 underline"
      >
        Kembali
      </h1>

      <a
        className="text-center text-sm font-light absolute bottom-2 right-2"
        href="https://www.freepik.com/free-vector/error-404-concept-illustration_7741849.htm#query=404&position=1&from_view=search&track=sph"
      >
        Image by storyset on Freepik
      </a>
    </div>
  );
};

export default PageNotFound;
