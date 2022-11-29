import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Layout, Row, Image } from "antd";
import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import "./Login.scss";

export const Login = () => {
  const onFinish = (values: string[]) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: ValidateErrorEntity<string[]>) => {
    console.log("Failed:", errorInfo);
  };

  const background = "./presentation-image.jpg";

  const sectionStyle = {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <Layout
      className="layout"
      style={{
        backgroundColor: "white",
        height: "100vh",
      }}>
      <Row style={{ height: "100vh" }}>
        <Col flex={5} style={sectionStyle}></Col>
        <Col
          flex={2}
          style={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            rowGap: "2rem",
          }}>
          <Form
            className="login-form"
            name="login-form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off">
            <Image width={200} src="./Flappy_Logo.png" />
            <Form.Item
              className="form-item"
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}>
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              className="form-item"
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}>
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item className="form-item">
              <Button type="primary" htmlType="submit" block>
                Log in
              </Button>
            </Form.Item>
            <Form.Item className="form-item">
              <Button
                type="link"
                htmlType="button"
                onClick={() => console.log("signup")}
                block>
                Sign up
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Layout>
  );
};
