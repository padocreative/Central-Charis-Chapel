/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#0f4c81", // Deep Royal Blue
                    light: "#1e5c9a",
                    dark: "#0a355c",
                },
                gold: {
                    DEFAULT: "#D4AF37", // Metallic Gold
                    light: "#F4CF57",
                    dark: "#AA8C2C",
                },
                surface: {
                    DEFAULT: "#ffffff",
                    alt: "#f8fafc",
                    dark: "#0f172a",
                }
            },
            fontFamily: {
                heading: ["Playfair Display", "serif"], // Elegant Serif for headings
                body: ["Poppins", "sans-serif"],        // Modern Sans for body
            },
            backgroundImage: {
                'hero-pattern': "url('https://images.unsplash.com/photo-1543791959-12b3f543281a?q=80&w=2070&auto=format&fit=crop')", // High quality church/abstract bg
            },
            boxShadow: {
                'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                'premium': '0 20px 40px -15px rgba(0, 0, 0, 0.15)',
            }
        },
    },
    plugins: [],
}
