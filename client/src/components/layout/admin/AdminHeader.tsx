import React, { useEffect, useState } from "react";
import { Layout, Menu, Dropdown, Avatar } from "antd";
import { UserOutlined, LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "../../../index.css";

const { Header } = Layout;

const AdminHeader: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setUser(JSON.parse(userData));
    } else if (!token) {
      navigate("admin/login");
    }
  }, [navigate, token]);

  const handleMenuClick = ({ key }: any) => {
    if (key === "2" && token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(null);
      setUser(null);
      navigate("admin/login");
    } else if (!token) {
      navigate("admin/login");
    } else {
      navigate("/admin/profile");
    }
  };

  const userMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      {token ? (
        <Menu.Item key="2" icon={<LogoutOutlined />}>
          Signout
        </Menu.Item>
      ) : (
        <Menu.Item key="3" icon={<LoginOutlined />}>
          Login
        </Menu.Item>
      )}
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
          <span>{user?.firstName ? user.firstName : "Guest"}</span>
        </div>
      </Dropdown>
    </Header>
  );
};

export default AdminHeader;
