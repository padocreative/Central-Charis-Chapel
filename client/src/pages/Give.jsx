import { motion } from 'framer-motion';
import { CreditCard, Phone, Heart, ShieldCheck, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import PublicLayout from '../layouts/PublicLayout';

const Give = () => {
    const [copiedId, setCopiedId] = useState(null);

    const handleCopy = (text, id) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const BankCard = ({ bank, accountName, accountNumber, id }) => (
        <div className="bg-white p-8 rounded-2xl shadow-premium border border-gray-100 flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <CreditCard size={100} />
            </div>
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
                <CreditCard size={32} />
            </div>
            <h3 className="text-xl font-bold font-heading text-primary mb-2">{bank}</h3>
            <p className="text-gray-500 text-sm mb-4 uppercase tracking-wider">{accountName}</p>
            <div className="bg-gray-50 px-6 py-3 rounded-xl flex items-center space-x-3 border border-gray-100 mb-4 w-full justify-center">
                <span className="font-mono font-bold text-lg tracking-wider">{accountNumber}</span>
                <button
                    onClick={() => handleCopy(accountNumber, id)}
                    className="text-gray-400 hover:text-primary transition-colors"
                    title="Copy Account Number"
                >
                    {copiedId === id ? <CheckCircle size={18} className="text-green-500" /> : <Copy size={18} />}
                </button>
            </div>
            <p className="text-xs text-gray-400">Direct Bank Transfer</p>
        </div>
    );

    const MomoCard = ({ provider, accountName, phoneNumber, id }) => (
        <div className="bg-white p-8 rounded-2xl shadow-premium border border-gray-100 flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Phone size={100} />
            </div>
            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center text-gold mb-6">
                <Phone size={32} />
            </div>
            <h3 className="text-xl font-bold font-heading text-gold mb-2">{provider}</h3>
            <p className="text-gray-500 text-sm mb-4 uppercase tracking-wider">{accountName}</p>
            <div className="bg-gray-50 px-6 py-3 rounded-xl flex items-center space-x-3 border border-gray-100 mb-4 w-full justify-center">
                <span className="font-mono font-bold text-lg tracking-wider">{phoneNumber}</span>
                <button
                    onClick={() => handleCopy(phoneNumber, id)}
                    className="text-gray-400 hover:text-gold transition-colors"
                    title="Copy Phone Number"
                >
                    {copiedId === id ? <CheckCircle size={18} className="text-green-500" /> : <Copy size={18} />}
                </button>
            </div>
            <p className="text-xs text-gray-400">Mobile Money Payment</p>
        </div>
    );

    const GivingCategory = ({ title, description, icon: Icon, delay }) => (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay }}
            className="flex flex-col p-6 h-full bg-surface-alt rounded-2xl border border-gray-100 hover:shadow-lg transition-all"
        >
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-5">
                <Icon size={24} />
            </div>
            <h4 className="text-lg font-bold font-heading text-gray-900 mb-3">{title}</h4>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
        </motion.div>
    );

    return (
        <PublicLayout>
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 bg-primary-dark overflow-hidden text-white">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-primary/30 to-transparent"></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <Heart className="mx-auto text-gold mb-6" size={60} />
                        <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 text-white">Generous Giving</h1>
                        <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200 font-light italic opacity-90">
                            "Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver."
                            <span className="block mt-2 font-bold not-italic text-gold">— 2 Corinthians 9:7</span>
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Giving Options */}
            <section className="py-24 bg-white relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 px-4">
                        <span className="text-gold font-bold uppercase tracking-widest text-sm mb-4 block">How to Give</span>
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-6 px-1 lg:px-0">Support the Ministry</h2>
                        <p className="max-w-2xl mx-auto text-gray-600">
                            Your faithful giving enables us to reach the world with the gospel and support our local community. Choose the most convenient way to give.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <BankCard
                                bank="Zenith Bank"
                                accountName="Deliverance Bethel Min. Int."
                                accountNumber="6012701670"
                                id="bank-acc"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <MomoCard
                                provider="MTN MoMo"
                                accountName="Charis TV"
                                phoneNumber="0559235426"
                                id="momo-acc"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Giving Categories */}
            <section className="py-24 bg-surface-alt">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-16">
                        <div className="mb-8 md:mb-0 text-center md:text-left">
                            <h2 className="text-3xl font-heading font-bold text-gray-900">Giving Categories</h2>
                            <p className="text-gray-600 mt-2">Designate your contribution to specific needs</p>
                        </div>
                        <div className="flex items-center space-x-2 text-primary font-bold bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100">
                            <ShieldCheck size={20} />
                            <span>Secure Transactions</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <GivingCategory
                            title="Tithes & Offerings"
                            description="The foundation of our ministry operations and services, allowing us to maintain the house of God and support daily activities."
                            icon={Heart}
                            delay={0.1}
                        />
                        <GivingCategory
                            title="First Fruit"
                            description="Honoring God with the first of our increase as a sign of dedication and trust in His provision for the entire season."
                            icon={Heart}
                            delay={0.2}
                        />
                        <GivingCategory
                            title="Seed Sowing"
                            description="Faith-based contributions towards specific breakthroughs, expectations, and personal spiritual milestones."
                            icon={Heart}
                            delay={0.3}
                        />
                        <GivingCategory
                            title="Building Fund"
                            description="Contributing towards the expansion, renovation, and maintenance of our physical sanctuary and community facilities."
                            icon={ShieldCheck}
                            delay={0.4}
                        />
                        <GivingCategory
                            title="Missions & Welfare"
                            description="Extending God's love to the needy, supporting rural evangelism, and providing for the less privileged in our community."
                            icon={Heart}
                            delay={0.5}
                        />
                        <GivingCategory
                            title="Media & Broadcast"
                            description="Supporting the expansion of Charis TV and digital platforms to reach millions with the gospel globally."
                            icon={Phone}
                            delay={0.6}
                        />
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-primary-dark text-white relative overflow-hidden">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-heading font-bold mb-6">Partnership for the Gospel</h2>
                    <p className="max-w-xl mx-auto text-gray-300 mb-10 leading-relaxed">
                        May God multiply your seed sown and increase the fruits of your righteousness. Your partnership makes an eternal difference.
                    </p>
                    <div className="w-20 h-1 bg-gold mx-auto mb-10"></div>
                    <p className="text-sm text-gray-400 uppercase tracking-[0.3em]">Central Charis Chapel © {new Date().getFullYear()}</p>
                </div>
            </section>
        </PublicLayout>
    );
};

export default Give;
