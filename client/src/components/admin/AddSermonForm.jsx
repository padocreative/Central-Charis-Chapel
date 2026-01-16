// ... imports
import StatusModal from './StatusModal';

const AddSermonForm = ({ onSubmit, initialData = null, onCancel, isSubmitting = false }) => {
    // ... existing state
    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'error', title: '', message: '' });

    // ... existing lines 14-93 ...

    const handleSubmit = (e) => {
        e.preventDefault();

        // Final validation
        if (linkStatus === 'invalid') {
            setModalConfig({
                isOpen: true,
                type: 'error',
                title: 'Invalid Video Link',
                message: 'Please enter a valid YouTube or Facebook video URL before publishing.',
            });
            return;
        }

        // ... existing submission logic ...
        // Apply fallback logo if no thumbnail provided
        // Map videoLink to url for database consistency
        // Map topic to type for badge display (default to Sunday Service)
        const { videoLink, topic, ...rest } = formData;

        const finalData = {
            ...rest,
            url: videoLink,
            type: topic || 'Sunday Service',
            thumbnail: formData.thumbnail || '/logo.png', // Assuming /logo.png exists as fallback
        };

        onSubmit(finalData);
    };

    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
            <StatusModal
                {...modalConfig}
                onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
            />

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold font-heading text-gray-800">
                    {initialData ? 'Edit Sermon' : 'Add New Sermon'}
                </h2>
                <button onClick={onCancel} className="text-gray-400 hover:text-gray-600">
                    <X size={24} />
                </button>
            </div>

            {/* ... rest of the form ... */}
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* ... fields ... */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Sermon Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Walking in Faith"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                    </div>

                    {/* Preacher */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Preacher</label>
                        <input
                            type="text"
                            name="preacher"
                            value={formData.preacher}
                            onChange={handleChange}
                            placeholder="e.g. Head Pastor"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Date */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Date Preached</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                    </div>

                    {/* Series/Topic */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-gray-700">Series / Topic (Optional)</label>
                        <input
                            type="text"
                            name="topic"
                            value={formData.topic}
                            onChange={handleChange}
                            placeholder="e.g. Grace Series"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                    </div>
                </div>

                {/* Video Link Logic Section */}
                <div className="space-y-2 relative">
                    <label className="text-sm font-semibold text-gray-700 flex items-center justify-between">
                        Video Link
                        {linkStatus === 'valid' && (
                            <span className="text-xs font-normal text-green-600 flex items-center bg-green-50 px-2 py-1 rounded-full">
                                <Check size={12} className="mr-1" />
                                Valid {detectedPlatform === 'youtube' ? 'YouTube' : 'Facebook'} Link
                            </span>
                        )}
                        {linkStatus === 'invalid' && (
                            <span className="text-xs font-normal text-red-600 flex items-center bg-red-50 px-2 py-1 rounded-full">
                                <AlertCircle size={12} className="mr-1" />
                                Invalid Video Link
                            </span>
                        )}
                    </label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <LinkIcon size={20} />
                        </div>
                        <input
                            type="url"
                            name="videoLink"
                            value={formData.videoLink}
                            onChange={handleChange}
                            placeholder="Paste YouTube or Facebook link here..."
                            required
                            className={`w-full pl-12 pr-12 py-3 rounded-xl border outline-none transition-all ${linkStatus === 'invalid'
                                ? 'border-red-300 focus:border-red-500 focus:ring-red-100'
                                : linkStatus === 'valid'
                                    ? 'border-green-300 focus:border-green-500 focus:ring-green-100'
                                    : 'border-gray-200 focus:border-primary focus:ring-primary/20'
                                }`}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            {detectedPlatform === 'youtube' && <Youtube className="text-red-600" size={24} />}
                            {detectedPlatform === 'facebook' && <Facebook className="text-blue-600" size={24} />}
                        </div>
                    </div>
                </div>

                {/* Thumbnail Preview Area */}
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 border-dashed">
                    <h3 className="text-sm font-semibold text-gray-600 mb-3">Thumbnail Preview</h3>
                    <div className="flex flex-col md:flex-row gap-6 items-center">
                        {/* The Preview Image */}
                        <div className="w-full md:w-64 aspect-video bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center relative shadow-sm">
                            {thumbnailPreview ? (
                                <img src={thumbnailPreview} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-gray-400 flex flex-col items-center">
                                    <ImageIcon size={32} className="mb-2" />
                                    <span className="text-xs">No thumbnail</span>
                                </div>
                            )}
                        </div>

                        {/* Controls */}
                        <div className="flex-1 space-y-3 w-full">
                            {detectedPlatform === 'youtube' && (
                                <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg flex items-start">
                                    <Check size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                                    <span>Thumbnail automatically extracted from YouTube.</span>
                                </p>
                            )}

                            {(detectedPlatform === 'facebook' || (!detectedPlatform && linkStatus !== 'valid')) && (
                                <div className="space-y-2">
                                    <p className="text-sm text-gray-600">
                                        {detectedPlatform === 'facebook' ? 'Facebook thumbnails cannot be fetched automatically.' : 'Upload a custom thumbnail.'}
                                    </p>
                                    <label className="flex items-center justify-center w-full px-4 py-3 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                        <Upload size={18} className="mr-2 text-gray-500" />
                                        <span className="text-sm font-medium text-gray-700">Upload Custom Thumbnail</span>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleThumbnailUpload} />
                                    </label>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={linkStatus === 'invalid' || isSubmitting}
                        className="px-6 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark shadow-lg shadow-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 size={20} className="mr-2 animate-spin" />
                                {initialData ? 'Saving...' : 'Publishing...'}
                            </>
                        ) : (
                            initialData ? 'Save Changes' : 'Publish Sermon'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddSermonForm;

