import React from "react";
import { Pie } from "react-chartjs-2";
//eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";

const UserRatingPieChart = ({ rating }) => {
  const data = {
    labels: ["KURANG", "CUKUP", "BAIK", "SANGAT BAIK"],
    datasets: [
      {
        label: "Respon",
        data: rating,
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 255, 0, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(152, 251, 152, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(255, 255, 0, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(152, 251, 152, 1)",
        ],
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
      <Pie data={data} options={options} height="200px" />
    </div>
  );
};

export default UserRatingPieChart;
