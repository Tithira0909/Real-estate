import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Check, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    country: 'United States',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // Simulate order placement
    setTimeout(() => {
      clearCart();
      alert('Order placed successfully! Thank you for shopping with Cevon.');
      navigate('/');
    }, 1500);
  };

  if (cart.length === 0 && step === 1) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-[#F9F9F9] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-serif text-[#0B2529] mb-4">Your bag is empty</h2>
        <Link to="/shop/All" className="text-[#D4AF37] border-b border-[#D4AF37] pb-1 uppercase tracking-widest text-sm hover:text-[#0B2529] hover:border-[#0B2529] transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#F9F9F9]">
      <div className="container mx-auto px-6 max-w-6xl">
        <h1 className="text-4xl font-serif text-[#0B2529] mb-12 text-center">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Checkout Steps */}
          <div className="flex-1">
            {/* Step Indicators */}
            <div className="flex items-center mb-8 text-sm uppercase tracking-widest">
              <span className={`pb-2 border-b-2 ${step >= 1 ? 'border-[#0B2529] text-[#0B2529]' : 'border-gray-200 text-gray-400'} flex-1 text-center transition-colors`}>1. Shipping</span>
              <span className={`pb-2 border-b-2 ${step >= 2 ? 'border-[#0B2529] text-[#0B2529]' : 'border-gray-200 text-gray-400'} flex-1 text-center transition-colors`}>2. Payment</span>
              <span className={`pb-2 border-b-2 ${step >= 3 ? 'border-[#0B2529] text-[#0B2529]' : 'border-gray-200 text-gray-400'} flex-1 text-center transition-colors`}>3. Confirm</span>
            </div>

            {/* Step 1: Shipping */}
            {step === 1 && (
              <form onSubmit={handleNextStep} className="bg-white p-8 shadow-sm animate-fade-in">
                <h2 className="text-2xl font-serif text-[#0B2529] mb-6">Contact & Shipping</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <input type="email" name="email" placeholder="Email Address" required className="col-span-2 p-4 border border-gray-200 focus:border-[#0B2529] outline-none transition-colors" onChange={handleInputChange} />
                  <input type="text" name="firstName" placeholder="First Name" required className="p-4 border border-gray-200 focus:border-[#0B2529] outline-none transition-colors" onChange={handleInputChange} />
                  <input type="text" name="lastName" placeholder="Last Name" required className="p-4 border border-gray-200 focus:border-[#0B2529] outline-none transition-colors" onChange={handleInputChange} />
                  <input type="text" name="address" placeholder="Address" required className="col-span-2 p-4 border border-gray-200 focus:border-[#0B2529] outline-none transition-colors" onChange={handleInputChange} />
                  <input type="text" name="city" placeholder="City" required className="p-4 border border-gray-200 focus:border-[#0B2529] outline-none transition-colors" onChange={handleInputChange} />
                  <input type="text" name="zip" placeholder="ZIP Code" required className="p-4 border border-gray-200 focus:border-[#0B2529] outline-none transition-colors" onChange={handleInputChange} />
                </div>
                <button type="submit" className="bg-[#0B2529] text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-[#D4AF37] transition-colors w-full">
                  Continue to Payment
                </button>
              </form>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <form onSubmit={handleNextStep} className="bg-white p-8 shadow-sm animate-fade-in">
                <div className="flex items-center mb-6">
                  <button type="button" onClick={() => setStep(1)} className="mr-4 text-gray-400 hover:text-[#0B2529]"><ArrowLeft size={20}/></button>
                  <h2 className="text-2xl font-serif text-[#0B2529]">Payment Details</h2>
                </div>

                <div className="mb-8 p-4 bg-gray-50 border border-gray-100 flex items-center gap-4 text-gray-500 text-sm">
                  <CreditCard size={20} />
                  <span>Secure SSL Encryption</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <input type="text" name="cardNumber" placeholder="Card Number" required className="col-span-2 p-4 border border-gray-200 focus:border-[#0B2529] outline-none transition-colors" onChange={handleInputChange} />
                  <input type="text" name="expiryDate" placeholder="MM/YY" required className="p-4 border border-gray-200 focus:border-[#0B2529] outline-none transition-colors" onChange={handleInputChange} />
                  <input type="text" name="cvv" placeholder="CVV" required className="p-4 border border-gray-200 focus:border-[#0B2529] outline-none transition-colors" onChange={handleInputChange} />
                </div>
                <button type="submit" className="bg-[#0B2529] text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-[#D4AF37] transition-colors w-full">
                  Review Order
                </button>
              </form>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div className="bg-white p-8 shadow-sm animate-fade-in">
                <div className="flex items-center mb-6">
                   <button type="button" onClick={() => setStep(2)} className="mr-4 text-gray-400 hover:text-[#0B2529]"><ArrowLeft size={20}/></button>
                   <h2 className="text-2xl font-serif text-[#0B2529]">Confirm Order</h2>
                </div>

                <div className="mb-8 space-y-4 text-gray-600 text-sm border-b border-gray-100 pb-8">
                  <p><span className="font-bold text-[#0B2529] uppercase tracking-wide w-24 inline-block">Ship To:</span> {formData.firstName} {formData.lastName}, {formData.address}, {formData.city} {formData.zip}</p>
                  <p><span className="font-bold text-[#0B2529] uppercase tracking-wide w-24 inline-block">Payment:</span> **** **** **** {formData.cardNumber.slice(-4) || '1234'}</p>
                </div>

                <button onClick={handlePlaceOrder} className="bg-[#0B2529] text-white px-8 py-4 uppercase tracking-widest text-sm hover:bg-[#D4AF37] transition-colors w-full flex items-center justify-center gap-2">
                  Place Order <Check size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-8 shadow-sm sticky top-32">
              <h3 className="font-serif text-xl text-[#0B2529] mb-6">Order Summary</h3>
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-serif text-sm text-[#0B2529]">{item.name}</h4>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Qty: {item.quantity}</span>
                        <span>${(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-500">
                  <span>Subtotal</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between font-bold text-[#0B2529] text-lg pt-4">
                  <span>Total</span>
                  <span>${cartTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
