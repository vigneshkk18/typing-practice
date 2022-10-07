import React from "react";
import { IModal } from "../../types/IModal";

const Modal = ({ open, title, content, actions }: IModal) => {
  if (!open) return null;

  return (
    <>
      <div
        onClick={actions.cancelAction}
        className="w-screen h-screen z-20 absolute top-0 left-0 opacity-50 bg-black"
      ></div>
      <div className="bg-white absolute z-50 flex flex-col w-[700px] min-h-[200px] rounded-md shadow-2xl p-8 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
        {title}
        {content}
        <div className="mt-8 flex gap-8 self-end">
          {actions.cancelAction && actions.cancelLabel && (
            <button
              className="border-2 border-separator p-2 shadow-md rounded-md min-w-[100px]"
              onClick={actions.cancelAction}
            >
              {actions.cancelLabel}
            </button>
          )}
          {actions.confirmAction && actions.confirmLabel && (
            <button
              className="border-2 border-separator p-2 shadow-md bg-orange-400 text-white font-bold min-w-[100px] rounded-md"
              onClick={actions.confirmAction}
            >
              {actions.confirmLabel}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Modal;
