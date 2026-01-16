import { useRef } from 'react';
import ReactPlayer from 'react-player';
import { X } from 'lucide-react';

const VideoModal = ({ isOpen, onClose, url, playing = false }) => {
    const modalContentRef = useRef(null);

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
                className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10"
                onClick={e => e.stopPropagation()}
            >
                <ReactPlayer
                    url={url}
                    width="100%"
                    height="100%"
                    playing={playing}
                    controls={true}
                    config={{
                        youtube: {
                            playerVars: { showinfo: 0, modestbranding: 1 }
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default VideoModal;
