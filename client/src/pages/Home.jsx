import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import SermonCard from '../components/SermonCard';
import PrayerRequestForm from '../components/PrayerRequestForm';

// Mock Data (Unchanged)
const MOCK_SERMONS = [
    {
        id: 1,
        title: "Walking in Divine Purpose",
        preacher: "Rev. Elorm Oscar",
        date: "Jan 12, 2025",
        thumbnail: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=800",
        url: "https://www.youtube.com/watch?v=ysz5S6P_bsU",
        type: "Sunday Service"
    },
    {
        id: 2,
        title: "The Power of Persistent Prayer",
        preacher: "Rev. Elorm Oscar",
        date: "Jan 05, 2025",
        thumbnail: "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?auto=format&fit=crop&q=80&w=800",
        url: "https://www.youtube.com/watch?v=ysz5S6P_bsU",
        type: "Mid-week"
    },
    {
        id: 3,
        title: "Grace for the Race",
        preacher: "Guest Minister",
        date: "Dec 31, 2024",
        thumbnail: "https://images.unsplash.com/photo-1507692049790-de58293a4697?auto=format&fit=crop&q=80&w=800",
        url: "https://www.youtube.com/watch?v=ysz5S6P_bsU",
        type: "Crossover"
    },
];

const Home = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <PublicLayout>
            {/* Cinematic Hero Section */}
            <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden bg-black">
                {/* Parallax Video/Image Background */}
                <motion.div
                    style={{ y: y1 }}
                    className="absolute inset-0 z-0 opacity-60"
                >
                    <img
                        src="https://images.unsplash.com/photo-1543791959-12b3f543281a?q=80&w=2070&auto=format&fit=crop"
                        alt="Worship Background"
                        className="w-full h-[120%] object-cover"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/40 to-transparent" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10 container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <span className="inline-block py-1 px-3 border border-gold/50 rounded-full text-gold text-sm font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm">
                            Welcome Home
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-5xl md:text-7xl lg:text-9xl font-heading font-bold text-white mb-6 tracking-tight leading-none"
                    >
                        Central <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">Charis</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="font-heading italic text-xl md:text-3xl text-gray-200 mb-12 max-w-3xl mx-auto font-light"
                    >
                        "Delight thyself also in the Lord: and he shall give thee the desires of thine heart."
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-6 justify-center"
                    >
                        <Link to="/sermons" className="group bg-gold hover:bg-white text-primary-dark px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center justify-center">
                            <span>Watch Latest Sermon</span>
                            <Play size={20} className="ml-3 group-hover:scale-110 transition-transform" fill="currentColor" />
                        </Link>
                        <Link to="/about" className="group bg-transparent border border-white/30 hover:border-white hover:bg-white/5 text-white px-10 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center backdrop-blur-sm">
                            I'm New Here
                        </Link>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
                >
                    <ChevronDown size={32} />
                </motion.div>
            </section>

            {/* Featured Sermons Section - Negative Margin Overlap */}
            <section className="relative z-20 -mt-24 pb-24">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-10 text-white px-2">
                        <div>
                            <h2 className="text-3xl font-heading font-bold">Latest Messages</h2>
                            <p className="text-gray-300 mt-2">Catch up on what you missed</p>
                        </div>
                        <Link to="/sermons" className="hidden md:flex items-center text-gold hover:text-white transition-colors text-sm font-bold uppercase tracking-widest mt-4 md:mt-0">
                            View All Archive <ArrowRight size={16} className="ml-2" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {MOCK_SERMONS.map((sermon, index) => (
                            <motion.div
                                key={sermon.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <SermonCard {...sermon} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Prayer Request Section - Split Design */}
            <section className="py-24 bg-surface-alt relative overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="bg-white rounded-3xl shadow-premium overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2">
                            {/* Left Content */}
                            <div className="p-12 lg:p-20 bg-primary-dark text-white relative flex flex-col justify-center">
                                <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                                <div className="relative z-10">
                                    <h2 className="text-4xl lg:text-5xl font-heading font-bold mb-6">Need Prayer?</h2>
                                    <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                                        We believe that prayer changes things. Whatever you are going through, our pastoral team is ready to stand in faith with you.
                                    </p>

                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="w-12 h-1 bg-gold rounded-full"></div>
                                        <p className="text-gold font-bold uppercase tracking-widest text-sm">Confidential</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Form */}
                            <div className="p-12 lg:p-20 bg-white">
                                <PrayerRequestForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
};

export default Home;
