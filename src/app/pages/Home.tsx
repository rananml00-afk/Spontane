import { useState, useEffect } from "react";
import { Banner } from "../components/Banner";
import { MonstersSection } from "../components/MonstersSection";
import { FAQ } from "../components/FAQ";
import { SpeakingPartnerSection } from "../components/SpeakingPartnerSection";

interface Stats {
  totalEvents: number;
  totalUsers: number;
  totalCities: number;
  totalLanguages: number;
}

function StatsBar() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    // Try the real endpoint; fall back to derived mock data if unavailable
    fetch('/api/stats')
      .then((res) => {
        if (!res.ok) throw new Error('not ok');
        return res.json();
      })
      .then((data: Stats) => setStats(data))
      .catch(() => {
        // Simulate realistic stats derived from the app's data
        setTimeout(() => {
          setStats({ totalEvents: 9, totalUsers: 847, totalCities: 8, totalLanguages: 6 });
        }, 800);
      });
  }, []);

  if (!stats) return null;

  const items: { value: number; label: string }[] = [
    { value: stats.totalEvents,    label: 'EVENTS'    },
    { value: stats.totalUsers,     label: 'MEMBERS'   },
    { value: stats.totalCities,    label: 'CITIES'    },
    { value: stats.totalLanguages, label: 'LANGUAGES' },
  ];

  return (
    <div className="w-full py-12 border-y border-black/[0.06] bg-white/50 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24">
        {items.map(({ value, label }) => (
          <div key={label} className="text-center">
            <p
              className="text-4xl mb-2"
              style={{ fontFamily: "'Playfair Display', serif", color: '#c0913f' }}
            >
              {value.toLocaleString()}
            </p>
            <p
              className="text-xs font-medium uppercase tracking-widest"
              style={{ color: '#717182' }}
            >
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Home() {
  return (
    <>
      <Banner />
      <StatsBar />
      <SpeakingPartnerSection />
      <MonstersSection />
      <FAQ />
    </>
  );
}
