import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart, setIsCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Use glass nav if scrolled OR if not on the home page to ensure visibility
  const navClass = isScrolled || location.pathname !== '/'
    ? 'glass-nav py-3'
    : 'bg-transparent py-6';

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${navClass}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center text-white">
          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(true)} className="hover:text-[#D4AF37] transition-colors">
              <Menu size={24} />
            </button>
          </div>

          {/* Logo - Updated to Signature Font */}
          <Link to="/" className="text-4xl md:text-5xl font-signature tracking-wide cursor-pointer z-50 text-[#D4AF37] drop-shadow-lg">
            Cevon
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-12 text-sm uppercase tracking-widest font-light">
            {['Collections', 'Atelier', 'Gifts', 'Journal'].map((item) => (
              <Link
                key={item}
                to={item === 'Collections' ? '/shop/All' : `/shop/${item}`}
                className="hover:text-[#D4AF37] transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-6">
            <Link to="/admin" className="hover:text-[#D4AF37] transition-colors hidden sm:block">
              <User className="w-5 h-5" />
            </Link>
            <Search className="w-5 h-5 cursor-pointer hover:text-[#D4AF37] transition-colors hidden sm:block" />
            <div
              className="relative cursor-pointer hover:text-[#D4AF37] transition-colors group"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#D4AF37] rounded-full group-hover:animate-ping"></span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0B2529] text-white flex flex-col justify-center items-center space-y-8 animate-fade-in">
          <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6">
            <X size={32} />
          </button>
          <div className="text-6xl font-signature text-[#D4AF37] mb-8">Cevon</div>
          {['Collections', 'Atelier', 'Gifts', 'Journal', 'Admin'].map((item) => (
            <Link
              key={item}
              to={item === 'Admin' ? '/admin' : (item === 'Collections' ? '/shop/All' : `/shop/${item}`)}
              className="text-3xl font-serif hover:text-[#D4AF37]"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;
