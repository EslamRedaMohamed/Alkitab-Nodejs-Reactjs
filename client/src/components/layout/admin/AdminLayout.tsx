import React from "react";
import { Layout, Menu, theme } from "antd";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import AdminSidebar from "./AdminSidebar";

const { Content } = Layout;

const AdminLayout: React.FC<React.ComponentProps<"div">> = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout hasSider>
      <AdminSidebar />
      <Layout style={{ marginInlineStart: 200 }}>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <AdminHeader />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            style={{
              padding: 24,
              textAlign: "center",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <AdminFooter />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
