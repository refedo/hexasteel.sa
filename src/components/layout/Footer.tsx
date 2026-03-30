import { useEffect, useState } from 'react';
import Link from 'next/link';
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

interface SiteSettings {
  contactPhone?: string;
  contactEmail?: string;
  contactAddress?: string;
  facebookUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
}

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

export default function Footer() {
  const [settings, setSettings] = useState<SiteSettings>({});

  useEffect(() => {
    fetch('/api/public/settings')
      .then(r => r.ok ? r.json() : {})
      .then(data => setSettings(data))
      .catch(() => {});
  }, []);

  const phone = settings.contactPhone || '+966 13 123 4567';
  const email = settings.contactEmail || 'info@hexasteel.sa';
  const address = settings.contactAddress || 'Dammam 2nd Industrial City, KSA';

  const socialLinks = [
    { name: 'Facebook', href: settings.facebookUrl || '#', icon: Facebook },
    { name: 'Twitter', href: settings.twitterUrl || '#', icon: Twitter },
    { name: 'LinkedIn', href: settings.linkedinUrl || '#', icon: Linkedin },
    { name: 'Instagram', href: settings.instagramUrl || '#', icon: Instagram },
  ];

  return (
    <footer className="bg-primary-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <PhoneIcon className="w-6 h-6 text-primary-300 flex-shrink-0" />
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-gray-300 hover:text-primary-300 transition-colors">
                  {phone}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <EnvelopeIcon className="w-6 h-6 text-primary-300 flex-shrink-0" />
                <a href={`mailto:${email}`} className="text-gray-300 hover:text-primary-300 transition-colors">
                  {email}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPinIcon className="w-6 h-6 text-primary-300 flex-shrink-0" />
                <span className="text-gray-300">{address}</span>
              </div>
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
