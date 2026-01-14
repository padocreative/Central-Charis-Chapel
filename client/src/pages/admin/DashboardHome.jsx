import { Video, Mail, Calendar } from 'lucide-react';

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
    return (
        <div>
            <h1 className="text-3xl font-bold font-heading mb-8 text-primary">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <StatCard icon={Video} label="Total Sermons" value="124" color="bg-blue-600" />
                <StatCard icon={Mail} label="Unread Prayer Requests" value="5" color="bg-red-500" />
                <StatCard icon={Calendar} label="Upcoming Events" value="3" color="bg-green-500" />
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h3 className="font-bold text-lg mb-4">Recent Activity</h3>
                <p className="text-gray-500">No recent activity to display.</p>
            </div>
        </div>
    );
};

export default DashboardHome;
