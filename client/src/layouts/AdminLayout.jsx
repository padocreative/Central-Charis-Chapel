import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Video, Mail, Settings, LogOut, Menu, X } from 'lucide-react';

const AdminLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();

    const links = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: Video, label: 'Sermons', path: '/admin/sermons' },
        { icon: Mail, label: 'Prayer Inbox', path: '/admin/inbox' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    const isActive = (path) => location.pathname === path || (path !== '/admin' && location.pathname.startsWith(path));

    return (
        <div className="flex bg-gray-100 font-body min-h-screen">
            {/* Mobile Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 bg-primary text-white flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0 shadow-xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <h2 className="text-2xl font-bold font-heading">Charis Admin</h2>
                    {/* Mobile Close Button */}
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-white/70 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {links.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsSidebarOpen(false)}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive(link.path)
                                    ? 'bg-white/20 text-white font-medium'
                                    : 'hover:bg-white/10 text-gray-300 hover:text-white'
                                }`}
                        >
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

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col md:ml-64 min-h-screen w-full transition-all duration-300">
                {/* Mobile Header */}
                <header className="md:hidden bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-30">
                    <h1 className="text-lg font-bold font-heading text-primary">Admin Panel</h1>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    >
                        <Menu size={24} />
                    </button>
                </header>

                {/* Content Area */}
                <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
