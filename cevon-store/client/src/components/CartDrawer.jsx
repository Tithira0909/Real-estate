import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] transition-opacity animate-fade-in"
        onClick={() => setIsCartOpen(false)}
      ></div>

      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[70] shadow-2xl animate-slide-in-right flex flex-col">
        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
          <h2 className="text-2xl font-serif text-[#0B2529]">Your Bag</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-[#0B2529] transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <p className="font-light text-center">Your bag is currently empty.</p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-[#D4AF37] border-b border-[#D4AF37] pb-1 uppercase tracking-widest text-xs hover:text-[#0B2529] hover:border-[#0B2529] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                {/* Image */}
                <div className="w-24 h-24 bg-gray-50 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-serif text-[#0B2529] leading-tight text-sm pr-2">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">{item.category}</p>
                  </div>

                  <div className="flex justify-between items-end">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-gray-200">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="px-2 py-1 text-gray-500 hover:text-[#0B2529] hover:bg-gray-50 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-2 py-1 text-xs text-[#0B2529]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 text-gray-500 hover:text-[#0B2529] hover:bg-gray-50 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Price */}
                    <p className="font-medium text-[#0B2529] text-sm">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="flex justify-between mb-4 text-[#0B2529]">
              <span className="uppercase tracking-widest text-sm font-bold">Subtotal</span>
              <span className="font-serif text-xl">${cartTotal.toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-500 mb-6 font-light">Shipping and taxes calculated at checkout.</p>
            <Link
              to="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full py-4 bg-[#0B2529] text-white flex justify-center items-center gap-2 uppercase tracking-widest text-sm hover:bg-[#D4AF37] transition-colors group"
            >
              Checkout <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
