import React from 'react';
import { useCart } from '../context/CartContext';
import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const { isCartOpen } = useCart();

  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F9] font-sans selection:bg-[#D4AF37] selection:text-white relative">
      <Navbar />
      <CartDrawer />
      <main className="flex-1 w-full flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
