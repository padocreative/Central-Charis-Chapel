import { useState } from 'react';
import { useLiveStream } from '../context/LiveStreamContext';
import VideoModal from './VideoModal';
import { Play, Youtube, Facebook } from 'lucide-react';
import { getVideoPlatform } from '../utils/videoUtils';

const LiveBanner = () => {
    const { isLive, liveUrl } = useLiveStream();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!isLive) return null;

    const platform = getVideoPlatform(liveUrl);

    // Platform-specific styling configuration
    const config = {
        youtube: {
            bg: 'bg-red-600',
            border: 'border-red-500/50',
            text: 'text-red-600',
            label: 'YouTube Live',
            icon: Youtube
        },
        facebook: {
            bg: 'bg-blue-600',
            border: 'border-blue-500/50',
            text: 'text-blue-600',
            label: 'Facebook Live',
            icon: Facebook
        },
        default: {
            bg: 'bg-red-600',
            border: 'border-red-500/50',
            text: 'text-red-600',
            label: 'Live Now',
            icon: Play
        }
    };

    const style = config[platform] || config.default;
    const Icon = style.icon;

    return (
        <>
            <div className="fixed bottom-6 right-6 z-[90] animate-in slide-in-from-bottom-10 fade-in duration-500">
                <div className={`${style.bg} rounded-xl shadow-premium overflow-hidden flex items-center p-1 pr-1.5 border ${style.border}`}>
                    <div className="flex items-center space-x-3 px-3 py-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                        </span>
                        <div className="flex flex-col">
                            <span className="text-white text-xs font-bold uppercase tracking-wider leading-none mb-0.5">{style.label}</span>
                            <span className="text-white/90 text-[10px] font-medium leading-none">Sunday Service</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className={`bg-white hover:bg-gray-50 ${style.text} text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-colors flex items-center shadow-sm`}
                    >
                        <Icon size={14} className="mr-1.5" />
                        Watch
                    </button>
                </div>
            </div>

            <VideoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                url={liveUrl}
            />
        </>
    );
};

export default LiveBanner;
