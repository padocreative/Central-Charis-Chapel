import { useRef } from 'react';
import { X } from 'lucide-react';
import { getEmbedUrl } from '../utils/videoUtils';

const VideoModal = ({ isOpen, onClose, url }) => {
    const modalContentRef = useRef(null);

    // Transform input URL to a native embed format
    const embedUrl = getEmbedUrl(url);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[210]"
            >
                <X size={32} />
                <span className="sr-only">Close</span>
            </button>

            <div
                ref={modalContentRef}
                className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-black"
                onClick={e => e.stopPropagation()}
            >
                {embedUrl ? (
                    <iframe
                        src={embedUrl}
                        width="100%"
                        height="100%"
                        title="Video Player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-white">
                        <p>Invalid Video Source</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoModal;
