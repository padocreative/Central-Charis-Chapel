import { Edit, Trash2, Youtube, Facebook, Video, Play } from 'lucide-react';

const AdminSermonList = ({ sermons, onEdit, onDelete }) => {

    const handleDeleteClick = (id) => {
        if (window.confirm("Are you sure you want to delete this sermon? This action cannot be undone.")) {
            onDelete(id);
        }
    };

    if (!sermons || sermons.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center text-gray-500 flex flex-col items-center justify-center min-h-[300px]">
                <div className="bg-gray-50 p-4 rounded-full mb-4">
                    <Play className="opacity-20 text-gray-400" size={48} />
                </div>
                <h3 className="text-lg font-bold text-gray-700 mb-1">No Sermons Found</h3>
                <p className="text-sm">Start by adding your first sermon to the library.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Thumbnail</th>
                            <th className="px-6 py-4 font-semibold">Title Info</th>
                            <th className="px-6 py-4 font-semibold">Date</th>
                            <th className="px-6 py-4 font-semibold">Platform</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {sermons.map((sermon) => (
                            <tr key={sermon.id} className="hover:bg-gray-50/50 transition-colors bg-white font-body text-sm text-gray-700">
                                {/* Thumbnail */}
                                <td className="px-6 py-4 w-24">
                                    <div className="w-20 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shadow-sm relative group">
                                        <img
                                            src={sermon.thumbnail || '/logo.png'}
                                            alt=""
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Img'; }}
                                        />
                                    </div>
                                </td>

                                {/* Title & Preacher */}
                                <td className="px-6 py-4">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 line-clamp-1">{sermon.title}</h4>
                                        <p className="text-xs text-gray-500 mt-0.5">{sermon.preacher}</p>
                                    </div>
                                </td>

                                {/* Date */}
                                <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                                    {sermon.date}
                                </td>

                                {/* Platform Badge */}
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${sermon.type === 'YouTube' || (sermon.url && sermon.url.includes('youtu'))
                                            ? 'bg-red-50 text-red-700 border-red-100'
                                            : sermon.type === 'Facebook' || (sermon.url && sermon.url.includes('facebook'))
                                                ? 'bg-blue-50 text-blue-700 border-blue-100'
                                                : 'bg-gray-100 text-gray-600 border-gray-200'
                                        }`}>
                                        {sermon.type === 'YouTube' || (sermon.url && sermon.url.includes('youtu')) ? <Youtube size={12} /> :
                                            sermon.type === 'Facebook' || (sermon.url && sermon.url.includes('facebook')) ? <Facebook size={12} /> : <Video size={12} />}
                                        {sermon.type || 'Video'}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-6 py-4 text-right whitespace-nowrap">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={() => onEdit(sermon)}
                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            title="Edit Sermon"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(sermon.id)}
                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete Sermon"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminSermonList;
