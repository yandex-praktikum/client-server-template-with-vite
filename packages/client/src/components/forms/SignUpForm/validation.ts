import * as yup from "yup";
import {
    ALL_DIGITS,
    FIRST_CAPITAL_LETTER,
    ONE_SPACE_SYMBOL,
    ONLY_LATIN_LETTERS,
    ONLY_LETTERS_AND_DASH,
    SPECIAL_CHARACTERS,
    PHONE_SYMBOLS,
} from "../../../constants/validateRegExps";
import { RuleObject, StoreValue } from "rc-field-form/lib/interface";

export const EMAIL_MESSAGE_ERROR = "Must be in the format example@site.com";

const SIGNUP_FORM_VALIDATION_SCHEMA = yup.object().shape({
    email: yup.string().min(1, EMAIL_MESSAGE_ERROR),
    login: yup
        .string()
        .min(3, "Login must contain at least 3 symbols")
        .max(20, "Login must contain less than 20 symbols")
        .matches(ALL_DIGITS, "Login must contain at least one letter")
        .matches(
            ONLY_LATIN_LETTERS,
            "Login should use only latin letters and digits"
        )
        .matches(ONE_SPACE_SYMBOL, "Login should not contain space symbols")
        .matches(
            SPECIAL_CHARACTERS,
            "Login should not contain special characters"
        ),
    first_name: yup
        .string()
        .matches(FIRST_CAPITAL_LETTER, "The first letter must be capitalized")
        .matches(ONLY_LETTERS_AND_DASH, "Name should use only letters or dash")
        .matches(ONE_SPACE_SYMBOL, "Login should not contain space symbols"),
    second_name: yup
        .string()
        .matches(FIRST_CAPITAL_LETTER, "The first letter must be capitalized")
        .matches(ONLY_LETTERS_AND_DASH, "Name should use only letters or dash")
        .matches(ONE_SPACE_SYMBOL, "Login should not contain space symbols"),
    password: yup
        .string()
        .min(8, "Password must contain 8 symbols at least")
        .max(40, "Password must contain less than 40 symbols"),
    phone: yup
        .string()
        .min(10, "Phone must contain 10 symbols at least")
        .matches(PHONE_SYMBOLS, "Phone should use only digits")
        .max(15, "Phone must contain less than 15 symbols"),
});

export const validator = (input: RuleObject, value: StoreValue) =>
    yup
        .reach(SIGNUP_FORM_VALIDATION_SCHEMA, input.field)
        .validate(value)
        .then((_: any) => Promise.resolve())
        .catch((e: any) => Promise.reject(e));

export const matchPasswords = ({ getFieldValue }: any) => ({
    validator(_: any, value: StoreValue) {
        if (!value || getFieldValue("password") === value) {
            return Promise.resolve();
        }
        return Promise.reject(
            new Error("The two passwords that you entered do not match!")
        );
    },
});
