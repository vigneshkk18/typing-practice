import { keys } from "./utils/utils";

export const baseUrl = "https://go-api-service-vxrt.onrender.com";

export const apiToUrlMap = {
  getDifficultyOptions: "/generate-paragraph/difficulty-options",
  generateParagraph: "/generate-paragraph/{difficulty}",
  createUserActivity: "/typing-practice/user-activity",
  getUserActivity: "/typing-practice/user-activity/{emailId}/stats",
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
