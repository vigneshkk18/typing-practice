import React from "react";
import { IKeyboardRow } from "./utils";

interface KeyboardRowProps {
  row: IKeyboardRow;
  index: number;
}

const KeyboardRow = ({ row, index }: KeyboardRowProps) => {
  return (
    <div className={`flex keyboard-row keyboard-row-${index}`}>
      {row.map((rowObj, index) => (
        <div key={index} className={`key ${rowObj.class} shadow-lg`}>
          {rowObj.keys.map((key) => (
            <span key={key}>{key}</span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default KeyboardRow;
