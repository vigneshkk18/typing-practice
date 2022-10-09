import React, { ChangeEventHandler, useEffect, useState } from "react";
import { ChartData, ChartOptions } from "chart.js";

import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Modal from "../Modal/Modal";
import BarChart from "../BarChart/BarChart";
import Calendar from "../Calendar/Calendar";

import { getChartData } from "./utils";
import useFetch from "../../hooks/useFetch";
import { getDateStr } from "../../utils/utils";
import { apiToUrlMap, formatString } from "../../apiToUrlMap";

import { IActivity, IActivityKeys } from "../../types/IStatsModal";

interface IUserStatsModal {
  email: string;
  closeModal: () => void;
}

const barChartOptions: ChartOptions<"bar"> = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "User Activity Stats",
    },
  },
};

const UserStatsModal = ({ email, closeModal }: IUserStatsModal) => {
  const { makeRequest } = useFetch();

  const [stats, setStats] = useState<IActivity[]>();
  const [statsBy, setStatsBy] = useState<IActivityKeys>("accuracy");
  const [data, setData] = useState<ChartData<"bar">>();
  const [date, setDate] = useState(getDateStr());

  useEffect(() => {
    const fetchStats = async () => {
      let url = formatString(apiToUrlMap.getUserActivity, { emailId: email });
      url = `${url}?date=${date}`;
      const [{ data }] = await makeRequest(url);
      setStats(data);
    };
    fetchStats();
  }, [date]);

  useEffect(() => {
    setData(getChartData(stats, statsBy));
  }, [stats, statsBy]);

  const onDateChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setDate(event.target.value);
  };

  const changeStatBy: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setStatsBy(event.target.value as IActivityKeys);
  };

  const title = (
    <h1 className="flex gap-4 justify-center text-5xl text-center mb-4">
      <FontAwesomeIcon size="sm" icon={faChartLine} />
      Stats
    </h1>
  );

  const content = (
    <div className="flex flex-col gap-8 justify-center items-center">
      <div className="w-full flex gap-8 items-stretch justify-between">
        <Calendar date={date} onDateChange={onDateChange} />
        <select
          className="px-2 py-1 bg-transparent border-2 rounded-md border-orange-400 outline-0"
          onChange={changeStatBy}
          value={statsBy}
        >
          <option value="accuracy">Accuracy (%)</option>
          <option value="wpm">Speed (WPM)</option>
          <option value="timeTaken">Time Taken</option>
        </select>
      </div>
      {data && stats && <BarChart options={barChartOptions} data={data} />}
    </div>
  );

  return (
    <Modal
      open={true}
      title={title}
      content={content}
      actions={{
        cancelAction: closeModal,
        cancelLabel: "",
      }}
    />
  );
};

export default UserStatsModal;
