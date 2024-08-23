import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const AdminFooter: React.FC = () => (
  <Footer className="bg-primary text-white" style={{ textAlign: "center" }}>
    <p>&copy; {new Date().getFullYear()} AL KITAB. All rights reserved.</p>
  </Footer>
);

export default AdminFooter;
