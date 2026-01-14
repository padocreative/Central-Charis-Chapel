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
    const [sermons, setSermons] = useState(MOCK_SERMONS);
    const [loading, setLoading] = useState(false); // Can be used when fetching from Supabase

    // Example function to add a sermon
    const addSermon = async (newSermon) => {
        // Determine if we are using Supabase or Mock
        if (supabase) {
            // Supabase logic here (Placeholder)
            // const { data, error } = await supabase.from('sermons').insert([newSermon]);
        } else {
            // Mock logic
            setSermons([{ ...newSermon, id: Date.now() }, ...sermons]);
        }
    };

    return (
        <SermonContext.Provider value={{ sermons, addSermon, loading }}>
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
