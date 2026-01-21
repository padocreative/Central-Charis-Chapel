import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import SermonCard from '../components/SermonCard';
import PrayerRequestForm from '../components/PrayerRequestForm';
import { useSermons } from '../context/SermonContext';

const Home = () => {
    const { scrollY } = useScroll();
    const { sermons } = useSermons();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <PublicLayout>
            {/* Cinematic Hero Section */}
            <section className="relative h-screen min-h-[700px] md:min-h-[800px] flex items-center justify-center overflow-hidden bg-black">
                {/* Parallax Video/Image Background */}
                <motion.div
                    style={{ y: y1 }}
                    className="absolute inset-0 z-0 opacity-40"
                >
                    <img
                        src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070&auto=format&fit=crop"
                        alt=""
                        className="w-full h-[120%] object-cover"
                    />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/80 via-transparent to-transparent" />
                </motion.div>

                {/* Content Container */}
                <div className="relative z-10 container mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-between pt-20 md:pt-0">

                    {/* Left: Text Content - Top Half on Mobile */}
                    <div className="text-center md:text-left max-w-3xl md:w-1/2 z-20 flex flex-col justify-center h-[55%] md:h-full">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            <span className="inline-block py-1 px-3 border border-gold/50 rounded-full text-gold text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4 backdrop-blur-sm">
                                Welcome Home
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4 tracking-tight leading-none"
                        >
                            Central <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">Charis</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            className="font-heading italic text-base md:text-2xl text-gray-200 mb-8 font-light leading-relaxed px-2 md:px-0"
                        >
                            "Delight thyself also in the Lord: and he shall give thee the desires of thine heart."
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start"
                        >
                            <Link to="/sermons" className="group bg-gold hover:bg-white text-primary-dark px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-sm md:text-base transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-gold/20">
                                <span>Watch Sermon</span>
                                <Play size={18} className="ml-2 group-hover:scale-110 transition-transform" fill="currentColor" />
                            </Link>
                            <Link to="/about" className="group bg-white/10 border border-white/20 hover:bg-white/20 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base transition-all flex items-center justify-center backdrop-blur-sm">
                                I'm New Here
                            </Link>
                        </motion.div>
                    </div>

                    {/* Right: Pastor Image - Bottom Half on Mobile (Clean Anchor) */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                        className="relative w-full md:w-1/2 h-[45%] md:h-full flex items-end justify-center md:justify-end z-10"
                    >
                        <div className="relative h-full w-full flex items-end justify-center md:justify-end">
                            {/* Pastor Image */}
                            <img
                                src="/pastor.png"
                                alt="Senior Pastor"
                                className="object-contain max-h-full w-auto drop-shadow-2xl mask-image-b-fade opacity-80"
                                style={{ maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' }}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 animate-bounce z-30"
                >
                    <ChevronDown size={32} />
                </motion.div>
            </section>

            {/* Featured Sermons Section - Adaptable Layout */}
            <section className="relative z-20 mt-12 md:-mt-24 pb-12 md:pb-24">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-10 px-2">
                        <div className="text-gray-900 md:text-white mb-6 md:mb-0">
                            <h2 className="text-2xl md:text-3xl font-heading font-bold">Latest Messages</h2>
                            <p className="text-gray-600 md:text-gray-300 mt-2 text-base">Catch up on what you missed</p>
                        </div>
                        <Link to="/sermons" className="flex items-center text-primary md:text-gold hover:text-primary-dark md:hover:text-white transition-colors text-xs md:text-sm font-bold uppercase tracking-widest">
                            View All Archive <ArrowRight size={16} className="ml-2" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sermons.slice(0, 3).map((sermon, index) => (
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
                            <div className="p-6 md:p-12 lg:p-20 bg-primary-dark text-white relative flex flex-col justify-center">
                                <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                                <div className="relative z-10">
                                    <h2 className="text-3xl lg:text-5xl font-heading font-bold text-white mb-6">Need Prayer?</h2>
                                    <p className="text-base lg:text-lg text-gray-100 mb-8 leading-relaxed">
                                        We believe that prayer changes things. Whatever you are going through, our pastoral team is ready to stand in faith with you.
                                    </p>

                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="w-12 h-1 bg-gold rounded-full"></div>
                                        <p className="text-gold font-bold uppercase tracking-widest text-sm">Confidential</p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Form */}
                            <div className="p-6 md:p-12 lg:p-20 bg-white">
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
