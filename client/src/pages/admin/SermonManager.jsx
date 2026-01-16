import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useSermons } from '../../context/SermonContext';
import AddSermonForm from '../../components/admin/AddSermonForm';
import AdminSermonList from '../../components/admin/AdminSermonList';
import StatusModal from '../../components/admin/StatusModal';

const SermonManager = () => {
    const { sermons, addSermon, deleteSermon, updateSermon } = useSermons();
    const [showForm, setShowForm] = useState(false);
    const [editingSermon, setEditingSermon] = useState(null);
    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'success', title: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddNew = () => {
        setEditingSermon(null);
        setShowForm(true);
    };

    const handleEdit = (sermon) => {
        setEditingSermon(sermon);
        setShowForm(true);
    };

    // Triggered when user clicks "Delete" on the list item
    const handleDeleteRequest = (id) => {
        setModalConfig({
            isOpen: true,
            type: 'confirm',
            title: 'Delete Sermon?',
            message: 'Are you sure you want to delete this sermon? This action cannot be undone.',
            onConfirm: () => confirmDelete(id)
        });
    };

    const confirmDelete = async (id) => {
        try {
            await deleteSermon(id);
            setModalConfig({
                isOpen: true,
                type: 'success',
                title: 'Deleted',
                message: 'The sermon has been successfully deleted.',
            });
        } catch (error) {
            setModalConfig({
                isOpen: true,
                type: 'error',
                title: 'Error',
                message: 'Failed to delete the sermon. Please try again.',
            });
        }
    };

    const handleFormSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            if (editingSermon) {
                await updateSermon({ ...editingSermon, ...data });
                setModalConfig({
                    isOpen: true,
                    type: 'success',
                    title: 'Sermon Updated',
                    message: 'The sermon details have been updated successfully.',
                });
            } else {
                await addSermon(data);
                setModalConfig({
                    isOpen: true,
                    type: 'success',
                    title: 'Sermon Published',
                    message: 'Your new sermon is now live on the website.',
                });
            }
            setShowForm(false);
            setEditingSermon(null);
        } catch (error) {
            setModalConfig({
                isOpen: true,
                type: 'error',
                title: 'Operation Failed',
                message: 'Something went wrong. Please try again later.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingSermon(null);
    };

    return (
        <div>
            <StatusModal
                {...modalConfig}
                onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
            />

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
                        onDelete={handleDeleteRequest}
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
                        isSubmitting={isSubmitting}
                    />
                </div>
            )}
        </div>
    );
};

export default SermonManager;
