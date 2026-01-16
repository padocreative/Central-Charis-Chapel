import { useState } from 'react';
import { useLiveStream } from '../context/LiveStreamContext';
import VideoModal from './VideoModal';
import { Play } from 'lucide-react';

const LiveBanner = () => {
    const { isLive, liveUrl } = useLiveStream();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!isLive) return null;

    return (
        <>
            <div className="fixed bottom-6 right-6 z-[90] animate-in slide-in-from-bottom-10 fade-in duration-500">
                <div className="bg-red-600 rounded-xl shadow-premium overflow-hidden flex items-center p-1 pr-1.5 border border-red-500/50">
                    <div className="flex items-center space-x-3 px-3 py-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                        </span>
                        <div className="flex flex-col">
                            <span className="text-white text-xs font-bold uppercase tracking-wider leading-none mb-0.5">Live Now</span>
                            <span className="text-white/90 text-[10px] font-medium leading-none">Sunday Service</span>
                        </div>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-white hover:bg-gray-50 text-red-600 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-lg transition-colors flex items-center shadow-sm"
                    >
                        <Play size={12} fill="currentColor" className="mr-1.5" />
                        Watch
                    </button>
                </div>
            </div>

            <VideoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                url={liveUrl}
                playing={true}
            />
        </>
    );
};

export default LiveBanner;
