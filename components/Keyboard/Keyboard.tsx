import React from "react";
import KeyboardRow from "./KeyboardRow";
import { KeyboardKeys } from "./utils";

const Keyboard = () => {
  return (
    <div className="keyboard select-none w-[80%] m-auto py-6 h-[50%] rounded-[15px] p-6 shadow-xl bg-[#e2e2e3] flex flex-col">
      {KeyboardKeys.map((row, index) => (
        <KeyboardRow key={index} index={index} row={row as any} />
      ))}
    </div>
  );
};

export default Keyboard;
