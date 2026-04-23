import { useLanguage } from '../contexts/LanguageContext';
import { Users, Briefcase, Award, Mail, Linkedin, Twitter } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Team() {
  const { t } = useLanguage();

  // Core team members
  const coreTeam = [
    {
      name: t('teamMember1Name'),
      role: t('teamMember1Role'),
      bio: t('teamMember1Bio'),
      linkedin: '#',
      twitter: '#',
    },
    {
      name: t('teamMember2Name'),
      role: t('teamMember2Role'),
      bio: t('teamMember2Bio'),
      linkedin: '#',
      twitter: '#',
    },
    {
      name: t('teamMember3Name'),
      role: t('teamMember3Role'),
      bio: t('teamMember3Bio'),
      linkedin: '#',
      twitter: '#',
    },
  ];

  // Open positions
  const openPositions = [
    {
      title: t('position1Title'),
      department: t('position1Department'),
      location: t('position1Location'),
      type: t('position1Type'),
    },
    {
      title: t('position2Title'),
      department: t('position2Department'),
      location: t('position2Location'),
      type: t('position2Type'),
    },
    {
      title: t('position3Title'),
      department: t('position3Department'),
      location: t('position3Location'),
      type: t('position3Type'),
    },
  ];

  // Advisory board
  const advisoryBoard = [
    {
      name: t('advisor1Name'),
      expertise: t('advisor1Expertise'),
      bio: t('advisor1Bio'),
    },
    {
      name: t('advisor2Name'),
      expertise: t('advisor2Expertise'),
      bio: t('advisor2Bio'),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 px-4" style={{ backgroundColor: '#f7f6f4' }}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6" style={{ backgroundColor: '#c0913f' }}>
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
            {t('teamTitle')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('teamSubtitle')}
          </p>
        </div>
      </section>

      {/* Core Team Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-widest mb-3" style={{ color: '#c0913f' }}>
              {t('coreTeam')}
            </p>
            <h2 className="text-4xl font-bold text-black">
              {t('meetTheTeam')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {coreTeam.map((member, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 mx-auto mb-6 flex items-center justify-center">
                  <Users className="w-10 h-10 text-gray-500" />
                </div>
                
                <h3 className="text-xl font-bold text-black mb-2 text-center">
                  {member.name}
                </h3>
                
                <p className="text-sm font-medium mb-4 text-center" style={{ color: '#c0913f' }}>
                  {member.role}
                </p>
                
                <p className="text-gray-600 mb-6 text-center">
                  {member.bio}
                </p>
                
                <div className="flex justify-center gap-3">
                  <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                    <Linkedin className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                    <Twitter className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-20 px-4" style={{ backgroundColor: '#f7f6f4' }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-6" style={{ backgroundColor: '#c0913f' }}>
              <Briefcase className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-black">
              {t('openPositions')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('joinOurTeam')}
            </p>
          </div>

          <div className="space-y-4">
            {openPositions.map((position, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-black mb-2 group-hover:opacity-70 transition-opacity">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                      <span className="flex items-center">
                        <span className="font-medium mr-1">{t('department')}:</span>
                        {position.department}
                      </span>
                      <span>•</span>
                      <span className="flex items-center">
                        <span className="font-medium mr-1">{t('location')}:</span>
                        {position.location}
                      </span>
                      <span>•</span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: '#f7f6f4', color: '#c0913f' }}>
                        {position.type}
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    className="text-white px-6 hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#c0913f' }}
                  >
                    {t('applyNow')}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Board Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-6" style={{ backgroundColor: '#c0913f' }}>
              <Award className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-black">
              {t('advisoryBoard')}
            </h2>
            <p className="text-lg text-gray-600">
              {t('advisoryBoardSubtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {advisoryBoard.map((advisor, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 mb-6 flex items-center justify-center">
                  <Award className="w-9 h-9 text-gray-500" />
                </div>
                
                <h3 className="text-xl font-bold text-black mb-2">
                  {advisor.name}
                </h3>
                
                <p className="text-sm font-medium mb-4" style={{ color: '#c0913f' }}>
                  {advisor.expertise}
                </p>
                
                <p className="text-gray-600">
                  {advisor.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 px-4" style={{ backgroundColor: '#f7f6f4' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-6" style={{ backgroundColor: '#c0913f' }}>
            <Mail className="w-7 h-7 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            {t('wantToJoinUs')}
          </h2>
          
          <p className="text-lg text-gray-600 mb-8">
            {t('getInTouch')}
          </p>
          
          <Button
            onClick={() => window.location.href = 'mailto:kontakt@spontane.app'}
            className="h-12 px-8 text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#c0913f' }}
          >
            {t('contactUs')}
          </Button>
        </div>
      </section>
    </div>
  );
}
