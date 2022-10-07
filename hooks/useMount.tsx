import React, { useEffect } from "react";

const useMount = (fn: React.EffectCallback) => {
  useEffect(fn, []);
};

export default useMount;
