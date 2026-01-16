import { Video, Mail, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLiveStream } from '../../context/LiveStreamContext';

const StatCard = ({ icon: Icon, label, value, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color} text-white`}>
            <Icon size={24} />
        </div>
        <div>
            <p className="text-gray-500 text-sm">{label}</p>
            <h3 className="text-2xl font-bold font-heading">{value}</h3>
        </div>
    </div>
);

// ... imports
import StatusModal from '../../components/admin/StatusModal';

const DashboardHome = () => {
    const { isLive, liveUrl, serviceType, updateLiveStatus, loading } = useLiveStream();
    const [urlInput, setUrlInput] = useState('');
    const [typeInput, setTypeInput] = useState('Sunday Service');
    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'success', title: '', message: '' });

    useEffect(() => {
        if (liveUrl) setUrlInput(liveUrl);
        if (serviceType) setTypeInput(serviceType);
    }, [liveUrl, serviceType]);

    const handleToggleLive = async () => {
        const newStatus = !isLive;
        try {
            await updateLiveStatus(newStatus, urlInput, typeInput);
        } catch (error) {
            setModalConfig({
                isOpen: true,
                type: 'error',
                title: 'Error',
                message: 'Failed to update live status. Please try again.',
            });
        }
    };

    const handleUrlChange = (e) => {
        setUrlInput(e.target.value);
    };

    const handleSaveUrl = async () => {
        try {
            await updateLiveStatus(isLive, urlInput, typeInput);
            setModalConfig({
                isOpen: true,
                type: 'success',
                title: 'Saved',
                message: 'Stream URL saved successfully!',
            });
        } catch (error) {
            setModalConfig({
                isOpen: true,
                type: 'error',
                title: 'Error',
                message: 'Failed to save Stream URL.',
            });
        }
    };

    return (
        <div>
            <StatusModal
                {...modalConfig}
                onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
            />

            <h1 className="text-3xl font-bold font-heading mb-8 text-primary">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard icon={Video} label="Total Sermons" value="124" color="bg-blue-600" />
                <StatCard icon={Mail} label="Unread Prayer Requests" value="5" color="bg-red-500" />
                <StatCard icon={Calendar} label="Upcoming Events" value="3" color="bg-green-500" />
            </div>

            {/* Live Stream Manager */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-10 relative overflow-hidden">
                <div className={`absolute top-0 right-0 p-4 opacity-10 pointer-events-none`}>
                    <Video size={120} className={isLive ? "text-red-500" : "text-gray-300"} />
                </div>

                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                        <h3 className="font-bold text-lg flex items-center">
                            Live Stream Manager
                            {loading && <span className="ml-2 text-xs text-gray-400 font-normal">(Syncing...)</span>}
                        </h3>

                        {/* Status Toggle - Moved to top for better mobile visibility */}
                        <div className="flex items-center justify-between md:justify-end gap-4 bg-gray-50 p-2 pl-4 rounded-lg border border-gray-100 min-w-[200px]">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-0.5">Status</span>
                                <span className={`text-sm font-bold ${isLive ? 'text-red-600' : 'text-gray-500'}`}>
                                    {isLive ? '🔴 LIVE NOW' : '⚫ OFFLINE'}
                                </span>
                            </div>

                            <button
                                onClick={handleToggleLive}
                                className={`relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 ${isLive ? 'bg-red-600 focus:ring-red-600' : 'bg-gray-200 focus:ring-gray-400'
                                    }`}
                            >
                                <span className="sr-only">Toggle Live</span>
                                <span
                                    aria-hidden="true"
                                    className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isLive ? 'translate-x-6' : 'translate-x-0'
                                        }`}
                                />
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-50/50 rounded-xl p-4 md:p-6 border border-gray-100">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Service Name
                                </label>
                                <select
                                    value={typeInput}
                                    onChange={(e) => setTypeInput(e.target.value)}
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-11"
                                >
                                    <option value="Sunday Service">Sunday Service</option>
                                    <option value="Midweek Service">Midweek Service</option>
                                    <option value="Worship Night">Worship Night</option>
                                    <option value="Special Event">Special Event</option>
                                    <option value="Conference">Conference</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">
                                    Stream Link (YouTube/Facebook)
                                </label>
                                <input
                                    type="text"
                                    value={urlInput}
                                    onChange={handleUrlChange}
                                    placeholder="Paste video link here..."
                                    className="w-full rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary h-11"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleSaveUrl}
                                className="w-full md:w-auto px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark font-bold text-sm transition-all shadow-md active:scale-95"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
                <p className="text-gray-500">No recent activity to display.</p>
            </div>
        </div>
    );
};

export default DashboardHome;
