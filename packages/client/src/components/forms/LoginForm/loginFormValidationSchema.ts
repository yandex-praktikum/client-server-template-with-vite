import * as Yup from "yup";
import {
  ALL_DIGITS,
  ONE_CAPITAL_LETTER,
  ONE_DIGIT,
  ONE_SPACE_SYMBOL,
  ONLY_LATIN_LETTERS,
  SPECIAL_CHARACTERS,
} from "../../../constants/validateRegExps";

export const LOGIN_FORM_VALIDATION_SCHEMA = Yup.object({
  login: Yup.string()
    .required("This field can not be empty")
    .min(3, "Field must contain 3 symbols a least")
    .max(20, "Field must contain less then 20 symbols")
    .matches(ALL_DIGITS, "Login should use at least one letter")
    .matches(
      ONLY_LATIN_LETTERS,
      "Login should use only latin letters and digits"
    )
    .matches(ONE_SPACE_SYMBOL, "Login should not contain space symbols")
    .matches(SPECIAL_CHARACTERS, "Login should not contain special characters"),
  password: Yup.string()
    .required("This field can not be empty")
    .min(8, "Field must contain 8 symbols a least")
    .max(14, "Field must contain less then 14 symbols")
    .matches(
      ONE_CAPITAL_LETTER,
      "Password must contain one capital letter at least"
    )
    .matches(ONE_DIGIT, "Password must contain one digit at least"),
});
