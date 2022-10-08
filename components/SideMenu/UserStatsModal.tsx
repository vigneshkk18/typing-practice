import React, { forwardRef, useImperativeHandle, useState } from "react";
import Modal from "../Modal/Modal";

const UserStatsModal = forwardRef((_props, ref) => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  if (!open) return null;

  const title = <h1 className="text-5xl text-center mb-4">Comming Soon...</h1>;

  const content = <></>;

  return (
    <Modal
      open={open}
      title={title}
      content={content}
      actions={{
        cancelAction: closeModal,
        cancelLabel: "",
      }}
    />
  );
});

export default UserStatsModal;
