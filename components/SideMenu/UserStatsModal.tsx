import React, { forwardRef, useImperativeHandle, useState } from "react";
import { UserSessionContext } from "../../Context/UserSessionContext";
import Modal from "../Modal/Modal";

const UserStatsModal = forwardRef((_props, ref) => {
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  const title = <h1 className="text-5xl text-center mb-4">Comming Soon...</h1>;

  const content = <></>;

  if (!open) return null;

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
