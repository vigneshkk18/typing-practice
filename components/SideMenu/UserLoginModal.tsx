import React, {
  forwardRef,
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import Modal from "../Modal/Modal";

import { isValidEmail } from "../../utils/utils";
import { UserSessionCtx } from "../../Context/UserSessionContext";

const UserLoginModal = forwardRef((_props, ref) => {
  const { updateEmail, isLoggedIn, logOutUser } = useContext(UserSessionCtx);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>();

  const resetUserState = () => {
    setError("");
  };

  const openModal = () => setOpen(true);
  const closeModal = () => {
    setOpen(false);
    resetUserState();
  };

  const loginHandler = () => {
    if (isLoggedIn) {
      logOutUser();
      closeModal();
      return;
    }

    if (!emailRef.current) return;
    const email = emailRef.current.value;

    if (!isValidEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    updateEmail(email);
    closeModal();
    emailRef.current.value = "";
  };

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  if (!open) return null;

  const title = <h1 className="text-5xl text-center mb-4">Login</h1>;

  const content = (
    <div className="flex flex-col gap-2 mt-4">
      <span>
        {isLoggedIn
          ? "If you proceed with a logout, future typing practise sessions won't be recorded."
          : "Login to save your progress, view your stats, and see where you stand among the others."}
      </span>
      {!isLoggedIn && (
        <>
          <label className={error ? "text-red-500" : ""} htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            name="email"
            ref={emailRef as any}
            className={`border-separator border-2 w-[50%] rounded-lg shadow-md outline-none p-2 ${
              error ? "border-red-500" : ""
            }`}
            required
          />
          {error && <span className="text-red-500">{error}</span>}
        </>
      )}
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
        confirmAction: loginHandler,
        confirmLabel: isLoggedIn ? "Logout" : "Login",
      }}
    />
  );
});

export default UserLoginModal;
