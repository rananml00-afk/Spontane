import { motion } from 'motion/react';
import logoImage from 'figma:asset/4ac5d65a12dc50e2ad93da3f4192465ccd6f3227.png';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';

export function Banner() {
  const { t } = useLanguage();
  
  return (
    <div className="w-full bg-white">
      {/* Minimalist Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-32 md:py-48">
        <div className="text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 
              className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight text-gray-900"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Spontane
            </h1>
            
            {/* Slogan */}
            <p 
              className="text-xl md:text-2xl mb-8 tracking-wide"
              style={{ 
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                color: '#c0913f'
              }}
            >
              {t('hero.slogan', 'Speak Spontaneously, Live Globally')}
            </p>
            
            <p className="text-2xl md:text-3xl text-gray-600 mb-12 max-w-3xl mx-auto font-light">
              {t('hero.subtitle', 'Connect with real language partners. Practice authentically.')}
            </p>
            
            <Button
              onClick={() => {
                document.getElementById('speaking-partner-section')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              size="lg"
              className="text-white text-base px-12 py-6 font-normal hover:opacity-90"
              style={{ backgroundColor: '#c0913f' }}
            >
              {t('hero.cta', 'Get Started')}
            </Button>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}