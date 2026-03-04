import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Shop = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = category && category !== 'All' ? `?category=${category}` : '';
        const response = await axios.get(`http://localhost:3001/products${query}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category]);

  return (
    <div className="pt-32 pb-24 bg-[#F9F9F9] min-h-screen">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-serif text-[#0B2529] mb-8 text-center capitalize">
          {category === 'All' ? 'All Collections' : category}
        </h1>
        <p className="text-gray-500 text-center max-w-2xl mx-auto mb-16 font-light">
          Discover our exclusive range of {category === 'All' ? 'jewelry' : category.toLowerCase()}, handcrafted to perfection using the finest materials and timeless designs.
        </p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-[3/4] mb-4"></div>
                <div className="h-4 bg-gray-200 w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-gray-100">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </Link>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                   {/* Add to Cart Button */}
                   <button
                     onClick={(e) => {
                       e.preventDefault();
                       addToCart(product);
                     }}
                     className="absolute bottom-6 left-6 right-6 bg-white text-[#0B2529] py-3 text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-white transition-all transform lg:translate-y-4 lg:opacity-0 group-hover:opacity-100 group-hover:translate-y-0 duration-300 shadow-lg z-20"
                   >
                     Add to Bag
                   </button>

                  {/* Wishlist Button */}
                  <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full lg:opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-red-500 z-20 hover:scale-110">
                    <Heart size={16} />
                  </button>
                </div>

                <div className="text-center">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-serif text-lg text-[#0B2529] mb-1 group-hover:text-[#D4AF37] transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-gray-500 font-light text-xs uppercase tracking-wider mb-2">{product.category}</p>
                  <p className="font-medium text-[#0B2529]">${product.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
