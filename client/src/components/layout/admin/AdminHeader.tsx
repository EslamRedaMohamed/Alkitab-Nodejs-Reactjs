import React from "react";
import { Layout, Menu, Dropdown, Avatar } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "../../../index.css";

const { Header } = Layout;

const AdminHeader: React.FC = () => {
  // Menu for the user dropdown
  const userMenu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Item key="3" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      className="admin-header bg-text text-background"
      style={{
        padding: "0 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="logo" style={{ fontSize: "20px", fontWeight: "bold" }}>
        ReadVibe
      </div>
      <Dropdown overlay={userMenu} placement="bottomRight">
        <div className="user-profile" style={{ cursor: "pointer" }}>
          <Avatar icon={<UserOutlined />} style={{ marginRight: "8px" }} />
          <span>Admin Name</span>
        </div>
      </Dropdown>
    </Header>
  );
};

export default AdminHeader;
