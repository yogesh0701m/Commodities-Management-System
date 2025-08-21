import React, { useState } from 'react';
import { Card, Table, Tag, Button, Input, Select, Row, Col, Avatar, Tooltip, Space } from 'antd';
import { SearchOutlined, FilterOutlined, EyeOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { mockProducts } from '../data/mockData';
import { useTheme } from '../contexts/ThemeContext';

const { Search } = Input;
const { Option } = Select;

const Products = () => {
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const { isDark } = useTheme();

  const categories = ['all', ...new Set(mockProducts.map(product => product.category))];
  const statuses = ['all', ...new Set(mockProducts.map(product => product.status))];

  const handleSearch = (value) => {
    setSearchText(value);
    filterProducts(value, selectedCategory, selectedStatus);
  };

  const handleCategoryFilter = (value) => {
    setSelectedCategory(value);
    filterProducts(searchText, value, selectedStatus);
  };

  const handleStatusFilter = (value) => {
    setSelectedStatus(value);
    filterProducts(searchText, selectedCategory, value);
  };

  const filterProducts = (search, category, status) => {
    let filtered = products;

    if (search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.supplier.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }

    if (status !== 'all') {
      filtered = filtered.filter(product => product.status === status);
    }

    setFilteredProducts(filtered);
  };

  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center space-x-3">
          <Avatar 
            size={48}
            src={record.image}
            className="rounded-lg"
          />
          <div>
            <h4 className="font-semibold text-gray-800 dark:text-white">{text}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{record.description}</p>
          </div>
        </div>
      ),
      width: '25%',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => (
        <Tag 
          color={
            category === 'Beverages' ? 'blue' :
            category === 'Grains' ? 'green' :
            category === 'Oils' ? 'orange' :
            category === 'Spices' ? 'red' : 'purple'
          }
          className="px-3 py-1 rounded-full"
        >
          {category}
        </Tag>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => (
        <span className="font-bold text-green-600 dark:text-green-400 text-lg">
          ${price}
        </span>
      ),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => (
        <div>
          <span className={`font-semibold ${record.status === 'Low Stock' ? 'text-red-500' : 'text-blue-600 dark:text-blue-400'}`}>
            {quantity}
          </span>
          <p className="text-xs text-gray-500 dark:text-gray-400">units</p>
        </div>
      ),
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag 
          color={status === 'In Stock' ? 'green' : 'red'}
          className="px-3 py-1 rounded-full font-medium"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Supplier',
      dataIndex: 'supplier',
      key: 'supplier',
      render: (supplier) => (
        <span className="text-gray-600 dark:text-gray-300">{supplier}</span>
      ),
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
      render: (date) => (
        <span className="text-sm text-gray-500 dark:text-gray-400">{date}</span>
      ),
      sorter: (a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button 
              type="text" 
              icon={<EyeOutlined />}
              className="hover:bg-blue-50 dark:hover:bg-gray-700 text-blue-500 hover:text-blue-600"
            />
          </Tooltip>
          <Tooltip title="Edit Product">
            <Link to={`/edit-product/${record.id}`}>
              <Button 
                type="text" 
                icon={<EditOutlined />}
                className="hover:bg-orange-50 dark:hover:bg-gray-700 text-orange-500 hover:text-orange-600"
              />
            </Link>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Products Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your inventory of {filteredProducts.length} products
          </p>
        </div>
        <Link to="/add-product">
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            size="large"
            className="bg-gradient-to-r from-blue-500 to-purple-600 border-none hover:from-blue-600 hover:to-purple-700 transform transition-all duration-200 hover:scale-105 shadow-lg"
          >
            Add New Product
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg`}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={8} md={8}>
            <Search
              placeholder="Search products, suppliers..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              onChange={(e) => !e.target.value && handleSearch('')}
              className="custom-search"
            />
          </Col>
          <Col xs={24} sm={8} md={4}>
            <Select
              placeholder="Category"
              size="large"
              value={selectedCategory}
              onChange={handleCategoryFilter}
              className="w-full"
              suffixIcon={<FilterOutlined />}
            >
              {categories.map(category => (
                <Option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={8} md={4}>
            <Select
              placeholder="Status"
              size="large"
              value={selectedStatus}
              onChange={handleStatusFilter}
              className="w-full"
              suffixIcon={<FilterOutlined />}
            >
              {statuses.map(status => (
                <Option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={24} md={8}>
            <div className="flex flex-wrap gap-2">
              <Tag color="blue" className="px-3 py-1 rounded-full">
                Total: {filteredProducts.length}
              </Tag>
              <Tag color="green" className="px-3 py-1 rounded-full">
                In Stock: {filteredProducts.filter(p => p.status === 'In Stock').length}
              </Tag>
              <Tag color="red" className="px-3 py-1 rounded-full">
                Low Stock: {filteredProducts.filter(p => p.status === 'Low Stock').length}
              </Tag>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Products Table */}
      <Card 
        className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg hover:shadow-xl transition-shadow duration-300`}
      >
        <Table
          columns={columns}
          dataSource={filteredProducts}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
          scroll={{ x: 1200 }}
          className="custom-table"
          rowClassName="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        />
      </Card>
    </div>
  );
};

export default Products;