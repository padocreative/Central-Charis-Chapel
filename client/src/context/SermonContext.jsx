import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const SermonContext = createContext();

// Mock Data for initial dev phase (same as in Home.jsx, moved here)
const MOCK_SERMONS = [
    {
        id: 1,
        title: "Walking in Divine Purpose",
        preacher: "Rev. Elorm Oscar",
        date: "Jan 12, 2025",
        thumbnail: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&q=80&w=800",
        url: "https://www.youtube.com/watch?v=ysz5S6P_bsU",
        type: "Sunday Service"
    },
    {
        id: 2,
        title: "The Power of Persistent Prayer",
        preacher: "Rev. Elorm Oscar",
        date: "Jan 05, 2025",
        thumbnail: "https://images.unsplash.com/photo-1510936111840-65e151ad71bb?auto=format&fit=crop&q=80&w=800",
        url: "https://www.youtube.com/watch?v=ysz5S6P_bsU",
        type: "Mid-week"
    },
    {
        id: 3,
        title: "Grace for the Race",
        preacher: "Guest Minister",
        date: "Dec 31, 2024",
        thumbnail: "https://images.unsplash.com/photo-1507692049790-de58293a4697?auto=format&fit=crop&q=80&w=800",
        url: "https://www.youtube.com/watch?v=ysz5S6P_bsU",
        type: "Crossover"
    },
];

export const SermonProvider = ({ children }) => {
    const [sermons, setSermons] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSermons = async () => {
        if (!supabase) return;

        try {
            const { data, error } = await supabase
                .from('sermons')
                .select('*')
                .order('date', { ascending: false });

            if (error) throw error;
            setSermons(data || []);
        } catch (error) {
            console.error('Error fetching sermons:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Initial Fetch
        fetchSermons();

        if (!supabase) return;

        // Real-time Subscription
        const subscription = supabase
            .channel('sermons_channel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'sermons' }, (payload) => {
                // For simplicity and consistency, re-fetch on any change. 
                // Alternatively, we could append/filter the local state based on payload.eventType
                fetchSermons();
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const addSermon = async (newSermon) => {
        if (!supabase) {
            alert("Supabase client not initialized. Check your environment variables.");
            return;
        }

        const { error } = await supabase.from('sermons').insert([newSermon]);
        if (error) {
            console.error("Error adding sermon:", error);
            throw error;
        }
    };

    const deleteSermon = async (id) => {
        if (!supabase) return;

        const { error } = await supabase.from('sermons').delete().eq('id', id);
        if (error) {
            console.error("Error deleting sermon:", error);
            throw error;
        }
    };

    const updateSermon = async (updatedSermon) => {
        if (!supabase) return;

        const { id, ...updates } = updatedSermon;
        const { error } = await supabase.from('sermons').update(updates).eq('id', id);
        if (error) {
            console.error("Error updating sermon:", error);
            throw error;
        }
    };

    return (
        <SermonContext.Provider value={{ sermons, addSermon, deleteSermon, updateSermon, loading }}>
            {children}
        </SermonContext.Provider>
    );
};

export const useSermons = () => {
    const context = useContext(SermonContext);
    if (!context) {
        throw new Error('useSermons must be used within a SermonProvider');
    }
    return context;
};
