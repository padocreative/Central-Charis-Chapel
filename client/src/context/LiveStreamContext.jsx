import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const LiveStreamContext = createContext();

export const LiveStreamProvider = ({ children }) => {
    const [isLive, setIsLive] = useState(false);
    const [liveUrl, setLiveUrl] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchLiveStatus = async () => {
        if (!supabase) {
            setLoading(false);
            return;
        }

        try {
            // Fetch the FIRST row from 'live_stream' table. 
            // We assume there's only one row that controls the global state.
            const { data, error } = await supabase
                .from('live_stream')
                .select('*')
                .limit(1)
                .single();

            if (data) {
                setIsLive(data.is_live);
                setLiveUrl(data.live_url);
            } else if (error && error.code !== 'PGRST116') {
                // PGRST116 is "The result contains 0 rows", which is fine, we just default to false
                console.error('Error fetching live stream status:', error);
            }
        } catch (error) {
            console.error('Unexpected error fetching live status:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLiveStatus();

        if (!supabase) return;

        // Real-time Subscription
        const subscription = supabase
            .channel('live_stream_channel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'live_stream' }, (payload) => {
                // Determine if it was an INSERT, UPDATE, or DELETE and update state accordingly
                // But generally, we can just use the new payload data if it matches our "single row" assumption
                // For simplicity, let's just re-fetch or use payload.new
                if (payload.new) {
                    setIsLive(payload.new.is_live);
                    setLiveUrl(payload.new.live_url);
                }
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const updateLiveStatus = async (newIsLive, newUrl) => {
        if (!supabase) {
            // Fallback for local testing if no Supabase
            setIsLive(newIsLive);
            setLiveUrl(newUrl);
            return;
        }

        try {
            // Upsert: Try to update value where id=1, or insert if not exists
            // Assuming we use a fixed ID like 1 for the global configuration
            const { data, error } = await supabase
                .from('live_stream')
                .upsert({ id: 1, is_live: newIsLive, live_url: newUrl })
                .select();

            if (error) throw error;

            // State update will happen automatically via subscription, 
            // but we can optimistic update here too if we want faster feedback
            setIsLive(newIsLive);
            setLiveUrl(newUrl);

        } catch (error) {
            console.error("Error updating live stream:", error);
            throw error;
        }
    };

    return (
        <LiveStreamContext.Provider value={{ isLive, liveUrl, updateLiveStatus, loading }}>
            {children}
        </LiveStreamContext.Provider>
    );
};

export const useLiveStream = () => {
    const context = useContext(LiveStreamContext);
    if (!context) {
        throw new Error('useLiveStream must be used within a LiveStreamProvider');
    }
    return context;
};
