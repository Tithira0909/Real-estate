import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop/:category" element={<Shop />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="checkout" element={<Checkout />} />

        {/* Admin Routes */}
        <Route path="admin/login" element={<AdminLogin onLogin={setIsAdminAuthenticated} />} />
        <Route path="admin" element={isAdminAuthenticated ? <AdminDashboard onLogout={setIsAdminAuthenticated} /> : <Navigate to="/admin/login" />} />
      </Route>
    </Routes>
  );
}

export default App;
