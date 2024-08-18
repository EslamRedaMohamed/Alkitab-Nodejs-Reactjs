import React from "react";
import { useLocation } from "react-router-dom";
import { Layout } from "antd";
import UserNavbar from "./UserNavbar";
import UserFooter from "./UserFooter";

const { Content } = Layout;

const UserLayout: React.FC<React.ComponentProps<"div">> = ({ children }) => {
  const location = useLocation();

  // Check if the current route is the home page
  const isHomePage = location.pathname === "/";

  return (
    <Layout style={{ minHeight: "100vh", position: "relative" }}>
      {/* Pass the isTransparent prop based on the current page */}
      <UserNavbar isTransparent={isHomePage} />
      <Layout>
        <Content className="bg-background pt-16">{children}</Content>
        <UserFooter />
      </Layout>
    </Layout>
  );
};

export default UserLayout;
