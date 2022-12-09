import { Col, Layout, Row, Button } from "antd";
import Title from "antd/es/typography/Title";
import { NavigationMenu } from "../../components/navigation/Navigation";
import "./MainPage.scss";
import { SoundSettings } from "../../components/SoundSettings/SoundSettings";

export const MainPage = () => {
    return (
        <Layout className="layout">
            <Row
                style={{ height: "100vh", justifyContent: "center" }}
                className="main">
                <SoundSettings />

                <Col
                    flex={2}
                    style={{
                        padding: "4rem 2rem",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        rowGap: "2rem",
                    }}>
                    {/* TODO: брать имя из стора и лучший результат из локал сторедж? */}
                    <Title level={2}>Hello, USER</Title>
                    <Title level={3}>Your best score: 999</Title>

                    <div className="main__menu">
                        <NavigationMenu />

                        <Button
                            size="large"
                            htmlType="button"
                            type="primary"
                            className="btn-start">
                            Start game
                        </Button>
                    </div>
                </Col>
            </Row>
        </Layout>
    );
};
