import { Col, Layout, Row, Button } from "antd";
import Title from "antd/es/typography/Title";
import { NavigationMenu } from "../../components/navigation/Navigation";
import { PRESENTATION_IMAGE } from "../../constants/imagesPaths";
import "./MainPage.scss";
import { SoundButton } from "../../components/buttons/SoundButton/SoundButton";

const background = PRESENTATION_IMAGE;

const screenStyle = {
    backgroundImage: `url(${background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: "white",
    height: "100vh",
};

export const MainPage = () => {
    return (
        <Layout className="layout" style={screenStyle}>
            <Row
                style={{ height: "100vh", justifyContent: "center" }}
                className="main">
                <SoundButton />

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
