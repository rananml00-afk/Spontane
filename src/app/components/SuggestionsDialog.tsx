import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useLanguage } from '../contexts/LanguageContext';
import { Lightbulb, CheckCircle } from 'lucide-react';

interface SuggestionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SuggestionsDialog({ open, onOpenChange }: SuggestionsDialogProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'feature',
    suggestion: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Reset form after 3 seconds and close dialog
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        category: 'feature',
        suggestion: ''
      });
      onOpenChange(false);
    }, 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-4">
        <DialogHeader>
          <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#c0913f' }}>
            SHARE YOUR IDEAS
          </p>
          <DialogTitle className="text-2xl md:text-3xl font-bold text-gray-900">{t('suggestionsTitle')}</DialogTitle>
          <DialogDescription className="text-gray-600 font-light">
            {t('suggestionsDescription')}
          </DialogDescription>
        </DialogHeader>
        
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-5 py-4">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                {t('yourName')}
              </label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="John Doe"
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                {t('yourEmail')}
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                placeholder="john@example.com"
              />
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">
                {t('suggestionCategory')}
              </label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feature">{t('categoryFeature')}</SelectItem>
                  <SelectItem value="improvement">{t('categoryImprovement')}</SelectItem>
                  <SelectItem value="bug">{t('categoryBug')}</SelectItem>
                  <SelectItem value="other">{t('categoryOther')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Suggestion Textarea */}
            <div className="space-y-2">
              <label htmlFor="suggestion" className="text-sm font-medium">
                {t('yourSuggestion')}
              </label>
              <Textarea
                id="suggestion"
                value={formData.suggestion}
                onChange={(e) => setFormData({ ...formData, suggestion: e.target.value })}
                required
                placeholder={t('suggestionPlaceholder')}
                rows={6}
                className="resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button 
                type="button"
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                {t('close')}
              </Button>
              <Button 
                type="submit"
                className="text-white hover:opacity-90"
                style={{ backgroundColor: '#c0913f' }}
              >
                {t('submitSuggestion')}
              </Button>
            </div>
          </form>
        ) : (
          <div className="py-12 text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <p className="text-lg text-gray-700">{t('suggestionSuccess')}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}