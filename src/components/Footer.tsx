
import React from 'react';
import { Github, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-eco-carbon text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Carbon Footprint Fuse</h3>
            <p className="text-gray-300">
              Merging carbon footprint estimation with blockchain technology to create a sustainable future.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#calculator" className="text-gray-300 hover:text-eco-green-light transition-colors">Calculator</a></li>
              <li><a href="#about" className="text-gray-300 hover:text-eco-green-light transition-colors">About</a></li>
              <li><a href="#blockchain" className="text-gray-300 hover:text-eco-green-light transition-colors">Blockchain Integration</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-eco-green-light transition-colors">
                <Github size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-eco-green-light transition-colors">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-eco-green-light transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Carbon Footprint Fuse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
