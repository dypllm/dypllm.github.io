
import { Github, Mail, Twitter, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-purple-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 border-t border-purple-100 dark:border-slate-700">
      <div className="container px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-purple-200">About</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Secure API key management platform for D.Y. Patil College of Engineering, Salokhenagar students.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-purple-200">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/api-docs" className="text-sm text-gray-600 hover:text-purple-700 dark:text-gray-400 dark:hover:text-purple-300">API Documentation</Link></li>
              <li><Link to="/get-api-key" className="text-sm text-gray-600 hover:text-purple-700 dark:text-gray-400 dark:hover:text-purple-300">Get API Key</Link></li>
              <li><Link to="/dashboard" className="text-sm text-gray-600 hover:text-purple-700 dark:text-gray-400 dark:hover:text-purple-300">Dashboard</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-purple-200">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-sm text-gray-600 hover:text-purple-700 dark:text-gray-400 dark:hover:text-purple-300">Help Center</Link></li>
              <li><a href="mailto:support@example.com" className="text-sm text-gray-600 hover:text-purple-700 dark:text-gray-400 dark:hover:text-purple-300">Contact Us</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-purple-200">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-purple-700 dark:text-gray-400 dark:hover:text-purple-300">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-700 dark:text-gray-400 dark:hover:text-purple-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-700 dark:text-gray-400 dark:hover:text-purple-300">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-700 dark:text-gray-400 dark:hover:text-purple-300">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-purple-100 dark:border-slate-700">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} D.Y. Patil Salokhenagar API Nexus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
