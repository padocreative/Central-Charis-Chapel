import Navbar from '../components/Navbar';

const PublicLayout = ({ children }) => {
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
