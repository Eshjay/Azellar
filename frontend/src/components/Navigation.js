import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Support', path: '/support' },
    { name: 'Academy', path: '/academy' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Portal', path: '/portal' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-azellar-navy to-azellar-teal rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold gradient-text">Azellar</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative font-medium transition-colors duration-200 hover:text-azellar-teal ${
                  location.pathname === item.path
                    ? 'text-azellar-teal'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 h-0.5 bg-azellar-teal -bottom-1"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Theme Toggle & CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Link
              to="/contact"
              className="btn-primary"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-700 dark:text-gray-300 hover:text-azellar-teal transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-2 border border-gray-200 dark:border-gray-700"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'text-azellar-teal bg-azellar-teal/10'
                      : 'text-gray-700 dark:text-gray-300 hover:text-azellar-teal hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Theme</span>
                <ThemeToggle />
              </div>
              <Link
                to="/contact"
                className="block px-3 py-2 mt-4 text-center btn-primary"
                onClick={() => setIsOpen(false)}
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;