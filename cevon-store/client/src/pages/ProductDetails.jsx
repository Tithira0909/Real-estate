import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Star, Truck, Shield, RefreshCw } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:3001/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center text-[#0B2529]">Loading...</div>;
  if (!product) return <div className="h-screen flex items-center justify-center text-[#0B2529]">Product not found</div>;

  // Use product images if available, otherwise fallback to single image
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* Image Gallery */}
          <div className="w-full lg:w-3/5 flex flex-col-reverse lg:flex-row gap-4">
            {/* Thumbnails (Desktop) or Pagination Indicators (Mobile handled differently below, but we'll show thumbnails scrollable) */}
            <div className="flex lg:flex-col gap-4 overflow-x-auto hide-scrollbar lg:overflow-visible lg:w-24 flex-shrink-0 pb-2 lg:pb-0">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`w-20 h-20 lg:w-24 lg:h-24 cursor-pointer border-2 transition-all duration-300 shrink-0 ${
                    activeImageIndex === index ? 'border-[#D4AF37] opacity-100' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img src={img} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Main Image Carousel (Mobile Swipeable, Desktop Standard) */}
            <div className="flex-1 aspect-[4/5] bg-gray-50 overflow-hidden relative group">
              {/* Carousel Container */}
              <div
                className="w-full h-full flex transition-transform duration-500 ease-out hide-scrollbar overflow-x-auto lg:overflow-visible snap-x snap-mandatory"
                style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
              >
                 {images.map((img, index) => (
                    <div key={index} className="w-full h-full flex-shrink-0 snap-center relative">
                      <img
                        src={img}
                        alt={`${product.name} - View ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-zoom-in"
                      />
                    </div>
                 ))}
              </div>

              {/* Image Navigation Arrows (Desktop overlay) */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex(Math.max(0, activeImageIndex - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                    disabled={activeImageIndex === 0}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  </button>
                  <button
                    onClick={() => setActiveImageIndex(Math.min(images.length - 1, activeImageIndex + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0"
                    disabled={activeImageIndex === images.length - 1}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                  </button>
                </>
              )}

              {/* Status Badge */}
              <div className="absolute top-4 left-4 bg-white/90 text-[#0B2529] px-3 py-1 text-[10px] uppercase tracking-widest z-10">
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-2/5 flex flex-col justify-center">
            <div className="mb-2 text-xs font-bold text-[#D4AF37] uppercase tracking-widest">{product.category}</div>
            <h1 className="text-4xl md:text-5xl font-serif text-[#0B2529] mb-4 leading-tight">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-[#D4AF37]">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#D4AF37" />)}
              </div>
              <span className="text-sm text-gray-500 underline cursor-pointer hover:text-[#0B2529] transition-colors">12 Reviews</span>
            </div>

            <p className="text-3xl font-serif text-[#0B2529] mb-8 font-light">${product.price.toLocaleString()}</p>

            <div className="prose text-gray-600 leading-relaxed mb-8 font-light text-sm">
              <p>{product.description}</p>

              {/* Product Specifications */}
              {(product.materials || product.dimensions || product.weight) && (
                <div className="mt-6 border-t border-gray-100 pt-6">
                  <h4 className="text-[#0B2529] font-medium mb-3 uppercase tracking-widest text-xs">Details</h4>
                  <ul className="space-y-2">
                    {product.materials && <li><span className="text-gray-400 w-24 inline-block">Materials:</span> {product.materials}</li>}
                    {product.dimensions && <li><span className="text-gray-400 w-24 inline-block">Dimensions:</span> {product.dimensions}</li>}
                    {product.weight && <li><span className="text-gray-400 w-24 inline-block">Weight:</span> {product.weight}</li>}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4 mb-8">
               <button
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
                className={`w-full py-4 uppercase tracking-widest text-sm transition-all duration-300 ${
                  product.stock > 0
                  ? 'bg-[#0B2529] text-white hover:bg-[#D4AF37] shadow-lg hover:shadow-xl'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {product.stock > 0 ? 'Add to Bag' : 'Out of Stock'}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100 text-center">
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="p-3 rounded-full bg-gray-50 group-hover:bg-[#D4AF37]/10 transition-colors">
                  <Truck size={20} className="text-[#0B2529] group-hover:text-[#D4AF37] transition-colors" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-gray-500">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="p-3 rounded-full bg-gray-50 group-hover:bg-[#D4AF37]/10 transition-colors">
                  <Shield size={20} className="text-[#0B2529] group-hover:text-[#D4AF37] transition-colors" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-gray-500">Warranty</span>
              </div>
              <div className="flex flex-col items-center gap-2 group cursor-pointer">
                <div className="p-3 rounded-full bg-gray-50 group-hover:bg-[#D4AF37]/10 transition-colors">
                  <RefreshCw size={20} className="text-[#0B2529] group-hover:text-[#D4AF37] transition-colors" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-gray-500">Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
