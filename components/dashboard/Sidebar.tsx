import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { getStudentNavLinks, getCompanyNavLinks, getAdminNavLinks } from '../../constants';
import { UserRole } from '../../types';

interface SidebarProps {
  userRole: UserRole;
}

const Logo: React.FC = () => {
    const { t } = useLanguage();
    return (
        <div className="flex items-center text-primary-600 text-2xl font-bold">
            <svg className="w-8 h-8 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3M5.636 5.636l-1.414-1.414m15.556 15.556l-1.414-1.414M18.364 5.636l1.414-1.414M4.222 19.778l1.414-1.414M12 12a3 3 0 100-6 3 3 0 000 6z"></path></svg>
            <span>{t('sidebar.logo')}</span>
        </div>
    );
};


const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const { t } = useLanguage();

  const getNavLinks = () => {
    switch (userRole) {
      case UserRole.Student:
        return getStudentNavLinks(t);
      case UserRole.Company:
        return getCompanyNavLinks(t);
      case UserRole.Admin:
        return getAdminNavLinks(t);
      default:
        return [];
    }
  };
  const navLinks = getNavLinks();

  return (
    <aside className="w-64 bg-card text-card-foreground flex flex-col min-h-screen border-r border-border">
        <div className="p-6 border-b border-border">
            <Link to={`/${userRole}`}>
                <Logo/>
            </Link>
        </div>
      <nav className="flex-1 px-4 py-4">
        <ul>
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2.5 my-1 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-700 font-semibold'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4 border-t border-border">
         <p className="text-xs text-muted-foreground">{t('sidebar.footer')}</p>
      </div>
    </aside>
  );
};

export default Sidebar;