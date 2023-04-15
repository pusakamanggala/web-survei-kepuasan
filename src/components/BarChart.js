import React from "react";
import { Bar } from "react-chartjs-2";
//eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = () => {
  const data = {
    labels: ["2017", "2018", "2019", "2020", "2021", "2022", "2023"],
    datasets: [
      {
        label: "Jumlah",
        data: [12, 19, 3, 5, 2, 3, 7],
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
