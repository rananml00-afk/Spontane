import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { useLanguage } from '../contexts/LanguageContext';

interface AboutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AboutDialog({ open, onOpenChange }: AboutDialogProps) {
  const { t } = useLanguage();
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#c0913f' }}>
            OUR STORY
          </p>
          <DialogTitle className="text-3xl md:text-4xl font-bold text-gray-900">{t('aboutSpontane')}</DialogTitle>
          <DialogDescription className="text-gray-600 font-light text-lg pt-2">
            {t('ourStory')}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 text-gray-700 leading-relaxed pt-4">
          <p>
            Im <strong style={{ color: '#c0913f' }}>Rana Namli</strong> — a visionary entrepreneur and student passionate about 
            empowering young people, especially women, to unlock their full potential through 
            education and self-expression.
          </p>
          
          <p>
            Having lived across <strong>England, Turkey, and Germany</strong> — 12 cities, 3 cultures, 
            and countless challenges — Ive learned to see diversity as strength and obstacles as 
            opportunities. These experiences shaped my belief that language is not just about words, 
            but about confidence, connection, and living boldly as your true self.
          </p>
          
          <p>
            Today, I lead this startup with a clear mission: to make language learning a tool for 
            empowerment. Fueled by creativity, discipline, and strategic thinking, Im not only 
            building an app — Im building a community where learners grow, connect, and create 
            lasting impact.
          </p>
          
          <p>
            For me, this is more than a product. <strong style={{ color: '#c0913f' }}>Its a legacy of empowerment, resilience, 
            and possibility.</strong>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}