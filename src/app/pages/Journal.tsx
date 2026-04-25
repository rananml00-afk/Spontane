import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { BookOpen, Sparkles, Brain, Target, CheckCircle, Star, ArrowRight, QrCode, BookMarked, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Journal() {
  const { t } = useLanguage();

  // Use direct paths to images in imports folder
  const coverImage = '/imports/Spontane_Secrets_(2).png';
  const systemImage = '/imports/Spontane_Secrets_(3).png';

  const features = [
    {
      icon: QrCode,
      title: t('journalFeature1Title'),
      description: t('journalFeature1Desc'),
    },
    {
      icon: BookMarked,
      title: t('journalFeature2Title'),
      description: t('journalFeature2Desc'),
    },
    {
      icon: TrendingUp,
      title: t('journalFeature3Title'),
      description: t('journalFeature3Desc'),
    },
  ];

  const benefits = [
    t('journalBenefit1'),
    t('journalBenefit2'),
    t('journalBenefit3'),
    t('journalBenefit4'),
    t('journalBenefit5'),
    t('journalBenefit6'),
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 px-4" style={{ backgroundColor: '#f7f6f4' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{ backgroundColor: 'rgba(192, 145, 63, 0.1)' }}>
                <Sparkles className="w-4 h-4" style={{ color: '#c0913f' }} />
                <span className="text-sm font-medium" style={{ color: '#c0913f' }}>
                  {t('journalBadge')}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black leading-tight">
                {t('journalProductTitle')}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {t('journalProductSubtitle')}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  className="h-14 px-8 text-white text-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#c0913f' }}
                >
                  {t('journalGetStarted')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  variant="outline"
                  className="h-14 px-8 text-lg border-2 hover:bg-gray-50"
                  style={{ borderColor: '#c0913f', color: '#c0913f' }}
                >
                  {t('journalLearnMore')}
                </Button>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 border-2 border-white"
                    />
                  ))}
                </div>
                <span>{t('journalUserCount')}</span>
              </div>
            </div>
            
            {/* Right: Journal Preview */}
            <div className="relative">
              <div className="relative z-10">
                {/* Journal Book Mockup */}
                <div 
                  className="rounded-2xl shadow-2xl p-12 transform rotate-2 hover:rotate-0 transition-transform duration-300"
                  style={{ backgroundColor: '#c0913f' }}
                >
                  <div className="bg-white rounded-xl p-8 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f7f6f4' }}>
                        <BookOpen className="w-5 h-5" style={{ color: '#c0913f' }} />
                      </div>
                      <h3 className="font-bold text-lg">Day 1: Greetings</h3>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="border-l-4 pl-4 py-2" style={{ borderColor: '#c0913f' }}>
                        <p className="font-medium text-sm text-gray-500 mb-1">New Word</p>
                        <p className="text-2xl font-bold">Guten Tag</p>
                        <p className="text-gray-600">Good day / Hello</p>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500 mb-2">
                          <Sparkles className="inline w-4 h-4 mr-1" style={{ color: '#c0913f' }} />
                          AI Tip
                        </p>
                        <p className="text-sm text-gray-700">
                          Use "Guten Tag" in formal situations. With friends, try "Hallo" or "Hi"!
                        </p>
                      </div>
                      
                      <div className="flex gap-2">
                        <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: '#c0913f' }} />
                        <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: '#c0913f' }} />
                        <div className="flex-1 h-2 rounded-full bg-gray-200" />
                        <div className="flex-1 h-2 rounded-full bg-gray-200" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating badges */}
                <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                  <Star className="w-6 h-6" style={{ color: '#c0913f' }} fill="#c0913f" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-full px-4 py-2 shadow-lg">
                  <span className="font-bold" style={{ color: '#c0913f' }}>AI-Powered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest mb-3" style={{ color: '#c0913f' }}>
              {t('journalFeaturesLabel')}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
              {t('journalFeaturesTitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('journalFeaturesSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-transparent transition-all duration-300"
              >
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: 'rgba(192, 145, 63, 0.1)' }}
                >
                  <feature.icon className="w-7 h-7" style={{ color: '#c0913f' }} />
                </div>
                
                <h3 className="text-xl font-bold text-black mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4" style={{ backgroundColor: '#f7f6f4' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">
              {t('journalBenefitsTitle')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('journalBenefitsSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-white rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div 
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                  style={{ backgroundColor: '#c0913f' }}
                >
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-700 font-medium">
                  {benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-black mb-4">
              {t('journalHowItWorksTitle')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('journalHowItWorksSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="text-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6"
                  style={{ backgroundColor: '#c0913f' }}
                >
                  {step}
                </div>
                <h3 className="text-xl font-bold text-black mb-3">
                  {t(`journalStep${step}Title`)}
                </h3>
                <p className="text-gray-600">
                  {t(`journalStep${step}Desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inside the Journal - Real Pages Preview */}
      <section className="py-20 px-4" style={{ backgroundColor: '#f7f6f4' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-widest mb-3" style={{ color: '#c0913f' }}>
              {t('journalInsideLabel')}
            </p>
            <h2 className="text-4xl font-bold text-black mb-4">
              {t('journalInsideTitle')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('journalInsideSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Cover Preview */}
            <div className="order-2 md:order-1">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300">
                <img 
                  src={coverImage} 
                  alt="Spontane Journal Cover" 
                  className="w-full h-auto"
                />
              </div>
              <div className="mt-6 text-center md:text-left">
                <h3 className="text-2xl font-bold text-black mb-3">
                  {t('journalCoverTitle')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('journalCoverDesc')}
                </p>
              </div>
            </div>

            {/* Vocabulary System Preview */}
            <div className="order-1 md:order-2">
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300">
                <img 
                  src={systemImage} 
                  alt="Vocabulary System Explanation" 
                  className="w-full h-auto"
                />
              </div>
              <div className="mt-6 text-center md:text-left">
                <h3 className="text-2xl font-bold text-black mb-3">
                  {t('journalSystemTitle')}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {t('journalSystemDesc')}
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#c0913f' }} />
                    <span>{t('journalSystemFeature1')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#c0913f' }} />
                    <span>{t('journalSystemFeature2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#c0913f' }} />
                    <span>{t('journalSystemFeature3')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#c0913f' }} />
                    <span>{t('journalSystemFeature4')}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4" style={{ backgroundColor: '#f7f6f4' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">
              {t('journalTestimonialsTitle')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5" style={{ color: '#c0913f' }} fill="#c0913f" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 italic">
                  "{t(`journalTestimonial${i}Quote`)}"
                </p>
                
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-400" />
                  <div>
                    <p className="font-bold text-black">{t(`journalTestimonial${i}Name`)}</p>
                    <p className="text-sm text-gray-500">{t(`journalTestimonial${i}Role`)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className="rounded-3xl p-12 md:p-16"
            style={{ backgroundColor: '#c0913f' }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('journalCtaTitle')}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              {t('journalCtaSubtitle')}
            </p>
            
            <Button
              className="h-14 px-10 text-lg bg-white hover:bg-gray-100 transition-colors"
              style={{ color: '#c0913f' }}
            >
              {t('journalCtaButton')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <p className="text-white/80 text-sm mt-6">
              {t('journalCtaNote')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}