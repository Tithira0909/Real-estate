import React, { useEffect, useState } from 'react';
import { ArrowRight, Star, Heart } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const { addToCart } = useCart();

  const categories = ['All', 'Necklaces', 'Rings', 'Earrings', 'Bracelets', 'Pendants'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products');
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === 'All'
    ? featuredProducts.slice(0, 4)
    : featuredProducts.filter(p => p.category === activeCategory).slice(0, 4);

  return (
    <div className="bg-[#F9F9F9] font-sans selection:bg-[#D4AF37] selection:text-white">
      {/* Hero Section */}
      <header className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2675&auto=format&fit=crop")',
          }}
        >
           <div className="absolute inset-0 bg-gradient-to-b from-[#0B2529]/60 via-[#0B2529]/30 to-[#0B2529]/90"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <p className="text-[#D4AF37] uppercase tracking-[0.3em] text-xs md:text-sm mb-6 animate-[fadeIn_1s_ease-out_0.5s_both]">
            Fine Jewelry for the Modern Soul
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif text-white mb-8 leading-tight animate-[fadeIn_1s_ease-out_0.8s_both]">
            Adorn the <span className="font-signature text-[#D4AF37] text-6xl md:text-8xl lg:text-[9rem] block mt-2 lg:inline lg:mt-0">Moment</span>
          </h1>
          <Link to="/shop/All" className="group relative px-8 py-4 bg-transparent border border-white/30 text-white overflow-hidden transition-all duration-300 hover:border-[#D4AF37] hover:text-[#D4AF37] animate-[fadeIn_1s_ease-out_1.1s_both] mt-4">
            <span className="relative z-10 text-sm uppercase tracking-widest flex items-center gap-2">
              Explore Collection <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
            </span>
          </Link>
        </div>
      </header>

      {/* Featured Collection Section */}
      <section className="py-24 bg-[#F9F9F9]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="mb-8 md:mb-0">
              <h2 className="text-4xl md:text-5xl font-serif text-[#0B2529] mb-4">Curated Pieces</h2>
              <div className="h-0.5 w-24 bg-[#D4AF37]"></div>
            </div>

            <div className="flex flex-wrap gap-6 text-sm uppercase tracking-wider text-gray-500">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`pb-1 border-b-2 transition-colors ${
                    activeCategory === cat
                      ? 'border-[#D4AF37] text-[#0B2529]'
                      : 'border-transparent hover:text-[#0B2529]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group cursor-pointer">
                <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-gray-100">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover image-hover-zoom"
                    />
                  </Link>

                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                   <button
                    onClick={() => addToCart(product)}
                    className="absolute bottom-6 left-6 right-6 bg-white text-[#0B2529] py-3 text-xs uppercase tracking-widest hover:bg-[#D4AF37] hover:text-white transition-colors transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 duration-300 z-10"
                   >
                     Add to Bag
                   </button>

                  <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-red-500 z-10">
                    <Heart size={16} />
                  </button>
                </div>

                <div className="text-center md:text-left">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-serif text-xl text-[#0B2529] mb-1 group-hover:text-[#D4AF37] transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-gray-500 font-light text-sm mb-2">{product.category}</p>
                  <p className="font-medium text-[#0B2529]">${product.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
             <Link to="/shop/All" className="border-b border-[#0B2529] text-[#0B2529] pb-1 uppercase tracking-widest text-sm hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors">
               View All Collections
             </Link>
          </div>
        </div>
      </section>

      {/* Brand Story / Parallax Section */}
      <section className="relative py-32 bg-[#0B2529] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
             <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full fill-[#D4AF37]">
                <path d="M42.7,-62.9C50.9,-52.8,50.1,-34.4,51.7,-19.2C53.4,-4,57.4,8,54.5,18.7C51.6,29.3,41.8,38.7,31.2,46.3C20.6,53.9,9.3,59.8,-3.4,64.5C-16.1,69.2,-30.2,72.7,-40.4,65.8C-50.6,58.9,-56.9,41.6,-61.4,25.4C-65.9,9.2,-68.6,-5.9,-63.4,-18.8C-58.1,-31.7,-44.9,-42.4,-31.9,-49.6C-18.9,-56.9,-6.1,-60.7,5.6,-68.4C17.3,-76.1,34.6,-87.6,42.7,-62.9Z" transform="translate(100 100)" />
             </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=2670&auto=format&fit=crop"
                alt="Craftsmanship"
                className="w-full h-80 object-cover mt-12"
              />
              <img
                src="https://images.unsplash.com/photo-1617038220319-33fc2a513696?q=80&w=2670&auto=format&fit=crop"
                alt="Detail"
                className="w-full h-80 object-cover"
              />
            </div>

            <div className="w-full lg:w-1/2 text-white">
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[1px] bg-[#D4AF37]"></span>
                <span className="text-[#D4AF37] font-signature text-2xl tracking-wide">The Atelier</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 leading-tight">
                Crafted for <br/> Eternity
              </h2>
              <p className="text-gray-300 leading-relaxed mb-8 font-light text-lg">
                At Cevon, we believe jewelry is more than an accessory; it is an extension of the soul.
                Our artisans blend centuries-old techniques with modern innovation to create pieces
                that transcend trends. Each gemstone is ethically sourced, and every setting is hand-forged
                in our private atelier.
              </p>
              <button className="text-white border-b border-[#D4AF37] pb-1 hover:text-[#D4AF37] transition-colors uppercase text-sm tracking-widest">
                Read Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center gap-2 text-[#D4AF37] mb-8">
            {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="#D4AF37" />)}
          </div>
          <h3 className="text-2xl md:text-4xl font-serif text-[#0B2529] max-w-4xl mx-auto leading-relaxed mb-8">
            "The piece I received from Cevon wasn't just jewelry. It was a work of art that captured a memory I never want to forget."
          </h3>
          <p className="text-sm uppercase tracking-widest text-gray-500">— Isabella R., New York</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
