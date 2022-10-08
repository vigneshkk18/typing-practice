import React, { useContext, useRef } from "react";

import {
  faChartLine,
  faLock,
  faUser,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import UserLoginModal from "./UserLoginModal";
import UserStatsModal from "./UserStatsModal";

import { UserSessionCtx } from "../../Context/UserSessionContext";

import { ModalRef } from "../../types/IModal";

const SideMenu = () => {
  const { isLoggedIn } = useContext(UserSessionCtx);
  const userLoginModalRef = useRef<ModalRef>();
  const userStatsModalRef = useRef<ModalRef>();

  const openUserLoginModal = () => userLoginModalRef.current?.openModal();
  const openUserStatsModal = () => userStatsModalRef.current?.openModal();

  return (
    <div className="min-w-[197px] h-full flex flex-col">
      <UserLoginModal ref={userLoginModalRef} />
      <UserStatsModal ref={userStatsModalRef} />
      <button
        onClick={openUserLoginModal}
        className="h-[50px] w-full mt-8 p-8 flex items-center gap-4"
      >
        <FontAwesomeIcon
          size="2x"
          icon={isLoggedIn ? faUserCheck : faUser}
          color={isLoggedIn ? "green" : ""}
        />
        <span className="font-bold text-lg">
          {isLoggedIn ? "Signed In" : "Sign In"}
        </span>
      </button>
      <hr className="my-8 border-b-[1px] border-separator" />
      <div className="relative">
        <button
          onClick={openUserStatsModal}
          disabled={!isLoggedIn}
          className={`h-[50px] w-full p-8 flex items-center gap-7 ${
            isLoggedIn ? "" : "blur-sm"
          }`}
        >
          <FontAwesomeIcon size="2x" icon={faChartLine} />
          <span className="font-bold text-lg">Stats</span>
        </button>
        {!isLoggedIn && (
          <FontAwesomeIcon
            className="absolute top-[30%] left-[45%]"
            size="2x"
            icon={faLock}
          />
        )}
      </div>
      <hr className="my-8 border-b-[1px] border-separator" />
    </div>
  );
};

export default SideMenu;
