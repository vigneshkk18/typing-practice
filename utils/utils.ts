export const values = <T extends Object>(obj?: Record<any, T>) =>
  (obj ? Object.values(obj) : []) as T[];

export const keys = <T extends Object>(obj?: Record<any, T>) =>
  (obj ? Object.keys(obj) : []) as Array<keyof T>;

export const capitialize = (str: string) => {
  let formattedString = "";
  for (let s of str.split(" ")) {
    formattedString += s.at(0)?.toUpperCase() + s.substring(1);
  }
  return formattedString;
};

export const formatNumber = (num: number, intDigit: number) => {
  return num.toLocaleString("en-US", {
    minimumIntegerDigits: intDigit,
    useGrouping: false,
  });
};

export const getMins = (min: number, seconds: number) => {
  return min + seconds / 60;
};

export const getMinsFromString = (timeStr: string) => {
  const [min, sec] = timeStr.split(":").map((str) => +str);
  return getMins(min, sec);
};

export const isValidEmail = (email: string): boolean => {
  return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<.test>()[\]\.,;:\s@\"]{2,})$/i.test(
    email
  );
};
