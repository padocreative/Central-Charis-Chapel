import { motion } from 'framer-motion';
import PublicLayout from '../layouts/PublicLayout';
import { CheckCircle2, Heart, Users, Globe, Zap, Building } from 'lucide-react';

const About = () => {
    const beliefs = [
        {
            id: 1,
            text: "Scripture or the sacred writings in God's word, the Holy Bible, being divine, infallible, supreme and authoritative on the premise of 2 Timothy 3."
        },
        {
            id: 2,
            text: "The concept of the TRINITY - the One True God existing as GOD the FATHER, GOD the SON and GOD the HOLY SPIRIT as noted in the Gospels of John 15:26 and Matthew 28:19."
        },
        {
            id: 3,
            text: "The fall and depraved nature of mankind, necessitating repentance, redemption and regeneration through the Blood of Jesus Christ. Justification, sanctification and adoption on the premise of Romans 3:23, Hebrews 9:13-14 and Ephesians 1:7."
        },
        {
            id: 4,
            text: "Salvation by faith in the Word and by the Grace of God premised on Ephesians 2:8-9 and Acts 16:31."
        },
        {
            id: 5,
            text: "The Ordinances of the Ministry, which are: Water Baptism by Immersion, Holy Communion, Christian Marriage, Child Dedication."
        },
        {
            id: 6,
            text: "Holy Spirit baptism, with speaking in tongues as the initial evidence as shown in Acts 2:4, Acts 10:44-48, Acts 19:1-6 and Acts 8:14-17."
        },
        {
            id: 7,
            text: "The Church universal- both visible and invisible."
        },
        {
            id: 8,
            text: "Divine healing through the precious atonement of Christ Jesus shown in the book of the Prophet Isaiah 53:5."
        },
        {
            id: 9,
            text: "The Second Coming of Our Lord Jesus Christ to judge the living and the dead."
        },
        {
            id: 10,
            text: "The resurrection of the saved in resurrected bodies, and the resurrection of the unsaved to condemnation."
        }
    ];

    const visionPoints = [
        { title: "Soulwinning", icon: Heart, description: "Reaching the lost with the Gospel of Jesus Christ." },
        { title: "Church Planting", icon: Users, description: "Establishing vibrant communities of faith everywhere." },
        { title: "Deliverance", icon: Zap, description: "From the works of the devil and setting captions free." },
        { title: "Dominion", icon: Globe, description: "Walking in power over the powers of darkness." },
        { title: "Outreach", icon: Heart, description: "Helping the poor and needy through sound doctrine and humanitarian acts." },
        { title: "Institution Building", icon: Building, description: "Building institutions to benefit society in general." }
    ];

    return (
        <PublicLayout>
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-black">
                <div className="absolute inset-0 z-0 opacity-50">
                    <img
                        src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop"
                        alt="Worship Background"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/40 to-transparent" />
                </div>

                <div className="relative z-10 text-center container mx-auto px-6">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="inline-block py-1 px-4 border border-gold/50 rounded-full text-gold text-sm font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm"
                    >
                        Who We Are
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6"
                    >
                        Faith & <span className="text-gold">Vision</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        The foundations of our belief and the divine assignment committed to our trust.
                    </motion.p>
                </div>
            </section>

            {/* Vision Section */}
            <section className="py-20 md:py-28 bg-surface-alt">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-4">Vision of the Church</h2>
                        <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {visionPoints.map((point, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-8 rounded-2xl shadow-premium hover:shadow-2xl transition-all duration-300 group border border-transparent hover:border-gold/20"
                            >
                                <div className="w-14 h-14 bg-primary-light/10 text-primary-dark rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary-dark group-hover:text-gold transition-colors duration-300">
                                    <point.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-primary-dark mb-3 uppercase tracking-wide">{point.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {point.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Article 19 - Faith & Beliefs */}
            <section className="py-20 md:py-28 bg-white relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-1/3 h-full bg-surface-alt/50 skew-x-12 translate-x-1/2 z-0"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="text-gold font-bold uppercase tracking-widest text-sm mb-2 block">Article 19</span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-dark mb-6">Basis of Faith and Belief</h2>
                            <p className="text-gray-600">The tenets of the faith and belief of the Ministry are founded on:</p>
                        </div>

                        <div className="space-y-6">
                            {beliefs.map((belief, index) => (
                                <motion.div
                                    key={belief.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    className="flex gap-6 p-6 rounded-xl hover:bg-surface-alt transition-colors duration-300 border-l-4 border-transparent hover:border-gold"
                                >
                                    <div className="flex-shrink-0 mt-1">
                                        <div className="w-10 h-10 rounded-full bg-primary-dark text-gold flex items-center justify-center font-heading font-bold shadow-lg">
                                            {belief.id}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-gray-800 text-lg leading-relaxed">
                                            {belief.text}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
};

export default About;
