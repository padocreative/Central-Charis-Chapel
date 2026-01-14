import { useState } from 'react';
import { Plus, Play, Calendar, User, Trash2, Edit } from 'lucide-react';
import { useSermons } from '../../context/SermonContext';

const SermonManager = () => {
    const { sermons } = useSermons();

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold font-heading text-primary">Sermon Manager</h1>
                <button className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
                    <Plus size={20} className="mr-2" />
                    Add New Sermon
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {sermons.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">Title</th>
                                    <th className="px-6 py-4">Preacher</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Type</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {sermons.map((sermon) => (
                                    <tr key={sermon.id} className="hover:bg-gray-50 font-body text-sm text-gray-700">
                                        <td className="px-6 py-4 font-medium text-gray-900">{sermon.title}</td>
                                        <td className="px-6 py-4">{sermon.preacher}</td>
                                        <td className="px-6 py-4">{sermon.date}</td>
                                        <td className="px-6 py-4">
                                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{sermon.type}</span>
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <button className="text-blue-600 hover:text-blue-800"><Edit size={16} /></button>
                                            <button className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="p-10 text-center text-gray-500">
                        <Play className="mx-auto mb-2 opacity-20" size={48} />
                        <p>No sermons found. Start by adding one!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SermonManager;
