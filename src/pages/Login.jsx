import React, { useState } from 'react';
import { Form, Input, Button, Card, Alert, Divider } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const { isDark } = useTheme();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (values) => {
    setLoading(true);
    setError('');
    
    const result = await login(values.email, values.password);
    
    if (!result.success) {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'} transition-colors duration-300`}>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center animate-bounce-in">
          <div className="mx-auto h-20 w-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <LoginOutlined className="h-10 w-10 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to your Commodities Management account
          </p>
        </div>

        <Card 
          className={`shadow-2xl border-0 ${isDark ? 'bg-gray-800' : 'bg-white/80 backdrop-blur-sm'} animate-slide-up`}
          style={{ borderRadius: '1rem' }}
        >
          <Form
            name="login"
            onFinish={handleSubmit}
            layout="vertical"
            size="large"
          >
            {error && (
              <Alert
                message={error}
                type="error"
                showIcon
                className="mb-6 animate-fade-in"
                style={{ borderRadius: '0.5rem' }}
              />
            )}

            <Form.Item
              name="email"
              label={<span className="text-gray-700 dark:text-gray-300 font-medium">Email Address</span>}
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="Enter your email"
                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={<span className="text-gray-700 dark:text-gray-300 font-medium">Password</span>}
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Enter your password"
                className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 border-none rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transform transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <Divider className="my-6">
            <span className="text-gray-500 dark:text-gray-400 text-sm">Demo Credentials</span>
          </Divider>

          <div className="space-y-3 text-sm">
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-blue-50'}`}>
              <p className="font-medium text-blue-600 dark:text-blue-400">Manager Account:</p>
              <p className="text-gray-600 dark:text-gray-300">Email: manager@company.com</p>
              <p className="text-gray-600 dark:text-gray-300">Password: manager123</p>
            </div>
            <div className={`p-3 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-green-50'}`}>
              <p className="font-medium text-green-600 dark:text-green-400">Store Keeper Account:</p>
              <p className="text-gray-600 dark:text-gray-300">Email: keeper@company.com</p>
              <p className="text-gray-600 dark:text-gray-300">Password: keeper123</p>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © 2024 Commodities Management System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;