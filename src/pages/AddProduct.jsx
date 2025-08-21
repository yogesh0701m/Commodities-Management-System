import React, { useState } from 'react';
import { Form, Input, Select, InputNumber, Button, Card, Row, Col, Upload, message, Divider } from 'antd';
import { PlusOutlined, SaveOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const { Option } = Select;
const { TextArea } = Input;

const AddProduct = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const categories = ['Beverages', 'Grains', 'Oils', 'Spices', 'Confectionery', 'Dairy', 'Meat', 'Vegetables', 'Fruits'];
  const suppliers = ['Global Coffee Co.', 'Farm Fresh Ltd.', 'Mediterranean Foods', 'Asian Imports Inc.', 'Cocoa Masters', 'Mountain Minerals'];

  const handleSubmit = async (values) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      message.success('Product added successfully!');
      setLoading(false);
      navigate('/products');
    }, 1500);
  };

  const uploadProps = {
    name: 'file',
    listType: 'picture-card',
    className: 'upload-list-inline',
    beforeUpload: () => false, // Prevent auto upload
    onChange: (info) => {
      // Handle file upload
    },
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/products">
            <Button 
              icon={<ArrowLeftOutlined />}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Add New Product</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Create a new product entry in your inventory</p>
          </div>
        </div>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <Card 
            title="Product Information" 
            className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg`}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              requiredMark={false}
              size="large"
            >
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="name"
                    label={<span className="text-gray-700 dark:text-gray-300 font-medium">Product Name</span>}
                    rules={[{ required: true, message: 'Please enter product name' }]}
                  >
                    <Input 
                      placeholder="Enter product name" 
                      className="rounded-lg"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    name="category"
                    label={<span className="text-gray-700 dark:text-gray-300 font-medium">Category</span>}
                    rules={[{ required: true, message: 'Please select a category' }]}
                  >
                    <Select 
                      placeholder="Select category"
                      className="rounded-lg"
                    >
                      {categories.map(category => (
                        <Option key={category} value={category}>{category}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="description"
                label={<span className="text-gray-700 dark:text-gray-300 font-medium">Description</span>}
                rules={[{ required: true, message: 'Please enter product description' }]}
              >
                <TextArea 
                  rows={3} 
                  placeholder="Enter product description"
                  className="rounded-lg"
                />
              </Form.Item>

              <Row gutter={[16, 16]}>
                <Col xs={24} md={8}>
                  <Form.Item
                    name="price"
                    label={<span className="text-gray-700 dark:text-gray-300 font-medium">Price ($)</span>}
                    rules={[{ required: true, message: 'Please enter price' }]}
                  >
                    <InputNumber 
                      placeholder="0.00"
                      min={0}
                      step={0.01}
                      className="w-full rounded-lg"
                      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                      parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    name="quantity"
                    label={<span className="text-gray-700 dark:text-gray-300 font-medium">Quantity</span>}
                    rules={[{ required: true, message: 'Please enter quantity' }]}
                  >
                    <InputNumber 
                      placeholder="0"
                      min={0}
                      className="w-full rounded-lg"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    name="status"
                    label={<span className="text-gray-700 dark:text-gray-300 font-medium">Status</span>}
                    rules={[{ required: true, message: 'Please select status' }]}
                  >
                    <Select placeholder="Select status">
                      <Option value="In Stock">In Stock</Option>
                      <Option value="Low Stock">Low Stock</Option>
                      <Option value="Out of Stock">Out of Stock</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="supplier"
                label={<span className="text-gray-700 dark:text-gray-300 font-medium">Supplier</span>}
                rules={[{ required: true, message: 'Please select a supplier' }]}
              >
                <Select 
                  placeholder="Select supplier"
                  className="rounded-lg"
                  showSearch
                  optionFilterProp="children"
                >
                  {suppliers.map(supplier => (
                    <Option key={supplier} value={supplier}>{supplier}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Divider />

              <div className="flex justify-end space-x-4">
                <Button 
                  size="large"
                  onClick={() => form.resetFields()}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Reset
                </Button>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  loading={loading}
                  icon={<SaveOutlined />}
                  size="large"
                  className="bg-gradient-to-r from-green-500 to-emerald-600 border-none hover:from-green-600 hover:to-emerald-700 transform transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  Save Product
                </Button>
              </div>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card 
            title="Product Image" 
            className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg mb-6`}
          >
            <Upload {...uploadProps}>
              <div className="flex flex-col items-center justify-center py-8">
                <PlusOutlined className="text-2xl text-gray-400 mb-2" />
                <div className="text-gray-600 dark:text-gray-400">Upload Image</div>
                <div className="text-sm text-gray-400 mt-1">PNG, JPG up to 5MB</div>
              </div>
            </Upload>
          </Card>

          <Card 
            title="Quick Tips" 
            className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg`}
          >
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">Product Name</h4>
                  <p className="text-gray-600 dark:text-gray-400">Use clear, descriptive names that customers will understand.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">Pricing</h4>
                  <p className="text-gray-600 dark:text-gray-400">Set competitive prices based on market research.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-white">Stock Management</h4>
                  <p className="text-gray-600 dark:text-gray-400">Keep track of inventory levels to avoid stockouts.</p>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddProduct;