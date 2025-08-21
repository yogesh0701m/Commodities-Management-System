# 📦 Professional Commodities Management System

A **Commodities Management System** built with **ReactJS (JSX)**, styled using **Tailwind CSS, Ant Design, and Bootstrap**.  
This project implements **role-based access**, authentication, a responsive dashboard, product management, and theme switching.

---

## 📌 Project Statement
The system allows **Managers** and **Store Keepers** to log in, manage products, and access different features based on their roles.  
Key features include **role-based menus, router guards, light/dark mode, and dynamic UI restrictions**.

---

## 🎯 Features

### 🔑 Authentication & Access
- **Login** → Email/Password authentication with AntD form.  
- **Role-Based Access** → Manager and Store Keeper roles.

### 📊 Core UI Features
- **Dashboard** → Managers only, shows statistics and summaries.  
- **View All Products** → Both Manager & Store Keeper can access.  
- **Add/Edit Products** → Both roles can add or edit products.

### 🎨 UI Enhancements
- **Light/Dark Mode** → Toggle theme with Tailwind + AntD, saved in `localStorage`.  
- **Role-Based Menus** → Dynamic sidebar/menu items depending on user role.  
- **Router Guards** → Prevent unauthorized route access.

---

## 🔒 Role-Based Access Rules

| Feature              | Manager ✅ | Store Keeper ✅/❌ |
|----------------------|-----------|-------------------|
| Login               | ✅        | ✅                |
| Dashboard           | ✅        | ❌                |
| View Products       | ✅        | ✅                |
| Add/Edit Products   | ✅        | ✅                |
| Role-Based UI Menus | ✅        | ✅                |

---

## 🛠️ Implementation Overview

### A) Login Flow
- AntD Form + Input for login.
- On submit → API call (`POST /auth/login`, mock JSON allowed).
- Session saved in `localStorage`.

### B) Dashboard (Manager Only)
- Displays commodity stats, charts, and summaries.
- Protected by role-based routing.

### C) Product Management
- **View Products**: Fetch from `/products` (static/mock JSON).  
- **Add/Edit Products**: AntD Form + Bootstrap grid.

### D) UI Enhancements
- Theme toggle (light/dark) with persistence.  
- Dynamic menus → Manager sees **Dashboard + Products**, Store Keeper sees **Products only**.  
- Router guards → Unauthorized users redirected to login.

---

## 📂 Project Structure

```

src/
├── assets/            # Static assets (e.g., react.svg)
├── components/        # Layout, ProtectedRoute, shared UI components
├── contexts/          # AuthContext, ThemeContext
├── data/              # Mock data (e.g., products, users)
├── pages/             # Page components (Dashboard, Login, Products, etc.)
├── App.jsx            # Root component with routes
├── App.css            # Global styles
├── index.css          # Tailwind + global CSS
└── main.jsx           # Entry point

````

Other configs:
- `vite.config.js` → Vite setup  
- `tailwind.config.js` → Tailwind customization  
- `postcss.config.js` → PostCSS config  
- `eslint.config.js` → ESLint rules  

---

## 📦 Tech Stack
- **ReactJS (JSX only)** → Frontend framework  
- **React Router** → Routing & protected routes  
- **Tailwind CSS** → Utility-first styling  
- **Ant Design** → UI components (forms, tables, buttons)  
- **Bootstrap** → Grid system and layout helpers  
- **React Context API** → Authentication & Theme management  
- **Mock APIs / JSON** → Product & authentication data  

---

## 🚀 Getting Started

1. Install dependencies:
   ```
   npm install
````

2. Run development server:

   ```
   npm run dev
   ```

3. Build for production:

   ```
   npm run build
   ```

4. Preview production build:

   ```
   npm run preview
   ```

---

## 📖 Learn More

* [React Documentation](https://react.dev/)
* [Vite Documentation](https://vitejs.dev/guide/)
* [Tailwind CSS](https://tailwindcss.com/docs)
* [Ant Design](https://ant.design/components/overview/)
* [Bootstrap](https://getbootstrap.com/docs/)

---

## 📝 License

This project is licensed under the **MIT License**.




