import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';
import monstersImage from 'figma:asset/d3abeab04723838ff46425c972bc4920f91dd65b.png';

export function MonstersSection() {
  const { t } = useLanguage();

  return (
    <section id="monsters-section" className="py-32 px-4 bg-white overflow-hidden border-t border-gray-200">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-widest mb-6" style={{ color: '#c0913f' }}>
            MEET OUR MONSTERS
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            {t('monstersTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            {t('monstersSubtitle')}
          </p>
        </motion.div>

        {/* Main monster image */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <img 
            src={monstersImage} 
            alt="Spontane Language Learning Monsters" 
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}