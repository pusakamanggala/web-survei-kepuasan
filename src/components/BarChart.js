import React from "react";
import { Bar } from "react-chartjs-2";
//eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = ({ datas }) => {
  const angkatan = [];
  const total = [];

  // Loop through the data object and extract the values into the arrays
  for (const key in datas) {
    angkatan.push(datas[key].angkatan);
    total.push(datas[key].total);
  }

  const data = {
    labels: angkatan,
    datasets: [
      {
        label: "Jumlah",
        data: total,
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
    <div className="w-full">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
