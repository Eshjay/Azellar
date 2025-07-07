import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-azellar-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-azellar-navy to-azellar-teal rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-bold">Azellar</span>
            </div>
            <p className="text-gray-400">
              Expert database consulting and DevOps solutions for enterprises that demand precision, performance, and reliability.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-azellar-teal transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-azellar-teal transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-azellar-teal transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-400 hover:text-azellar-teal transition-colors">Database Consulting</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-azellar-teal transition-colors">Performance Tuning</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-azellar-teal transition-colors">Database Migrations</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-azellar-teal transition-colors">DevOps & Automation</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-azellar-teal transition-colors">Security Audits</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-azellar-teal transition-colors">About Us</Link></li>
              <li><Link to="/academy" className="text-gray-400 hover:text-azellar-teal transition-colors">Azellar Academy</Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-azellar-teal transition-colors">Support</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-azellar-teal transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-azellar-teal transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={18} className="text-azellar-teal" />
                <span className="text-gray-400">hello@azellar.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={18} className="text-azellar-teal" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={18} className="text-azellar-teal" />
                <span className="text-gray-400">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Azellar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;