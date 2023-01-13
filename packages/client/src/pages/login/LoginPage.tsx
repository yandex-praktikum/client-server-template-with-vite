import { Col, Layout, Row, Image, Typography } from "antd";
import { LoginForm } from "@/components/forms/LoginForm/LoginForm";
import { COLORED_LOGO } from "@/constants/imagesPaths";
import "./LoginPage.scss";

const LoginPage = () => (
    <Layout className="layout" data-testid="login-page">
        <Row style={{ height: "100vh", justifyContent: "center" }}>
            <Col flex={1} className="left-section">
                <div
                    className="login-form-container"
                    data-testid="form-container">
                    <div className="logo">
                        <Image
                            width={200}
                            src={COLORED_LOGO}
                            data-testid="logo"
                        />
                        <Typography.Title
                            level={4}
                            data-testid="logo-underline">
                            Pachka-i-tocka edition
                        </Typography.Title>
                    </div>

                    <LoginForm />
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
                <div className="video-container" data-testid="video-container">
                    <video
                        width="400"
                        height="300"
                        controls
                        data-testid="video">
                        <source
                            src="/videos/FlappyBird-HowToPlay.mp4"
                            type="video/mp4"
                        />
                    </video>
                </div>
            </Col>
        </Row>
    </Layout>
);

export default LoginPage;
