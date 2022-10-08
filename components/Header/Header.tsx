import React from "react";
import Image from "next/image";

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
