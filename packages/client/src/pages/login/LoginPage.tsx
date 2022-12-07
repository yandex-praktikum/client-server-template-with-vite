import { Col, Layout, Row, Image } from "antd";
import { COLORED_LOGO, PRESENTATION_IMAGE } from "../../constants/imagesPaths";
import "./LoginPage.scss";
import { LoginForm } from "../../components/forms/LoginForm/LoginForm";

const background = PRESENTATION_IMAGE;

const leftSectionStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const screenStyle = {
  backgroundImage: `url(${background})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundColor: "white",
  height: "100vh",
};

export const LoginPage = () => {
  return (
    <Layout className="layout" style={screenStyle}>
      <Row style={{ height: "100vh", justifyContent: "center" }}>
        <Col flex={5} style={leftSectionStyle}>
          <div className="video-container">
            <video width="500" height="300" controls>
              <source src="/videos/FlappyBird-HowToPlay.mp4" type="video/mp4" />
            </video>
          </div>
        </Col>
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
          <div className="form-container">
            <Image width={200} src={COLORED_LOGO} />

            <LoginForm />
          </div>
        </Col>
      </Row>
    </Layout>
  );
};
