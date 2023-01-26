import {
    LogoutOutlined,
    TeamOutlined,
    TrophyOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import type { MenuProps } from "antd/es/menu";
import { MouseEventHandler } from "react";
import { NavLink } from "react-router-dom";
import { signout } from "@/services/authorization";
import "./Navigation.scss";
import { useAppSelector } from "@/store/hooks";
import { userSelectors } from "@/store/slices/user/userSlice";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    onClick?: MouseEventHandler,
    className = "navigation__item"
): MenuItem {
    return {
        key,
        icon,
        label,
        onClick,
        className,
    } as MenuItem;
}

export const NavigationMenu = () => {
    const { user } = useAppSelector(userSelectors.all);

    const firstItem = user
        ? getItem(
              "Профиль",
              "1",
              <NavLink to={"/profile"} data-testid="goto-profile-btn">
                  <UserOutlined />
              </NavLink>
          )
        : getItem(
              "Войти",
              "1",
              <NavLink to={"/sign-in"} data-testid="goto-signin-btn">
                  <UserOutlined />
              </NavLink>
          );

    const lastItem = user
        ? getItem(
              "Выйти",
              "4",
              <NavLink to={""} data-testid="goto-login-btn">
                  <LogoutOutlined />
              </NavLink>,
              signout
          )
        : null;

    const items: MenuItem[] = [
        firstItem,
        getItem(
            "Доска лидеров",
            "2",
            <NavLink to={"/ladder"} data-testid="goto-ladder-btn">
                <TrophyOutlined />
            </NavLink>
        ),
        getItem(
            "Форум",
            "3",
            <NavLink to={"/forum"} data-testid="goto-forum-btn">
                <TeamOutlined />
            </NavLink>
        ),
        lastItem,
    ];
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
