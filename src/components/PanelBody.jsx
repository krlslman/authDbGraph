import { useState } from "react";
import {
  HomeOutlined,
  BarChartOutlined,
  DropboxOutlined,
  UserOutlined,
  LogoutOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, Avatar, Dropdown, Space } from "antd";
import Home from "./panel_menu/home/Home";
import Graphs from "./panel_menu/graphs/Graphs";
import ListTabsofData from "./panel_menu/data_menu/tab";
import Image from "next/image";
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const panelItems = [
  getItem("Home", "id_home", <HomeOutlined />),
  getItem("Data", "id_data", <BarChartOutlined />),
  getItem("Graphs", "id_graphs", <BarChartOutlined />),
  getItem("Dropdown Menu", "id_dropdown", <DropboxOutlined />, [
    getItem("Menu1", "id_dropdown_sub1"),
    getItem("Menu2", "id_dropdown_sub2"),
  ]),
];

const PanelBody = () => {
  const { user, error, isLoading } = useUser();
  const [collapsed, setCollapsed] = useState(false);

  const [selectedKey, setSelectedKey] = useState("id_home");
  const [selectedItem, setSelectedItem] = useState(panelItems[0]);

  const handleMenuSelect = ({ key }) => {
    setSelectedKey(key);
    let foundItem = panelItems.find((item) => item.key === key);
    if (foundItem) {
      setSelectedItem(foundItem);
      return;
    }
    for (const item of panelItems) {
      if (item.children) {
        foundItem = item.children.find((child) => child.key === key);
        if (foundItem) {
          setSelectedItem(foundItem);
          return;
        }
      }
    }
  };

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          className="logo mt-5 mb-2"
          style={{
            height: "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            className=""
            src="/assets/logo_s.png"
            alt="Vite Logo"
            height={80}
            width={70}
            style={{ objectFit: "contain" }}
          />
        </div>
        <p
          className="px-2"
          style={{ color: "white", textAlign: "center", paddingBottom: "1rem" }}
        >
          Admin Panel
        </p>
        <Menu
          theme="dark"
          defaultOpenKeys={["id_dropdown_sub2"]}
          defaultSelectedKeys={["id_dropdown_sub2"]}
          selectedKeys={[selectedKey]}
          onSelect={handleMenuSelect}
          mode="inline"
          items={panelItems}
        ></Menu>
      </Sider>

      <Layout className="site-layout">
        <Header
          className="site-layout-background flex justify-end items-center"
          style={{ padding: 0, }} >
            <div className="flex items-center gap-2 pr-2 lg:pr-5">
              <div className="flex items-center gap-1">
                <h6 className="text-slate-400">{user.name}</h6>
                <Link className="text-red-500 pb-1" href="/api/auth/logout"><LogoutOutlined /></Link>
              </div>
              
              { user.picture
              // eslint-disable-next-line @next/next/no-img-element
              ? <img src={user.picture} alt="" style={{maxHeight:"50px", borderRadius:"999px"}}/>
              : <Avatar size="large" icon={<UserOutlined />} /> }
            </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>
              {selectedItem ? selectedItem.label : "..."}
            </Breadcrumb.Item>
          </Breadcrumb>
          {selectedItem.key == "id_home" && <Home />}
          {selectedItem.key == "id_data" && <ListTabsofData />}
          {selectedItem.key == "id_graphs" && <Graphs />}
          {selectedItem.key == "id_dropdown_sub1" && <div>id_dropdown_sub1 content</div>}
          {selectedItem.key == "id_dropdown_sub2" && <div>id_dropdown_sub2 content</div> }
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}        >
          Created by SK ©2023
        </Footer>
      </Layout>
    </Layout>
  );
};

export default PanelBody;
