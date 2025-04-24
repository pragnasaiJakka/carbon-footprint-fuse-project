import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const emailAddresses = ["rithvikkaki1011@gmail.com", "jpragna14@gmail.com"];
  
  const handleEmailClick = () => {
    const emailSubject = "Carbon Footprint Fuse Inquiry";
    const emailList = emailAddresses.join(',');
    window.location.href = `mailto:${emailList}?subject=${encodeURIComponent(emailSubject)}`;
  };

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
            <a href="https://github.com/rithvikkaki" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-eco-green-light transition-colors">
              <Github size={24} />
            </a>
            <a href="https://github.com/pragnasaiJakka" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-eco-green-light transition-colors">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/rithvik-kaki-4541092a0/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-eco-green-light transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="https://www.linkedin.com/in/pragna-sai-jakka-3395062a4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-eco-green-light transition-colors">
              <Linkedin size={24} />
            </a>
            <button onClick={handleEmailClick} className="text-gray-300 hover:text-eco-green-light transition-colors">
              <Mail size={24} />
            </button>
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
