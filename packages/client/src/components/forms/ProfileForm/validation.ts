import * as yup from "yup";
import { validationSchema } from "../common";
import { RuleObject, StoreValue } from "rc-field-form/lib/interface";
import * as Yup from "yup";

export const PROFILE_FORM_VALIDATION_SCHEMA = yup.object({
    first_name: validationSchema.names,
    second_name: validationSchema.names,
    email: validationSchema.email,
    login: validationSchema.login,
    phone: validationSchema.phone,
    display_name: validationSchema.names,
});

export const PROFILE_PASSWORD_FORM_VALIDATION_SCHEMA = Yup.object({
    oldPassword: validationSchema.password,
    newPassword: validationSchema.password,
});

type ValidatorTypes = "profile" | "password";

export const getValidator =
    (type: ValidatorTypes) => (input: RuleObject, value: StoreValue) =>
        yup
            .reach(
                type === "profile"
                    ? PROFILE_FORM_VALIDATION_SCHEMA
                    : PROFILE_PASSWORD_FORM_VALIDATION_SCHEMA,
                (input as any).field
            )
            .validate(value)
            .then(() => Promise.resolve())
            .catch((e: unknown) => Promise.reject(e));
