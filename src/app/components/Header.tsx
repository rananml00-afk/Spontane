import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Menu, X, Globe } from 'lucide-react';
import { ContactDialog } from './ContactDialog';
import { WaitlistDialog } from './WaitlistDialog';
import { useLanguage } from '../contexts/LanguageContext';
import logoImage from 'figma:asset/8f1714922e05cf89bc747cac2e58b5803940c8c2.png';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as any);
  };

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Spontane
            </Link>
          </div>

          {/* Desktop Navigation - Right Side */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              <button 
                onClick={() => setIsContactOpen(true)}
                className="text-base text-gray-600 hover:opacity-70 transition-all"
                style={{ color: '#c0913f' }}
              >
                {t('contact')}
              </button>
              <button 
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setTimeout(() => {
                    const element = document.getElementById('speaking-partner-section');
                    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }}
                className="text-base text-gray-600 hover:opacity-70 transition-all"
                style={{ color: '#c0913f' }}
              >
                Find Partner
              </button>
            </nav>
            
            <Select value={language} onValueChange={handleLanguageChange}>
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
            
            <Button 
              onClick={() => setIsWaitlistOpen(true)}
              className="text-white h-9 px-6 text-sm hover:opacity-90"
              style={{ backgroundColor: '#c0913f' }}
            >
              {t('getStarted')}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
              <button
                onClick={() => {
                  setIsContactOpen(true);
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md"
              >
                {t('contact')}
              </button>
              <Link
                to="/"
                onClick={() => {
                  setIsMenuOpen(false);
                  setTimeout(() => {
                    const element = document.getElementById('speaking-partner-section');
                    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 100);
                }}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md font-medium"
              >
                <div className="flex flex-col leading-tight">
                  <span>Tandem</span>
                  <span>Partner</span>
                </div>
              </Link>
              
              {/* Mobile CTA and Language */}
              <div className="flex items-center justify-between px-3 py-2 space-x-3">
                <Select value={language} onValueChange={handleLanguageChange}>
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
                  onClick={() => {
                    setIsWaitlistOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="text-white h-9 px-6 flex-1 max-w-32 text-sm hover:opacity-90"
                  style={{ backgroundColor: '#c0913f' }}
                >
                  {t('getStarted')}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dialog Components */}
      <ContactDialog open={isContactOpen} onOpenChange={setIsContactOpen} />
      <WaitlistDialog open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen} />
    </header>
  );
}