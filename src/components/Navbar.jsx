import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import servicesData from '../data/servicesData';
import Icon from './Icon';
import logo from '../assests/logo-mark-light.png';


export default function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);

  function handleLogout() {
    logout();
    navigate('/');
  }

  const navClass = ({ isActive }) => (isActive ? 'active' : '');

  return (
    <header className="navbar">
      <div className="wrap navbar-inner">
      <Link to="/" className="brand" aria-label="SKD Finance, home">
  <img src={logo} alt="SKD Finance" className="brand-logo" width="90" height="44" /> 
    <span className="brand-word">Finance</span>

</Link>
        <nav className="navlinks">
          <NavLink to="/" end className={navClass}>Home</NavLink>
          <NavLink to="/about" className={navClass}>About</NavLink>
          <div className="nav-flyout">
            <NavLink to="/services" className={navClass}>
              Services <Icon name="chevronDown" size={14} />
            </NavLink>
            <div className="nav-mega">
              <div className="nav-mega-inner">
                {servicesData.map((s) => (
                  <Link key={s.slug} to={`/services/${s.slug}`} className="nav-mega-item">
                    <span className="nav-mega-icon"><Icon name={s.icon} size={18} /></span>
                    <span>
                      <strong>{s.name}</strong>
                      <em>{s.tagline}</em>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <NavLink to="/documents" className={navClass}>Documents Required</NavLink>
          <NavLink to="/contact" className={navClass}>Contact</NavLink>
          <NavLink to="/emi-calculator" className={navClass}>EMI Calculator</NavLink>
        </nav>

        <div className="navbar-actions">
          {!isAuthenticated && (
            <>
              <Link to="/login" className="btn-ghost-sm">Log in</Link>
              <Link to="/register" className="btn-primary-sm pulse-cta">Sign up</Link>
            </>
          )}
          {isAuthenticated && !isAdmin && (
            <>
              <Link to="/dashboard" className="btn-ghost-sm">Hi, {user.fullName?.split(' ')[0]}</Link>
              <button className="btn-primary-sm" onClick={handleLogout}>Log out</button>
            </>
          )}
          {isAuthenticated && isAdmin && (
            <>
              <Link to="/admin" className="btn-ghost-sm">Admin Panel</Link>
              <button className="btn-primary-sm" onClick={handleLogout}>Log out</button>
            </>
          )}
          <button className="burger" onClick={() => setMobileOpen((v) => !v)} aria-label="Menu">
            <Icon name={mobileOpen ? 'check' : 'chevronDown'} size={18} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-panel">
          <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>
          <button type="button" className="mobile-sub-toggle" onClick={() => setMobileServices((v) => !v)}>
            Services <Icon name="chevronDown" size={16} />
          </button>
          {mobileServices && (
            <div className="mobile-sub">
              {servicesData.map((s) => (
                <Link key={s.slug} to={`/services/${s.slug}`} onClick={() => setMobileOpen(false)}>{s.name}</Link>
              ))}
            </div>
          )}
          <Link to="/documents" onClick={() => setMobileOpen(false)}>Documents Required</Link>
          <Link to="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
          <Link to="/emi-calculator" onClick={() => setMobileOpen(false)}>EMI Calculator</Link>
        </div>
      )}
    </header>
  );
}
