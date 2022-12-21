import { Col, Layout, Row, Button } from "antd";
import { NavigationMenu } from "../../components/navigation/Navigation";
import "./MainPage.scss";
import { NavLink } from "react-router-dom";

export const MainPage = () => {
    return (
        <Layout className="layout" data-testid="main-page">
            <Row
                style={{ height: "100vh", justifyContent: "center" }}
                className="main-page">
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
                    <h2 data-testid="main-title">Hello, USER</h2>
                    <h3 data-testid="main-score">Your best score: 999</h3>

                    <div className="main__menu">
                        <NavigationMenu />

                        <NavLink to={"/game"}>
                            <Button
                                size="large"
                                htmlType="button"
                                type="primary"
                                className="btn-start"
                                data-testid="start-game-button">
                                Start game
                            </Button>
                        </NavLink>
                    </div>
                </Col>
            </Row>
        </Layout>
    );
};
