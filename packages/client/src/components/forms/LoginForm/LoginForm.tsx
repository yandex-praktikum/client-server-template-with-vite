import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Button, Input } from "antd";
import { useFormik } from "formik";

import { ChangeEvent } from "react";
import { signin } from "../../../services/authorization";
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
  const formik = useFormik({
    initialValues: initialFormValues,
    onSubmit: async (values: LoginFormValuesType) => {
      const isLoggedIn = await signin(values);

      if (isLoggedIn) {
        console.log("reset");
      }
    },
    validationSchema: LOGIN_FORM_VALIDATION_SCHEMA,
  });

  const onInputChange = (
    name: string,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    formik.setFieldValue(name, event.target.value);
  };

  return (
    <Form
      className="login-form"
      name="login-form"
      onFinish={formik.handleSubmit}
      autoComplete="off">
      <Form.Item
        className="login-form__item"
        label="Login"
        name="login"
        validateStatus={formik.errors.login ? "error" : "success"}
        help={formik.errors.login}>
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Login"
          value={formik.values.login}
          onChange={e => onInputChange("login", e)}
        />
      </Form.Item>

      <Form.Item
        className="login-form__item"
        label="Password"
        name="password"
        validateStatus={formik.errors.password ? "error" : "success"}
        help={formik.errors.password}>
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
          value={formik.values.password}
          onChange={e => onInputChange("password", e)}
        />
      </Form.Item>

      <div className="login-form__footer">
        <Button type="primary" htmlType="submit" block size="large">
          Log in
        </Button>

        {/* TODO: добавить переход на страницу регистрации через роутер*/}

        <Button
          type="link"
          htmlType="button"
          onClick={() => console.log("signup")}
          block
          size="large">
          Create account
        </Button>
      </div>
    </Form>
  );
};
