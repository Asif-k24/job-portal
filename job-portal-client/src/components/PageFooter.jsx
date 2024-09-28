import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-300 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    {/* Company Info */}
                    <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
                        <h4 className="text-xl font-bold text-white mb-4">JobPortal</h4>
                        <p>Your go-to platform for finding your dream job.</p>
                    </div>

                    {/* Links */}
                    <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
                        <h4 className="text-xl font-bold text-white mb-4">Quick Links</h4>
                        <ul>
                            <li className="mb-2">
                                <Link href="/" className="hover:text-white">Home</Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/about" className="hover:text-white">About Us</Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/jobs" className="hover:text-white">Browse Jobs</Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/contact" className="hover:text-white">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
                        <h4 className="text-xl font-bold text-white mb-4">Resources</h4>
                        <ul>
                            <li className="mb-2">
                                <Link href="/blog" className="hover:text-white">Blog</Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/faq" className="hover:text-white">FAQs</Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/terms" className="hover:text-white">Terms & Conditions</Link>
                            </li>
                            <li className="mb-2">
                                <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div className="w-full sm:w-1/2 lg:w-1/4 mb-6">
                        <h4 className="text-xl font-bold text-white mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <Link href="https://facebook.com" className="hover:text-white">
                                <FaFacebookF />
                            </Link>
                            <Link href="https://twitter.com" className="hover:text-white">
                                <FaTwitter />
                            </Link>
                            <Link href="https://linkedin.com" className="hover:text-white">
                                <FaLinkedinIn />
                            </Link>
                            <Link href="https://instagram.com" className="hover:text-white">
                                <FaInstagram />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="text-center border-t border-gray-700 mt-8 pt-4">
                    <p>© {new Date().getFullYear()} JobPortal. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};