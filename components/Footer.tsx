import React from "react";
import { Zap, Github, Twitter, Linkedin } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black pt-20 pb-10 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-8 h-8 text-purple-600" />
              <span className="text-2xl font-black text-white tracking-tighter">
                CHAOS<span className="text-purple-600">MONKEY</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Making the world's infrastructure unshakeable, one experiment at a
              time. Join the resilience revolution.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Platform</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li>
                <a href="#" className="hover:text-purple-500 transition-colors">
                  Infrastructure Chaos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-500 transition-colors">
                  Application Resilience
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-500 transition-colors">
                  Safety Console
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-500 transition-colors">
                  Pricing Plans
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Resources</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li>
                <a href="#" className="hover:text-purple-500 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-500 transition-colors">
                  Chaos Engineering Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-500 transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-500 transition-colors">
                  Community Forum
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li>
                <a href="#" className="hover:text-purple-500 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-500 transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-500 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-500 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-white/5 text-gray-600 text-xs">
          <p>© 2024 ChaosMonkey Inc. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
