import { Link } from 'react-router';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from './ui/button';

export function Banner() {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-white">
      <div className="max-w-6xl mx-auto px-4 py-32 md:py-48">
        <div className="text-center">

          {/* Slogan */}
          <p
            className="opacity-0 animate-[fade-in_1s_ease-out_0s_forwards] text-xl md:text-2xl mb-6 tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#c0913f' }}
          >
            {t('hero.slogan', 'Speak Spontaneously, Live Globally')}
          </p>

          {/* Headline */}
          <h1
            className="opacity-0 animate-[fade-in_1s_ease-out_0.15s_forwards] text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight text-gray-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Spontane
          </h1>

          {/* Subtitle */}
          <p
            className="opacity-0 animate-[fade-in_1s_ease-out_0.2s_forwards] text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto mb-12"
            style={{ color: '#717182' }}
          >
            Connect with real language partners in your city. Practice authentically, learn naturally, and join a community of worldly individuals.
          </p>

          {/* CTAs */}
          <div className="opacity-0 animate-[fade-in_1s_ease-out_0.4s_forwards] flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() =>
                document.getElementById('speaking-partner-section')?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })
              }
              size="lg"
              className="text-white text-base px-10 py-6 font-normal hover:opacity-90 rounded-xl"
              style={{ backgroundColor: '#c0913f' }}
            >
              {t('hero.cta', 'Get Started')}
            </Button>

            <Link to="/events">
              <Button
                variant="outline"
                size="lg"
                className="text-base px-10 py-6 font-normal rounded-xl border-gray-200 bg-white text-gray-900 hover:bg-[#fdf3e3] hover:border-[#c0913f] transition-all"
              >
                Explore City Events
              </Button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
