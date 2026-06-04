import { useState } from 'react';
import { Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { PrivacyPolicyDialog } from './PrivacyPolicyDialog';
import { TermsOfServiceDialog } from './TermsOfServiceDialog';
import { CookiePolicyDialog } from './CookiePolicyDialog';
import { ImprintDialog } from './ImprintDialog';
import { GDPRComplianceDialog } from './GDPRComplianceDialog';
import { DisclaimerDialog } from './DisclaimerDialog';
import { AboutDialog } from './AboutDialog';
import { CareersDialog } from './CareersDialog';

export function Footer() {
  const { t } = useLanguage();
  const [privacyOpen, setPrivacyOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [cookieOpen, setCookieOpen] = useState(false);
  const [imprintOpen, setImprintOpen] = useState(false);
  const [gdprOpen, setGdprOpen] = useState(false);
  const [disclaimerOpen, setDisclaimerOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [careersOpen, setCareersOpen] = useState(false);
  
  return (
    <footer className="w-full bg-black text-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-16">
          {/* Contact Section */}
          <div>
            <p className="text-sm uppercase tracking-widest mb-6" style={{ color: '#c0913f' }}>
              GET IN TOUCH
            </p>
            <h3 className="text-white mb-8 text-2xl font-bold">{t('contacts')}</h3>
            <div className="h-px bg-gray-700 mb-8"></div>
            
            <div className="space-y-6 mb-12">
              <div className="flex items-center space-x-4">
                <Mail className="h-5 w-5" style={{ color: '#c0913f' }} />
                <span className="text-gray-300 text-base">kontakt@spontane.app</span>
              </div>
              
              <div className="flex items-center space-x-4">
                <MapPin className="h-5 w-5" style={{ color: '#c0913f' }} />
                <span className="text-gray-300 text-base">Frankfurt</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-white text-base font-medium">Business Online Inc.</div>
              <div className="text-gray-400 text-sm">Frankfurt</div>
              <div className="text-gray-400 text-sm">kontakt@spontane.app</div>
            </div>
          </div>
          
          {/* Company Section - HARDCODED FOR TESTING */}
          <div>
            <p className="text-sm uppercase tracking-widest mb-6" style={{ color: '#c0913f' }}>
              COMPANY
            </p>
            <h3 className="text-white mb-8 text-2xl font-bold">About Spontane</h3>
            <div className="h-px bg-gray-700 mb-8"></div>
            
            <div className="space-y-3">
              <div>
                <button
                  onClick={() => setAboutOpen(true)}
                  className="text-gray-300 hover:opacity-70 transition-opacity text-base block w-full text-left"
                >
                  About Us
                </button>
              </div>
              
              <div>
                <button
                  onClick={() => setCareersOpen(true)}
                  className="text-gray-300 hover:opacity-70 transition-opacity text-base block w-full text-left"
                >
                  Careers
                </button>
              </div>
            </div>
          </div>
          
          {/* Legal Section */}
          <div>
            <p className="text-sm uppercase tracking-widest mb-6" style={{ color: '#c0913f' }}>
              LEGAL
            </p>
            <h3 className="text-white mb-8 text-2xl font-bold">{t('legal')}</h3>
            <div className="h-px bg-gray-700 mb-8"></div>
            
            <div className="space-y-3">
              <div>
                <button 
                  onClick={() => setPrivacyOpen(true)}
                  className="text-gray-300 hover:opacity-70 transition-opacity text-base block w-full text-left"
                >
                  {t('privacyPolicy')}
                </button>
              </div>
              
              <div>
                <button 
                  onClick={() => setTermsOpen(true)}
                  className="text-gray-300 hover:opacity-70 transition-opacity text-base block w-full text-left"
                >
                  {t('termsOfService')}
                </button>
              </div>
              
              <div>
                <button 
                  onClick={() => setCookieOpen(true)}
                  className="text-gray-300 hover:opacity-70 transition-opacity text-base block w-full text-left"
                >
                  {t('cookiePolicy')}
                </button>
              </div>
              
              <div>
                <button 
                  onClick={() => setImprintOpen(true)}
                  className="text-gray-300 hover:opacity-70 transition-opacity text-base block w-full text-left"
                >
                  {t('imprint')}
                </button>
              </div>
              
              <div>
                <button 
                  onClick={() => setGdprOpen(true)}
                  className="text-gray-300 hover:opacity-70 transition-opacity text-base block w-full text-left"
                >
                  {t('gdprCompliance')}
                </button>
              </div>
              
              <div>
                <button 
                  onClick={() => setDisclaimerOpen(true)}
                  className="text-gray-300 hover:opacity-70 transition-opacity text-base block w-full text-left"
                >
                  {t('disclaimer')}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright - Full Width */}
        <div className="mt-16 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400 text-sm">
            © 2026 Business Online Inc. {t('allRightsReserved')}
          </p>
        </div>
      </div>
      
      {/* All Dialogs */}
      <PrivacyPolicyDialog open={privacyOpen} onOpenChange={setPrivacyOpen} />
      <TermsOfServiceDialog open={termsOpen} onOpenChange={setTermsOpen} />
      <CookiePolicyDialog open={cookieOpen} onOpenChange={setCookieOpen} />
      <ImprintDialog open={imprintOpen} onOpenChange={setImprintOpen} />
      <GDPRComplianceDialog open={gdprOpen} onOpenChange={setGdprOpen} />
      <DisclaimerDialog open={disclaimerOpen} onOpenChange={setDisclaimerOpen} />
      <AboutDialog open={aboutOpen} onOpenChange={setAboutOpen} />
      <CareersDialog open={careersOpen} onOpenChange={setCareersOpen} />
    </footer>
  );
}
