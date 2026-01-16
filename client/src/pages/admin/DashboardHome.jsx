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

const DashboardHome = () => {
    const { isLive, liveUrl, updateLiveStatus, loading } = useLiveStream();
    const [urlInput, setUrlInput] = useState('');

    useEffect(() => {
        if (liveUrl) setUrlInput(liveUrl);
    }, [liveUrl]);

    const handleToggleLive = async () => {
        const newStatus = !isLive;
        // If going live, ensure we have a URL (or keep existing)
        await updateLiveStatus(newStatus, urlInput);
    };

    const handleUrlChange = (e) => {
        setUrlInput(e.target.value);
    };

    const handleSaveUrl = () => {
        updateLiveStatus(isLive, urlInput);
        alert("Stream URL saved!");
    };

    return (
        <div>
            <h1 className="text-3xl font-bold font-heading mb-8 text-primary">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard icon={Video} label="Total Sermons" value="124" color="bg-blue-600" />
                <StatCard icon={Mail} label="Unread Prayer Requests" value="5" color="bg-red-500" />
                <StatCard icon={Calendar} label="Upcoming Events" value="3" color="bg-green-500" />
            </div>

            {/* Sunday Service Control */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-10 relative overflow-hidden">
                <div className={`absolute top-0 right-0 p-4 opacity-10 pointer-events-none`}>
                    <Video size={120} className={isLive ? "text-red-500" : "text-gray-300"} />
                </div>

                <div className="relative z-10">
                    <h3 className="font-bold text-lg mb-4 flex items-center">
                        Sunday Service Control
                        {loading && <span className="ml-2 text-xs text-gray-400">(Syncing...)</span>}
                    </h3>

                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
                        <div className="flex-1 w-full">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Live Stream URL (YouTube/Facebook)
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={urlInput}
                                    onChange={handleUrlChange}
                                    placeholder="https://www.youtube.com/watch?v=..."
                                    className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-primary focus:ring-primary text-sm p-2.5 border"
                                />
                                <button
                                    onClick={handleSaveUrl}
                                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 font-medium text-sm transition-colors"
                                >
                                    Save
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <div className="flex flex-col">
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Status</span>
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
