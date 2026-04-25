import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Users, MapPin, MessageCircle, Calendar, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { PrivacyPolicyDialog } from './PrivacyPolicyDialog';
import { TermsOfServiceDialog } from './TermsOfServiceDialog';
import { addToQueue } from '../utils/offlineQueue';

export function SpeakingPartnerSection() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);
  const [showTermsDialog, setShowTermsDialog] = useState(false);
  const [openBenefit, setOpenBenefit] = useState<number | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    occupation: '',
    languageLevel: '',
    languageLearning: '',
    nativeLanguage: '',
    meetingType: '',
    location: '',
    availability: [] as string[],
    interests: '',
    socialMedia: '',
    additionalNotes: '',
    consent: false
  });

  const handleAvailabilityChange = (day: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      availability: checked 
        ? [...prev.availability, day]
        : prev.availability.filter(d => d !== day)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.consent) {
      toast.error('Please agree to receive partner suggestions and confirm you are 18+');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-515521c4/speaking-partner`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify(formData),
          signal: AbortSignal.timeout(10000) // 10 Sekunden timeout
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(t('partnerRequestSuccess'));
        // Reset form
        setFormData({
          name: '',
          email: '',
          occupation: '',
          languageLevel: '',
          languageLearning: '',
          nativeLanguage: '',
          meetingType: '',
          location: '',
          availability: [],
          interests: '',
          socialMedia: '',
          additionalNotes: '',
          consent: false
        });
        setShowConfirmation(true);
      } else {
        toast.error(data.error || 'Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting speaking partner request:', error);
      
      // OFFLINE FALLBACK: Speichere in lokaler Queue
      if (error instanceof Error && (error.name === 'TypeError' || error.name === 'TimeoutError')) {
        console.log('🔌 Supabase not reachable, saving to offline queue...');
        
        const queueId = addToQueue('speaking-partner', formData);
        
        toast.success('✅ Deine Anmeldung wurde gespeichert und wird automatisch übertragen sobald die Verbindung wiederhergestellt ist!', {
          duration: 6000,
          description: 'Du kannst die Seite schließen - wir kümmern uns darum! 🚀'
        });
        
        // Reset form auch im Offline-Modus
        setFormData({
          name: '',
          email: '',
          occupation: '',
          languageLevel: '',
          languageLearning: '',
          nativeLanguage: '',
          meetingType: '',
          location: '',
          availability: [],
          interests: '',
          socialMedia: '',
          additionalNotes: '',
          consent: false
        });
        setShowConfirmation(true);
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="speaking-partner-section" className="w-full bg-white py-32 px-4 border-t border-gray-200">
      <div className="max-w-4xl mx-auto">
        {showConfirmation ? (
          /* Confirmation Screen */
          <div className="max-w-2xl mx-auto">
            {/* Success Message */}
            <div className="text-center mb-16">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-8" style={{ backgroundColor: '#c0913f' }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {t('confirmationTitle')}
              </h2>
              <p className="text-xl text-gray-600 font-light">
                {t('confirmationSubtitle')}
              </p>
            </div>

            {/* What Happens Next */}
            <div className="mb-12 space-y-8">
              <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                {t('whatHappensNext')}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm">1</span>
                  </div>
                  <p className="text-gray-900 pt-1">{t('step1Title')}</p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm">2</span>
                  </div>
                  <p className="text-gray-900 pt-1">{t('step2Title')}</p>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-sm">3</span>
                  </div>
                  <p className="text-gray-900 pt-1">{t('step3Title')}</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="text-center">
              <Button
                onClick={() => setShowConfirmation(false)}
                className="bg-black hover:bg-gray-800 text-white px-12 py-6"
              >
                {t('backToForm')}
              </Button>
            </div>
          </div>
        ) : (
          <>
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest mb-6" style={{ color: '#c0913f' }}>
            FIND YOUR SPEAKING PARTNER
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">{t('speakingPartnerSubtitle')}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">{t('speakingPartnerIntro')}</p>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">{/* Personal Information - 2x2 Grid */}
            <div className="grid md:grid-cols-2 gap-x-6 gap-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm mb-2 text-gray-600">
                  {t('fullName')} <span className="text-gray-400">*</span>
                </label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="border-gray-300"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm mb-2 text-gray-600">
                  {t('emailForMatches')} <span className="text-gray-400">*</span>
                </label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="border-gray-300"
                />
              </div>

              {/* Occupation */}
              <div>
                <label className="block text-sm mb-2 text-gray-600">
                  Your occupation <span className="text-gray-400">*</span>
                </label>
                <Input
                  required
                  value={formData.occupation}
                  onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                  placeholder="e.g., Software Engineer, Teacher, Student..."
                  className="border-gray-300"
                />
              </div>

              {/* Social Media */}
              <div>
                <label className="block text-sm mb-2 text-gray-600">
                  Your social media (LinkedIn/Instagram/...)
                </label>
                <Input
                  value={formData.socialMedia}
                  onChange={(e) => setFormData({ ...formData, socialMedia: e.target.value })}
                  placeholder="e.g., linkedin.com/in/yourname"
                  className="border-gray-300"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Language Learning */}
              <div>
                <label className="block text-sm mb-2 text-gray-600">
                  {t('languageLearning')} <span className="text-gray-400">*</span>
                </label>
                <Select
                  required
                  value={formData.languageLearning}
                  onValueChange={(value) => setFormData({ ...formData, languageLearning: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="Italian">Italian</SelectItem>
                    <SelectItem value="Portuguese">Portuguese</SelectItem>
                    <SelectItem value="Dutch">Dutch</SelectItem>
                    <SelectItem value="Russian">Russian</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                    <SelectItem value="Japanese">Japanese</SelectItem>
                    <SelectItem value="Korean">Korean</SelectItem>
                    <SelectItem value="Arabic">Arabic</SelectItem>
                    <SelectItem value="Turkish">Turkish</SelectItem>
                    <SelectItem value="Polish">Polish</SelectItem>
                    <SelectItem value="Swedish">Swedish</SelectItem>
                    <SelectItem value="Norwegian">Norwegian</SelectItem>
                    <SelectItem value="Danish">Danish</SelectItem>
                    <SelectItem value="Finnish">Finnish</SelectItem>
                    <SelectItem value="Greek">Greek</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Native Language */}
              <div>
                <label className="block text-sm mb-2 text-gray-600">
                  {t('nativeLanguage')} <span className="text-gray-400">*</span>
                </label>
                <Select
                  required
                  value={formData.nativeLanguage}
                  onValueChange={(value) => setFormData({ ...formData, nativeLanguage: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="Italian">Italian</SelectItem>
                    <SelectItem value="Portuguese">Portuguese</SelectItem>
                    <SelectItem value="Dutch">Dutch</SelectItem>
                    <SelectItem value="Russian">Russian</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                    <SelectItem value="Japanese">Japanese</SelectItem>
                    <SelectItem value="Korean">Korean</SelectItem>
                    <SelectItem value="Arabic">Arabic</SelectItem>
                    <SelectItem value="Turkish">Turkish</SelectItem>
                    <SelectItem value="Polish">Polish</SelectItem>
                    <SelectItem value="Swedish">Swedish</SelectItem>
                    <SelectItem value="Norwegian">Norwegian</SelectItem>
                    <SelectItem value="Danish">Danish</SelectItem>
                    <SelectItem value="Finnish">Finnish</SelectItem>
                    <SelectItem value="Greek">Greek</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Location */}
              <div>
                <label className="block text-sm mb-2 text-gray-600">
                  {t('location')} <span className="text-gray-400">*</span>
                </label>
                <Input
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Frankfurt, Berlin, Munich..."
                  className="border-gray-300"
                />
              </div>

              {/* Meeting Type */}
              <div>
                <label className="block text-sm mb-2 text-gray-600">
                  {t('preferredMeetingType')} <span className="text-gray-400">*</span>
                </label>
                <Select
                  required
                  value={formData.meetingType}
                  onValueChange={(value) => setFormData({ ...formData, meetingType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select meeting type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in-person">{t('inPerson')}</SelectItem>
                    <SelectItem value="online">{t('online')}</SelectItem>
                    <SelectItem value="both">{t('both')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Language Level */}
            <div>
              <label className="block text-sm mb-2 text-gray-600">
                {t('yourLanguageLevelInLearning')} <span className="text-gray-400">*</span>
              </label>
              <Select
                required
                value={formData.languageLevel}
                onValueChange={(value) => setFormData({ ...formData, languageLevel: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">{t('beginner')}</SelectItem>
                  <SelectItem value="intermediate">{t('intermediate')}</SelectItem>
                  <SelectItem value="advanced">{t('advanced')}</SelectItem>
                  <SelectItem value="native">{t('native')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm mb-3 text-gray-600">
                {t('availability')} <span className="text-gray-400">*</span>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['weekdayMornings', 'weekdayAfternoons', 'weekdayEvenings', 'weekends'].map((day) => (
                  <div key={day} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Checkbox
                      id={day}
                      checked={formData.availability.includes(day)}
                      onCheckedChange={(checked) => handleAvailabilityChange(day, checked as boolean)}
                      className="w-5 h-5"
                    />
                    <label htmlFor={day} className="text-base font-medium cursor-pointer flex-1">
                      {t(day)}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm mb-2 text-gray-600">
                {t('interests')}
              </label>
              <Input
                value={formData.interests}
                onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                placeholder={t('interestsPlaceholder')}
                className="border-gray-300"
              />
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm mb-2 text-gray-600">
                {t('additionalNotes')}
              </label>
              <Textarea
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                placeholder={t('notesPlaceholder')}
                rows={4}
                className="border-gray-300"
              />
            </div>

            {/* Consent */}
            <div className="flex items-start space-x-3 pt-4 border-t border-gray-200">
              <Checkbox
                id="consent"
                checked={formData.consent}
                onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
                className="mt-1"
              />
              <label htmlFor="consent" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
                I have read and accept the{' '}
                <button 
                  type="button"
                  className="text-gray-900 hover:text-gray-700 underline"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowPrivacyDialog(true);
                  }}
                >
                  Privacy Policy
                </button>
                {' '}and{' '}
                <button 
                  type="button"
                  className="text-gray-900 hover:text-gray-700 underline"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowTermsDialog(true);
                  }}
                >
                  Terms of Service
                </button>.
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || !formData.consent}
              className="w-full text-white py-6 text-base hover:opacity-90"
              style={{ backgroundColor: '#c0913f' }}
            >
              {loading ? 'Submitting...' : t('findMyPartner')}
            </Button>
          </form>
        </div>

        {/* Closing Text */}
        <div className="mt-12 text-center max-w-3xl mx-auto">
          <p className="text-gray-700 text-lg leading-relaxed space-y-2">
            <span className="block">Learning a language works best when you actually use it.</span>
            <span className="block">Get matched with a language partner who shares your interests, goals, and availability.</span>
          </p>
        </div>
          </>
        )}
      </div>
      
      {/* Privacy Policy Dialog */}
      <PrivacyPolicyDialog 
        open={showPrivacyDialog} 
        onOpenChange={setShowPrivacyDialog} 
      />
      
      {/* Terms of Service Dialog */}
      <TermsOfServiceDialog 
        open={showTermsDialog} 
        onOpenChange={setShowTermsDialog} 
      />
    </section>
  );
}