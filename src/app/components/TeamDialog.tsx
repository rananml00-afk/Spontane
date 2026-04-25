import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { useLanguage } from '../contexts/LanguageContext';
import { Linkedin, Mail, Globe } from 'lucide-react';
import { Button } from './ui/button';

interface TeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const teamMembers = [
  {
    id: 1,
    name: "Rana Namli",
    role: "Founder & CEO",
    bio: "Visionary entrepreneur passionate about empowering people through language learning. With experience across 12 cities and 3 cultures, Rana founded Spontane to make language learning a tool for empowerment and genuine human connection.",
    expertise: ["Strategy", "Product Vision", "Community Building"],
    languages: ["English", "German", "Turkish"],
    linkedin: "#",
    email: "rana@spontane.app"
  },
  {
    id: 2,
    name: "Head of Programmers",
    role: "Engineering Lead",
    bio: "We're actively looking for an exceptional engineering leader to join our founding team. This role will shape the technical foundation of Spontane and lead our development efforts.",
    expertise: ["Full-Stack Development", "System Architecture", "Team Leadership"],
    languages: ["TBD"],
    linkedin: "#",
    email: "kontakt@spontane.app",
    isOpen: true
  }
];

const advisors = [
  {
    id: 1,
    name: "Language Learning Experts",
    role: "Pedagogical Advisory Board",
    bio: "Partnering with leading researchers in second language acquisition and communicative language teaching to ensure our methodology is grounded in science."
  },
  {
    id: 2,
    name: "Community Safety Specialists",
    role: "Safety & Moderation Advisory",
    bio: "Working with experts in online community safety to create a trustworthy, secure environment for our users to connect and learn."
  }
];

export function TeamDialog({ open, onOpenChange }: TeamDialogProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto mx-4">
        <DialogHeader>
          <p className="text-sm uppercase tracking-widest mb-4" style={{ color: '#c0913f' }}>
            THE PEOPLE BEHIND SPONTANE
          </p>
          <DialogTitle className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Team
          </DialogTitle>
          <DialogDescription className="text-gray-600 font-light text-lg pt-2">
            A diverse group united by a mission to transform language learning through authentic human connection
          </DialogDescription>
        </DialogHeader>

        {/* Core Team */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Core Team</h3>
          
          <div className="space-y-6">
            {teamMembers.map((member) => (
              <div 
                key={member.id}
                className={`border rounded-lg p-8 ${member.isOpen ? 'border-2' : 'border'} ${member.isOpen ? 'bg-gray-50' : 'bg-white'}`}
                style={member.isOpen ? { borderColor: '#c0913f' } : { borderColor: '#e5e7eb' }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  {/* Left: Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-2xl font-bold text-gray-900">
                        {member.name}
                      </h4>
                      {member.isOpen && (
                        <span className="px-3 py-1 text-xs uppercase tracking-wider text-white rounded-full" style={{ backgroundColor: '#c0913f' }}>
                          Open Position
                        </span>
                      )}
                    </div>
                    
                    <p className="text-base mb-4" style={{ color: '#c0913f' }}>
                      {member.role}
                    </p>
                    
                    <p className="text-gray-700 font-light leading-relaxed mb-6">
                      {member.bio}
                    </p>
                    
                    {/* Expertise Tags */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Expertise:</p>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-white border border-gray-200 rounded-full text-sm text-gray-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Languages */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-2">Languages:</p>
                      <p className="text-gray-700">{member.languages.join(', ')}</p>
                    </div>
                  </div>
                  
                  {/* Right: Contact */}
                  <div className="flex flex-col gap-3">
                    {!member.isOpen && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50"
                          onClick={() => window.open(member.linkedin, '_blank')}
                        >
                          <Linkedin className="h-4 w-4 mr-2" />
                          LinkedIn
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-300 text-gray-700 hover:bg-gray-50"
                          onClick={() => window.location.href = `mailto:${member.email}`}
                        >
                          <Mail className="h-4 w-4 mr-2" />
                          Email
                        </Button>
                      </>
                    )}
                    {member.isOpen && (
                      <Button
                        className="text-white hover:opacity-90"
                        style={{ backgroundColor: '#c0913f' }}
                        onClick={() => window.location.href = `mailto:${member.email}`}
                      >
                        Apply Now
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Advisors */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Advisory Board</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {advisors.map((advisor) => (
              <div 
                key={advisor.id}
                className="border border-gray-200 rounded-lg p-6 bg-white"
              >
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {advisor.name}
                </h4>
                <p className="text-sm mb-4" style={{ color: '#c0913f' }}>
                  {advisor.role}
                </p>
                <p className="text-gray-700 font-light leading-relaxed">
                  {advisor.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Join Us CTA */}
        <div className="mt-12 bg-gray-50 border border-gray-200 rounded-lg p-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Join Our Mission
            </h3>
            <p className="text-gray-600 font-light mb-6">
              We're building a diverse team of passionate individuals who believe in the power of language to connect people and transform lives. Explore open positions and become part of our story.
            </p>
            <Button
              className="text-white hover:opacity-90"
              style={{ backgroundColor: '#c0913f' }}
              onClick={() => window.location.href = 'mailto:kontakt@spontane.app?subject=Career Inquiry'}
            >
              View Open Positions
            </Button>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-gray-200 mt-8">
          <Button 
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
