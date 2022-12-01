import { Col, Layout, Row, Image } from "antd";
import { COLORED_LOGO, PRESENTATION_IMAGE } from "../../constants/imagesPaths";
import { Formik, useFormik } from "formik";
import "./LoginPage.scss";
import {
  LoginForm,
  LoginFormValuesType,
} from "../../components/forms/LoginForm/LoginForm";

const background = PRESENTATION_IMAGE;

const sectionStyle = {
  backgroundImage: `url(${background})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};

export const LoginPage = () => {
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
          <Image width={200} src={COLORED_LOGO} />

          <LoginForm />
        </Col>
      </Row>
    </Layout>
  );
};
