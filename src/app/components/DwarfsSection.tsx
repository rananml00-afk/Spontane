import { motion } from 'motion/react';
import { DwarfCharacter } from './DwarfCharacter';
import { useLanguage } from '../contexts/LanguageContext';

export function DwarfsSection() {
  const { t } = useLanguage();

  const dwarfs = [
    {
      name: t('dwarfChatty'),
      color: '#FF6B6B',
      role: t('dwarfChattyRole'),
      position: 'left' as const
    },
    {
      name: t('dwarfListy'),
      color: '#4ECDC4',
      role: t('dwarfListyRole'),
      position: 'right' as const
    },
    {
      name: t('dwarfScripty'),
      color: '#45B7D1',
      role: t('dwarfScriptyRole'),
      position: 'left' as const
    },
    {
      name: t('dwarfGramsy'),
      color: '#96CEB4',
      role: t('dwarfGramsyRole'),
      position: 'right' as const
    },
    {
      name: t('dwarfVocab'),
      color: '#FFEAA7',
      role: t('dwarfVocabRole'),
      position: 'left' as const
    },
    {
      name: t('dwarfCulturey'),
      color: '#DDA15E',
      role: t('dwarfCultureyRole'),
      position: 'right' as const
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            {t('dwarfsTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('dwarfsSubtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 items-start justify-items-center">
          {dwarfs.map((dwarf, index) => (
            <DwarfCharacter
              key={dwarf.name}
              name={dwarf.name}
              color={dwarf.color}
              role={dwarf.role}
              position={dwarf.position}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Fun animated message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block bg-white rounded-2xl shadow-lg px-8 py-4 border-4 border-yellow-400"
          >
            <p className="text-lg font-semibold text-gray-800">
              {t('dwarfsCallToAction')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}