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
import { capitialize } from "../../utils/utils";
import Modal from "../Modal/Modal";

interface IPlaygroundWarningModal {
  replay: () => Promise<void>;
}

const PlaygroundWarningModal = forwardRef(
  ({ replay }: IPlaygroundWarningModal, ref) => {
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

    const title = (
      <div className="flex gap-8 items-center justify-center">
        <Image width="50" height="50" src="/warning.png" alt="warning" />
        <h1 className="text-4xl">Failed !!</h1>
      </div>
    );

    const content = (
      <div className="flex flex-col my-4 items-center">
        <span className="text-xl">Ooops!! Max Time Reached.</span>
        <span className="text-xl">
          Click On <span className="text-orange-400">Replay</span> To Practice
          Again.
        </span>
      </div>
    );

    if (!open) return null;

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

export default PlaygroundWarningModal;
