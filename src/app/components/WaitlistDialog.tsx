import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { useLanguage } from '../contexts/LanguageContext';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { addToQueue } from '../utils/offlineQueue';

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WaitlistDialog({ open, onOpenChange }: WaitlistDialogProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    emailConsent: false
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      emailConsent: checked
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.emailConsent) {
      toast.error('Please accept the email consent to join the waitlist.');
      return;
    }
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-515521c4/waitlist`,
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
        console.log('Waitlist signup successful:', data);
        setSubmitted(true);
        toast.success('Successfully joined the waitlist! 🎉');
        
        // Reset after 2 seconds and close
        setTimeout(() => {
          setFormData({ name: '', email: '', emailConsent: false });
          setSubmitted(false);
          onOpenChange(false);
        }, 2000);
      } else {
        toast.error(data.error || 'Failed to join waitlist. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting waitlist form:', error);
      
      // OFFLINE FALLBACK: Speichere in lokaler Queue
      if (error instanceof Error && (error.name === 'TypeError' || error.name === 'TimeoutError')) {
        console.log('🔌 Supabase not reachable, saving to offline queue...');
        
        addToQueue('waitlist', formData);
        
        setSubmitted(true);
        toast.success('✅ Deine Anmeldung wurde gespeichert und wird automatisch übertragen!', {
          duration: 5000,
          description: 'Sobald die Verbindung wiederhergestellt ist 🚀'
        });
        
        // Reset after 2 seconds and close
        setTimeout(() => {
          setFormData({ name: '', email: '', emailConsent: false });
          setSubmitted(false);
          onOpenChange(false);
        }, 2000);
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-4">
        <DialogHeader>
          <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#c0913f' }}>
            JOIN THE WAITLIST
          </p>
          <DialogTitle className="text-2xl md:text-3xl font-bold text-gray-900">{t('joinWaitlist')}</DialogTitle>
          <DialogDescription className="text-gray-600 font-light">
            {t('waitlistDescription')}
          </DialogDescription>
        </DialogHeader>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t('name')}</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="flex items-start space-x-2 py-2">
              <Checkbox
                id="emailConsent"
                checked={formData.emailConsent}
                onCheckedChange={handleCheckboxChange}
                required
              />
              <label
                htmlFor="emailConsent"
                className="text-sm leading-relaxed cursor-pointer"
              >
                {t('emailConsent')}
              </label>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                {t('cancel')}
              </Button>
              <Button 
                type="submit"
                className="text-white hover:opacity-90"
                style={{ backgroundColor: '#c0913f' }}
                disabled={!formData.emailConsent}
              >
                {t('joinNow')}
              </Button>
            </div>
          </form>
        ) : (
          <div className="py-8 text-center">
            <div className="text-lg text-green-600 font-semibold mb-4">
              ✓ {t('waitlistSuccess')}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}