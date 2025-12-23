import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-main border-t border-white/20 text-text-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl font-serif font-bold text-white">LUXE</div>
              <div className="text-xs text-white tracking-widest">COLLECTION</div>
            </div>
            <p className="text-sm text-text-muted mb-4">
              Your destination for premium perfumes and timeless clothing. Elegance redefined.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-white transition-all duration-300 hover:drop-shadow-lg"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-white transition-all duration-300 hover:drop-shadow-lg"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-muted hover:text-white transition-all duration-300 hover:drop-shadow-lg"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=perfume" className="text-sm hover:text-white transition-colors">
                  Perfumes
                </Link>
              </li>
              <li>
                <Link to="/products?category=clothing" className="text-sm hover:text-white transition-colors">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping" className="text-sm hover:text-white transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-sm hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-sm hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-white mt-1 flex-shrink-0" />
                <span className="text-sm">123 Luxury Avenue, New York, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-white flex-shrink-0" />
                <a href="tel:+1234567890" className="text-sm hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-white flex-shrink-0" />
                <a href="mailto:hello@luxecollection.com" className="text-sm hover:text-white transition-colors">
                  hello@luxecollection.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-8 pt-8 border-t border-white/30">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-white font-semibold mb-2">Subscribe to Our Newsletter</h3>
            <p className="text-sm text-text-muted mb-4">Get exclusive offers and updates</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md bg-dark-main border border-neon-cyan/30 text-white placeholder-text-muted focus:outline-none focus:border-neon-cyan focus:ring-2 focus:ring-neon-cyan/20 transition-all duration-300"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-transparent border border-white text-white rounded-md hover:bg-white hover:text-black transition-all duration-300 font-medium shadow-white-sm hover:shadow-white-lg"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/20 text-center">
          <p className="text-sm text-text-muted">
            &copy; {currentYear} Luxe Collection. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
