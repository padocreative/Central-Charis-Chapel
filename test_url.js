
const PATTERNS = {
    youtube: /^(?:https?:\/\/)?(?:www\.|m\.|music\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|shorts\/|live\/)?([a-zA-Z0-9_-]{11})(?:\S+)?$/,
    facebook: /^(?:https?:\/\/)?(?:www\.|web\.|m\.|business\.)?(?:facebook\.com|fb\.watch)(?:\/.*?)?(?:\/videos\/|\/watch\/\?v=|\/watch\?v=|v=|(?:\/))(\d+)(?:\S+)?$/
};

const getVideoId = (url) => {
    if (!url) return null;
    const cleanUrl = url.trim();
    const ytMatch = cleanUrl.match(PATTERNS.youtube);
    if (ytMatch && ytMatch[1]) return ytMatch[1];
    const fbMatch = cleanUrl.match(PATTERNS.facebook);
    if (fbMatch && fbMatch[1]) return fbMatch[1];
    return null;
};

const getPlayableUrl = (url) => {
    const id = getVideoId(url);
    if (!id) return null;
    if (PATTERNS.youtube.test(url)) return `https://www.youtube.com/watch?v=${id}`;
    return null;
};

const url = "https://www.youtube.com/watch?v=0NAmJsfZNpE";
const id = getVideoId(url);
const playable = getPlayableUrl(url);

console.log(`URL: ${url}`);
console.log(`Extracted ID: ${id}`);
console.log(`Playable URL: ${playable}`);
