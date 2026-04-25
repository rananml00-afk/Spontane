import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface PartnerRequest {
  id: string;
  name: string;
  email: string;
  occupation?: string;
  languageLevel: string;
  languageLearning: string;
  nativeLanguage: string;
  meetingType: string;
  location: string;
  availability: string[];
  interests: string;
  socialMedia?: string;
  additionalNotes?: string;
  status: string;
  submittedAt: string;
  matchCount?: number;
  matchedAt?: string;
}

interface WaitlistEntry {
  email: string;
  language: string;
  signedUpAt: string;
}

export function AdminDashboard() {
  const [requests, setRequests] = useState<PartnerRequest[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<PartnerRequest | null>(null);
  const [activeTab, setActiveTab] = useState<'partners' | 'waitlist'>('partners');
  const [rematchLog, setRematchLog] = useState<string[]>([]);
  const [testEmailResult, setTestEmailResult] = useState<string>('');

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-515521c4`;

  // Fetch all partner requests
  const fetchRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/speaking-partner/requests`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      const data = await response.json();
      setRequests(data.requests || []);
    } catch (error) {
      console.error('Error loading requests:', error);
    }
    setLoading(false);
  };

  // Fetch all waitlist entries
  const fetchWaitlist = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/waitlist/signups`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      const data = await response.json();
      setWaitlist(data.signups || []);
    } catch (error) {
      console.error('Error loading waitlist:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
    fetchWaitlist();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'matched': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLanguageStats = () => {
    const stats: Record<string, number> = {};
    requests.forEach(req => {
      const key = `${req.languageLearning} ← ${req.nativeLanguage}`;
      stats[key] = (stats[key] || 0) + 1;
    });
    return Object.entries(stats).sort((a, b) => b[1] - a[1]);
  };

  const getLocationStats = () => {
    const stats: Record<string, number> = {};
    requests.forEach(req => {
      stats[req.location] = (stats[req.location] || 0) + 1;
    });
    return Object.entries(stats).sort((a, b) => b[1] - a[1]).slice(0, 10);
  };

  // Test email endpoint
  const testEmail = async () => {
    setLoading(true);
    setTestEmailResult('Sende Test-E-Mail...');
    try {
      const response = await fetch(`${API_URL}/test-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ email: 'rananml00@gmail.com' })
      });
      const result = await response.json();
      
      if (result.success) {
        setTestEmailResult('✅ Test-E-Mail erfolgreich verschickt! Prüfe deinen Posteingang (und Spam-Ordner).');
      } else {
        setTestEmailResult(`❌ Fehler: ${result.message || result.error}\n\n${JSON.stringify(result, null, 2)}`);
      }
    } catch (error) {
      setTestEmailResult(`❌ Fehler: ${error.message}`);
    }
    setLoading(false);
  };

  // Rematch all requests
  const rematchAll = async () => {
    if (!confirm('ACHTUNG: Dies sendet E-Mails an ALLE Personen die Matches haben! Fortfahren?')) {
      return;
    }
    
    setLoading(true);
    setRematchLog(['🔄 Starte Re-Matching...']);
    try {
      const response = await fetch(`${API_URL}/speaking-partner/rematch-all`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });
      const result = await response.json();
      
      if (result.success) {
        setRematchLog([
          `✅ Re-Matching abgeschlossen!`,
          ``,
          `📊 Statistik:`,
          `   Total Anfragen: ${result.stats.totalRequests}`,
          `   E-Mails verschickt: ${result.stats.emailsSent}`,
          `   Fehler: ${result.stats.errors}`,
          ``,
          `📝 Detailliertes Log:`,
          ...result.log
        ]);
        
        // Refresh the requests list
        await fetchRequests();
      } else {
        setRematchLog([`❌ Fehler: ${result.error}`, `Details: ${result.details || 'Keine Details'}`]);
      }
    } catch (error) {
      setRematchLog([`❌ Fehler: ${error.message}`]);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🎯 Spontane Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Übersicht aller Anmeldungen und Partner-Anfragen
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="text-3xl font-bold mb-2">{requests.length}</div>
            <div className="text-purple-100">Partner Anfragen</div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="text-3xl font-bold mb-2">
              {requests.filter(r => r.status === 'matched').length}
            </div>
            <div className="text-green-100">Gematcht</div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <div className="text-3xl font-bold mb-2">
              {requests.filter(r => r.status === 'pending').length}
            </div>
            <div className="text-yellow-100">Ausstehend</div>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="text-3xl font-bold mb-2">{waitlist.length}</div>
            <div className="text-blue-100">Warteliste</div>
          </Card>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Language Combinations */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🗣️ Sprach-Kombinationen</h3>
            <div className="space-y-2">
              {getLanguageStats().slice(0, 5).map(([combo, count]) => (
                <div key={combo} className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">{combo}</span>
                  <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-xs font-bold">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Locations */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📍 Top Standorte</h3>
            <div className="space-y-2">
              {getLocationStats().map(([location, count]) => (
                <div key={location} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">{location}</span>
                  <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-bold">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Test Email */}
          <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-2 border-orange-200">
            <h3 className="text-xl font-bold text-orange-900 mb-3">🧪 E-Mail System Testen</h3>
            <p className="text-sm text-orange-700 mb-4">
              Sende eine Test-E-Mail an rananml00@gmail.com um zu prüfen ob Resend funktioniert.
            </p>
            <Button 
              onClick={testEmail}
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700 text-white mb-3"
            >
              {loading ? '📧 Sende...' : '📧 Test-E-Mail senden'}
            </Button>
            {testEmailResult && (
              <div className="mt-3 p-3 bg-white rounded-lg border border-orange-300">
                <pre className="text-xs text-gray-700 whitespace-pre-wrap">{testEmailResult}</pre>
              </div>
            )}
          </Card>

          {/* Re-Match All */}
          <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200">
            <h3 className="text-xl font-bold text-red-900 mb-3">🔄 Alle Matches Neu Senden</h3>
            <p className="text-sm text-red-700 mb-4">
              <strong>ACHTUNG:</strong> Sendet E-Mails an ALLE Personen mit Matches ≥60%. Nur verwenden wenn vorher keine E-Mails verschickt wurden!
            </p>
            <Button 
              onClick={rematchAll}
              disabled={loading}
              className="bg-red-600 hover:bg-red-700 text-white mb-3"
            >
              {loading ? '🔄 Verarbeite...' : '🔄 Re-Match All starten'}
            </Button>
            {rematchLog.length > 0 && (
              <div className="mt-3 p-3 bg-white rounded-lg border border-red-300 max-h-64 overflow-y-auto">
                <pre className="text-xs text-gray-700 whitespace-pre-wrap">{rematchLog.join('\n')}</pre>
              </div>
            )}
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <Button
            onClick={() => setActiveTab('partners')}
            className={activeTab === 'partners' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}
          >
            Partner Anfragen ({requests.length})
          </Button>
          <Button
            onClick={() => setActiveTab('waitlist')}
            className={activeTab === 'waitlist' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}
          >
            Warteliste ({waitlist.length})
          </Button>
        </div>

        {/* Partner Requests Table */}
        {activeTab === 'partners' && (
          <Card className="p-6 bg-white shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Alle Partner-Anfragen ({requests.length})
              </h2>
              <Button 
                onClick={fetchRequests}
                disabled={loading}
                variant="outline"
              >
                {loading ? '🔄 Lädt...' : '🔄 Aktualisieren'}
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-gray-700">Name</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Email</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Lernt</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Muttersprache</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Standort</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Matches</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Angemeldet</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {requests.map((req) => (
                    <tr key={req.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium">{req.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{req.email}</td>
                      <td className="px-4 py-3 text-sm font-medium text-purple-600">{req.languageLearning}</td>
                      <td className="px-4 py-3 text-sm font-medium text-blue-600">{req.nativeLanguage}</td>
                      <td className="px-4 py-3 text-sm">{req.location}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(req.status)}`}>
                          {req.status === 'matched' ? 'Gematcht' : 'Ausstehend'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {req.matchCount ? (
                          <span className="text-green-600 font-bold">✅ {req.matchCount}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(req.submittedAt).toLocaleDateString('de-DE')}
                      </td>
                      <td className="px-4 py-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedRequest(req)}
                        >
                          Anzeigen
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {requests.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg mb-2">📭 Noch keine Anfragen vorhanden</p>
                <p className="text-sm">Warte auf die ersten Anmeldungen!</p>
              </div>
            )}
          </Card>
        )}

        {/* Waitlist Table */}
        {activeTab === 'waitlist' && (
          <Card className="p-6 bg-white shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Warteliste ({waitlist.length})
              </h2>
              <Button 
                onClick={fetchWaitlist}
                disabled={loading}
                variant="outline"
              >
                {loading ? '🔄 Lädt...' : '🔄 Aktualisieren'}
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-gray-700">Email</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Sprache</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Angemeldet am</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {waitlist.map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm">{entry.email}</td>
                      <td className="px-4 py-3 text-sm font-medium text-purple-600">{entry.language}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {new Date(entry.signedUpAt).toLocaleDateString('de-DE')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {waitlist.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg mb-2">📭 Warteliste ist leer</p>
                <p className="text-sm">Noch keine Wartelisten-Anmeldungen</p>
              </div>
            )}
          </Card>
        )}

        {/* Detail Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedRequest(null)}>
            <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedRequest.name}</h2>
                    <p className="text-gray-600">{selectedRequest.email}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedRequest(null)}>✕</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <h3 className="font-bold text-purple-900 mb-2">🗣️ Sprachen</h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-semibold text-purple-700">Lernt:</span>
                          <span className="ml-2 text-purple-900">{selectedRequest.languageLearning}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-purple-700">Muttersprache:</span>
                          <span className="ml-2 text-purple-900">{selectedRequest.nativeLanguage}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-purple-700">Niveau:</span>
                          <span className="ml-2 text-purple-900">{selectedRequest.languageLevel}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="font-bold text-blue-900 mb-2">📍 Standort & Treffen</h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-semibold text-blue-700">Standort:</span>
                          <span className="ml-2 text-blue-900">{selectedRequest.location}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-blue-700">Treffen-Typ:</span>
                          <span className="ml-2 text-blue-900">{selectedRequest.meetingType}</span>
                        </div>
                      </div>
                    </div>

                    {selectedRequest.occupation && (
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="font-bold text-gray-900 mb-2">💼 Beruf</h3>
                        <p className="text-sm text-gray-700">{selectedRequest.occupation}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h3 className="font-bold text-green-900 mb-2">📅 Verfügbarkeit</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedRequest.availability.map((day, index) => (
                          <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>

                    {selectedRequest.interests && (
                      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <h3 className="font-bold text-yellow-900 mb-2">🎯 Interessen</h3>
                        <p className="text-sm text-yellow-800">{selectedRequest.interests}</p>
                      </div>
                    )}

                    {selectedRequest.socialMedia && (
                      <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
                        <h3 className="font-bold text-pink-900 mb-2">📱 Social Media</h3>
                        <p className="text-sm text-pink-800">{selectedRequest.socialMedia}</p>
                      </div>
                    )}

                    {selectedRequest.additionalNotes && (
                      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                        <h3 className="font-bold text-orange-900 mb-2">📝 Zusätzliche Notizen</h3>
                        <p className="text-sm text-orange-800">{selectedRequest.additionalNotes}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-600 mb-1">Status</div>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedRequest.status)}`}>
                        {selectedRequest.status === 'matched' ? 'Gematcht' : 'Ausstehend'}
                      </span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-600 mb-1">Matches</div>
                      <div className="text-lg font-bold text-green-600">
                        {selectedRequest.matchCount || 0}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-600 mb-1">Angemeldet</div>
                      <div className="text-xs font-medium text-gray-700">
                        {new Date(selectedRequest.submittedAt).toLocaleDateString('de-DE')}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-600 mb-1">Request ID</div>
                      <div className="text-xs font-mono text-gray-700">
                        {selectedRequest.id.slice(-8)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}