import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from '../components/ui/LanguageSwitcher';

// --- Reusable SVG Icons (defined outside component to avoid re-creation) ---

const MenuIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
);

const UserGroupIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
);

const BuildingOfficeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-4h1m-1 4h1m-1-4h1m-1 4h1" /></svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L10 16l-4 4-4-4 5.293-5.293a1 1 0 011.414 0L13 14m3-3l2.293 2.293a1 1 0 010 1.414L13 19l-4 4-4-4 5.293-5.293a1 1 0 011.414 0L15 17" /></svg>
);


// --- Landing Page Components (defined outside main component) ---

const Navbar: React.FC = () => {
    const { t } = useLanguage();
    const [isSticky, setIsSticky] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: t('landing.nav.home'), href: '#home' },
        { name: t('landing.nav.about'), href: '#about' },
        { name: t('landing.nav.features'), href: '#features' },
        { name: t('landing.nav.contact'), href: '#contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSticky ? 'bg-background shadow-md py-3' : 'bg-transparent py-5'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <div className="text-2xl font-bold text-primary-600">{t('landing.title')}</div>
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map(link => <a key={link.name} href={link.href} className="text-muted-foreground hover:text-primary-600 font-medium transition-colors">{link.name}</a>)}
                    <LanguageSwitcher />
                    <Link to="/login"><Button size="sm">{t('landing.nav.loginRegister')}</Button></Link>
                </div>
                <div className="md:hidden flex items-center gap-2">
                    <LanguageSwitcher />
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}><MenuIcon /></button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-background mt-2 py-4 px-6">
                     {navLinks.map(link => <a key={link.name} href={link.href} className="block py-2 text-muted-foreground hover:text-primary-600">{link.name}</a>)}
                    <Link to="/login" className="block mt-2"><Button className="w-full">{t('landing.nav.loginRegister')}</Button></Link>
                </div>
            )}
        </nav>
    );
};

const HeroSection: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section id="home" className="min-h-screen flex items-center bg-primary-50 dark:bg-primary-900/20 pt-20">
            <div className="container mx-auto px-6 text-center">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-6 animate-fade-in-up">
                        {t('landing.hero.titlePart1')} <span className="text-primary-600">{t('landing.hero.titlePart2')}</span> {t('landing.hero.titlePart3')}
                    </h1>
                    <p className="text-lg text-muted-foreground mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                        {t('landing.hero.subtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                        <Link to="/login?role=student"><Button size="lg" className="w-full sm:w-auto">{t('landing.hero.forStudents')}</Button></Link>
                        <Link to="/login?role=company"><Button size="lg" variant="secondary" className="w-full sm:w-auto">{t('landing.hero.forCompanies')}</Button></Link>
                        <Link to="/login?role=admin"><Button size="lg" variant="ghost" className="w-full sm:w-auto">{t('landing.hero.adminLogin')}</Button></Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

const AboutSection: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section id="about" className="py-20 bg-background">
            <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <img src="https://picsum.photos/seed/about/600/400" alt={t('landing.about.imageAlt')} className="rounded-lg shadow-xl"/>
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-foreground mb-4">{t('landing.about.title')}</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        {t('landing.about.description')}
                    </p>
                </div>
            </div>
        </section>
    );
};

const HowItWorksSection: React.FC = () => {
    const { t } = useLanguage();
    const steps = [
        { icon: <UserGroupIcon />, title: t('landing.howItWorks.step1Title'), description: t('landing.howItWorks.step1Desc') },
        { icon: <BuildingOfficeIcon />, title: t('landing.howItWorks.step2Title'), description: t('landing.howItWorks.step2Desc') },
        { icon: <SparklesIcon />, title: t('landing.howItWorks.step3Title'), description: t('landing.howItWorks.step3Desc') },
    ];
    return (
        <section id="how-it-works" className="py-20 bg-muted">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-foreground mb-12">{t('landing.howItWorks.title')}</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="bg-card p-8 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-2 transition-transform duration-300">
                            {step.icon}
                            <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FeaturesSection: React.FC = () => {
    const { t } = useLanguage();
    const features = [
        { name: t('landing.features.f1Name'), description: t('landing.features.f1Desc') },
        { name: t('landing.features.f2Name'), description: t('landing.features.f2Desc') },
        { name: t('landing.features.f3Name'), description: t('landing.features.f3Desc') },
        { name: t('landing.features.f4Name'), description: t('landing.features.f4Desc') },
        { name: t('landing.features.f5Name'), description: t('landing.features.f5Desc') },
        { name: t('landing.features.f6Name'), description: t('landing.features.f6Desc') },
    ];
    return (
        <section id="features" className="py-20 bg-background">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-foreground mb-12 text-center">{t('landing.features.title')}</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="p-6 border border-border rounded-lg bg-muted">
                            <h3 className="text-lg font-semibold text-primary-600 mb-2">{feature.name}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Footer: React.FC = () => {
    const { t } = useLanguage();
    return (
        <footer id="contact" className="bg-slate-800 text-white py-12">
            <div className="container mx-auto px-6 text-center">
                <h3 className="text-2xl font-bold mb-4">{t('landing.footer.title')}</h3>
                <p className="text-slate-400 mb-6">
                    {t('landing.footer.supportText')} <a href="mailto:support@pminternship.gov" className="text-primary-400 hover:underline">support@pminternship.gov</a>
                </p>
                <div className="text-sm text-slate-500">
                    &copy; {new Date().getFullYear()} {t('landing.footer.copyright')}
                </div>
            </div>
        </footer>
    );
};


const LandingPage: React.FC = () => {
    return (
        <div className="font-sans">
            <Navbar />
            <main>
                <HeroSection />
                <AboutSection />
                <HowItWorksSection />
                <FeaturesSection />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;