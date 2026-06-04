import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Menu, X, Globe, UserCircle, LogOut } from 'lucide-react';
import { useProfile } from '../contexts/ProfileContext';
import { ContactDialog } from './ContactDialog';
import { WaitlistDialog } from './WaitlistDialog';
import { useLanguage } from '../contexts/LanguageContext';
import logoImage from 'figma:asset/8f1714922e05cf89bc747cac2e58b5803940c8c2.png';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { isLoggedIn, profile, logout, openLoginDialog } = useProfile();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const handleLogout = () => {
    setIsMenuOpen(false);
    logout();
    navigate('/');
  };

  const handleLogin = () => {
    setIsMenuOpen(false);
    openLoginDialog();
  };

  const navLinkClass = 'text-base hover:opacity-70 transition-all';
  const navColor = { color: '#c0913f' };

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-gray-900 flex-shrink-0"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Spontane
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6">
              <Link to="/" className={navLinkClass} style={navColor}>Home</Link>
              <Link to="/events" className={navLinkClass} style={navColor}>Events</Link>
              <Link to="/tandem-partner" className={navLinkClass} style={navColor}>
                Tandem Partner
              </Link>
              <Link to="/create-event" className={navLinkClass} style={navColor}>Create Event</Link>
              <button onClick={() => setIsContactOpen(true)} className={navLinkClass} style={navColor}>
                {t('contact')}
              </button>
            </nav>

            {/* Language */}
            <Select value={language} onValueChange={(v) => setLanguage(v as any)}>
              <SelectTrigger className="w-16 h-9 bg-transparent border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="es">ES</SelectItem>
                <SelectItem value="fr">FR</SelectItem>
                <SelectItem value="de">DE</SelectItem>
                <SelectItem value="tr">TR</SelectItem>
              </SelectContent>
            </Select>

            {/* Auth */}
            {isLoggedIn && profile ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/profile"
                  className="flex items-center gap-1.5 text-sm font-medium hover:opacity-70 transition-all"
                  style={navColor}
                >
                  <UserCircle className="h-5 w-5" />
                  {profile.fullName.split(' ')[0]}
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-red-500 transition-colors px-3 py-2 rounded-lg hover:bg-red-50 border border-gray-200"
                >
                  <LogOut className="h-4 w-4" />
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handleLogin}
                  className="h-9 px-5 text-sm font-medium border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  Log In
                </Button>
                <Button
                  onClick={() => navigate('/profile')}
                  className="h-9 px-5 text-sm font-medium text-white hover:opacity-90"
                  style={{ backgroundColor: '#c0913f' }}
                >
                  Create Profile
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">Home</Link>
              <Link to="/events" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">Events</Link>
              <Link to="/tandem-partner" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">Tandem Partner</Link>
              <Link to="/create-event" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">Create Event</Link>
              <button onClick={() => { setIsContactOpen(true); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">
                {t('contact')}
              </button>

              {isLoggedIn && profile ? (
                <>
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">
                    <UserCircle className="h-4 w-4" style={navColor} />
                    {profile.fullName.split(' ')[0]}
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left px-3 py-2 text-red-500 hover:bg-red-50 rounded-md text-sm">
                    <LogOut className="h-4 w-4" /> Log Out
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2 px-3 pt-1 pb-2">
                  <Button variant="outline" onClick={handleLogin} className="flex-1 h-9 text-sm border-gray-200">
                    Log In
                  </Button>
                  <Button onClick={() => { navigate('/profile'); setIsMenuOpen(false); }} className="flex-1 h-9 text-sm text-white" style={{ backgroundColor: '#c0913f' }}>
                    Create Profile
                  </Button>
                </div>
              )}

              {/* Language + Waitlist */}
              <div className="flex items-center justify-between px-3 py-2 space-x-3">
                <Select value={language} onValueChange={(v) => setLanguage(v as any)}>
                  <SelectTrigger className="w-20 h-9 bg-transparent border-gray-300">
                    <div className="flex items-center space-x-1">
                      <Globe className="h-4 w-4" />
                      <SelectValue />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">EN</SelectItem>
                    <SelectItem value="es">ES</SelectItem>
                    <SelectItem value="fr">FR</SelectItem>
                    <SelectItem value="de">DE</SelectItem>
                    <SelectItem value="tr">TR</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={() => { setIsWaitlistOpen(true); setIsMenuOpen(false); }}
                  className="text-white h-9 px-6 flex-1 max-w-36 text-sm hover:opacity-90"
                  style={{ backgroundColor: '#c0913f' }}
                >
                  {t('getStarted')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ContactDialog open={isContactOpen} onOpenChange={setIsContactOpen} />
      <WaitlistDialog open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen} />
    </header>
  );
}
