import React from 'react';
import { Mail, MapPin, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-16">
          
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif font-bold text-white">LUXE</h3>
            <p className="text-gray-400 text-sm">
              Experience timeless elegance with our curated collection of premium perfumes and luxury clothing.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="text-gray-400 hover:text-luxury-400 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-luxury-400 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-luxury-400 transition">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/products" className="text-gray-400 hover:text-luxury-400 transition">
                  Shop All
                </a>
              </li>
              <li>
                <a href="/products?category=perfume" className="text-gray-400 hover:text-luxury-400 transition">
                  Perfumes
                </a>
              </li>
              <li>
                <a href="/products?category=clothing" className="text-gray-400 hover:text-luxury-400 transition">
                  Clothing
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-luxury-400 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-luxury-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/faq" className="text-gray-400 hover:text-luxury-400 transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/shipping" className="text-gray-400 hover:text-luxury-400 transition">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="/returns" className="text-gray-400 hover:text-luxury-400 transition">
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-gray-400 hover:text-luxury-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-gray-400 hover:text-luxury-400 transition">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3">
                <Phone size={16} className="text-luxury-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">+1 (800) LUXE-NOW</span>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="text-luxury-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">support@luxebrand.com</span>
              </li>
              <li className="flex gap-3">
                <MapPin size={16} className="text-luxury-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400">
                  123 Luxury Lane<br />
                  San Francisco, CA 94102
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 py-12">
          <div className="max-w-md">
            <h3 className="text-white font-semibold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get exclusive offers, new arrivals, and style tips delivered to your inbox.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 bg-gray-800 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-luxury-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-luxury-600 text-white rounded-lg hover:bg-luxury-700 transition font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 py-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <p className="text-gray-400 text-sm">
            © {currentYear} LUXE. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0 text-sm">
            <a href="#" className="text-gray-400 hover:text-luxury-400 transition">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-luxury-400 transition">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-luxury-400 transition">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
