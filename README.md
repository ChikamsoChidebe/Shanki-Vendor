# Shanki-Vendor - Multi-Vendor E-commerce Platform

A comprehensive multi-vendor e-commerce marketplace built with React.js frontend and Node.js backend.

## 🚀 Features

### User Roles
- **Admin**: Manage users, vendors, orders, and platform content
- **Vendor**: Add/edit/delete products, manage orders, view analytics
- **Customer**: Browse products, add to cart, checkout, track orders

### Core Functionality
- **Authentication System**: JWT-based auth for all user roles
- **Product Management**: Full CRUD operations with image uploads
- **Shopping Cart**: Add/remove items, quantity management
- **Order System**: Complete order flow with status tracking
- **Search & Filters**: Advanced product search and filtering
- **Wallet System**: Simulated payment system with wallet balance
- **Multi-vendor Support**: Separate vendor dashboards and order management

### Order Status Flow
Pending → Processing → Shipped → Delivered

## 🛠 Tech Stack

### Frontend
- React.js 18
- React Router DOM
- Tailwind CSS
- Axios
- React Toastify
- Lucide React Icons

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing
- Multer for file uploads
- Express Validator

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Git

### Backend Setup
1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with your configurations:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shanki-vendor
JWT_SECRET=your_jwt_secret_key_here_make_it_very_long_and_secure
NODE_ENV=development
```

4. Start MongoDB service

5. Start backend server:
```bash
npm run dev
```

### Frontend Setup
1. Navigate to root directory:
```bash
cd ..
```

2. Install dependencies:
```bash
npm install
```

3. Start frontend development server:
```bash
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🎯 Demo Accounts

### Admin
- Email: admin@shanki-vendor.com
- Password: password123

### Vendor
- Email: vendor@shanki-vendor.com
- Password: password123

### Customer
- Email: customer@shanki-vendor.com
- Password: password123

## 📱 Key Pages & Features

### Public Pages
- **Home**: Hero section, featured products, categories
- **Products**: Product listing with search, filters, pagination
- **Product Detail**: Detailed product view with reviews
- **Login/Register**: Authentication forms

### Customer Dashboard
- **Cart**: Shopping cart management
- **Checkout**: Order placement with shipping and payment
- **Orders**: Order history and tracking
- **Profile**: Account management
- **Wallet**: Balance and transaction history

### Vendor Dashboard
- **Products**: Manage product inventory
- **Orders**: View and update order status
- **Analytics**: Sales and performance metrics
- **Profile**: Business information management

### Admin Dashboard
- **Users**: Manage all users and vendors
- **Products**: Oversee all products
- **Orders**: Monitor all platform orders
- **Vendor Approval**: Approve/reject vendor applications

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - Get products with filters
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Vendor)
- `PUT /api/products/:id` - Update product (Vendor)
- `DELETE /api/products/:id` - Delete product (Vendor)

### Cart & Orders
- `GET /api/users/cart` - Get user cart
- `POST /api/users/cart/add` - Add to cart
- `PUT /api/users/cart/update` - Update cart item
- `DELETE /api/users/cart/remove/:id` - Remove from cart
- `POST /api/orders/create` - Create order
- `GET /api/orders/my-orders` - Get user orders

### Admin
- `GET /api/admin/dashboard` - Admin dashboard stats
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/vendors/:id/approve` - Approve vendor

## 🎨 Design Features

- **Modern UI**: Clean, responsive design with Tailwind CSS
- **Mobile-First**: Fully responsive across all devices
- **Dark/Light Theme**: Consistent color scheme
- **Smooth Animations**: CSS transitions and animations
- **Loading States**: Proper loading indicators
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Real-time feedback

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Role-based access control
- Protected routes
- CORS configuration

## 📈 Performance Optimizations

- Image optimization
- Lazy loading
- Pagination for large datasets
- Efficient database queries
- Caching strategies
- Code splitting

## 🚀 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or your preferred database
2. Configure environment variables
3. Deploy to Heroku, AWS, or your preferred platform

### Frontend Deployment
1. Build the production version:
```bash
npm run build
```
2. Deploy to Netlify, Vercel, or your preferred platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- **Dev 1**: Authentication & Product Management
- **Dev 2**: Cart/Checkout & Order System

## 📞 Support

For support, email support@shanki-vendor.com or create an issue in the repository.

---

Built with ❤️ for better e-commerce experience.