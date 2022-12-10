import { Col, Layout, Row, Image } from "antd";
import { COLORED_LOGO } from "../../constants/imagesPaths";
import "./LoginPage.scss";
import { LoginForm } from "../../components/forms/LoginForm/LoginForm";
import Title from "antd/es/typography/Title";

export const LoginPage = () => {
    return (
        <Layout className="layout">
            <Row style={{ height: "100vh", justifyContent: "center" }}>
                <Col flex={1} className="left-section">
                    <div className="video-container">
                        <video width="500" height="300" controls>
                            <source
                                src="/videos/FlappyBird-HowToPlay.mp4"
                                type="video/mp4"
                            />
                        </video>
                    </div>
                </Col>
                <Col
                    flex={1}
                    style={{
                        padding: "2rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        rowGap: "2rem",
                    }}>
                    <div className="form-container">
                        <div className="logo">
                            <Image width={200} src={COLORED_LOGO} />
                            <Title level={4}>Pachka-i-tocka edition</Title>
                        </div>

            <LoginForm />
          </div>
        </Col>
      </Row>
    </Layout>
  );
};
