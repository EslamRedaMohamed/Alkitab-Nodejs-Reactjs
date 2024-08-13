import React from "react";
import { Layout } from "antd";
import UserNavbar from "./UserNavbar";
import UserFooter from "./UserFooter";

const { Content } = Layout;

const AdminLayout: React.FC<React.ComponentProps<"div">> = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <UserNavbar />
      <Layout>
        <Content style={{ margin: "16px", background: "#F5F7F8" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <UserFooter />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
