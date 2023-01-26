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
        </Row>
    </Layout>
);

export default LoginPage;
