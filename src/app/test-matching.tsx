import { useState } from 'react';
import { projectId, publicAnonKey } from './utils/supabase/info';

/**
 * TEST COMPONENT - Check if matching system is working
 * Access at: /?test-matching=true
 */
export default function TestMatching() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [requests, setRequests] = useState<any>(null);

  // Test data - two people who should match perfectly
  const testPerson1 = {
    name: 'Maria Schmidt',
    email: 'maria.test@example.com',
    languageLevel: 'intermediate',
    languageLearning: 'English',
    nativeLanguage: 'German',
    meetingType: 'both',
    location: 'Berlin',
    availability: ['weekday evenings', 'weekends'],
    interests: 'travel, culture, books',
    additionalNotes: 'Looking forward to practicing!',
    consent: true
  };

  const testPerson2 = {
    name: 'John Smith',
    email: 'john.test@example.com',
    languageLevel: 'intermediate',
    languageLearning: 'German',
    nativeLanguage: 'English',
    meetingType: 'both',
    location: 'Berlin',
    availability: ['weekday evenings', 'weekends'],
    interests: 'travel, culture, technology',
    additionalNotes: 'Excited to learn!',
    consent: true
  };

  const submitRequest = async (person: any) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-515521c4/speaking-partner`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify(person)
        }
      );

      const data = await response.json();
      console.log('Submission response:', data);
      
      setResult(prev => ({
        ...prev,
        [person.name]: {
          success: response.ok,
          data: data,
          status: response.status
        }
      }));

      return data;
    } catch (error) {
      console.error('Error submitting:', error);
      setResult(prev => ({
        ...prev,
        [person.name]: {
          success: false,
          error: String(error)
        }
      }));
    } finally {
      setLoading(false);
    }
  };

  const getAllRequests = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-515521c4/speaking-partner/requests`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );

      const data = await response.json();
      console.log('All requests:', data);
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  const runFullTest = async () => {
    setResult(null);
    setRequests(null);
    
    console.log('🧪 Starting matching system test...');
    
    // Submit first person
    console.log('📝 Submitting Person 1:', testPerson1.name);
    await submitRequest(testPerson1);
    
    // Wait 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Submit second person (should trigger match!)
    console.log('📝 Submitting Person 2:', testPerson2.name);
    await submitRequest(testPerson2);
    
    // Wait 2 seconds
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Get all requests
    console.log('📊 Fetching all requests...');
    await getAllRequests();
    
    console.log('✅ Test complete! Check the results below and your email.');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-purple-600">🧪 Matching System Test</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Test Scenario</h2>
          <p className="mb-4">This will test the automatic matching system with two people who should match at ≥85%:</p>
          
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded">
              <h3 className="font-bold text-lg mb-2">👤 Person 1: {testPerson1.name}</h3>
              <ul className="text-sm space-y-1">
                <li><strong>Native:</strong> {testPerson1.nativeLanguage}</li>
                <li><strong>Learning:</strong> {testPerson1.languageLearning}</li>
                <li><strong>Location:</strong> {testPerson1.location}</li>
                <li><strong>Level:</strong> {testPerson1.languageLevel}</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded">
              <h3 className="font-bold text-lg mb-2">👤 Person 2: {testPerson2.name}</h3>
              <ul className="text-sm space-y-1">
                <li><strong>Native:</strong> {testPerson2.nativeLanguage}</li>
                <li><strong>Learning:</strong> {testPerson2.languageLearning}</li>
                <li><strong>Location:</strong> {testPerson2.location}</li>
                <li><strong>Level:</strong> {testPerson2.languageLevel}</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded mb-6">
            <p className="text-sm">
              <strong>Expected Result:</strong> Both should receive emails with each other's contact information because:
            </p>
            <ul className="text-sm list-disc ml-6 mt-2">
              <li>Perfect language match (40 points): Maria learns English, John is native English. John learns German, Maria is native German.</li>
              <li>Same location (20 points): Both in Berlin</li>
              <li>Same meeting type (15 points): Both prefer "both"</li>
              <li>Shared availability (15 points): weekday evenings, weekends</li>
              <li>Similar level (10 points): Both intermediate</li>
              <li>Shared interests (bonus): travel, culture</li>
              <li><strong>Total: ~95+ points (≥85% required) ✅</strong></li>
            </ul>
          </div>
          
          <button
            onClick={runFullTest}
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '⏳ Running Test...' : '🚀 Run Full Test'}
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">📊 Submission Results</h2>
            <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}

        {requests && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">📋 All Requests in Database</h2>
            <p className="mb-4">Total: {requests.count} requests</p>
            <div className="space-y-4">
              {requests.requests?.map((req: any, index: number) => (
                <div key={index} className="bg-gray-50 p-4 rounded border">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{req.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      req.status === 'matched' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {req.status}
                    </span>
                  </div>
                  <div className="text-sm space-y-1">
                    <p><strong>Email:</strong> {req.email}</p>
                    <p><strong>Native:</strong> {req.nativeLanguage} → <strong>Learning:</strong> {req.languageLearning}</p>
                    <p><strong>Location:</strong> {req.location}</p>
                    {req.matchCount && <p className="text-green-600 font-bold">✅ Matched with {req.matchCount} partner(s)</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 bg-blue-50 border border-blue-200 p-4 rounded">
          <h3 className="font-bold mb-2">📧 Important:</h3>
          <p className="text-sm">
            Check your email inbox (rananml00@gmail.com) for:
          </p>
          <ul className="text-sm list-disc ml-6 mt-2">
            <li>Admin notifications about new requests</li>
            <li>Match confirmation emails would go to maria.test@example.com and john.test@example.com</li>
            <li>Note: Resend may be in test mode - check console logs for actual email content</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
