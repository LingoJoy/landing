import { ELocalization, ELocalizationQuestionnaire } from "@/constants";

export const isRegexExactMatch = (value: string, regexp: string | RegExp) => {
  const res = value.match(regexp);
  return res && res[0] && res[0] === res.input;
};

export const validateEmail = (email: string) => {
  const emailFormatRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailFormatRegex.test(email)) {
    return ELocalization.VALIDATE_EMAIL_NOT_VALID;
  }

  if (!email.endsWith("@gmail.com")) {
    return ELocalization.VALIDATE_EMAIL_NOT_ALLOWED;
  }

  return "";
};

export const validatePassword = (password: string) => {
  const passwordRegex =
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$";

  return !isRegexExactMatch(password, passwordRegex)
    ? ELocalization.VALIDATE_PASSWORD
    : "";
};

export const validateName = (name: string) => {
  return name.length < 0 ? ELocalization.VALIDATE_NAME : "";
};

export const validateQuestEmail = (email: string)  => {
  const emailFormatRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!emailFormatRegex.test(email)) {
    return ELocalizationQuestionnaire.VALIDATE_EMAIL_NOT_VALID;
  }

  return "";
};

export const validateQuestPassword = (password: string) => {
  const passwordRegex =
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";

  return !isRegexExactMatch(password, passwordRegex)
    ? ELocalizationQuestionnaire.VALIDATE_PASSWORD
    : "";
};

export const validateQuestName = (name: string) => {
  return name.length < 0 ? ELocalizationQuestionnaire.VALIDATE_NAME : "";
};
