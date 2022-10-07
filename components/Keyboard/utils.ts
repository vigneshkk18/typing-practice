export type IKeyboardRow = Array<IKeyboardRowItem>;
export type IKeyboardRowItem = {
  class: string;
  keys: string[];
};

export const KeyboardKeys = [
  [
    { class: "group-n-v key-Backquote key-Backtick", keys: ["~", "`"] },
    { class: "group-n-v key-Digit1 key-Digit1 key-Numpad1", keys: ["!", "1"] },
    { class: "group-n-v key-Digit2 key-Digit2 key-Numpad2", keys: ["@", "2"] },
    { class: "group-n-v key-Digit3 key-Digit3 key-Numpad3", keys: ["#", "3"] },
    { class: "group-n-v key-Digit4 key-Digit4 key-Numpad4", keys: ["$", "4"] },
    { class: "group-n-v key-Digit5 key-Digit5 key-Numpad5", keys: ["%", "5"] },
    { class: "group-n-v key-Digit6 key-Digit6 key-Numpad6", keys: ["^", "6"] },
    { class: "group-n-v key-Digit7 key-Digit7 key-Numpad7", keys: ["&", "7"] },
    { class: "group-n-v key-Digit8 key-Digit8 key-Numpad8", keys: ["*", "8"] },
    { class: "group-n-v key-Digit9 key-Digit9 key-Numpad9", keys: ["(", "9"] },
    { class: "group-n-v key-Digit0 key-Digit0 key-Numpad0", keys: [")", "0"] },
    { class: "group-n-v key-Minus key-Minus", keys: ["_", "-"] },
    { class: "group-n-v key-Equal key-Equal", keys: ["+", "="] },
    {
      class:
        "group-delete key-Backspace flex items-end justify-end gap-2 pr-4 pb-2",
      keys: ["delete", "⌫"],
    },
  ],
  [
    {
      class: "group-tab key-Tab flex items-end justify-start gap-2 pl-4 pb-2",
      keys: ["tab", "⭾"],
    },
    { class: "group-n-v key-KeyQ", keys: ["Q"] },
    { class: "group-n-v key-KeyW", keys: ["W"] },
    { class: "group-n-v key-KeyE", keys: ["E"] },
    { class: "group-n-v key-KeyR", keys: ["R"] },
    { class: "group-n-v key-KeyT", keys: ["T"] },
    { class: "group-n-v key-KeyY", keys: ["Y"] },
    { class: "group-n-v key-KeyU", keys: ["U"] },
    { class: "group-n-v key-KeyI", keys: ["I"] },
    { class: "group-n-v key-KeyO", keys: ["O"] },
    { class: "group-n-v key-KeyP", keys: ["P"] },
    { class: "group-n-v key-BracketLeft", keys: ["{", "["] },
    { class: "group-n-v key-BracketRight", keys: ["}", "]"] },
    { class: "group-n-v key-Backslash", keys: ["|", "\\"] },
  ],
  [
    {
      class:
        "group-caps-lock key-CapsLock flex items-end justify-start gap-2 pl-4 pb-2",
      keys: ["caps lock", "⇪"],
    },
    { class: "group-n-v key-KeyA", keys: ["A"] },
    { class: "group-n-v key-KeyS", keys: ["S"] },
    { class: "group-n-v key-KeyD", keys: ["D"] },
    { class: "group-n-v key-KeyF", keys: ["F"] },
    { class: "group-n-v key-KeyG", keys: ["G"] },
    { class: "group-n-v key-KeyH", keys: ["H"] },
    { class: "group-n-v key-KeyJ", keys: ["J"] },
    { class: "group-n-v key-KeyK", keys: ["K"] },
    { class: "group-n-v key-KeyL", keys: ["L"] },
    { class: "group-n-v key-Semicolon", keys: [":", ";"] },
    { class: "group-n-v key-Quote", keys: ['"', "'"] },
    {
      class: "group-enter key-Enter flex items-end justify-end gap-2 pr-4 pb-2",
      keys: ["enter", "⏎"],
    },
  ],
  [
    {
      class:
        "group-shift-left key-ShiftLeft flex items-end justify-start gap-2 pl-4 pb-2",
      keys: ["shift", "⇮"],
    },
    { class: "group-n-v key-KeyZ", keys: ["Z"] },
    { class: "group-n-v key-KeyX", keys: ["X"] },
    { class: "group-n-v key-KeyC", keys: ["C"] },
    { class: "group-n-v key-KeyV", keys: ["V"] },
    { class: "group-n-v key-KeyB", keys: ["B"] },
    { class: "group-n-v key-KeyN", keys: ["N"] },
    { class: "group-n-v key-KeyM", keys: ["M"] },
    { class: "group-n-v key-Comma", keys: ["<", ","] },
    { class: "group-n-v key-Period", keys: [">", "."] },
    { class: "group-n-v key-Slash", keys: ["?", "/"] },
    {
      class:
        "group-shift-right key-ShiftRight flex items-end justify-end gap-2 pr-4 pb-2",
      keys: ["⇮", "shift"],
    },
  ],
  [
    {
      class:
        "group-ctrl-left key-ControlLeft flex items-center justify-start pl-4",
      keys: ["ctrl"],
    },
    {
      class: "group-alt-right key-AltLeft flex items-center justify-start pl-4",
      keys: ["alt"],
    },
    {
      class: "group-cmd-left  flex items-center justify-start pl-4",
      keys: ["cmd"],
    },
    {
      class: "group-space-bar key-Space flex items-center justify-center",
      keys: ["space bar"],
    },
    {
      class: "group-cmd-right flex items-center justify-end pr-4",
      keys: ["cmd"],
    },
    {
      class: "group-alt-right key-AltRight flex items-center justify-end pr-4",
      keys: ["alt"],
    },
    {
      class:
        "group-ctrl-right key-ControlRight flex items-center justify-end pr-4",
      keys: ["ctrl"],
    },
  ],
] as const;
