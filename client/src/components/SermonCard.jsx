import { Play, Calendar, User, Clock } from 'lucide-react';
import VideoModal from './VideoModal';
import { useState } from 'react';
import { motion } from 'framer-motion';

const SermonCard = ({ title, preacher, date, thumbnail, url, videoLink, video_url, type }) => {
    const [showModal, setShowModal] = useState(false);

    // Robustly resolve the video URL
    let videoUrl = url || videoLink || video_url;

    // Clean and fix URL
    if (videoUrl) {
        // Remove whitespace
        videoUrl = videoUrl.toString().trim();

        // Add protocol if missing
        if (!videoUrl.startsWith('http')) {
            videoUrl = `https://${videoUrl}`;
        }
    }

    return (
        <>
            <motion.div
                whileHover={{ y: -10 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-premium transition-all duration-300 w-full"
            >
                {/* Thumbnail Layer */}
                <div className="relative h-64 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10" />
                    <img
                        src={thumbnail}
                        alt={title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Tag */}
                    <div className="absolute top-4 left-4 z-20">
                        <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary-dark uppercase tracking-wider shadow-sm">
                            {type}
                        </span>
                    </div>

                    {/* Play Button Overlay */}
                    <div
                        onClick={() => setShowModal(true)}
                        className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    >
                        <div className="w-16 h-16 bg-gold rounded-full flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform duration-300">
                            <Play fill="white" className="text-white ml-1" size={28} />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 relative">
                    <div className="flex items-center text-xs font-semibold text-gold mb-3 space-x-3 uppercase tracking-wide">
                        <span className="flex items-center"><Calendar size={12} className="mr-1" /> {date}</span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="flex items-center"><User size={12} className="mr-1" /> {preacher}</span>
                    </div>

                    <h3 className="font-heading font-bold text-xl text-gray-900 leading-snug mb-2 group-hover:text-primary transition-colors">
                        {title}
                    </h3>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <span
                            onClick={() => setShowModal(true)}
                            className="text-xs font-bold text-primary uppercase tracking-wider group-hover:translate-x-1 transition-transform inline-flex items-center cursor-pointer hover:text-primary-dark"
                        >
                            Watch Sermon
                        </span>
                        <Clock size={14} className="text-gray-400" />
                    </div>
                </div>
            </motion.div>

            {/* Cinematic Modal */}
            <VideoModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                url={videoUrl}
                playing={true}
            />
        </>
    );
};

export default SermonCard;
