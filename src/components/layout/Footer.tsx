import Link from 'next/link';
import { motion } from 'framer-motion';
import Logo from '../Logo';
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from '@heroicons/react/24/outline';
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from '../icons/social/index';

const navigation = {
  company: [
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Products', href: '/products' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Knowledge Center', href: '/knowledge' },
    { name: 'Blog', href: '/blog' },
    { name: 'Factory Capabilities', href: '/factory-capabilities' },
    { name: 'Initiatives', href: '/initiatives' },
  ],
  social: [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Instagram', href: '#', icon: Instagram },
  ],
};

const contactInfo = [
  {
    icon: PhoneIcon,
    text: '+966 13 123 4567',
    href: 'tel:+966131234567'
  },
  {
    icon: EnvelopeIcon,
    text: 'info@hexasteel.sa',
    href: 'mailto:info@hexasteel.sa'
  },
  {
    icon: MapPinIcon,
    text: 'Dammam 2nd Industrial City, KSA',
    href: 'https://goo.gl/maps/your-location'
  }
];

const quickLinks = [
  { text: 'About', href: '/about' },
  { text: 'Projects', href: '/projects' },
  { text: 'Products', href: '/products' },
  { text: 'FAQ', href: '/faq' },
  { text: 'Contact', href: '/contact' },
];

const resources = [
  { text: 'Knowledge Center', href: '/knowledge' },
  { text: 'Blog', href: '/blog' },
  { text: 'Factory Capabilities', href: '/factory-capabilities' },
  { text: 'Initiatives', href: '/initiatives' },
];

const socialLinks = [
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'Instagram', href: '#', icon: Instagram },
];

export default function Footer() {
  return (
    <footer className="bg-primary-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <item.icon className="w-6 h-6 text-primary-300 flex-shrink-0" />
                  <a href={item.href} className="text-gray-300 hover:text-primary-300 transition-colors">
                    {item.text}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-primary-300 transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <li key={index}>
                  <Link 
                    href={resource.href}
                    className="text-gray-300 hover:text-primary-300 transition-colors"
                  >
                    {resource.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-primary-300 transition-colors"
                >
                  <social.icon className="w-6 h-6" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-primary-700">
          <p className="text-sm text-gray-400 text-center">
            {new Date().getFullYear()} Hexa Steel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
