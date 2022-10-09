import React, { ChangeEventHandler } from "react";

interface ICalendar {
  date: string;
  onDateChange: ChangeEventHandler<HTMLInputElement>;
}

const Calendar = ({ date, onDateChange }: ICalendar) => {
  return (
    <input
      className="border-2 border-hit p-2 rounded-lg"
      value={date}
      type="date"
      onChange={onDateChange}
    />
  );
};

export default Calendar;
