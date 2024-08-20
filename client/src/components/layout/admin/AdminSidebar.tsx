import React from "react";
import { Layout, Menu } from "antd";
import {
  TeamOutlined,
  PieChartOutlined,
  BookOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Link } from "react-router-dom";
import "../../../index.css";

const { Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "fixed",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarColor: "unset",
  background: "#fff",
};

const items: MenuProps["items"] = [
  {
    key: "1",
    icon: <BookOutlined />,
    label: <Link to="/admin/manage-books">Manage Books</Link>,
  },
  {
    key: "2",
    icon: <PieChartOutlined />,
    label: <Link to="/admin/manage-categories">Manage Categories</Link>,
  },
  {
    key: "3",
    icon: <TeamOutlined />,
    label: <Link to="/admin/manage-authors">Manage Authors</Link>,
  },
];

const AdminSidebar: React.FC = () => {
  return (
    <Sider style={siderStyle}>
      <div className="demo-logo-vertical" />
      <Menu mode="inline" defaultSelectedKeys={["1"]} items={items} />
    </Sider>
  );
};

export default AdminSidebar;
