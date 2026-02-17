import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, ArrowRight, Star, Heart, Instagram, Twitter, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CevonStore = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['All', 'Necklaces', 'Rings', 'Earrings', 'Bracelets'];

  const products = [
    {
      id: 1,
      name: "The Ethereal Drop",
      price: "$1,250",
      category: "Necklaces",
      image: "https://images.unsplash.com/photo-1601821765780-754fa98637c1?q=80&w=2670&auto=format&fit=crop",
      tag: "Best Seller"
    },
    {
      id: 2,
      name: "Solstice Diamond Ring",
      price: "$3,400",
      category: "Rings",
      image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2670&auto=format&fit=crop",
      tag: "New Arrival"
    },
    {
      id: 3,
      name: "Lunar Pearl Earrings",
      price: "$890",
      category: "Earrings",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2670&auto=format&fit=crop",
      tag: null
    },
    {
      id: 4,
      name: "Obsidian Gold Cuff",
      price: "$2,100",
      category: "Bracelets",
      image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2670&auto=format&fit=crop",
      tag: "Limited Edition"
    }
  ];

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-surface font-sans selection:bg-accent selection:text-white relative overflow-x-hidden">

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? 'glass-nav py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center text-white">
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(true)} className="hover:text-accent transition-colors">
              <Menu size={24} className={isScrolled ? "text-primary" : "text-white"} />
            </button>
          </div>

          <div className={`text-4xl md:text-5xl font-signature tracking-wide cursor-pointer z-50 drop-shadow-lg transition-colors ${isScrolled ? "text-primary" : "text-accent"}`}>
            Cevon
          </div>

          <div className={`hidden md:flex space-x-12 text-sm uppercase tracking-widest font-light ${isScrolled ? "text-primary" : "text-white"}`}>
            {['Collections', 'Atelier', 'Gifts', 'Journal'].map((item) => (
              <a key={item} href="#" className="hover:text-accent transition-colors relative group">
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <div className={`flex items-center space-x-6 ${isScrolled ? "text-primary" : "text-white"}`}>
            <Search className="w-5 h-5 cursor-pointer hover:text-accent transition-colors hidden sm:block" />
            <div className="relative cursor-pointer hover:text-accent transition-colors group">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full group-hover:animate-ping"></span>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 z-50 bg-primary text-white flex flex-col justify-center items-center space-y-8"
          >
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 hover:text-accent transition-colors">
              <X size={32} />
            </button>
            <div className="text-6xl font-signature text-accent mb-8">Cevon</div>
            {['Collections', 'Atelier', 'Gifts', 'Journal'].map((item, index) => (
              <motion.a
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                href="#"
                className="text-3xl font-serif hover:text-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <header className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2675&auto=format&fit=crop")',
          }}
        >
           <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/30 to-primary/90"></div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-accent uppercase tracking-[0.3em] text-xs md:text-sm mb-6"
          >
            Fine Jewelry for the Modern Soul
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-9xl font-serif text-white mb-8 leading-tight"
          >
            Adorn the <span className="font-signature text-accent text-6xl md:text-8xl lg:text-[9rem] block mt-2 lg:inline lg:mt-0">Moment</span>
          </motion.h1>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="group relative px-8 py-4 bg-transparent border border-white/30 text-white overflow-hidden transition-all duration-300 hover:border-accent hover:text-accent mt-4"
          >
            <span className="relative z-10 text-sm uppercase tracking-widest flex items-center gap-2">
              Explore Collection <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
            </span>
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce"
        >
          <div className="w-[1px] h-12 bg-white/20"></div>
        </motion.div>
      </header>

      {/* Featured Collection Section */}
      <section className="py-24 bg-surface">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 md:mb-0"
            >
              <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">Curated Pieces</h2>
              <div className="h-0.5 w-24 bg-accent"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-wrap gap-6 text-sm uppercase tracking-wider text-gray-500"
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`pb-1 border-b-2 transition-colors ${
                    activeCategory === cat
                      ? 'border-accent text-primary'
                      : 'border-transparent hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            <AnimatePresence mode='popLayout'>
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-gray-100">
                  {product.tag && (
                    <span className="absolute top-4 left-4 z-20 bg-white/90 text-primary text-[10px] uppercase tracking-widest px-3 py-1">
                      {product.tag}
                    </span>
                  )}

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover image-hover-zoom"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                     <button className="absolute bottom-6 left-6 right-6 bg-white text-primary py-3 text-xs uppercase tracking-widest hover:bg-accent hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg">
                       Add to Bag
                     </button>
                  </div>

                  <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-red-500 hover:bg-white">
                    <Heart size={16} />
                  </button>
                </div>

                <div className="text-center md:text-left">
                  <h3 className="font-serif text-xl text-primary mb-1 group-hover:text-accent transition-colors">{product.name}</h3>
                  <p className="text-gray-500 font-light text-sm mb-2">{product.category}</p>
                  <p className="font-medium text-primary">{product.price}</p>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </motion.div>

          <div className="mt-16 text-center">
             <button className="border-b border-primary text-primary pb-1 uppercase tracking-widest text-sm hover:text-accent hover:border-accent transition-colors">
               View All Collections
             </button>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="relative py-32 bg-primary overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
             <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full fill-accent">
                <path d="M42.7,-62.9C50.9,-52.8,50.1,-34.4,51.7,-19.2C53.4,-4,57.4,8,54.5,18.7C51.6,29.3,41.8,38.7,31.2,46.3C20.6,53.9,9.3,59.8,-3.4,64.5C-16.1,69.2,-30.2,72.7,-40.4,65.8C-50.6,58.9,-56.9,41.6,-61.4,25.4C-65.9,9.2,-68.6,-5.9,-63.4,-18.8C-58.1,-31.7,-44.9,-42.4,-31.9,-49.6C-18.9,-56.9,-6.1,-60.7,5.6,-68.4C17.3,-76.1,34.6,-87.6,42.7,-62.9Z" transform="translate(100 100)" />
             </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
              <motion.img
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                src="https://images.unsplash.com/photo-1589674781759-c21c37956a44?q=80&w=2670&auto=format&fit=crop"
                alt="Craftsmanship"
                className="w-full h-80 object-cover mt-12 shadow-2xl"
              />
              <motion.img
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.6, delay: 0.2 }}
                src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2670&auto=format&fit=crop"
                alt="Detail"
                className="w-full h-80 object-cover shadow-2xl"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full lg:w-1/2 text-white"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-12 h-[1px] bg-accent"></span>
                <span className="text-accent font-signature text-2xl tracking-wide">The Atelier</span>
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
              <button className="text-white border-b border-accent pb-1 hover:text-accent transition-colors uppercase text-sm tracking-widest">
                Read Our Story
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
             className="flex justify-center gap-2 text-accent mb-8"
          >
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill="#D4AF37" />
            ))}
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl md:text-4xl font-serif text-primary max-w-4xl mx-auto leading-relaxed mb-8"
          >
            "The piece I received from Cevon wasn't just jewelry. It was a work of art that captured a memory I never want to forget."
          </motion.h3>
          <p className="text-sm uppercase tracking-widest text-gray-500">— Isabella R., New York</p>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-100 py-20 border-t border-gray-200">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <h2 className="text-3xl font-serif text-primary mb-4">Join the Inner Circle</h2>
          <p className="text-gray-600 mb-8 font-light">Be the first to receive updates on new collections, style inspiration, and exclusive events.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Your Email Address"
              className="flex-1 bg-white px-6 py-4 outline-none border border-gray-300 focus:border-primary transition-colors focus:ring-1 focus:ring-primary"
            />
            <button className="bg-primary text-white px-10 py-4 uppercase tracking-widest text-sm hover:bg-accent transition-colors duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 border-b border-gray-800 pb-16">
            <div className="md:col-span-1">
              <h2 className="text-5xl font-signature tracking-wide mb-6 text-accent">Cevon</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Redefining modern luxury through sustainable craftsmanship and timeless design.
              </p>
              <div className="flex gap-4">
                <Instagram size={20} className="text-gray-400 hover:text-accent cursor-pointer transition-colors" />
                <Twitter size={20} className="text-gray-400 hover:text-accent cursor-pointer transition-colors" />
                <Facebook size={20} className="text-gray-400 hover:text-accent cursor-pointer transition-colors" />
              </div>
            </div>

            <div>
              <h4 className="text-accent uppercase tracking-widest text-xs mb-6">Shop</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                {['New Arrivals', 'Best Sellers', 'Rings', 'Necklaces', 'Earrings'].map(item => (
                  <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-accent uppercase tracking-widest text-xs mb-6">Service</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                {['Contact Us', 'Shipping & Returns', 'Size Guide', 'Care Instructions', 'FAQ'].map(item => (
                  <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-accent uppercase tracking-widest text-xs mb-6">Legal</h4>
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

      {/* WhatsApp Floating Bubble */}
      <a
        href="https://wa.me/15550123456"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 group"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="absolute right-full mr-4 bg-white text-primary px-4 py-2 rounded-lg shadow-xl text-xs font-serif tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">
            CHAT WITH US
        </span>
      </a>
    </div>
  );
};

export default CevonStore;
