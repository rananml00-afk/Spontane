import discordQR from '../../assets/discord-qr.png';

const DISCORD_LINK = 'https://discord.gg/PpVxqGVyN5';

function CommunityCard({
  icon,
  name,
  color,
  description,
  link,
  linkLabel,
  qrCode,
  qrPlaceholder,
}: {
  icon: React.ReactNode;
  name: string;
  color: string;
  description: string;
  link?: string;
  linkLabel: string;
  qrCode?: string;
  qrPlaceholder?: boolean;
}) {
  return (
    <div className="bg-white rounded-3xl border border-black/5 shadow-sm overflow-hidden flex flex-col md:flex-row">
      {/* QR Code side */}
      <div
        className="md:w-72 flex-shrink-0 flex items-center justify-center p-10"
        style={{ backgroundColor: `${color}10` }}
      >
        {qrCode ? (
          <div className="rounded-2xl overflow-hidden shadow-md border border-black/5 bg-white p-3">
            <img src={qrCode} alt={`${name} QR Code`} className="w-48 h-48 object-contain" />
          </div>
        ) : qrPlaceholder ? (
          <div className="w-48 h-48 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 text-center"
            style={{ borderColor: `${color}50` }}>
            <span className="text-4xl">📱</span>
            <p className="text-xs font-medium" style={{ color }}>QR Code<br />coming soon</p>
          </div>
        ) : null}
      </div>

      {/* Content side */}
      <div className="flex-1 p-8 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0"
            style={{ backgroundColor: color }}
          >
            {icon}
          </div>
          <h2
            className="text-2xl font-medium"
            style={{ fontFamily: "'Playfair Display', serif", color: '#1a1a2e' }}
          >
            {name}
          </h2>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-md">{description}</p>

        {link ? (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 w-fit"
            style={{ backgroundColor: color }}
          >
            {linkLabel}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ) : (
          <div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium w-fit border"
            style={{ color, borderColor: `${color}40`, backgroundColor: `${color}08` }}
          >
            Coming soon
          </div>
        )}
      </div>
    </div>
  );
}

export function Community() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f7f6f4' }}>
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-24">

        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1
            className="text-5xl font-medium mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: '#1a1a2e' }}
          >
            Join Our Community
          </h1>
          <p className="text-lg font-light text-gray-500 max-w-2xl mx-auto">
            Connect with language learners and cultural explorers — scan a QR code or click the link to join.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-6">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <CommunityCard
              icon="💬"
              name="Discord"
              color="#5865F2"
              description="Join our Discord server to chat, find language partners, get event updates, and connect with the Spontane community in real time."
              link={DISCORD_LINK}
              linkLabel="Join Discord"
              qrCode={discordQR}
            />
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <CommunityCard
              icon="💚"
              name="WhatsApp"
              color="#25D366"
              description="Join our WhatsApp community to stay updated on upcoming events, spontaneous meetups, and connect with members near you."
              linkLabel="Join WhatsApp"
              qrPlaceholder
            />
          </div>
        </div>

      </div>
    </div>
  );
}
