import { Link } from 'react-router-dom';
import { LayoutDashboard, Video, Mail, Settings, LogOut } from 'lucide-react';

const AdminLayout = ({ children }) => {
    const links = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: Video, label: 'Sermons', path: '/admin/sermons' },
        { icon: Mail, label: 'Prayer Inbox', path: '/admin/inbox' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    return (
        <div className="flex h-screen bg-gray-100 font-body">
            {/* Sidebar */}
            <aside className="w-64 bg-primary text-white flex flex-col fixed h-full">
                <div className="p-6 border-b border-white/10">
                    <h2 className="text-2xl font-bold font-heading">Charis Admin</h2>
                </div>
                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {links.map(link => (
                        <Link key={link.path} to={link.path} className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors">
                            <link.icon size={20} />
                            <span>{link.label}</span>
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-white/10">
                    <button className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-600/80 transition-colors w-full text-left text-red-200 hover:text-white">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 overflow-y-auto p-8">
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;
