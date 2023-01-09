import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { Layout, Row, Col, Button } from "antd";
import "./MainLayout.sass";
import { NavigationMenu } from "../../components/navigation/Navigation";
import Title from "antd/es/typography/Title";
import { NavLink, useLocation } from "react-router-dom";
import "./MainPage.scss";
import { getUserInfo } from "../../services/authorization";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { userActions, userSelectors } from "../../store/slices/user/userSlice";
import { Nullable, UserFromServer } from "../../api/typesApi";
const { Content, Footer, Header } = Layout;

type MainLayoutProps = {
    children: ReactElement;
};

const MainLayout: FunctionComponent<MainLayoutProps> = ({ children }) => {
    const { pathname } = useLocation();
    const userFromStorage = localStorage.getItem("user");
    const [user, setUser] = useState<Nullable<UserFromServer>>(null);

    useEffect(() => {
        try {
            if (userFromStorage) {
                setUser(JSON.parse(userFromStorage));
            }
        } catch (error) {
            console.log(error);
        }
    }, [userFromStorage]);

    return (
        <Layout className="layout">
            <Header className="layout_header">
                <img
                    src={"../../../public/Flappy_Logo.png"}
                    alt={"logo"}
                    className="layout_header_img"
                />
            </Header>

            <Content className="layout_content">
                <Row gutter={150} justify="center">
                    <Col
                        span={7}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "flex-start",
                        }}>
                        <Title level={2}>
                            Привет, {user ? user.login : "Юзер"}!
                        </Title>

                        {user ? (
                            <Title level={3}>Твой лучший результат: 777</Title>
                        ) : null}

                        <NavigationMenu />

                        {pathname === "/" ? null : (
                            <NavLink to={"/"}>
                                <Button
                                    size="large"
                                    htmlType="button"
                                    type="primary"
                                    className="layout_content-start">
                                    СТАРТ
                                </Button>
                            </NavLink>
                        )}
                    </Col>

                    <Col span={17} className="layout_content-child">
                        {children}
                    </Col>
                </Row>
            </Content>

            <Footer className="layout_footer">By Пачка и Точка</Footer>
        </Layout>
    );
};

export default MainLayout;
