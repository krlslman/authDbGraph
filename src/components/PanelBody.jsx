import { useState } from "react";
import {
  HomeOutlined,
  BarChartOutlined,
  DatabaseOutlined,
  CommentOutlined,
  UserOutlined,
  LogoutOutlined,
  CaretDownOutlined,
  CloudSyncOutlined,
  DisconnectOutlined,
  DownOutlined
} from "@ant-design/icons";
import { Layout, Menu, Avatar, Dropdown, Space } from "antd";
import Home from "./panel_menu/home/Home";
import Graphs from "./panel_menu/graphs/Graphs";
import ListTabsofData from "./panel_menu/data_menu/tab";
import { MongoDBInteractions } from './panel_menu/interactions/page'
import Image from "next/image";
import LogoSvg from './LogoSvg'
import Link from 'next/link';
const { Header, Content, Footer, Sider } = Layout;

const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024; 
function getItem(label, key, icon, children) {

  if(screenWidth>767) {
    return {
      label,
      key,
      icon,
      children,
    };
  } else {
    return {
      key,
      icon,
      // children,
    };
  }
}
const panelItems = [
  getItem("Home", "id_home", <HomeOutlined />),
  getItem("Data", "id_data", <DatabaseOutlined />),
  getItem("Graphs", "id_graphs", <BarChartOutlined />),
  getItem("Interactions", "id_dropdown", <CommentOutlined />, [
    getItem("Community", "id_dropdown_sub1"),
    // getItem("Menu2", "id_dropdown_sub2"),
  ]),
];

const PanelBody = ({user, isConnected}) => {
  const [collapsed, setCollapsed] = useState(false);

  const [selectedKey, setSelectedKey] = useState("id_data"); // opening page
  const [selectedItem, setSelectedItem] = useState(panelItems[1]); // opening active effect

  const [isMobile, setIsMobile] = useState(window.screen.width<767)


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

  const profileItems = [
    {
      label: <Link className="flex items-center gap-2" href="/api/auth/logout"><LogoutOutlined className="text-red-600"/>Logout</Link>,
      key: '0',
    },
    {
      type: 'divider',
    },
  ];

  return (
    
    <div>
    { isMobile 

    ? <Layout
        style={{
          minHeight: "100vh",
          // maxWidth:"100vw",
          // overflow:"hidden"
        }}
      >
      

        <Layout className="site-layout flex flex-wrap " 
          style={{maxWidth:"100vw", overflow:"scroll"}}>
          <div >

          <Header
            className="site-layout-background flex justify-between items-center"
            style={{ padding: 0, maxWidth:"100vw", overflow:"hidden" }} 
            >

              <div className="logo m-2 mt-lg-5 mb-lg-2"
                style={{
                  height: "50px",
                  maxWidth:"60px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LogoSvg />
              </div>
              
                <Menu
                  className="flex"
                  theme="dark"
                  defaultOpenKeys={["id_dropdown_sub1"]}
                  defaultSelectedKeys={["id_dropdown_sub1"]}
                  selectedKeys={[selectedKey]}
                  onSelect={handleMenuSelect}
                  mode="inline"
                  items={panelItems}
                >

                <Dropdown
                  menu={{
                    panelItems,
                  }}
                  selectedKeys={[selectedKey]}
                  onSelect={handleMenuSelect}
                  className=""
                >
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      Hover me
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown></Menu>


              <div className="flex items-center gap-2 pr-2 lg:pr-5">
                  <div className="mr-3 flex items-center">
                    {isConnected ? <CloudSyncOutlined className="text-slate-500 sm:text-lg lg:text-2xl lg:mt-2" /> : <DisconnectOutlined className="text-slate-500 text-2xl mt-2" /> }
                  </div>
                  <Dropdown
                    menu={{
                      items: profileItems
                    }}
                    trigger={['click']}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space className="text-slate-400">
                        { user.picture
                        // eslint-disable-next-line @next/next/no-img-element
                        ? <img src={user.picture} alt="" style={{maxHeight:"20px", minHeight:"20px", borderRadius:"999px"}}/>
                        : <Avatar size="large" icon={<UserOutlined />} /> }
                        <CaretDownOutlined className="text-slate-400"/>
                      </Space>
                    </a>
                  </Dropdown>              
              </div>
          </Header>

          <Content
            style={{
              margin: "0px",
              maxWidth:"100vw",
              display:"flex",
              flexDirection:"column",
              flexWrap:"wrap",
            }}
          >
            
            {selectedItem.key == "id_home" && <Home />}
            {selectedItem.key == "id_data" && <ListTabsofData />}
            {selectedItem.key == "id_graphs" && <Graphs />}
            {selectedItem.key == "id_dropdown" && <MongoDBInteractions /> }
            {selectedItem.key == "id_dropdown_sub1" && <MongoDBInteractions /> }
            {/* {selectedItem.key == "id_dropdown_sub2" && <div>id_dropdown_sub2 content</div> } */}
          </Content>

          <Footer
            style={{
              textAlign: "center",
            }}        >
            Created by SK ©2023
          </Footer>
          </div>
        </Layout>
      </Layout>









    : <Layout
        style={{
          minHeight: "100vh"
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
            <LogoSvg />
          </div>
          <p
            className="px-2"
            style={{ color: "white", textAlign: "center", paddingBottom: "1rem" }}
          >
            Admin Panel
          </p>
          <Menu
            theme="dark"
            defaultOpenKeys={["id_dropdown_sub1"]}
            defaultSelectedKeys={["id_dropdown_sub1"]}
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
                  <div className="mr-3 flex items-center">
                    {isConnected ? <CloudSyncOutlined className="text-slate-500 text-2xl mt-2" /> : <DisconnectOutlined className="text-slate-500 text-2xl mt-2" /> }
                  </div>
                  <Dropdown
                    menu={{
                      items: profileItems
                    }}
                    trigger={['click']}
                  >
                    <a onClick={(e) => e.preventDefault()}>
                      <Space className="text-slate-400">
                        {user?user.name:"User"}
                        { user.picture
                        // eslint-disable-next-line @next/next/no-img-element
                        ? <img src={user.picture} alt="" style={{maxHeight:"40px", minHeight:"40px", borderRadius:"999px"}}/>
                        : <Avatar size="large" icon={<UserOutlined />} /> }
                        <CaretDownOutlined className="text-slate-400"/>
                      </Space>
                    </a>
                  </Dropdown>              
              </div>
          </Header>

          <Content
            style={{
              margin: "0 16px",
            }}
          >
            
            {selectedItem.key == "id_home" && <Home />}
            {selectedItem.key == "id_data" && <ListTabsofData />}
            {selectedItem.key == "id_graphs" && <Graphs />}
            {selectedItem.key == "id_dropdown_sub1" && <MongoDBInteractions /> }
            {/* {selectedItem.key == "id_dropdown_sub2" && <div>id_dropdown_sub2 content</div> } */}
          </Content>

          <Footer
            style={{
              textAlign: "center",
            }}        >
            Created by SK ©2023
          </Footer>
        </Layout>
      </Layout>

    }
    </div>
  );
};

export default PanelBody;
