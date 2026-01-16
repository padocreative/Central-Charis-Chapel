import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useSermons } from '../../context/SermonContext';
import AddSermonForm from '../../components/admin/AddSermonForm';
import AdminSermonList from '../../components/admin/AdminSermonList';

const SermonManager = () => {
    const { sermons, addSermon, deleteSermon, updateSermon } = useSermons();
    const [showForm, setShowForm] = useState(false);
    const [editingSermon, setEditingSermon] = useState(null);

    const handleAddNew = () => {
        setEditingSermon(null);
        setShowForm(true);
    };

    const handleEdit = (sermon) => {
        setEditingSermon(sermon);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        await deleteSermon(id);
    };

    const handleFormSubmit = async (data) => {
        if (editingSermon) {
            await updateSermon({ ...editingSermon, ...data });
        } else {
            await addSermon(data);
        }
        setShowForm(false);
        setEditingSermon(null);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingSermon(null);
    };

    return (
        <div>
            {!showForm ? (
                <>
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold font-heading text-primary">Sermon Manager</h1>
                            <p className="text-gray-500 mt-1">Manage and publish your church's sermon library.</p>
                        </div>
                        <button
                            onClick={handleAddNew}
                            className="bg-primary hover:bg-primary-light text-white px-5 py-2.5 rounded-xl flex items-center shadow-lg shadow-primary/30 transition-all transform hover:-translate-y-0.5"
                        >
                            <Plus size={20} className="mr-2" />
                            Add New Sermon
                        </button>
                    </div>

                    <AdminSermonList
                        sermons={sermons}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                </>
            ) : (
                <div className="max-w-4xl mx-auto">
                    <div className="mb-6">
                        <button
                            onClick={handleCancel}
                            className="text-sm text-gray-500 hover:text-primary mb-2 inline-flex items-center"
                        >
                            &larr; Back to List
                        </button>
                        <h1 className="text-3xl font-bold font-heading text-primary">
                            {editingSermon ? 'Edit Sermon' : 'Upload New Sermon'}
                        </h1>
                    </div>

                    <AddSermonForm
                        onSubmit={handleFormSubmit}
                        initialData={editingSermon}
                        onCancel={handleCancel}
                    />
                </div>
            )}
        </div>
    );
};

export default SermonManager;
