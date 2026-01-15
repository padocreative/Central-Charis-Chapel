import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Sermons', path: '/sermons' },
        { name: 'Events', path: '/events' },
        { name: 'About', path: '/about' },
    ];

    const isHome = location.pathname === '/';

    return (
        <nav className={cn(
            "fixed w-full z-50 transition-all duration-500 border-b border-transparent",
            scrolled || isOpen
                ? "bg-white py-3 shadow-sm border-gray-100"
                : isHome
                    ? "bg-transparent py-6"
                    : "bg-primary py-4"
        )}>
            <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
                <Link to="/" className="relative z-50 group flex items-center gap-3">
                    <img src="/logo.png" alt="Central Charis Logo" className="w-24 h-24 md:w-32 md:h-32 object-contain" />
                    <h1 className={cn(
                        "text-xl md:text-2xl font-heading font-bold tracking-tight transition-colors duration-300",
                        scrolled || !isHome || isOpen ? "text-primary-dark" : "text-white"
                    )}>
                        Central <span className={cn(
                            "text-gold transition-colors",
                            scrolled || !isHome || isOpen ? "text-gold-dark" : "text-gold-light"
                        )}>Charis</span>
                    </h1>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={cn(
                                "text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 relative group",
                                scrolled || !isHome ? "text-gray-700 hover:text-primary" : "text-white/90 hover:text-white"
                            )}
                        >
                            {link.name}
                            <span className={cn(
                                "absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
                                scrolled || !isHome ? "bg-primary" : "bg-gold"
                            )} />
                        </Link>
                    ))}
                    <Link
                        to="/give"
                        className={cn(
                            "px-8 py-3 rounded-full font-bold text-sm tracking-wide shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95",
                            scrolled || !isHome
                                ? "bg-primary text-white hover:bg-primary-dark"
                                : "bg-gold text-primary-dark hover:bg-gold-light"
                        )}
                    >
                        GIVE
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden z-50 p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? (
                        <X className={scrolled || !isHome || isOpen ? "text-gray-900" : "text-white"} />
                    ) : (
                        <Menu className={scrolled || !isHome ? "text-gray-900" : "text-white"} />
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 bg-white z-40 pt-24 px-6 md:hidden"
                    >
                        <div className="flex flex-col space-y-6 text-center">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-heading font-bold text-primary-dark"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                to="/give"
                                onClick={() => setIsOpen(false)}
                                className="bg-primary text-white py-4 rounded-xl font-bold text-lg"
                            >
                                Give Online
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
