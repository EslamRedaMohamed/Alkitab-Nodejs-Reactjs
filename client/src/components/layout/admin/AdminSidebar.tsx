// import React from "react";
// import { Layout, Menu } from "antd";
// import "../../../index.css";

// const { Sider } = Layout;

// const AdminSidebar: React.FC = () => (
//   <Sider collapsible style={{ background: "#F4CE14" }}>
//     {/* <div className="logo" style={{ height: "32px", margin: "16px" }} /> */}
//     <Menu
//       style={{ background: "white", minHeight: "100vh" }}
//       mode="inline"
//       defaultSelectedKeys={["1"]}
//     >
//       <Menu.Item key="1">Dashboard</Menu.Item>
//       <Menu.Item key="2">Manage Books</Menu.Item>
//       <Menu.Item key="3">Manage Users</Menu.Item>
//     </Menu>
//   </Sider>
// );

// export default AdminSidebar;

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

// import React, { useState } from "react";
// import {
//   AppstoreOutlined,
//   ContainerOutlined,
//   DesktopOutlined,
//   MailOutlined,
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   PieChartOutlined,
// } from "@ant-design/icons";
// import type { MenuProps } from "antd";
// import { Button, Menu } from "antd";

// type MenuItem = Required<MenuProps>["items"][number];

// const items: MenuItem[] = [
//   { key: "1", icon: <PieChartOutlined />, label: "Option 1" },
//   { key: "2", icon: <DesktopOutlined />, label: "Option 2" },
//   { key: "3", icon: <ContainerOutlined />, label: "Option 3" },
//   {
//     key: "sub1",
//     label: "Navigation One",
//     icon: <MailOutlined />,
//     children: [
//       { key: "5", label: "Option 5" },
//       { key: "6", label: "Option 6" },
//       { key: "7", label: "Option 7" },
//       { key: "8", label: "Option 8" },
//     ],
//   },
//   {
//     key: "sub2",
//     label: "Navigation Two",
//     icon: <AppstoreOutlined />,
//     children: [
//       { key: "9", label: "Option 9" },
//       { key: "10", label: "Option 10" },
//       {
//         key: "sub3",
//         label: "Submenu",
//         children: [
//           { key: "11", label: "Option 11" },
//           { key: "12", label: "Option 12" },
//         ],
//       },
//     ],
//   },
// ];

// const AdminSidebar: React.FC = () => {
//   const [collapsed, setCollapsed] = useState(false);

//   const toggleCollapsed = () => {
//     setCollapsed(!collapsed);
//   };

//   return (
//     <div style={{ width: 256 }}>
//       <Button
//         type="primary"
//         onClick={toggleCollapsed}
//         style={{ marginBottom: 16 }}
//       >
//         {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//       </Button>
//       <Menu
//         defaultSelectedKeys={["1"]}
//         defaultOpenKeys={["sub1"]}
//         mode="inline"
//         theme="dark"
//         inlineCollapsed={collapsed}
//         items={items}
//       />
//     </div>
//   );
// };

// export default AdminSidebar;
