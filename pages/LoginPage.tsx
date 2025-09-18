

import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Spinner from '../components/ui/Spinner';
import { UserRole } from '../types';
import Captcha from '../components/ui/Captcha';
import { useLanguage } from '../contexts/LanguageContext';

// --- SVG Icons ---
const StudentIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const CompanyIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m-1 4h1m5-4h1m-1 4h1m-1-4h1m-1 4h1" /></svg>;
const AdminIcon: React.FC = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const GoogleIcon: React.FC = () => <svg className="w-5 h-5 mr-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 76.2C322.3 121.4 286.7 96 248 96c-88.8 0-160.1 71.1-160.1 160.1s71.4 160.1 160.1 160.1c94.4 0 135.3-65.1 140.8-99.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>;
const LinkedInIcon: React.FC = () => <svg className="w-5 h-5 mr-2" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin-in" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg>;


// --- Password Strength Utility ---
const checkPasswordStrength = (password: string): number => {
    const checks = [
        password.length >= 8,
        /[a-z]/.test(password),
        /[A-Z]/.test(password),
        /\d/.test(password),
        /[^a-zA-Z\d]/.test(password),
    ];
    const score = checks.filter(Boolean).length;
    if (password.length === 0) return 0;
    if (password.length < 8 && score <= 3) return 1;
    if (score <= 2) return 1; // Weak
    if (score <= 3) return 2; // Medium
    if (score === 4) return 3; // Strong
    if (score === 5) return 4; // Very Strong
    return 1;
};

const PasswordStrengthMeter: React.FC<{ strength: number }> = ({ strength }) => {
    const { t } = useLanguage();
    const strengthLevels = [
        { label: t('login.strength.weak'), color: 'bg-red-500', textColor: 'text-red-500' },
        { label: t('login.strength.medium'), color: 'bg-yellow-500', textColor: 'text-yellow-500' },
        { label: t('login.strength.strong'), color: 'bg-green-500', textColor: 'text-green-500' },
        { label: t('login.strength.veryStrong'), color: 'bg-green-600', textColor: 'text-green-600' },
    ];

    if (strength === 0) return null;

    return (
        <div className="mt-2">
            <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className={`h-1.5 flex-1 rounded-full transition-colors ${index < strength ? strengthLevels[strength - 1].color : 'bg-slate-200 dark:bg-slate-700'}`}
                    ></div>
                ))}
            </div>
            <p className={`text-xs mt-1 text-right font-medium ${strengthLevels[strength - 1].textColor}`}>
                {strengthLevels[strength - 1].label}
            </p>
        </div>
    );
};


type FormType = 'login' | 'register';

const LoginForm: React.FC<{ role: UserRole; onAdminSuccess?: () => void }> = ({ role, onAdminSuccess }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === UserRole.Admin && !isCaptchaVerified) {
        alert(t('login.captchaAlert'));
        return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (role === UserRole.Admin && onAdminSuccess) {
          onAdminSuccess();
      } else {
          navigate(`/${role}`);
      }
    }, 1500); // Simulate network request
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <Input label={t('login.emailLabel')} id="email" type="email" placeholder="you@example.com" required />
      <Input label={t('login.passwordLabel')} id="password" type="password" placeholder="••••••••" required />
      {role === UserRole.Admin && <Captcha verified={isCaptchaVerified} onChange={setIsCaptchaVerified} />}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-input rounded" />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground">{t('login.rememberMe')}</label>
        </div>
        <a href="#" className="text-sm text-primary-600 hover:underline">{t('login.forgotPassword')}</a>
      </div>
      <Button type="submit" className="w-full" disabled={isLoading || (role === UserRole.Admin && !isCaptchaVerified)}>
        {isLoading ? <Spinner className="w-5 h-5"/> : t('login.signIn')}
      </Button>
    </form>
  );
};

const RegisterForm: React.FC<{ role: UserRole }> = ({ role }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const passwordStrength = checkPasswordStrength(password);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert(t('login.registerAlert'));
      navigate(`/${role}/profile`);
    }, 1500);
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      {role === UserRole.Student && <Input label={t('login.fullNameLabel')} id="name" type="text" placeholder="Aarav Sharma" required />}
      {role === UserRole.Company && <Input label={t('login.companyNameLabel')} id="company-name" type="text" placeholder="InnovateTech Solutions" required />}
      <Input label={t('login.emailLabel')} id="email" type="email" placeholder="you@example.com" required />
      <div>
        <Input label={t('login.passwordLabel')} id="password" type="password" placeholder={t('login.createPasswordPlaceholder')} required onChange={(e) => setPassword(e.target.value)} />
        <PasswordStrengthMeter strength={passwordStrength} />
      </div>
      <Input label={t('login.confirmPasswordLabel')} id="confirm-password" type="password" placeholder={t('login.confirmPasswordPlaceholder')} required />
      <Button type="submit" className="w-full" disabled={isLoading}>
         {isLoading ? <Spinner className="w-5 h-5"/> : t('login.createAccount')}
      </Button>
    </form>
  );
};

const TwoFactorAuthForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [lockoutTimer, setLockoutTimer] = useState(0);
    const MAX_ATTEMPTS = 3;
    const LOCKOUT_DURATION = 30; // in seconds

    useEffect(() => {
        let timer: number;
        if (isLocked && lockoutTimer > 0) {
            timer = window.setTimeout(() => setLockoutTimer(t => t - 1), 1000);
        } else if (isLocked && lockoutTimer === 0) {
            setIsLocked(false);
            setFailedAttempts(0);
            setError(null);
        }
        return () => window.clearTimeout(timer);
    }, [isLocked, lockoutTimer]);


    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLocked) return;

        setIsLoading(true);
        setError(null);
        setTimeout(() => {
            setIsLoading(false);
            if (code === '123456') { // Mock verification code
                navigate('/admin');
            } else {
                const newFailedAttempts = failedAttempts + 1;
                setFailedAttempts(newFailedAttempts);
                setCode('');

                if (newFailedAttempts >= MAX_ATTEMPTS) {
                    setError(t('login.2fa.lockoutError', { duration: LOCKOUT_DURATION }));
                    setIsLocked(true);
                    setLockoutTimer(LOCKOUT_DURATION);
                } else {
                    const attemptsLeft = MAX_ATTEMPTS - newFailedAttempts;
                    setError(t('login.2fa.invalidCodeError', { attemptsLeft }));
                }
            }
        }, 1000);
    };

    return (
        <form onSubmit={handleVerify} className="space-y-4 animate-fade-in-up">
            <Input 
                label={t('login.2fa.codeLabel')}
                id="2fa-code"
                type="text"
                placeholder={t('login.2fa.codePlaceholder')}
                value={code}
                onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
                error={error || undefined}
                maxLength={6}
                autoComplete="one-time-code"
                inputMode="numeric"
                required
                disabled={isLocked || isLoading}
            />
            <p className="text-sm text-muted-foreground !-mt-2 text-center">{t('login.2fa.prompt')}</p>
            <div className="pt-2 space-y-2">
                <Button type="submit" className="w-full" disabled={isLoading || isLocked}>
                    {isLoading ? <Spinner className="w-5 h-5"/> : (isLocked ? t('login.2fa.tryAgainIn', { timer: lockoutTimer }) : t('login.2fa.verify'))}
                </Button>
                <Button variant="ghost" type="button" className="w-full" onClick={onBack} disabled={isLoading || isLocked}>
                    {t('login.2fa.backToLogin')}
                </Button>
            </div>
        </form>
    );
};


const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const initialRole = (searchParams.get('role') as UserRole) || UserRole.Student;

  const [activeRole, setActiveRole] = useState<UserRole>(initialRole);
  const [formType, setFormType] = useState<FormType>('login');
  const [adminLoginStep, setAdminLoginStep] = useState<'credentials' | '2fa'>('credentials');

  const roleConfig = {
    student: { title: t('roles.student'), pronoun: t('pronouns.your') },
    company: { title: t('roles.company'), pronoun: t('pronouns.your') },
    admin: { title: t('roles.admin'), pronoun: t('pronouns.your') },
  };

  const roleButtons = [
    { role: UserRole.Student, label: t('roles.student'), icon: <StudentIcon /> },
    { role: UserRole.Company, label: t('roles.company'), icon: <CompanyIcon /> },
    { role: UserRole.Admin, label: t('roles.admin'), icon: <AdminIcon /> },
];
  
  const currentConfig = roleConfig[activeRole];

  const handleSocialLogin = () => {
    alert(t('login.socialLoginAlert', { role: activeRole }));
    navigate(`/${activeRole}`);
  };

  const renderForm = () => {
    if (activeRole === UserRole.Admin) {
        if (adminLoginStep === 'credentials') {
            return <LoginForm role={UserRole.Admin} onAdminSuccess={() => setAdminLoginStep('2fa')} />;
        }
        return <TwoFactorAuthForm onBack={() => setAdminLoginStep('credentials')} />;
    }
    if (formType === 'login') {
        return <LoginForm role={activeRole} />;
    }
    return <RegisterForm role={activeRole} />;
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 font-sans">
      {/* Left Visual Column */}
      <div className="relative hidden lg:flex flex-col items-center justify-center bg-cover bg-center p-12 text-white" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop')" }}>
        <div className="absolute inset-0 bg-primary-800 opacity-80"></div>
        <div className="relative z-10 text-center animate-fade-in-up">
            <Link to="/" className="text-4xl font-bold mb-4 block">{t('landing.title')}</Link>
            <h1 className="text-4xl font-bold leading-snug">
              {t('login.visual.title')}
            </h1>
            <p className="mt-4 text-lg text-primary-200 max-w-md mx-auto">
              {t('login.visual.subtitle')}
            </p>
        </div>
      </div>

      {/* Right Form Column */}
      <div className="flex flex-col items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md">
            {/* Mobile-only header */}
            <div className="lg:hidden text-center mb-8">
                <Link to="/" className="text-3xl font-bold text-primary-600">{t('landing.title')}</Link>
            </div>
          
            <div className="bg-card text-card-foreground p-6 sm:p-8 rounded-2xl shadow-lg animate-fade-in-up">
                <div className="p-1 bg-muted rounded-lg flex items-center gap-1 mb-6">
                    {roleButtons.map(({ role, label, icon }) => (
                        <button
                            key={role}
                            onClick={() => {
                                setActiveRole(role);
                                setAdminLoginStep('credentials'); // Reset admin flow if role changes
                            }}
                            className={`flex-1 py-2 px-3 rounded-md text-sm font-semibold flex items-center justify-center gap-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 ${
                                activeRole === role
                                    ? 'bg-card text-primary-600 shadow-sm'
                                    : 'text-muted-foreground hover:bg-accent'
                            }`}
                        >
                            {icon} {label}
                        </button>
                    ))}
                </div>

                <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-foreground">
                       {activeRole === UserRole.Admin && adminLoginStep === '2fa'
                            ? t('login.2fa.title')
                            : formType === 'login'
                                ? t('login.welcomeBack', { title: currentConfig.title })
                                : t('login.createYourAccount', { pronoun: currentConfig.pronoun, title: currentConfig.title })}
                    </h2>
                     {activeRole === UserRole.Admin && adminLoginStep === 'credentials' && (
                        <p className="text-sm text-muted-foreground mt-1">{t('login.adminSubtitle')}</p>
                     )}
                </div>
                
                {renderForm()}
                
                {activeRole !== UserRole.Admin && (
                    <>
                        <div className="my-6 flex items-center">
                            <div className="flex-grow border-t border-border"></div>
                            <span className="flex-shrink mx-4 text-muted-foreground text-sm">{t('login.continueWith')}</span>
                            <div className="flex-grow border-t border-border"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Button variant="secondary" onClick={handleSocialLogin}><GoogleIcon />Google</Button>
                            <Button variant="secondary" onClick={handleSocialLogin}><LinkedInIcon />LinkedIn</Button>
                        </div>

                        <p className="text-sm text-muted-foreground mt-6 text-center">
                            {formType === 'login' 
                                ? <>{t('login.noAccount')} <button onClick={() => setFormType('register')} className="font-semibold text-primary-600 hover:underline">{t('login.register')}</button></>
                                : <>{t('login.hasAccount')} <button onClick={() => setFormType('login')} className="font-semibold text-primary-600 hover:underline">{t('login.signIn')}</button></>
                            }
                        </p>
                    </>
                )}
                 {activeRole === UserRole.Admin && adminLoginStep === 'credentials' && (
                    <p className="text-xs text-muted-foreground mt-6 text-center">
                        {t('login.adminDisclaimer')}
                    </p>
                 )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;