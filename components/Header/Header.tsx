import Image from "next/image";
import React, { useEffect, useState } from "react";
import { values } from "../../utils/utils";

type IObj = {
  [key: number]: {
    char: string;
    typed: boolean;
  };
};

const resetTypeState = (text: string) => {
  const obj = text.split("").reduce((obj, char, index) => {
    obj[index] = {
      char,
      typed: false,
    };
    return obj;
  }, {} as IObj);
  return obj;
};

const Header = () => {
  return (
    <div className="flex justify-center items-center gap-8 h-[144px] border-b-separator border-b-[1px] w-screen">
      <Image width={65} height={65} src="/typing.png" alt="typing-icon" />
      <span className="flex gap-6 title-text">
        <span className="text-5xl py-3">Typing Practice</span>
      </span>
    </div>
  );
};

export default Header;
