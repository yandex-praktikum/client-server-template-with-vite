import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Button, Input } from "antd";
import { useFormik } from "formik";
import { ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo, signin } from "../../../services/authorization";
import "./LoginForm.scss";
import { LOGIN_FORM_VALIDATION_SCHEMA } from "./loginFormValidationSchema";

export type LoginFormValuesType = {
    login: string;
    password: string;
};

const initialFormValues = {
    login: "",
    password: "",
};

export const LoginForm = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: initialFormValues,
        onSubmit: async (values: LoginFormValuesType) => {
            const isLoggedIn = await signin(values);

            if (isLoggedIn) {
                await getUserInfo();

                navigate("/");
            }
        },
        validationSchema: LOGIN_FORM_VALIDATION_SCHEMA,
    });

    const onInputChange = (
        name: string,
        event: ChangeEvent<HTMLInputElement>
    ) => {
        formik.setFieldTouched(name);
        formik.setFieldValue(name, event.target.value);
    };

    const onFocus = (name: string) => {
        formik.setFieldTouched(name);
    };

    return (
        <Form
            labelCol={{ flex: "86px" }}
            className="login-form"
            name="login-form"
            onFinish={formik.handleSubmit}
            autoComplete="off"
            size="large">
            <Form.Item
                className="login-form__item"
                label="Login"
                name="login"
                validateStatus={
                    formik.touched.login && formik.errors.login
                        ? "error"
                        : "success"
                }
                help={
                    formik.touched.login && formik.errors.login
                        ? formik.errors.login
                        : ""
                }>
                <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Login"
                    value={formik.values.login}
                    onChange={e => onInputChange("login", e)}
                    onFocus={() => onFocus("login")}
                />
            </Form.Item>

            <Form.Item
                className="login-form__item"
                label="Password"
                name="password"
                validateStatus={
                    formik.touched.password && formik.errors.password
                        ? "error"
                        : "success"
                }
                help={formik.touched.password && formik.errors.password}>
                <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={e => onInputChange("password", e)}
                />
            </Form.Item>

            <div className="login-form__footer">
                <Button type="primary" htmlType="submit" size="large">
                    Sign in
                </Button>

                {/* TODO: добавить переход на страницу регистрации через роутер*/}

                <Button
                    type="link"
                    htmlType="button"
                    onClick={() => navigate("/sign-up")}
                    size="large">
                    Create account
                </Button>
            </div>
        </Form>
    );
};
