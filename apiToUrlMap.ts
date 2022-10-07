import { keys } from "./utils/utils";

export const apiToUrlMap = {
  getDifficultyOptions:
    "https://go-api-service-vxrt.onrender.com/generate-paragraph/difficulty-options",
  generateParagraph:
    "https://go-api-service-vxrt.onrender.com/generate-paragraph/{difficulty}",
  createUserActivity:
    "https://go-api-service-vxrt.onrender.com/typing-practice/user-activity",
  getUserActivity:
    "https://go-api-service-vxrt.onrender.com/typing-practice/user-activity/{emailId}",
};

export const formatString = (str: string, value: Record<string, any>) => {
  let formattedString = str;
  keys(value).forEach((key) => {
    formattedString = formattedString.replace(
      `{${String(key)}}`,
      value[String(key)]
    );
  });
  return formattedString;
};
