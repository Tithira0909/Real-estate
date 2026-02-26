import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0B2529] text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-gray-800 pb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <h2 className="text-5xl font-signature tracking-wide mb-6 text-[#D4AF37]">Cevon</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Redefining modern luxury through sustainable craftsmanship and timeless design.
            </p>
            <div className="flex gap-4">
              <Instagram size={20} className="text-gray-400 hover:text-[#D4AF37] cursor-pointer" />
              <Twitter size={20} className="text-gray-400 hover:text-[#D4AF37] cursor-pointer" />
              <Facebook size={20} className="text-gray-400 hover:text-[#D4AF37] cursor-pointer" />
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="text-[#D4AF37] uppercase tracking-widest text-xs mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              {['New Arrivals', 'Best Sellers', 'Rings', 'Necklaces', 'Earrings'].map(item => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#D4AF37] uppercase tracking-widest text-xs mb-6">Service</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              {['Contact Us', 'Shipping & Returns', 'Size Guide', 'Care Instructions', 'FAQ'].map(item => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#D4AF37] uppercase tracking-widest text-xs mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'].map(item => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; 2024 Cevon Jewelry. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <span>United States (USD)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
