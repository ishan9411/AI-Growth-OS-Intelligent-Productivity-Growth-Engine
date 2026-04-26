import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

function ProductivityChart({ analytics }) {

  const data = {
    labels: ["Focus", "Accuracy"],
    datasets: [
      {
        label: "Metrics",
        data: [
          analytics.average_focus,
          analytics.time_accuracy
        ],
      },
    ],
  };

  return (
    <div style={{ width: "400px" }}>
      <Bar key={JSON.stringify(analytics)} data={data} />
    </div>
  );
}

export default ProductivityChart;