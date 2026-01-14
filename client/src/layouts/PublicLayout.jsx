import { Link } from 'react-router-dom';
import { Menu, X, Facebook, Youtube } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../utils/cn';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Change nav style on scroll
    window.onscroll = () => {
        setScrolled(window.scrollY > 50);
    };

    return (
        <nav className={cn(
            "fixed top-0 w-full z-50 transition-all duration-300",
            scrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        )}>
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link to="/" className={cn("text-2xl font-heading font-bold", scrolled ? "text-primary" : "text-white")}>
                    Central Charis Chapel
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8 items-center">
                    {['Home', 'Sermons', 'Events', 'About'].map((item) => (
                        <Link key={item} to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                            className={cn("font-medium hover:text-accent transition-colors", scrolled ? "text-gray-700" : "text-white/90")}>
                            {item}
                        </Link>
                    ))}
                    <Link to="/give" className="bg-accent text-white px-6 py-2 rounded-full font-bold hover:bg-red-700 transition-colors">
                        Give
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X className={scrolled ? "text-gray-800" : "text-white"} /> : <Menu className={scrolled ? "text-gray-800" : "text-white"} />}
                </button>
            </div>

            import Navbar from '../components/Navbar';

            const PublicLayout = ({children}) => {
  return (
            <div className="flex flex-col min-h-screen font-body text-gray-800 bg-surface-alt">
                <Navbar />
                <main className="flex-grow">
                    {children}
                </main>
                <footer className="bg-primary-dark text-white py-16 mt-0">
                    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                        <div className="md:col-span-2">
                            <h2 className="text-3xl font-heading font-bold text-white mb-6">Central <span className="text-gold">Charis</span></h2>
                            <p className="text-gray-300 leading-relaxed max-w-sm">
                                We are a community of believers passionate about God's word and His presence. Join us as we grow together in faith.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-6 text-gold">Quick Links</h4>
                            <ul className="space-y-3 text-gray-300">
                                <li><a href="/sermons" className="hover:text-white transition-colors">Sermons</a></li>
                                <li><a href="/events" className="hover:text-white transition-colors">Events</a></li>
                                <li><a href="/give" className="hover:text-white transition-colors">Give</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-6 text-gold">Connect</h4>
                            <p className="text-gray-300 mb-2">123 Faith Avenue</p>
                            <p className="text-gray-300 mb-2">+233 555 000 123</p>
                            <p className="text-gray-300">info@centralcharis.com</p>
                        </div>
                    </div>
                    <div className="container mx-auto px-6 pt-8 mt-12 border-t border-white/10 text-center text-gray-500 text-sm">
                        <p>&copy; {new Date().getFullYear()} Central Charis Chapel. All rights reserved.</p>
                    </div>
                </footer>
            </div>
            );
};

            export default PublicLayout;
