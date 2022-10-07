import {
  faCircleCheck,
  faGaugeHigh,
  faLayerGroup,
  faPlay,
  faStopwatch20,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { IStats } from "../../Context/UserSessionContext";
import { capitialize } from "../../utils/utils";
import Modal from "../Modal/Modal";

interface IPlaygroundSuccessModal {
  stats: IStats & {
    timer: string;
  };
  replay: () => Promise<void>;
}

const PlaygroundSuccessModal = forwardRef(
  ({ stats, replay }: IPlaygroundSuccessModal, ref) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => {
      setOpen(false);
    };

    const restartSession = async () => {
      setLoading(true);
      await replay();
      setLoading(false);
      closeModal();
    };

    useImperativeHandle(ref, () => ({
      openModal,
      closeModal,
    }));

    if (!open) return null;

    const title = (
      <div className="flex gap-8 items-center justify-center">
        <Image
          width="50"
          height="50"
          src="/party-popper.png"
          alt="party-popper"
        />
        <h1 className="text-4xl">Completed</h1>
      </div>
    );

    const content = (
      <div className="flex flex-col mt-8 gap-4 pb-1 w-full">
        <div className="flex gap-4">
          <span className="text-faded w-[50%] text-xl">Speed (WPM): </span>
          <span className="flex gap-4 items-center text-xl">
            <FontAwesomeIcon color="orange" icon={faGaugeHigh} />
            {stats.speed || "--"}
          </span>
        </div>
        <div className="flex gap-4">
          <span className="text-faded w-[50%] text-xl">Accuracy (%): </span>
          <span className="flex gap-4 items-center text-xl">
            <FontAwesomeIcon color="orange" icon={faCircleCheck} />
            {stats.accuracy || "--"}
          </span>
        </div>
        <div className="flex gap-4">
          <span className="text-faded w-[50%] text-xl">Difficulty: </span>
          <span className="flex gap-4 items-center text-xl">
            <FontAwesomeIcon color="orange" icon={faLayerGroup} />
            {capitialize(stats.difficulty)}
          </span>
        </div>
        <div className="flex gap-4">
          <span className="text-faded w-[50%] text-xl">Timer (mm:ss): </span>
          <span className="flex gap-4 items-center text-xl">
            <FontAwesomeIcon color="orange" icon={faStopwatch20} />
            {stats.timer}
          </span>
        </div>
      </div>
    );

    return (
      <Modal
        open={open}
        title={title}
        content={content}
        actions={{
          cancelAction: closeModal,
          cancelLabel: "Close",
          confirmAction: restartSession,
          confirmLabel: (
            <span className="flex gap-2 items-center justify-center">
              {loading ? (
                <svg
                  className="animate-spin -inline-block w-4 h-4 rounded-full"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                <FontAwesomeIcon icon={faPlay} />
              )}
              Replay
            </span>
          ),
        }}
      />
    );
  }
);

export default PlaygroundSuccessModal;
