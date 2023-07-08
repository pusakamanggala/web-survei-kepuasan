import React from "react";
import loadingAnimation from "../img/loadingAnimation.svg";

const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <img className="md:w-40 w-32" src={loadingAnimation} alt="" />
    </div>
  );
};

export default LoadingPage;
