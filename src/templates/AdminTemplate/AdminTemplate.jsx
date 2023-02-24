import React, { Component, useState } from 'react';
import { Route } from 'react-router'
import { FileOutlined, PieChartOutlined, UserOutlined, DesktopOutlined, TeamOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, SubMenu } from 'antd';
import { NavLink } from 'react-router-dom';
// import { useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
export default function AdminTemplate(props) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // const items = [
  //   getItem('Option 1', '1', <PieChartOutlined />),
  //   getItem('Option 2', '2', <DesktopOutlined />),
  //   getItem('User', 'sub1', <UserOutlined />, [
  //     getItem('Tom', '3'),
  //     getItem('Bill', '4'),
  //     getItem('Alex', '5'),
  //   ]),
  //   getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  //   getItem('Files', '9', <FileOutlined />),
  // ];


  const { Component, ...restProps } = props;
  return <Route {...restProps} render={(propsRoute) => {
    return <>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div
            style={{
              height: 32,
              margin: 16,
              background: 'rgba(255, 255, 255, 0.2)',
            }}
          />
          <Menu theme="dark" defaultSelectedKeys={['2']} mode="inline"  >
            <Menu.Item key="1" icon={<UserOutlined />}>
              <NavLink to="/admin/users">Users</NavLink>
            </Menu.Item>

            <Menu.SubMenu key="sub1" icon={<TeamOutlined />} title="Films">
              <Menu.Item key="2" icon={<TeamOutlined />}>
                <NavLink to="/admin/films"><span>Films</span></NavLink>
              </Menu.Item>
              <Menu.Item key="3" icon={<TeamOutlined />}>
                <NavLink to="/admin/films/addnew"><span>Add Films</span></NavLink>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.Item key="4" icon={<DesktopOutlined />}>
              <NavLink to="/admin/showtime"><span>ShowTimes</span></NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          />
          <Content
            style={{
              margin: '0 16px',
            }}
          >
            {/* <Breadcrumb
              style={{
                margin: '16px 0',
              }}
            >
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
              }}
            >
              <Component {...propsRoute} />
            </div>
          </Content>
          <Footer
            style={{
              textAlign: 'center',
            }}
          >
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  }} />
}