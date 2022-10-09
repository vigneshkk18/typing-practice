import {
  ActivityLabel,
  IActivity,
  IActivityKeys,
} from "../../types/IStatsModal";
import { BackgroundColors } from "../../utils/constants";
import { capitialize } from "../../utils/utils";

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

  const labels = stats?.map(
    (stat, idx) => `${capitialize(stat.difficulty)}: Activity-${idx}`
  );
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
