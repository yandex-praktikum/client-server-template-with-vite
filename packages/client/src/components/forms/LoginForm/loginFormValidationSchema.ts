import * as Yup from "yup";
import { validationSchema } from "../common";

export const LOGIN_FORM_VALIDATION_SCHEMA = Yup.object({
    login: validationSchema.names,
    password: validationSchema.password,
});
