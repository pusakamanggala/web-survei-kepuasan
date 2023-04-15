import React from "react";
import { Pie } from "react-chartjs-2";
//eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";

const PieChart = () => {
  const data = {
    labels: ["Sudah Mengisi", "Belum Mengisi"],
    datasets: [
      {
        label: "Responden",
        data: [70, 30],
        backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div>
      <Pie data={data} options={options} height="150px" />
    </div>
  );
};

export default PieChart;
