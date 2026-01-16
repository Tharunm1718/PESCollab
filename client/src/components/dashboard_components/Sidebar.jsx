import React from 'react';
import Logo from './assets/pescolleb_logo.jpeg';
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { Network , Settings } from 'lucide-react';

const NavIcon = ({ title, children, onClick, isActive }) => (
  <div className={`nav-icon ${isActive ? 'active' : ''}`} title={title} onClick={onClick}>
    {children}
  </div>
);
function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handlelogout = async () => {
    await fetch("http://localhost:3000/logout", {
      method: "POST",
      credentials: "include"
    });
    navigate('/');
  };

  return (
    <div className="left-section">
      <aside className="sidebar">

        <div className="sidebar-logo-container">
          <img className="logo" src={Logo} alt="Logo" />
        </div>


        <div className="sidebar-rails-container">
 
          <div className="glass-card sidebar-rail">
            <NavIcon title="Home" onClick={() => navigate('/dashboard')} isActive={location.pathname === '/dashboard'}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </NavIcon>
            <NavIcon title="Projects" onClick={() => navigate('/yourprojects')} isActive={location.pathname.startsWith('/yourprojects') || location.pathname === '/uploadproject'}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2"></path></svg>
            </NavIcon>
            <NavIcon title="Teams" onClick={() => navigate('/teammates')} isActive={location.pathname === '/teammates'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            </NavIcon>
            <NavIcon title="Messages">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </NavIcon>
            <NavIcon title="Community" onClick={() => navigate('/community')} isActive={location.pathname === '/community' || location.pathname.startsWith('/profileview') || location.pathname.startsWith('/projects') || location.pathname.startsWith('/contribute')}>
              <Network size={32} />
            </NavIcon>
          </div>

          {/* Lower rail */}
          <div className="glass-card sidebar-rail">
            <NavIcon title="Logout" onClick={handlelogout}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            </NavIcon>
            <NavIcon title="Settings" onClick={() => navigate('/settings')} isActive={location.pathname.startsWith('/settings') || location.pathname.startsWith('/editprofile')}>
                <Settings size={32} />
            </NavIcon>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;