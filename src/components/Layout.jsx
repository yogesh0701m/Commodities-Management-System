import React, { useState } from 'react';
import { Layout as AntLayout, Menu, Avatar, Dropdown, Switch, Badge } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import {
  DashboardOutlined,
  ShoppingOutlined,
  PlusOutlined,
  LogoutOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BulbOutlined,
  BellOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = AntLayout;

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  const getMenuItems = () => {
    const baseItems = [
      {
        key: '/products',
        icon: <ShoppingOutlined />,
        label: <Link to="/products">View Products</Link>,
      },
      {
        key: '/add-product',
        icon: <PlusOutlined />,
        label: <Link to="/add-product">Add Product</Link>,
      },
    ];

    if (user?.role === 'Manager') {
      return [
        {
          key: '/dashboard',
          icon: <DashboardOutlined />,
          label: <Link to="/dashboard">Dashboard</Link>,
        },
        ...baseItems,
      ];
    }

    return baseItems;
  };

  return (
    <AntLayout className="min-h-screen">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className={`${isDark ? 'bg-gray-900' : 'bg-white'} shadow-lg transition-all duration-300`}
        width={250}
      >
        <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <ShoppingOutlined className="text-white text-lg" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-lg font-bold text-gray-800 dark:text-white">CMS</h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Commodities</p>
              </div>
            )}
          </div>
        </div>
        
        <Menu
          theme={isDark ? 'dark' : 'light'}
          mode="inline"
          selectedKeys={[location.pathname]}
          items={getMenuItems()}
          className="border-none mt-4"
        />
      </Sider>

      <AntLayout>
        <Header className={`${isDark ? 'bg-gray-800' : 'bg-white'} shadow-sm px-4 flex items-center justify-between transition-colors duration-300`}>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              {location.pathname === '/dashboard' && 'Dashboard'}
              {location.pathname === '/products' && 'Products'}
              {location.pathname === '/add-product' && 'Add Product'}
              {location.pathname.includes('/edit-product') && 'Edit Product'}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BulbOutlined className="text-gray-600 dark:text-gray-300" />
              <Switch 
                checked={isDark} 
                onChange={toggleTheme}
                size="small"
              />
            </div>
            
            <Badge count={5} size="small">
              <BellOutlined className="text-xl text-gray-600 dark:text-gray-300 cursor-pointer hover:text-blue-500 transition-colors" />
            </Badge>

            <Dropdown 
              menu={{ items: userMenuItems }}
              placement="bottomRight"
              arrow
            >
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-lg transition-colors duration-200">
                <Avatar 
                  size="small" 
                  style={{ backgroundColor: '#1890ff' }}
                >
                  {user?.name?.charAt(0)}
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-800 dark:text-white">{user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role}</p>
                </div>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content className={`${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-6 transition-colors duration-300`}>
          <div className="animate-fade-in">
            {children}
          </div>
        </Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;