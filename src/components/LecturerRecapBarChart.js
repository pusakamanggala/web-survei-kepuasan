import React from "react";
import { Bar } from "react-chartjs-2";
//eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";

const LecturerRecapBarChart = ({ ikmData, label }) => {
  const lecturerName = Object.keys(ikmData);
  const ikm = Object.values(ikmData);

  const data = {
    labels: lecturerName,
    datasets: [
      {
        label: label,
        data: ikm,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgb(194,0,0)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default LecturerRecapBarChart;
