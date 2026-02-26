import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, X, Search, Package } from 'lucide-react';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    category: 'Necklaces',
    price: '',
    description: '',
    image: '',
    stock: 10
  });

  const categories = ['Necklaces', 'Rings', 'Earrings', 'Bracelets', 'Pendants'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3001/products');
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        await axios.put(`http://localhost:3001/products/${editingProduct.id}`, formData);
      } else {
        await axios.post('http://localhost:3001/products', formData);
      }
      fetchProducts();
      closeModal();
    } catch (error) {
      console.error("Error saving product", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:3001/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product", error);
      }
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData(product);
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category: 'Necklaces',
        price: '',
        description: '',
        image: '',
        stock: 10
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 pt-32 pb-12 font-sans">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif text-[#0B2529]">Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your inventory and products</p>
          </div>
          <button
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-[#0B2529] text-white px-6 py-3 rounded-lg hover:bg-[#D4AF37] transition-colors shadow-md"
          >
            <Plus size={18} />
            <span className="text-sm font-medium uppercase tracking-wide">Add Product</span>
          </button>
        </div>

        {/* Stats Cards (Simple) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Package size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wider">Total Products</p>
              <h3 className="text-2xl font-bold text-[#0B2529]">{products.length}</h3>
            </div>
          </div>
           {/* Placeholder for more stats */}
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex items-center">
          <Search size={20} className="text-gray-400 mr-3" />
          <input
            type="text"
            placeholder="Search products..."
            className="flex-1 outline-none text-sm text-[#0B2529]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider font-medium">
                <tr>
                  <th className="p-4 border-b border-gray-100">Image</th>
                  <th className="p-4 border-b border-gray-100">Name</th>
                  <th className="p-4 border-b border-gray-100">Category</th>
                  <th className="p-4 border-b border-gray-100">Price</th>
                  <th className="p-4 border-b border-gray-100">Stock</th>
                  <th className="p-4 border-b border-gray-100 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  <tr><td colSpan="6" className="p-8 text-center text-gray-400">Loading inventory...</td></tr>
                ) : filteredProducts.length === 0 ? (
                  <tr><td colSpan="6" className="p-8 text-center text-gray-400">No products found.</td></tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                      </td>
                      <td className="p-4 font-medium text-[#0B2529]">{product.name}</td>
                      <td className="p-4 text-gray-500 text-sm">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs uppercase tracking-wide">{product.category}</span>
                      </td>
                      <td className="p-4 font-medium text-[#0B2529]">${product.price.toLocaleString()}</td>
                      <td className="p-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.stock > 5 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {product.stock} in stock
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => openModal(product)} className="p-2 text-gray-400 hover:text-[#0B2529] hover:bg-gray-100 rounded-lg transition-colors">
                            <Edit size={16} />
                          </button>
                          <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10 animate-fade-in overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-serif text-[#0B2529]">{editingProduct ? 'Edit Product' : 'New Product'}</h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-[#0B2529]"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Product Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#0B2529] outline-none transition-colors" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Category</label>
                    <select name="category" value={formData.category} onChange={handleInputChange} className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#0B2529] outline-none transition-colors bg-white">
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Price ($)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} required className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#0B2529] outline-none transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Stock Quantity</label>
                  <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#0B2529] outline-none transition-colors" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Image URL</label>
                  <input type="url" name="image" value={formData.image} onChange={handleInputChange} required placeholder="https://..." className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#0B2529] outline-none transition-colors" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Description</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" className="w-full p-3 border border-gray-200 rounded-lg focus:border-[#0B2529] outline-none transition-colors resize-none"></textarea>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="px-6 py-3 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-3 rounded-lg bg-[#0B2529] text-white hover:bg-[#D4AF37] text-sm font-medium transition-colors shadow-md">
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
