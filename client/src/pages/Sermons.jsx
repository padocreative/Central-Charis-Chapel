import { motion } from 'framer-motion';
import PublicLayout from '../layouts/PublicLayout';
import SermonCard from '../components/SermonCard';
import { useSermons } from '../context/SermonContext';
import { Play } from 'lucide-react';

const Sermons = () => {
    const { sermons } = useSermons();

    return (
        <PublicLayout>
            {/* Header Section */}
            <section className="relative pt-32 pb-20 bg-primary-dark overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=2000"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-primary-dark mix-blend-multiply"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block py-1 px-3 border border-gold/50 rounded-full text-gold text-xs font-bold uppercase tracking-[0.2em] mb-4">
                            Sermon Library
                        </span>
                        <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 drop-shadow-lg">
                            Watch & Listen
                        </h1>
                        <p className="text-gray-100 text-lg max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                            Explore our complete collection of messages. Filter by series, topic, or speaker to find exactly what you need.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Sermon Grid */}
            <section className="py-20 bg-surface-alt">
                <div className="container mx-auto px-6">
                    {sermons.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {sermons.map((sermon, index) => (
                                <motion.div
                                    key={sermon.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                >
                                    <SermonCard {...sermon} />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-500">
                            <div className="bg-white p-6 rounded-full inline-block mb-4 shadow-sm">
                                <Play size={48} className="text-gray-300 ml-1" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-700">No Sermons Found</h3>
                            <p className="mt-2">Check back soon for latest messages.</p>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
};

export default Sermons;
