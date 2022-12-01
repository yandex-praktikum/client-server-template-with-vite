import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Form, Button, Input } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ChangeEvent } from "react";
import "./LoginForm.scss";

export type LoginFormValuesType = {
  login: string;
  password: string;
};

export const LoginForm = () => {
  const validationSchema = Yup.object({
    login: Yup.string().required("This field can not be empty"),
    password: Yup.string().required("This field can not be empty"),
  });

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    onSubmit: (values: LoginFormValuesType) => {
      console.log("values: ", values);
    },
    validationSchema: validationSchema,
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
        <Button type="primary" htmlType="submit" block>
          Log in
        </Button>

        {/* TODO: добавить переход на страницу регистрации через роутер*/}

        <Button
          type="link"
          htmlType="button"
          onClick={() => console.log("signup")}
          block>
          Create account
        </Button>
      </div>
    </Form>
  );
};
