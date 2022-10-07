import React, { createContext, useContext, useEffect, useRef } from "react";
import { PlaygroundContext } from "./PlaygroundContext";

export const keyboardEventHandlerCtx = createContext({
  registerKeyboardEventHandlers: () => {},
  removeKeyboardEventHandlers: () => {},
});

const KeyboardEventHandlersWrapper = ({ children }: any) => {
  const { updateUserTypeStatus } = useContext(PlaygroundContext);

  function eventHandler(event: KeyboardEvent) {
    const { key, code } = event;

    // highlight pressed key.
    const pressedKey = document.getElementsByClassName("key-" + code);
    if (pressedKey.length) {
      pressedKey[0].classList.toggle("pressed");

      setTimeout(() => {
        pressedKey[0].classList.toggle("pressed");
      }, 100);
    }

    if (event.code === "Space") event.preventDefault();

    if (["Shift", "Tab", "Control"].includes(key)) return;
    const direction = key === "Backspace" ? "backward" : "forward";
    updateUserTypeStatus(key, direction);
  }

  useEffect(() => {
    window.addEventListener("keyup", eventHandler);
    return () => window.removeEventListener("keyup", eventHandler);
  }, []);

  const registerKeyboardEventHandlers = () => {};

  const removeKeyboardEventHandlers = () => {};

  return (
    <keyboardEventHandlerCtx.Provider
      value={{ registerKeyboardEventHandlers, removeKeyboardEventHandlers }}
    >
      {children}
    </keyboardEventHandlerCtx.Provider>
  );
};

export default KeyboardEventHandlersWrapper;
