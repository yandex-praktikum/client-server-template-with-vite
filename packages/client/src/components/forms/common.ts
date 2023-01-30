import * as Yup from "yup";
import {
    ALL_DIGITS,
    EMAIL_CHARACTERS,
    ONE_CAPITAL_LETTER,
    ONE_DIGIT,
    ONE_SPACE_SYMBOL,
    ONLY_LATIN_LETTERS,
    PHONE_SYMBOLS,
    SPECIAL_CHARACTERS,
} from "@/constants/validateRegExps";

const NOT_EMPTY_TEXT = "Field can not be empty";
const NOT_SPACE_TEXT = "Field should not contain space symbols";
const NOT_SPECIAL_SYMBOLS_TEXT = "Field should not contain special characters";
const ONE_CAPITAL_LETTER_TEXT =
    "Field must contain one capital letter at least";
const ONE_DIGIT_TEXT = "Field must contain one digit at least";
const ONLY_LATIN_LETTERS_TEXT =
    "Field should use only latin letters and digits";
const ALL_DIGITS_TEXT = "Field should use at least one letter";
const EMAIL_TEXT = "Incorrect email address";
const PHONE_SYMBOLS_TEXT = "";

export const validationSchema = {
    names: Yup.string()
        .required(NOT_EMPTY_TEXT)
        .min(2, "Field must contain 2 symbols a least")
        .max(30, "Field must contain less then 30 symbols")
        .matches(ALL_DIGITS, ALL_DIGITS_TEXT)
        .matches(ONLY_LATIN_LETTERS, ONLY_LATIN_LETTERS_TEXT)
        .matches(ONE_SPACE_SYMBOL, NOT_SPACE_TEXT)
        .matches(SPECIAL_CHARACTERS, NOT_SPECIAL_SYMBOLS_TEXT),
    password: Yup.string()
        .required(NOT_EMPTY_TEXT)
        .min(8, "Field must contain 8 symbols a least")
        .max(14, "Field must contain less then 14 symbols")
        .matches(ONE_CAPITAL_LETTER, ONE_CAPITAL_LETTER_TEXT)
        .matches(ONE_DIGIT, ONE_DIGIT_TEXT),
    email: Yup.string()
        .required(NOT_EMPTY_TEXT)
        .matches(EMAIL_CHARACTERS, EMAIL_TEXT),
    login: Yup.string()
        .min(3, "Login must contain at least 3 symbols")
        .max(20, "Login must contain less than 20 symbols")
        .matches(ALL_DIGITS, ALL_DIGITS_TEXT)
        .matches(ONLY_LATIN_LETTERS, ONLY_LATIN_LETTERS_TEXT)
        .matches(ONE_SPACE_SYMBOL, NOT_SPACE_TEXT)
        .matches(SPECIAL_CHARACTERS, NOT_SPECIAL_SYMBOLS_TEXT),
    phone: Yup.string()
        .min(10, "Phone must contain 10 symbols at least")
        .matches(PHONE_SYMBOLS, PHONE_SYMBOLS_TEXT)
        .max(15, "Phone must contain less than 15 symbols"),
};
