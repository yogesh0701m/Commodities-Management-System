import React from 'react';
import { Card, Row, Col, Statistic, Progress, Table, Tag } from 'antd';
import { 
  ShoppingCartOutlined, 
  DollarCircleOutlined, 
  WarningOutlined, 
  RiseOutlined,
  FallOutlined,
  TrophyOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { dashboardStats, salesData, categoryData, mockProducts } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';

const Dashboard = () => {
  const { isDark } = useTheme();

  const lowStockProducts = mockProducts.filter(product => product.status === 'Low Stock');
  
  const recentActivities = [
    { id: 1, action: 'Product Added', item: 'Premium Coffee Beans', time: '2 hours ago', type: 'success' },
    { id: 2, action: 'Stock Updated', item: 'Olive Oil', time: '4 hours ago', type: 'info' },
    { id: 3, action: 'Low Stock Alert', item: 'Dark Chocolate', time: '6 hours ago', type: 'warning' },
    { id: 4, action: 'Order Received', item: 'Basmati Rice', time: '8 hours ago', type: 'success' },
  ];

  const productColumns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          <img src={record.image} alt={text} className="w-10 h-10 rounded-lg object-cover" />
          <span className="font-medium">{text}</span>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity) => (
        <span className="font-semibold text-orange-500">{quantity}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Low Stock' ? 'red' : 'green'}>
          {status}
        </Tag>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Welcome back! Here's what's happening in your store.</p>
        </div>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Tag color="green" icon={<RiseOutlined />}>+12.5% This Month</Tag>
        </div>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className={`${isDark ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-500 to-blue-600'} border-none text-white hover:shadow-lg transform transition-all duration-300 hover:scale-105`}>
            <Statistic
              title={<span className="text-blue-100">Total Products</span>}
              value={dashboardStats.totalProducts}
              prefix={<ShoppingCartOutlined className="text-white" />}
              valueStyle={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className={`${isDark ? 'bg-gray-800' : 'bg-gradient-to-r from-green-500 to-green-600'} border-none text-white hover:shadow-lg transform transition-all duration-300 hover:scale-105`}>
            <Statistic
              title={<span className="text-green-100">Total Value</span>}
              value={dashboardStats.totalValue}
              prefix={<DollarCircleOutlined className="text-white" />}
              precision={2}
              valueStyle={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className={`${isDark ? 'bg-gray-800' : 'bg-gradient-to-r from-orange-500 to-red-600'} border-none text-white hover:shadow-lg transform transition-all duration-300 hover:scale-105`}>
            <Statistic
              title={<span className="text-orange-100">Low Stock Items</span>}
              value={dashboardStats.lowStockItems}
              prefix={<WarningOutlined className="text-white" />}
              valueStyle={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className={`${isDark ? 'bg-gray-800' : 'bg-gradient-to-r from-purple-500 to-purple-600'} border-none text-white hover:shadow-lg transform transition-all duration-300 hover:scale-105`}>
            <Statistic
              title={<span className="text-purple-100">Monthly Growth</span>}
              value={dashboardStats.monthlyGrowth}
              prefix={<RiseOutlined className="text-white" />}
              suffix="%"
              valueStyle={{ color: 'white', fontSize: '2rem', fontWeight: 'bold' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card 
            title={
              <div className="flex items-center space-x-2">
                <TrophyOutlined className="text-blue-500" />
                <span>Sales Performance</span>
              </div>
            }
            className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-lg transition-shadow duration-300`}
          >
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#f0f0f0'} />
                <XAxis dataKey="month" stroke={isDark ? '#9ca3af' : '#666'} />
                <YAxis stroke={isDark ? '#9ca3af' : '#666'} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: isDark ? '#374151' : 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#1890ff" 
                  strokeWidth={3}
                  dot={{ fill: '#1890ff', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8, fill: '#1890ff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Card 
            title={
              <div className="flex items-center space-x-2">
                <EyeOutlined className="text-green-500" />
                <span>Category Distribution</span>
              </div>
            }
            className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-lg transition-shadow duration-300`}
          >
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Percentage']}
                  contentStyle={{
                    backgroundColor: isDark ? '#374151' : 'white',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-800 dark:text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Tables Section */}
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card 
            title="Low Stock Products" 
            className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-lg transition-shadow duration-300`}
            extra={<Tag color="red" icon={<WarningOutlined />}>Attention Required</Tag>}
          >
            <Table
              columns={productColumns}
              dataSource={lowStockProducts}
              pagination={false}
              rowKey="id"
              className="animate-slide-up"
            />
          </Card>
        </Col>
        
        <Col xs={24} lg={8}>
          <Card 
            title="Recent Activities" 
            className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-lg transition-shadow duration-300`}
          >
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'success' ? 'bg-green-500' : 
                    activity.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 dark:text-white">{activity.action}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{activity.item}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Performance Metrics */}
      <Card 
        title="Performance Metrics" 
        className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} hover:shadow-lg transition-shadow duration-300`}
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Inventory Turnover</h3>
              <Progress 
                type="circle" 
                percent={75} 
                strokeColor="#52c41a"
                size={120}
                strokeWidth={8}
              />
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Stock Accuracy</h3>
              <Progress 
                type="circle" 
                percent={92} 
                strokeColor="#1890ff"
                size={120}
                strokeWidth={8}
              />
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Order Fulfillment</h3>
              <Progress 
                type="circle" 
                percent={88} 
                strokeColor="#fa8c16"
                size={120}
                strokeWidth={8}
              />
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Dashboard;