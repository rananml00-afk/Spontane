import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { getQueueSize, processQueue, clearQueue } from '../utils/offlineQueue';

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

export function AdminTestDashboard() {
  const [requests, setRequests] = useState<PartnerRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState<string[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<PartnerRequest | null>(null);

  const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-515521c4`;

  // Fetch all requests
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
      addTestResult(`✅ Loaded ${data.requests?.length || 0} requests`);
    } catch (error) {
      addTestResult(`❌ Error loading requests: ${error}`);
    }
    setLoading(false);
  };

  const addTestResult = (message: string) => {
    setTestResults(prev => [message, ...prev].slice(0, 20));
  };

  // Create test user
  const createTestUser = async (userData: any) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/speaking-partner`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        addTestResult(`✅ Created user: ${userData.name} - ${userData.email}`);
        addTestResult(`📧 Check ${userData.email} for match notifications!`);
        await fetchRequests();
      } else {
        addTestResult(`❌ Error: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      addTestResult(`❌ Error creating user: ${error}`);
    }
    setLoading(false);
  };

  // Test Scenario 1: Perfect Match (German ↔ English)
  const testPerfectMatch = async () => {
    addTestResult('🧪 Testing Perfect Match Scenario...');
    
    // User 1: Learns German, speaks English
    await createTestUser({
      name: 'Test User Alice',
      email: 'rananml00@gmail.com', // Your email to receive test
      languageLevel: 'intermediate',
      languageLearning: 'German',
      nativeLanguage: 'English',
      meetingType: 'both',
      location: 'Frankfurt',
      availability: ['weekday_evenings', 'weekends'],
      interests: 'travel, books, culture',
      additionalNotes: 'Looking for practice partner!',
      consent: true
    });

    // Wait 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));

    // User 2: Learns English, speaks German (PERFECT MATCH!)
    await createTestUser({
      name: 'Test User Bob',
      email: 'rananml00@gmail.com', // Your email to receive test
      languageLevel: 'advanced',
      languageLearning: 'English',
      nativeLanguage: 'German',
      meetingType: 'both',
      location: 'Frankfurt',
      availability: ['weekday_evenings', 'weekends'],
      interests: 'travel, technology',
      additionalNotes: 'Native German speaker',
      consent: true
    });

    addTestResult('✅ Perfect match test completed! Check your email (rananml00@gmail.com)');
  };

  // Test Scenario 2: Multiple Matches
  const testMultipleMatches = async () => {
    addTestResult('🧪 Testing Multiple Matches Scenario...');
    
    // Create 3 Spanish speakers learning English
    const spanishSpeakers = [
      { name: 'Maria Garcia', location: 'Madrid', level: 'beginner' },
      { name: 'Carlos Rodriguez', location: 'Barcelona', level: 'intermediate' },
      { name: 'Sofia Martinez', location: 'Madrid', level: 'advanced' }
    ];

    for (const speaker of spanishSpeakers) {
      await createTestUser({
        name: speaker.name,
        email: 'rananml00@gmail.com',
        languageLevel: speaker.level,
        languageLearning: 'English',
        nativeLanguage: 'Spanish',
        meetingType: 'online',
        location: speaker.location,
        availability: ['weekday_evenings'],
        interests: 'culture, music',
        additionalNotes: 'Spanish native',
        consent: true
      });
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    // Now create English speaker learning Spanish - should get 3 matches!
    await createTestUser({
      name: 'John Smith',
      email: 'rananml00@gmail.com',
      languageLevel: 'intermediate',
      languageLearning: 'Spanish',
      nativeLanguage: 'English',
      meetingType: 'online',
      location: 'Madrid',
      availability: ['weekday_evenings'],
      interests: 'culture, travel',
      additionalNotes: 'Want to practice Spanish',
      consent: true
    });

    addTestResult('✅ Multiple matches test completed! John should get 3 match emails!');
  };

  // Test Scenario 3: No Match (incompatible languages)
  const testNoMatch = async () => {
    addTestResult('🧪 Testing No Match Scenario...');
    
    await createTestUser({
      name: 'Test No Match User',
      email: 'rananml00@gmail.com',
      languageLevel: 'beginner',
      languageLearning: 'Japanese',
      nativeLanguage: 'Korean',
      meetingType: 'online',
      location: 'Tokyo',
      availability: ['weekends'],
      interests: 'anime, manga',
      additionalNotes: 'Looking for Japanese partner',
      consent: true
    });

    addTestResult('✅ No match test completed - should receive no matches (unless someone learning Korean exists)');
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'matched': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🧪 Automatic Matching Test Dashboard
          </h1>
          <p className="text-gray-600">
            Test the automatic language partner matching system
          </p>
        </div>

        {/* Test Buttons */}
        <Card className="p-6 mb-8 bg-white shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Tests</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={testPerfectMatch}
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white h-auto py-4 flex flex-col items-start"
            >
              <span className="text-lg font-bold mb-1">✅ Perfect Match</span>
              <span className="text-xs opacity-90">German ↔ English in Frankfurt</span>
            </Button>

            <Button 
              onClick={testMultipleMatches}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white h-auto py-4 flex flex-col items-start"
            >
              <span className="text-lg font-bold mb-1">🔢 Multiple Matches</span>
              <span className="text-xs opacity-90">1 user gets 3 matches</span>
            </Button>

            <Button 
              onClick={testNoMatch}
              disabled={loading}
              className="bg-orange-600 hover:bg-orange-700 text-white h-auto py-4 flex flex-col items-start"
            >
              <span className="text-lg font-bold mb-1">❌ No Match</span>
              <span className="text-xs opacity-90">Incompatible languages</span>
            </Button>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>📧 Note:</strong> All test emails go to <strong>rananml00@gmail.com</strong>. 
              Check your inbox for match notifications!
            </p>
          </div>
        </Card>

        {/* Test Results Log */}
        <Card className="p-6 mb-8 bg-white shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Test Results Log</h2>
            <Button 
              onClick={() => setTestResults([])}
              variant="outline"
              size="sm"
            >
              Clear Log
            </Button>
          </div>
          
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm h-64 overflow-y-auto">
            {testResults.length === 0 ? (
              <p className="text-gray-500">No test results yet. Run a test scenario above.</p>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className="mb-1">
                  [{new Date().toLocaleTimeString()}] {result}
                </div>
              ))
            )}
          </div>
        </Card>

        {/* All Requests Table */}
        <Card className="p-6 bg-white shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">
              All Requests ({requests.length})
            </h2>
            <Button 
              onClick={fetchRequests}
              disabled={loading}
            >
              {loading ? '🔄 Loading...' : '🔄 Refresh'}
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 font-semibold text-gray-700">Name</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Email</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Learning</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Native</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Location</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Matches</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Submitted</th>
                  <th className="px-4 py-3 font-semibold text-gray-700">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm">{req.name}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{req.email}</td>
                    <td className="px-4 py-3 text-sm font-medium text-purple-600">{req.languageLearning}</td>
                    <td className="px-4 py-3 text-sm font-medium text-blue-600">{req.nativeLanguage}</td>
                    <td className="px-4 py-3 text-sm">{req.location}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(req.status)}`}>
                        {req.status}
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
                      {new Date(req.submittedAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedRequest(req)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {requests.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No requests yet. Create some test users above!
            </div>
          )}
        </Card>

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
                      <h3 className="font-bold text-purple-900 mb-2">🗣️ Languages</h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-semibold text-purple-700">Learning:</span>
                          <span className="ml-2 text-purple-900">{selectedRequest.languageLearning}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-purple-700">Native:</span>
                          <span className="ml-2 text-purple-900">{selectedRequest.nativeLanguage}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-purple-700">Level:</span>
                          <span className="ml-2 text-purple-900">{selectedRequest.languageLevel}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="font-bold text-blue-900 mb-2">📍 Location & Meeting</h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-semibold text-blue-700">Location:</span>
                          <span className="ml-2 text-blue-900">{selectedRequest.location}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-blue-700">Meeting Type:</span>
                          <span className="ml-2 text-blue-900">{selectedRequest.meetingType}</span>
                        </div>
                      </div>
                    </div>

                    {selectedRequest.occupation && (
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="font-bold text-gray-900 mb-2">💼 Occupation</h3>
                        <p className="text-sm text-gray-700">{selectedRequest.occupation}</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h3 className="font-bold text-green-900 mb-2">📅 Availability</h3>
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
                        <h3 className="font-bold text-yellow-900 mb-2">🎯 Interests</h3>
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
                        <h3 className="font-bold text-orange-900 mb-2">📝 Additional Notes</h3>
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
                        {selectedRequest.status}
                      </span>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-600 mb-1">Matches</div>
                      <div className="text-lg font-bold text-green-600">
                        {selectedRequest.matchCount || 0}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-xs text-gray-600 mb-1">Submitted</div>
                      <div className="text-xs font-medium text-gray-700">
                        {new Date(selectedRequest.submittedAt).toLocaleDateString()}
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

        {/* Instructions */}
        <Card className="p-6 mt-8 bg-blue-50 border-2 border-blue-200">
          <h3 className="text-xl font-bold text-blue-900 mb-3">📚 How to Test</h3>
          <ol className="space-y-2 text-blue-800">
            <li><strong>1.</strong> Click one of the test scenario buttons above</li>
            <li><strong>2.</strong> Watch the test results log for real-time updates</li>
            <li><strong>3.</strong> Check your email (<strong>rananml00@gmail.com</strong>) for match notifications</li>
            <li><strong>4.</strong> Verify the matches make sense based on the criteria</li>
            <li><strong>5.</strong> Check the requests table to see match counts and status</li>
          </ol>
          
          <div className="mt-4 p-3 bg-white rounded border border-blue-300">
            <p className="text-sm text-blue-900">
              <strong>💡 Tip:</strong> The "Perfect Match" test creates two users who are perfect matches 
              (German ↔ English learners in Frankfurt). Both should receive emails with each other as matches!
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}