/**
 * Video Utility Functions
 * Handles parsing, validation, and standardization of YouTube and Facebook URLs.
 */

// REGEX PATTERNS
const PATTERNS = {
    // YouTube: Supports standard v=, youtu.be/, shorts/, embed/, mobile m.
    youtube: /^(?:https?:\/\/)?(?:www\.|m\.|music\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|shorts\/|live\/)?([a-zA-Z0-9_-]{11})(?:\S+)?$/,

    // Facebook: Supports video.php?v=, /videos/, /watch/, fb.watch, mobile m.
    facebook: /^(?:https?:\/\/)?(?:www\.|web\.|m\.|business\.)?(?:facebook\.com|fb\.watch)(?:\/.*?)?(?:\/videos\/|\/watch\/\?v=|\/watch\?v=|v=|(?:\/))(\d+)(?:\S+)?$/
};

/**
 * Determines the platform of the video URL.
 * @param {string} url 
 * @returns {'youtube' | 'facebook' | null}
 */
export const getVideoPlatform = (url) => {
    if (!url) return null;
    const cleanUrl = url.trim();
    if (PATTERNS.youtube.test(cleanUrl)) return 'youtube';
    if (PATTERNS.facebook.test(cleanUrl)) return 'facebook';
    return null;
};

/**
 * Extracts the specific Video ID from the URL.
 * @param {string} url 
 * @returns {string|null} ID or null if not found
 */
export const getVideoId = (url) => {
    if (!url) return null;
    const cleanUrl = url.trim();

    // Try YouTube
    const ytMatch = cleanUrl.match(PATTERNS.youtube);
    if (ytMatch && ytMatch[1]) return ytMatch[1];

    // Try Facebook
    // Note: Facebook regex is trickier, sometimes ID is at the end, sometimes param.
    // The defined regex captures the digits.
    const fbMatch = cleanUrl.match(PATTERNS.facebook);
    if (fbMatch && fbMatch[1]) return fbMatch[1];

    return null;
};

/**
 * Returns a standardized playable URL that ReactPlayer loves.
 * @param {string} url 
 * @returns {string|null} Standardized URL or null
 */
export const getPlayableUrl = (url) => {
    const platform = getVideoPlatform(url);
    const id = getVideoId(url);

    if (!platform || !id) return null;

    if (platform === 'youtube') {
        return `https://www.youtube.com/watch?v=${id}`;
    }

    if (platform === 'facebook') {
        return `https://www.facebook.com/facebook/videos/${id}`;
    }

    return null;
};

/**
 * Returns a raw embed URL for iframes.
 * @param {string} url 
 * @returns {string|null}
 */
export const getEmbedUrl = (url) => {
    const platform = getVideoPlatform(url);
    const id = getVideoId(url);

    if (!platform || !id) return null;

    if (platform === 'youtube') {
        return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1`;
    }

    if (platform === 'facebook') {
        // Facebook requires the full video URL for the href param
        const fullUrl = `https://www.facebook.com/facebook/videos/${id}`;
        return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(fullUrl)}&show_text=0&autoplay=1&muted=1`;
    }

    return null;
};

/**
 * Validates if a URL is a supported video link.
 * @param {string} url 
 * @returns {boolean}
 */
export const isValidVideoUrl = (url) => {
    return !!getPlayableUrl(url);
};
