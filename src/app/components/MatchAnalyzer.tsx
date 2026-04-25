import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface PartnerRequest {
  id: string;
  name: string;
  email: string;
  languageLevel: string;
  languageLearning: string;
  nativeLanguage: string;
  meetingType: string;
  location: string;
  availability: string[];
  interests: string;
  status: string;
  submittedAt: string;
}

interface PotentialMatch {
  person1: PartnerRequest;
  person2: PartnerRequest;
  score: number;
  reasons: string[];
}

export function MatchAnalyzer() {
  const [loading, setLoading] = useState(false);
  const [potentialMatches, setPotentialMatches] = useState<PotentialMatch[]>([]);

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-515521c4`;

  const analyzeMatches = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/speaking-partner/requests`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      const data = await response.json();
      const requests: PartnerRequest[] = data.requests || [];

      // Calculate all potential matches
      const matches: PotentialMatch[] = [];

      for (let i = 0; i < requests.length; i++) {
        for (let j = i + 1; j < requests.length; j++) {
          const person1 = requests[i];
          const person2 = requests[j];

          const { score, reasons } = calculateMatchScore(person1, person2);

          if (score >= 60) {
            matches.push({
              person1,
              person2,
              score,
              reasons
            });
          }
        }
      }

      // Sort by score (highest first)
      matches.sort((a, b) => b.score - a.score);
      setPotentialMatches(matches);
    } catch (error) {
      console.error('Error analyzing matches:', error);
    }
    setLoading(false);
  };

  const calculateMatchScore = (person1: PartnerRequest, person2: PartnerRequest): { score: number; reasons: string[] } => {
    let score = 0;
    const reasons: string[] = [];

    // Language compatibility
    const p1LearnsP2Native = person1.languageLearning.toLowerCase().trim() === person2.nativeLanguage.toLowerCase().trim();
    const p2LearnsP1Native = person2.languageLearning.toLowerCase().trim() === person1.nativeLanguage.toLowerCase().trim();

    if (!p1LearnsP2Native && !p2LearnsP1Native) {
      return { score: 0, reasons: ['Sprachen nicht kompatibel'] };
    }

    if (p1LearnsP2Native && p2LearnsP1Native) {
      score += 40;
      reasons.push(`✅ Perfektes Sprach-Match! ${person1.name} lernt ${person2.nativeLanguage}, ${person2.name} lernt ${person1.nativeLanguage}`);
    } else if (p1LearnsP2Native) {
      score += 25;
      reasons.push(`${person2.name} spricht ${person2.nativeLanguage} (${person1.name} lernt das)`);
    } else if (p2LearnsP1Native) {
      score += 25;
      reasons.push(`${person1.name} spricht ${person1.nativeLanguage} (${person2.name} lernt das)`);
    }

    // Location
    if (person1.location.toLowerCase() === person2.location.toLowerCase()) {
      score += 20;
      reasons.push(`Gleiche Stadt: ${person1.location}`);
    }

    // Meeting type
    if (person1.meetingType === person2.meetingType) {
      score += 15;
      reasons.push(`Gleiche Treffen-Präferenz: ${person1.meetingType}`);
    } else if (person1.meetingType === 'both' || person2.meetingType === 'both') {
      score += 10;
      reasons.push(`Flexible Treffen-Optionen`);
    }

    // Availability
    const overlap = person1.availability.filter(day => person2.availability.includes(day));
    if (overlap.length > 0) {
      score += Math.min(15, overlap.length * 5);
      reasons.push(`Gemeinsame Verfügbarkeit: ${overlap.join(', ')}`);
    }

    return { score, reasons };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🔍 Match Analyzer
          </h1>
          <p className="text-gray-600">
            Finde alle möglichen Partner-Kombinationen mit ≥60% Match-Score
          </p>
        </div>

        {/* Analyze Button */}
        <Card className="p-6 mb-8 bg-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Potentielle Matches finden</h2>
              <p className="text-gray-600">
                Klicke auf den Button, um ALLE möglichen Kombinationen zu analysieren
              </p>
            </div>
            <Button 
              onClick={analyzeMatches}
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6"
            >
              {loading ? '🔄 Analysiere...' : '🔍 Matches Analysieren'}
            </Button>
          </div>
        </Card>

        {/* Results */}
        {potentialMatches.length > 0 && (
          <Card className="p-6 bg-white shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              🎯 {potentialMatches.length} Potentielle Matches gefunden!
            </h2>

            <div className="space-y-6">
              {potentialMatches.map((match, index) => (
                <div 
                  key={index}
                  className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200"
                >
                  {/* Match Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {match.person1.name} ↔ {match.person2.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {match.person1.email} & {match.person2.email}
                        </p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">{Math.round(match.score)}%</div>
                      <div className="text-xs text-gray-600">Match Score</div>
                    </div>
                  </div>

                  {/* Person Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Person 1 */}
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                      <h4 className="font-bold text-purple-900 mb-2">{match.person1.name}</h4>
                      <div className="text-sm space-y-1">
                        <div><span className="font-semibold">Lernt:</span> {match.person1.languageLearning}</div>
                        <div><span className="font-semibold">Muttersprache:</span> {match.person1.nativeLanguage}</div>
                        <div><span className="font-semibold">Standort:</span> {match.person1.location}</div>
                        <div><span className="font-semibold">Level:</span> {match.person1.languageLevel}</div>
                        <div><span className="font-semibold">Treffen:</span> {match.person1.meetingType}</div>
                      </div>
                    </div>

                    {/* Person 2 */}
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                      <h4 className="font-bold text-blue-900 mb-2">{match.person2.name}</h4>
                      <div className="text-sm space-y-1">
                        <div><span className="font-semibold">Lernt:</span> {match.person2.languageLearning}</div>
                        <div><span className="font-semibold">Muttersprache:</span> {match.person2.nativeLanguage}</div>
                        <div><span className="font-semibold">Standort:</span> {match.person2.location}</div>
                        <div><span className="font-semibold">Level:</span> {match.person2.languageLevel}</div>
                        <div><span className="font-semibold">Treffen:</span> {match.person2.meetingType}</div>
                      </div>
                    </div>
                  </div>

                  {/* Match Reasons */}
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-bold text-green-900 mb-2">✨ Warum ist das ein gutes Match?</h4>
                    <ul className="space-y-1 text-sm text-green-800">
                      {match.reasons.map((reason, i) => (
                        <li key={i}>• {reason}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {potentialMatches.length === 0 && !loading && (
          <Card className="p-12 bg-white shadow-lg text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Noch keine Analyse durchgeführt
            </h3>
            <p className="text-gray-600">
              Klicke auf den Button oben, um alle möglichen Matches zu finden!
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
