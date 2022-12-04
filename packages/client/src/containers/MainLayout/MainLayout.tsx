import React, { FunctionComponent } from "react";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import "./MainLayout.sass";

const { Header, Content, Footer } = Layout;

type MainLayoutProps = {
    children: any;
};

const MainLayout: FunctionComponent<MainLayoutProps> = ({ children }) => {
    const routes = [
        { url: "/", label: "Главная" },
        { url: "/game", label: "Игра" },
        { url: "/forum", label: "Форум" },
        { url: "/ladder", label: "Лидер-Борд" },
    ];
    return (
        <Layout className="layout">
            <Header className="layout_header">
                <Menu
                    theme="dark"
                    mode="horizontal"
                    items={routes.map(({ url, label }, index) => {
                        const key = ++index;
                        return {
                            key,
                            icon: <NavLink to={url}>{label}</NavLink>,
                        };
                    })}
                />
            </Header>
            <Content
                className="layout_content"
                style={{ padding: "104px 50px 50px" }}>
                {children}
            </Content>
            <Footer style={{ textAlign: "center" }}>By Пачка и Точка</Footer>
        </Layout>
    );
};

export default MainLayout;
