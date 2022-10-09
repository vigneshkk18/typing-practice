import {
  ActivityLabel,
  IActivity,
  IActivityKeys,
} from "../../types/IStatsModal";
import { BackgroundColors } from "../../utils/constants";

export const getChartData = (
  stats: IActivity[] | undefined,
  statsBy: IActivityKeys
) => {
  if (!stats) {
    return {
      label: [],
      datasets: [
        {
          data: [],
        },
      ],
    };
  }

  const labels = stats?.map((_, idx) => `Activity-${idx}`);
  return {
    labels,
    datasets: [
      {
        label: ActivityLabel[statsBy],
        data: stats?.map((stat) => stat[statsBy]),
        backgroundColor: BackgroundColors,
      },
    ],
  };
};
