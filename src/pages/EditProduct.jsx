import React, { useState, useEffect } from 'react';
import { Form, Input, Select, InputNumber, Button, Card, Row, Col, Upload, message, Divider } from 'antd';
import { SaveOutlined, ArrowLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { mockProducts } from '../data/mockData';

const { Option } = Select;
const { TextArea } = Input;

const EditProduct = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { isDark } = useTheme();

  const categories = ['Beverages', 'Grains', 'Oils', 'Spices', 'Confectionery', 'Dairy', 'Meat', 'Vegetables', 'Fruits'];
  const suppliers = ['Global Coffee Co.', 'Farm Fresh Ltd.', 'Mediterranean Foods', 'Asian Imports Inc.', 'Cocoa Masters', 'Mountain Minerals'];

  useEffect(() => {
    const foundProduct = mockProducts.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      form.setFieldsValue(foundProduct);
    } else {
      message.error('Product not found');
      navigate('/products');
    }
  }, [id, form, navigate]);

  const handleSubmit = async (values) => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      message.success('Product updated successfully!');
      setLoading(false);
      navigate('/products');
    }, 1500);
  };

  const handleDelete = () => {
    // Show confirmation modal in real app
    message.success('Product deleted successfully!');
    navigate('/products');
  };

  if (!product) {
    return <div>Loading...</div>;
  }

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
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Edit Product</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Update product information in your inventory</p>
          </div>
        </div>
        <Button 
          danger
          icon={<DeleteOutlined />}
          onClick={handleDelete}
          className="hover:bg-red-50 border-red-300 text-red-500"
        >
          Delete Product
        </Button>
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
                  onClick={() => navigate('/products')}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  loading={loading}
                  icon={<SaveOutlined />}
                  size="large"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 border-none hover:from-blue-600 hover:to-purple-700 transform transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  Update Product
                </Button>
              </div>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card 
            title="Current Product Image" 
            className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg mb-6`}
          >
            <div className="flex justify-center">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-48 h-48 object-cover rounded-lg shadow-md"
              />
            </div>
          </Card>

          <Card 
            title="Product Statistics" 
            className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white'} shadow-lg`}
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
                <span className="font-medium text-gray-800 dark:text-white">{product.lastUpdated}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Current Status</span>
                <span className={`font-medium ${product.status === 'In Stock' ? 'text-green-600' : 'text-red-600'}`}>
                  {product.status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Total Value</span>
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  ${(product.price * product.quantity).toFixed(2)}
                </span>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EditProduct;