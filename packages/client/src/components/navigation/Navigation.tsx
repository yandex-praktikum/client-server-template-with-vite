import {
    LogoutOutlined,
    TeamOutlined,
    TrophyOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import type { MenuProps } from "antd/es/menu";
import { NavLink } from "react-router-dom";
import "./Navigation.scss";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    className = "navigation__item"
): MenuItem {
    return {
        key,
        icon,
        label,
        className,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(
        "View profile",
        "1",
        <NavLink to={"/profile"} data-testid="goto-profile-btn">
            <UserOutlined />
        </NavLink>
    ),
    getItem(
        "View leaderboard",
        "2",
        <NavLink to={"/ladder"} data-testid="goto-ladder-btn">
            <TrophyOutlined />
        </NavLink>
    ),
    getItem(
        "View forum",
        "3",
        <NavLink to={"/forum"} data-testid="goto-forum-btn">
            <TeamOutlined />
        </NavLink>
    ),
    getItem(
        "Log out",
        "4",
        <NavLink to={"/sign-in"} data-testid="goto-login-btn">
            <LogoutOutlined />
        </NavLink>
    ),
];

export const NavigationMenu = () => {
    return (
        <Menu
            className="navigation"
            items={items}
            mode="vertical"
            style={{ borderInlineEnd: "none" }}
            data-testid="navigation"
        />
    );
};
