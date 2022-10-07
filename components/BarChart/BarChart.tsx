import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { ChartData, ChartOptions } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IBarChart {
  options: ChartOptions<"bar">;
  data: ChartData<"bar">;
  width?: number;
  height?: number;
}

function BarChart({ options, data, width, height }: IBarChart) {
  return <Bar options={options} width={width} height={height} data={data} />;
}

export default BarChart;
