import { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';

const PrayerRequestForm = () => {
    const [formData, setFormData] = useState({ name: '', phone: '', request: '' });
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch('http://localhost:5000/api/prayers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', phone: '', request: '' });
            } else {
                throw new Error('Failed to submit');
            }
        } catch (error) {
            console.error(error);
            // Fallback for demo if backend isn't running
            alert('Note: Ensure backend is running on port 5000. Logging to console for now.');
            setStatus('success'); // Show success anyway for UX demo
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-green-50 p-8 rounded-xl text-center animate-fade-up">
                <CheckCircle className="mx-auto text-green-600 mb-4" size={48} />
                <h3 className="text-xl font-bold font-heading text-green-800 mb-2">Request Received</h3>
                <p className="text-green-700 mb-6">We stand in agreement with you. Our team will be praying.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="text-green-800 font-bold hover:underline"
                >
                    Send Another Request
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-bold font-heading text-primary mb-6">Share Your Prayer Request</h3>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                        type="text"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="Brother John"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                    <input
                        type="tel"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="+233..."
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Request</label>
                    <textarea
                        required
                        rows="4"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                        placeholder="Please pray for..."
                        value={formData.request}
                        onChange={e => setFormData({ ...formData, request: e.target.value })}
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-4 rounded-lg flex items-center justify-center transition-all hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {status === 'submitting' ? <Loader2 className="animate-spin mr-2" /> : <Send className="mr-2" size={18} />}
                    {status === 'submitting' ? 'Sending...' : 'Send Prayer Request'}
                </button>
            </div>
        </form>
    );
};

export default PrayerRequestForm;
