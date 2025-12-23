import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Eye, EyeOff } from 'lucide-react';
import productStore from '../store/productStore';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);

  // Load products from store on mount
  useEffect(() => {
    setProducts(productStore.getProducts());
    const unsubscribe = productStore.subscribe((newProducts) => {
      setProducts(newProducts);
    });
    return unsubscribe;
  }, []);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      productStore.deleteProduct(id);
    }
  };

  const handleToggleStatus = (id) => {
    const product = products.find(p => p.id === id);
    if (product) {
      productStore.updateProduct(id, {
        status: product.status === 'published' ? 'draft' : 'published'
      });
    }
  };

  return (
    <div className="min-h-screen bg-dark-main">
      {/* Header */}
      <div className="glassmorphism border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold text-white">Admin Dashboard</h1>
              <p className="text-text-secondary text-sm mt-1">Manage your products, inventory, and sales</p>
            </div>
            <button
              onClick={() => {
                setShowAddForm(!showAddForm);
                setEditingId(null);
              }}
              className="flex items-center gap-2 px-6 py-2.5 bg-transparent border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300 shadow-white-sm"
            >
              <Plus size={20} />
              Add New Product
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-dark-card rounded-lg p-6 border border-white/20 hover:border-white transition-all duration-300 hover:shadow-white-sm">
            <p className="text-text-secondary text-sm font-medium">Total Products</p>
            <p className="text-3xl font-serif font-bold text-white mt-2">{products.length}</p>
          </div>
          <div className="bg-dark-card rounded-lg p-6 border border-white/20 hover:border-white transition-all duration-300 hover:shadow-white-sm">
            <p className="text-text-secondary text-sm font-medium">Published</p>
            <p className="text-3xl font-serif font-bold text-white mt-2">
              {products.filter(p => p.status === 'published').length}
            </p>
          </div>
          <div className="bg-dark-card rounded-lg p-6 border border-white/20 hover:border-white transition-all duration-300 hover:shadow-white-sm">
            <p className="text-text-secondary text-sm font-medium">Perfumes</p>
            <p className="text-3xl font-serif font-bold text-white mt-2">
              {products.filter(p => p.category === 'perfume').length}
            </p>
          </div>
          <div className="bg-dark-card rounded-lg p-6 border border-white/20 hover:border-white transition-all duration-300 hover:shadow-white-sm">
            <p className="text-text-secondary text-sm font-medium">Clothing</p>
            <p className="text-3xl font-serif font-bold text-white mt-2">
              {products.filter(p => p.category === 'clothing').length}
            </p>
          </div>
        </div>

        {/* Add/Edit Product Form */}
        {(showAddForm || editingId) && (
          <ProductForm
            editingId={editingId}
            products={products}
            onClose={() => {
              setShowAddForm(false);
              setEditingId(null);
            }}
            onSave={(product) => {
              if (editingId) {
                productStore.updateProduct(editingId, product);
                setEditingId(null);
              } else {
                productStore.addProduct(product);
                setShowAddForm(false);
              }
            }}
          />
        )}

        {/* Search & Filter */}
        <div className="bg-dark-card rounded-lg p-6 border border-white/20 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search size={18} className="absolute left-3 top-3 text-white" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-dark-main border border-white/20 text-white placeholder-text-muted rounded-lg focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-2 bg-dark-main border border-white/20 text-white rounded-lg focus:outline-none focus:border-white focus:ring-2 focus:ring-white/20 transition-all duration-300"
            >
              <option value="all">All Categories</option>
              <option value="perfume">Perfumes</option>
              <option value="clothing">Clothing</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-dark-card rounded-lg border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-lighter border-b border-white/20">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Product</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Price</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Stock</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white">Status</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-dark-lighter transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover border border-white/20"
                          />
                          <div>
                            <p className="font-semibold text-white">{product.name}</p>
                            <p className="text-xs text-text-muted">{product.subCategory}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                          product.category === 'perfume'
                            ? 'bg-white/10 text-white border-white'
                            : 'bg-white/10 text-white border-white'
                        }`}>
                          {product.category === 'perfume' ? '🌸 Perfume' : '👕 Clothing'}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-white">${product.price}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-16 bg-dark-lighter rounded-full h-2 border border-white/20">
                            <div
                              className="bg-white h-2 rounded-full shadow-white-sm"
                              style={{ width: `${Math.min((product.stock / 100) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm font-semibold text-white">{product.stock}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleToggleStatus(product.id)}
                          className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                            product.status === 'published'
                              ? 'bg-white/10 text-white border border-white hover:bg-white hover:text-black'
                              : 'bg-white/10 text-white border border-white hover:bg-white hover:text-black'
                          }`}
                        >
                          {product.status === 'published' ? (
                            <>
                              <Eye size={14} />
                              Published
                            </>
                          ) : (
                            <>
                              <EyeOff size={14} />
                              Draft
                            </>
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditingId(product.id)}
                            className="p-2 text-neon-cyan hover:bg-neon-cyan/10 rounded-lg transition border border-transparent hover:border-neon-cyan"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-2 text-neon-purple hover:bg-neon-purple/10 rounded-lg transition border border-transparent hover:border-neon-purple"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center">
                      <p className="text-text-muted text-sm">No products found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// Product Form Component
function ProductForm({ editingId, products, onClose, onSave }) {
  const [formData, setFormData] = useState(
    editingId
      ? products.find(p => p.id === editingId)
      : {
          name: '',
          category: 'perfume',
          subCategory: '',
          price: '',
          stock: '',
          image: '',
          description: '',
          tags: '',
          notes: '',
          concentration: 'Eau de Parfum',
          volume: '',
          material: '',
          sizes: ''
        }
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price) newErrors.price = 'Price is required';
    if (!formData.stock) newErrors.stock = 'Stock quantity is required';
    if (!formData.image.trim()) newErrors.image = 'Image URL is required';
    if (!formData.subCategory) newErrors.subCategory = 'Sub-category is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      setFormData({
        name: '',
        category: 'perfume',
        subCategory: '',
        price: '',
        stock: '',
        image: '',
        description: ''
      });
    }
  };

  const perfumeSubcategories = ['Men', 'Women', 'Unisex'];
  const clothingSubcategories = ['Men', 'Women', 'Kids', 'Unisex'];

  return (
    <div className="glassmorphism rounded-lg border border-neon-purple mb-6 p-6 shadow-neon-purple">
      <h2 className="text-2xl font-serif font-bold text-white mb-6">
        {editingId ? 'Edit Product' : 'Add New Product'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="border-b border-neon-purple/30 pb-6">
          <h3 className="text-lg font-semibold text-neon-purple mb-4">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Product Name */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-dark-main border rounded-lg text-white placeholder-text-muted focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.name ? 'border-neon-purple focus:border-neon-purple focus:ring-neon-purple/20' : 'border-neon-cyan/30 focus:border-neon-cyan focus:ring-neon-cyan/20'
                }`}
                placeholder="Enter product name"
              />
              {errors.name && <p className="text-neon-purple text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-dark-main border border-neon-cyan/30 text-white rounded-lg focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 transition-all duration-300"
              >
                <option value="perfume">Perfume</option>
                <option value="clothing">Clothing</option>
              </select>
            </div>

            {/* Sub-Category */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Sub-Category *</label>
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-dark-main border rounded-lg text-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.subCategory ? 'border-neon-purple focus:border-neon-purple focus:ring-neon-purple/20' : 'border-neon-cyan/30 focus:border-neon-cyan focus:ring-neon-cyan/20'
                }`}
              >
                <option value="">Select sub-category</option>
                {(formData.category === 'perfume' ? perfumeSubcategories : clothingSubcategories).map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
              {errors.subCategory && <p className="text-neon-purple text-sm mt-1">{errors.subCategory}</p>}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Price ($) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={`w-full px-4 py-2 bg-dark-main border rounded-lg text-white placeholder-text-muted focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.price ? 'border-neon-purple focus:border-neon-purple focus:ring-neon-purple/20' : 'border-neon-cyan/30 focus:border-neon-cyan focus:ring-neon-cyan/20'
                }`}
                placeholder="0.00"
              />
              {errors.price && <p className="text-neon-purple text-sm mt-1">{errors.price}</p>}
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Stock Quantity *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className={`w-full px-4 py-2 bg-dark-main border rounded-lg text-white placeholder-text-muted focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.stock ? 'border-neon-purple focus:border-neon-purple focus:ring-neon-purple/20' : 'border-neon-cyan/30 focus:border-neon-cyan focus:ring-neon-cyan/20'
                }`}
                placeholder="0"
              />
              {errors.stock && <p className="text-neon-purple text-sm mt-1">{errors.stock}</p>}
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white mb-2">Image URL *</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className={`w-full px-4 py-2 bg-dark-main border rounded-lg text-white placeholder-text-muted focus:outline-none focus:ring-2 transition-all duration-300 ${
                  errors.image ? 'border-neon-purple focus:border-neon-purple focus:ring-neon-purple/20' : 'border-neon-cyan/30 focus:border-neon-cyan focus:ring-neon-cyan/20'
                }`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && <p className="text-neon-purple text-sm mt-1">{errors.image}</p>}
              {formData.image && (
                <div className="mt-3 border border-neon-cyan/30 rounded-lg p-2 bg-dark-main">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-40 object-cover rounded border border-neon-cyan/30"
                  />
                </div>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-white mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 bg-dark-main border border-neon-cyan/30 text-white placeholder-text-muted rounded-lg focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 transition-all duration-300"
                placeholder="Enter product description"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Category-Specific Fields */}
        {formData.category === 'perfume' && (
          <div className="border-b border-neon-cyan/30 pb-6">
            <h3 className="text-lg font-semibold text-neon-cyan mb-4">Perfume Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">Scent Notes</label>
                <input
                  type="text"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-main border border-neon-cyan/30 text-white placeholder-text-muted rounded-lg focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 transition-all duration-300"
                  placeholder="e.g., Bergamot, Rose, Musk"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Concentration</label>
                <select
                  name="concentration"
                  value={formData.concentration}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-main border border-neon-cyan/30 text-white placeholder-text-muted rounded-lg focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 transition-all duration-300"
                >
                  <option value="Eau de Toilette">Eau de Toilette</option>
                  <option value="Eau de Parfum">Eau de Parfum</option>
                  <option value="Parfum">Parfum</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Volume (ml)</label>
                <input
                  type="number"
                  name="volume"
                  value={formData.volume}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-main border border-neon-cyan/30 text-white placeholder-text-muted rounded-lg focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 transition-all duration-300"
                  placeholder="100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-main border border-neon-cyan/30 text-white placeholder-text-muted rounded-lg focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 transition-all duration-300"
                  placeholder="e.g., woody, luxury, fresh (comma-separated)"
                />
              </div>
            </div>
          </div>
        )}

        {formData.category === 'clothing' && (
          <div className="border-b border-neon-cyan/30 pb-6">
            <h3 className="text-lg font-semibold text-neon-cyan mb-4">Clothing Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div>
                <label className="block text-sm font-medium text-white mb-2">Material</label>
                <input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-main border border-neon-cyan/30 text-white placeholder-text-muted rounded-lg focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 transition-all duration-300"
                  placeholder="e.g., 100% Cotton, Wool Blend"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Available Sizes</label>
                <input
                  type="text"
                  name="sizes"
                  value={formData.sizes}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-main border border-neon-cyan/30 text-white placeholder-text-muted rounded-lg focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 transition-all duration-300"
                  placeholder="e.g., XS, S, M, L, XL, XXL (comma-separated)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-dark-main border border-neon-cyan/30 text-white placeholder-text-muted rounded-lg focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 transition-all duration-300"
                  placeholder="e.g., casual, organic, eco-friendly (comma-separated)"
                />
              </div>
            </div>
          </div>
        )}

        {/* Form Actions */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-grow px-6 py-2.5 bg-transparent border border-neon-cyan text-neon-cyan font-semibold rounded-lg hover:bg-neon-cyan hover:text-black transition-all duration-300 shadow-neon-cyan-sm hover:shadow-neon-cyan"
          >
            {editingId ? 'Update Product' : 'Add Product'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 border-2 border-neon-purple/30 text-text-secondary font-semibold rounded-lg hover:bg-neon-purple/10 hover:border-neon-purple hover:text-neon-purple transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
