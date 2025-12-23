import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react';
import productStore from '../../store/productStore';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0); // This will be connected to Redux store later
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    if (!query) return setSuggestions([]);
    const all = productStore.getPublishedProducts ? productStore.getPublishedProducts() : [];
    const q = query.toLowerCase();
    const filtered = all.filter(p => (p.name && p.name.toLowerCase().includes(q)) || (p.category && p.category.toLowerCase().includes(q))).slice(0,6);
    setSuggestions(filtered);
    setActiveIndex(-1);
  }, [query]);

  return (
    <nav className="bg-black sticky top-0 z-50 border-b border-white/20">
      {/* Top utility bar - Amazon-like */}
      <div className="bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-8 text-sm">
            <div className="text-text-secondary">Deliver to <span className="text-white font-medium">Your Location</span></div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-text-secondary hover:text-white">Hello, Sign in</Link>
              <Link to="/orders" className="text-text-secondary hover:text-white">Orders</Link>
              <div className="px-2 py-1 bg-yellow-400 text-black rounded-sm font-medium">Prime</div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="text-2xl font-serif font-bold text-white group-hover:text-gray-300 transition-all duration-300">
              LUXE
            </div>
            <div className="text-xs text-white tracking-widest">
              COLLECTION
            </div>
          </Link>

          {/* Search (Desktop) */}
          <div className="hidden md:flex flex-1 justify-center px-6 relative">
            <form action="/products" method="get" className="w-full max-w-2xl">
              <div className="flex items-center">
                <select name="category" className="hidden lg:block bg-dark-card border border-white/20 text-white rounded-l-md px-3 py-2 text-sm">
                  <option value="all">All</option>
                  <option value="perfume">Perfumes</option>
                  <option value="clothing">Clothing</option>
                </select>
                <input
                  name="q"
                  type="search"
                  placeholder="Search products, brands and more"
                  ref={searchRef}
                  value={query}
                  aria-controls="search-suggestions"
                  aria-expanded={suggestions.length > 0}
                  aria-activedescendant={activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                      setActiveIndex((i) => Math.min(i + 1, suggestions.length - 1));
                      e.preventDefault();
                    } else if (e.key === 'ArrowUp') {
                      setActiveIndex((i) => Math.max(i - 1, 0));
                      e.preventDefault();
                    } else if (e.key === 'Enter') {
                      if (activeIndex >= 0 && suggestions[activeIndex]) {
                        navigate(`/product/${suggestions[activeIndex].id}`);
                        setQuery('');
                        e.preventDefault();
                      }
                    }
                  }}
                  className="flex-1 bg-dark-card border-t border-b border-white/20 text-white px-4 py-2 text-sm focus:outline-none"
                />
                <button className="bg-white text-black px-4 py-2 rounded-r-md">
                  <Search size={18} />
                </button>
              </div>
            </form>

            {/* Suggestions Dropdown */}
            {query && suggestions.length > 0 && (
              <ul id="search-suggestions" role="listbox" aria-label="Search suggestions" className="absolute top-14 w-full max-w-2xl bg-dark-card border border-white/20 mt-2 rounded-md overflow-hidden shadow-white-lg z-50">
                {suggestions.map((s, idx) => (
                  <li role="option" id={`suggestion-${idx}`} aria-selected={activeIndex === idx} key={s.id} className={`px-4 py-3 hover:bg-white/5 ${activeIndex === idx ? 'bg-white/5' : ''}`}>
                    <Link to={`/product/${s.id}`} onClick={() => setQuery('')}>{s.name} <span className="text-text-secondary text-sm"> — {s.category}</span></Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/products?category=perfume"
              className="text-text-secondary hover:text-white transition-all duration-300 font-medium relative group"
            >
              Perfumes
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300 shadow-white-sm"></span>
            </Link>
            <Link
              to="/products?category=clothing"
              className="text-text-secondary hover:text-white transition-all duration-300 font-medium relative group"
            >
              Clothing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300 shadow-white-sm"></span>
            </Link>
            <Link
              to="/about"
              className="text-text-secondary hover:text-white transition-all duration-300 font-medium relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300 shadow-white-sm"></span>
            </Link>
            <Link
              to="/contact"
              className="text-text-secondary hover:text-white transition-all duration-300 font-medium relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300 shadow-white-sm"></span>
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            {/* Search Icon */}
            <button className="hidden md:block text-text-secondary hover:text-white transition-all duration-300 hover:drop-shadow-lg">
              <Search size={22} />
            </button>

            {/* User Account */}
            <Link
              to="/login"
              className="text-text-secondary hover:text-white transition-all duration-300 hover:drop-shadow-lg"
            >
              <User size={22} />
            </Link>

            {/* Shopping Cart */}
            <Link
              id="global-cart-icon"
              to="/cart"
              className="relative text-text-secondary hover:text-white transition-all duration-300 hover:drop-shadow-lg"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold shadow-white-sm animate-pulse-soft">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-text-secondary hover:text-white transition-all duration-300"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-white/20">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <Link
              to="/products?category=perfume"
              className="block py-2 text-text-secondary hover:text-white font-medium transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Perfumes
            </Link>
            <Link
              to="/products?category=clothing"
              className="block py-2 text-text-secondary hover:text-white font-medium transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Clothing
            </Link>
            <Link
              to="/about"
              className="block py-2 text-text-secondary hover:text-white font-medium transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block py-2 text-text-secondary hover:text-white font-medium transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-2">
              <button className="w-full text-left py-2 text-text-secondary hover:text-white flex items-center space-x-2 transition-all duration-300">
                <Search size={20} />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
