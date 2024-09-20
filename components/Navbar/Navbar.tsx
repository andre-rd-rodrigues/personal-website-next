'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import ICONS from '@/constants/icons.constants';
import { Link } from '@/navigation';
import LanguageSelector from '../LanguageSelector';

const navItems = [
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/skills', label: 'Skills' },
  { href: '/contacts', label: 'Contacts' },
  { href: 'https://www.blog.andrerodrigo.com', label: 'Blog' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed left-4 right-4 top-4 z-50">
      <div className="border-1 bg-dark relative h-full rounded-full border-gray-800 bg-opacity-50 shadow-lg backdrop-blur-[20px]">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="relative mr-2 h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src="/images/logo.png"
                    alt="AR"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    /* @ts-expect-error href does not have the type */
                    href={item.href}
                    className={`rounded-md px-3 py-2 text-sm font-normal ${
                      pathname === item.href
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                    } transition-colors duration-300`}
                  >
                    {item.label}
                  </Link>
                ))}
                <LanguageSelector />
              </div>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              >
                <span className="sr-only">Open main menu</span>
                <Icon
                  icon={ICONS.menu}
                  className="block h-6 w-6"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-2 md:hidden"
          >
            <div className="border-1 rounded-lg border-gray-800 bg-gray-800 bg-opacity-10 shadow-lg backdrop-blur-[20px]">
              <div className="space-y-1 px-2 py-4 sm:px-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    /* @ts-expect-error href does not have the type */
                    href={item.href}
                    className={`block rounded-md px-3 py-2 text-right font-extralight ${
                      pathname === item.href
                        ? 'text-white'
                        : 'text-gray-300 hover:text-white'
                    } transition-colors duration-300`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <LanguageSelector className="flex justify-end" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
