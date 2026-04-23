import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { useLanguage } from '../contexts/LanguageContext';
import { Briefcase, MapPin, Clock, Mail } from 'lucide-react';

interface CareersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CareersDialog({ open, onOpenChange }: CareersDialogProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto mx-4">
        <DialogHeader>
          <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#c0913f' }}>
            JOIN OUR TEAM
          </p>
          <DialogTitle className="text-3xl md:text-4xl font-bold text-gray-900">{t('careersTitle')}</DialogTitle>
          <DialogDescription className="text-gray-600 font-light text-lg pt-2">
            {t('careersIntro')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-8 py-6">
          {/* Open Positions Header */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-gray-900">{t('openPositions')}</h3>
            
            {/* Job Posting */}
            <div className="border border-gray-200 rounded-lg p-8 space-y-8">
              {/* Job Title and Details */}
              <div>
                <h4 className="text-xl font-bold mb-4 text-gray-900">{t('headOfProgrammers')}</h4>
                <div className="flex flex-wrap gap-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" style={{ color: '#c0913f' }} />
                    <span>{t('headOfProgrammersLocation')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" style={{ color: '#c0913f' }} />
                    <span>{t('headOfProgrammersType')}</span>
                  </div>
                </div>
              </div>
              
              {/* About the Role */}
              <div>
                <h5 className="font-bold mb-3 text-gray-900">{t('aboutRole')}</h5>
                <p className="text-gray-700 leading-relaxed font-light">
                  {t('aboutRoleContent')}
                </p>
              </div>
              
              {/* Key Responsibilities */}
              <div>
                <h5 className="font-bold mb-4 text-gray-900">{t('keyResponsibilities')}</h5>
                <ul className="space-y-2 list-disc list-inside text-gray-700 font-light">
                  <li>{t('responsibility1')}</li>
                  <li>{t('responsibility2')}</li>
                  <li>{t('responsibility3')}</li>
                  <li>{t('responsibility4')}</li>
                  <li>{t('responsibility5')}</li>
                  <li>{t('responsibility6')}</li>
                  <li>{t('responsibility7')}</li>
                </ul>
              </div>
              
              {/* Qualifications */}
              <div>
                <h5 className="font-bold mb-4 text-gray-900">{t('qualifications')}</h5>
                <ul className="space-y-2 list-disc list-inside text-gray-700 font-light">
                  <li>{t('qualification1')}</li>
                  <li>{t('qualification2')}</li>
                  <li>{t('qualification3')}</li>
                  <li>{t('qualification4')}</li>
                  <li>{t('qualification5')}</li>
                  <li>{t('qualification6')}</li>
                  <li>{t('qualification7')}</li>
                  <li>{t('qualification8')}</li>
                </ul>
              </div>
              
              {/* What We Offer */}
              <div>
                <h5 className="font-bold mb-4 text-gray-900">{t('whatWeOffer')}</h5>
                <ul className="space-y-2 list-disc list-inside text-gray-700 font-light">
                  <li>{t('offer1')}</li>
                  <li>{t('offer2')}</li>
                  <li>{t('offer3')}</li>
                  <li>{t('offer4')}</li>
                  <li>{t('offer5')}</li>
                  <li>{t('offer6')}</li>
                </ul>
              </div>
              
              {/* How to Apply */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h5 className="font-bold mb-3 text-gray-900">{t('howToApply')}</h5>
                <p className="text-gray-700 mb-4 font-light">{t('howToApplyContent')}</p>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5" style={{ color: '#c0913f' }} />
                  <a 
                    href={`mailto:${t('applyEmail')}`}
                    className="hover:opacity-70 transition-opacity underline"
                    style={{ color: '#c0913f' }}
                  >
                    {t('applyEmail')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            {t('close')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}