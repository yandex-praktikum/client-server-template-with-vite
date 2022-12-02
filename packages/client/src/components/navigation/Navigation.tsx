import {
  LogoutOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import type { MenuProps } from "antd/es/menu";
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
  getItem("View profile", "1", <UserOutlined />),
  getItem("View leaderboard", "2", <TrophyOutlined />),
  getItem("Log out", "3", <LogoutOutlined />),
];

export const NavigationMenu = () => {
  const handleClick = (event: any) => {
    console.log("click ", event);
  };

  return (
    <Menu
      className="navigation"
      onClick={handleClick}
      items={items}
      mode="vertical"
      style={{ borderInlineEnd: "none" }}
    />
  );
};
