import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Button, Input } from "antd";
import { useFormik } from "formik";
import { ChangeEvent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
    getUserInfo,
    signin,
    signinWithYandex,
} from "@/services/authorization";
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

    const submitHandler = async (values: LoginFormValuesType) => {
        const isLoggedIn = await signin(values);

        if (isLoggedIn) {
            const userFormServer = await getUserInfo();

            localStorage.setItem("user", JSON.stringify(userFormServer.data));

            navigate("/");
        }
    };

    const formik = useFormik({
        initialValues: initialFormValues,
        onSubmit: submitHandler,
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

    const handleYandexOauth = async () => {
        await signinWithYandex();
    };

    return (
        <Form
            labelCol={{ flex: "86px" }}
            className="login-form"
            name="login-form"
            onFinish={formik.handleSubmit}
            autoComplete="off"
            size="large"
            data-testid="login-form">
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
                    data-testid="login-input"
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
                    data-testid="password-input"
                />
            </Form.Item>

            <div className="login-form__footer">
                <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    data-testid="signin-button">
                    Sign in
                </Button>

                <p>or login with</p>
                <Button
                    type="ghost"
                    htmlType="button"
                    data-testid="yandex-button"
                    className="yandex-button"
                    onClick={handleYandexOauth}></Button>

                <NavLink to={"/sign-up"}>
                    <Button
                        type="link"
                        htmlType="button"
                        size="large"
                        data-testid="signup-button">
                        Create account
                    </Button>
                </NavLink>
            </div>
        </Form>
    );
};
