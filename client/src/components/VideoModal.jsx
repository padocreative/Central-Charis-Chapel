import { useRef, useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { X, Loader2, AlertCircle } from 'lucide-react';

const VideoModal = ({ isOpen, onClose, url, playing = false }) => {
    const modalContentRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    // Reset state when modal opens or url changes
    useEffect(() => {
        if (isOpen) {
            setIsLoading(true);
            setError(false);
            setHasStarted(false);
        }
    }, [isOpen, url]);

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
                {/* Loading State */}
                {isLoading && !error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 text-white z-10">
                        <Loader2 size={48} className="animate-spin text-primary mb-4" />
                        <p className="text-sm font-medium text-gray-400">Loading Video...</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 text-white z-20">
                        <AlertCircle size={48} className="text-red-500 mb-4" />
                        <h3 className="text-xl font-bold mb-2">Unavailable Video</h3>
                        <p className="text-gray-400 max-w-md text-center mb-6">
                            This video could not be played. It might be private, deleted, or the link is invalid.
                        </p>
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-medium transition-colors"
                        >
                            Close Player
                        </button>
                    </div>
                )}

                <ReactPlayer
                    url={url}
                    width="100%"
                    height="100%"
                    playing={playing}
                    controls={true}
                    onReady={() => setIsLoading(false)}
                    onStart={() => {
                        setIsLoading(false);
                        setHasStarted(true);
                    }}
                    onBuffer={() => setIsLoading(true)}
                    onBufferEnd={() => setIsLoading(false)}
                    onError={(e) => {
                        console.error("Video Error:", e);
                        setIsLoading(false);
                        setError(true);
                    }}
                    config={{
                        youtube: {
                            playerVars: { showinfo: 0, modestbranding: 1 }
                        },
                        facebook: {
                            appId: '1309697205772819' // Optional: default legacy app id if needed
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default VideoModal;
