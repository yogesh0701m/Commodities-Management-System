export const mockProducts = [
  {
    id: 1,
    name: 'Premium Coffee Beans',
    category: 'Beverages',
    price: 24.99,
    quantity: 150,
    supplier: 'Global Coffee Co.',
    status: 'In Stock',
    lastUpdated: '2025-01-15',
    image: 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'High-quality arabica coffee beans from South America'
  },
  {
    id: 2,
    name: 'Organic Wheat Flour',
    category: 'Grains',
    price: 12.50,
    quantity: 200,
    supplier: 'Farm Fresh Ltd.',
    status: 'In Stock',
    lastUpdated: '2025-01-14',
    image: 'https://images.pexels.com/photos/1580321/pexels-photo-1580321.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Certified organic wheat flour for baking'
  },
  {
    id: 3,
    name: 'Extra Virgin Olive Oil',
    category: 'Oils',
    price: 18.75,
    quantity: 75,
    supplier: 'Mediterranean Foods',
    status: 'Low Stock',
    lastUpdated: '2025-01-13',
    image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=300',
    description: 'Cold-pressed extra virgin olive oil from Italy'
  },
  {
    id: 4,
    name: 'Basmati Rice',
    category: 'Grains',
    price: 15.30,
    quantity: 300,
    supplier: 'Asian Imports Inc.',
    status: 'In Stock',
    lastUpdated: '2025-01-12',
    image: 'https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Premium aged basmati rice from India'
  },
  {
    id: 5,
    name: 'Dark Chocolate',
    category: 'Confectionery',
    price: 8.99,
    quantity: 50,
    supplier: 'Cocoa Masters',
    status: 'Low Stock',
    lastUpdated: '2025-01-11',
    image: 'https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: '70% dark chocolate bars made from Belgian cocoa'
  },
  {
    id: 6,
    name: 'Himalayan Pink Salt',
    category: 'Spices',
    price: 9.45,
    quantity: 120,
    supplier: 'Mountain Minerals',
    status: 'In Stock',
    lastUpdated: '2025-01-10',
    image: 'https://images.pexels.com/photos/1340116/pexels-photo-1340116.jpeg?auto=compress&cs=tinysrgb&w=300',
    description: 'Pure Himalayan pink rock salt for cooking'
  }
];

export const dashboardStats = {
  totalProducts: 956,
  totalValue: 45650.80,
  lowStockItems: 23,
  recentOrders: 156,
  monthlyGrowth: 12.5,
  yearlyRevenue: 2450000,
};

export const salesData = [
  { month: 'Jan', sales: 65000, orders: 120 },
  { month: 'Feb', sales: 78000, orders: 145 },
  { month: 'Mar', sales: 85000, orders: 160 },
  { month: 'Apr', sales: 92000, orders: 175 },
  { month: 'May', sales: 88000, orders: 168 },
  { month: 'Jun', sales: 95000, orders: 190 },
];

export const categoryData = [
  { name: 'Beverages', value: 35, color: '#1890ff' },
  { name: 'Grains', value: 25, color: '#52c41a' },
  { name: 'Oils', value: 20, color: '#fa8c16' },
  { name: 'Spices', value: 12, color: '#eb2f96' },
  { name: 'Others', value: 8, color: '#722ed1' },
];