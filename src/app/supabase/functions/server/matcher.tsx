// Automatic Language Partner Matching System
// This module handles intelligent matching of language partners based on multiple criteria

interface PartnerRequest {
  id: string;
  name: string;
  email: string;
  occupation: string;
  languageLevel: string;
  languageLearning: string;
  nativeLanguage: string;
  meetingType: string;
  location: string;
  availability: string[];
  interests: string;
  socialMedia?: string;
  additionalNotes: string;
  notifyOnLaunch: boolean;
  submittedAt: string;
  status: string;
}

interface Match {
  partner: PartnerRequest;
  score: number;
  matchReasons: string[];
}

/**
 * Calculate match score between two partner requests
 * Score is based on language compatibility, location, availability, and other factors
 */
function calculateMatchScore(requester: PartnerRequest, candidate: PartnerRequest): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // 1. LANGUAGE COMPATIBILITY (Most Important - 40 points max)
  // Perfect match: requester learns candidate's native and vice versa
  const requesterLearnsNative = requester.languageLearning.toLowerCase().trim() === candidate.nativeLanguage.toLowerCase().trim();
  const candidateLearnsNative = candidate.languageLearning.toLowerCase().trim() === requester.nativeLanguage.toLowerCase().trim();
  
  // ⚠️ CRITICAL: At least ONE language must match, otherwise return 0 score (no match)
  if (!requesterLearnsNative && !candidateLearnsNative) {
    // No language compatibility = no match at all
    return { score: 0, reasons: ['Languages are not compatible'] };
  }
  
  if (requesterLearnsNative && candidateLearnsNative) {
    score += 40;
    reasons.push(`Perfect language match! You learn ${candidate.nativeLanguage}, they learn ${requester.nativeLanguage}`);
  } else if (requesterLearnsNative) {
    score += 25;
    reasons.push(`They speak your target language (${candidate.nativeLanguage}) natively`);
  } else if (candidateLearnsNative) {
    score += 25;
    reasons.push(`You speak their target language (${requester.nativeLanguage}) natively`);
  }

  // 2. LOCATION PROXIMITY (20 points max)
  const requesterLocation = requester.location.toLowerCase().trim();
  const candidateLocation = candidate.location.toLowerCase().trim();
  
  if (requesterLocation === candidateLocation) {
    score += 20;
    reasons.push(`Same city: ${requester.location}`);
  } else if (requesterLocation.includes(candidateLocation) || candidateLocation.includes(requesterLocation)) {
    score += 10;
    reasons.push(`Nearby location: ${candidate.location}`);
  }

  // 3. MEETING TYPE COMPATIBILITY (15 points max)
  if (requester.meetingType === candidate.meetingType) {
    score += 15;
    reasons.push(`Same meeting preference: ${requester.meetingType}`);
  } else if (requester.meetingType === 'both' || candidate.meetingType === 'both') {
    score += 10;
    reasons.push(`Flexible meeting options available`);
  } else {
    // Different preferences but not incompatible
    score += 3;
  }

  // 4. AVAILABILITY OVERLAP (15 points max)
  const availabilityOverlap = requester.availability.filter(day => 
    candidate.availability.includes(day)
  );
  
  if (availabilityOverlap.length > 0) {
    score += Math.min(15, availabilityOverlap.length * 5);
    reasons.push(`Shared availability: ${availabilityOverlap.join(', ')}`);
  }

  // 5. LANGUAGE LEVEL COMPATIBILITY (10 points max)
  // Beginners match well with intermediate/advanced
  // Intermediate match well with anyone
  // Advanced match well with advanced/native
  const levelScore = getLevelCompatibilityScore(requester.languageLevel, candidate.languageLevel);
  if (levelScore > 0) {
    score += levelScore;
    if (levelScore >= 8) {
      reasons.push(`Great level match for mutual learning`);
    }
  }

  // 6. SHARED INTERESTS (Bonus - 10 points max)
  if (requester.interests && candidate.interests) {
    const requesterInterests = requester.interests.toLowerCase().split(/[,\s]+/).filter(i => i.length > 2);
    const candidateInterests = candidate.interests.toLowerCase().split(/[,\s]+/).filter(i => i.length > 2);
    
    const sharedInterests = requesterInterests.filter(interest => 
      candidateInterests.some(ci => ci.includes(interest) || interest.includes(ci))
    );
    
    if (sharedInterests.length > 0) {
      score += Math.min(10, sharedInterests.length * 3);
      reasons.push(`Shared interests: ${sharedInterests.slice(0, 3).join(', ')}`);
    }
  }

  return { score, reasons };
}

/**
 * Get language level compatibility score
 */
function getLevelCompatibilityScore(level1: string, level2: string): number {
  const levels: { [key: string]: number } = {
    'beginner': 1,
    'intermediate': 2,
    'advanced': 3,
    'native': 4
  };

  const l1 = levels[level1.toLowerCase()] || 2;
  const l2 = levels[level2.toLowerCase()] || 2;
  const diff = Math.abs(l1 - l2);

  if (diff === 0) return 10; // Same level
  if (diff === 1) return 8;  // One level apart - still good
  if (diff === 2) return 5;  // Two levels apart - okay
  return 3; // Three levels apart - less ideal but possible
}

/**
 * Find best matches for a partner request
 * @param requester The person looking for a partner
 * @param allRequests All available partner requests
 * @param maxMatches Maximum number of matches to return
 * @param minScore Minimum score threshold for a match (default 85 = 85%)
 */
export function findMatches(
  requester: PartnerRequest, 
  allRequests: PartnerRequest[], 
  maxMatches: number = 5,
  minScore: number = 85
): Match[] {
  const matches: Match[] = [];

  for (const candidate of allRequests) {
    // Skip self
    if (candidate.id === requester.id) continue;
    // Skip rejected (but allow already matched users to get more matches!)
    if (candidate.status === 'rejected') continue;

    const { score, reasons } = calculateMatchScore(requester, candidate);

    // Only include if above minimum score
    if (score >= minScore) {
      matches.push({
        partner: candidate,
        score,
        matchReasons: reasons
      });
    }
  }

  // Sort by score (highest first) and return top matches
  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, maxMatches);
}

/**
 * Process all pending requests and find matches for each
 */
export function processAllMatches(allRequests: PartnerRequest[]): Map<string, Match[]> {
  const matchResults = new Map<string, Match[]>();
  
  const pendingRequests = allRequests.filter(r => r.status === 'pending');

  for (const requester of pendingRequests) {
    const matches = findMatches(requester, allRequests, 5, 30);
    if (matches.length > 0) {
      matchResults.set(requester.id, matches);
    }
  }

  return matchResults;
}

/**
 * Send match notification emails to both partners
 */
export async function sendMatchEmail(
  requester: PartnerRequest,
  matches: Match[],
  resendApiKey: string
): Promise<boolean> {
  try {
    // 🎯 QUICK FIX: Für jetzt senden wir NUR die Admin-E-Mail mit allen Match-Infos
    // Partner-E-Mails werden später aktiviert wenn Resend Domain verifiziert ist
    
    console.log(`📧 Match gefunden für ${requester.email} - Sende Admin-Notification...`);

    // Send admin notification with FULL match details
    try {
      const moderatorEmailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
          </head>
          <body style="font-family: Arial, sans-serif; padding: 20px; background: #f3f4f6;">
            <div style="max-width: 800px; margin: 0 auto; background: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h1 style="color: #667eea; margin: 0 0 20px 0;">🎉 NEW MATCH ALERT!</h1>
              <p style="background: #d1fae5; padding: 15px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
                <strong>✅ Match gefunden!</strong><br>
                ${matches.length} match${matches.length > 1 ? 'es' : ''} für ${requester.name}
              </p>
              
              <h2 style="color: #1f2937; margin: 30px 0 15px 0; padding-bottom: 10px; border-bottom: 3px solid #667eea;">
                👤 Requester Details
              </h2>
              <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 15px 0;">
                <p style="margin: 8px 0;"><strong>Name:</strong> ${requester.name}</p>
                <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${requester.email}">${requester.email}</a></p>
                <p style="margin: 8px 0;"><strong>Native Language:</strong> ${requester.nativeLanguage}</p>
                <p style="margin: 8px 0;"><strong>Learning:</strong> ${requester.languageLearning}</p>
                <p style="margin: 8px 0;"><strong>Level:</strong> ${requester.languageLevel}</p>
                <p style="margin: 8px 0;"><strong>Location:</strong> ${requester.location}</p>
                <p style="margin: 8px 0;"><strong>Meeting Type:</strong> ${requester.meetingType}</p>
                <p style="margin: 8px 0;"><strong>Availability:</strong> ${requester.availability.join(', ')}</p>
                ${requester.interests ? `<p style="margin: 8px 0;"><strong>Interests:</strong> ${requester.interests}</p>` : ''}
                ${requester.occupation ? `<p style="margin: 8px 0;"><strong>Occupation:</strong> ${requester.occupation}</p>` : ''}
                ${requester.socialMedia ? `<p style="margin: 8px 0;"><strong>Social Media:</strong> ${requester.socialMedia}</p>` : ''}
              </div>
              
              <h2 style="color: #1f2937; margin: 30px 0 15px 0; padding-bottom: 10px; border-bottom: 3px solid #667eea;">
                🤝 Matched Partners (${matches.length})
              </h2>
              
              ${matches.map((match, index) => `
                <div style="background: ${index === 0 ? '#f0fdf4' : '#eff6ff'}; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid ${index === 0 ? '#10b981' : '#667eea'};">
                  <h3 style="color: #1f2937; margin: 0 0 10px 0;">
                    Match #${index + 1}: ${match.partner.name} 
                    <span style="background: ${index === 0 ? '#10b981' : '#667eea'}; color: white; padding: 4px 12px; border-radius: 12px; font-size: 14px; margin-left: 10px;">
                      ${Math.round(match.score)}% Match
                    </span>
                  </h3>
                  
                  <div style="margin: 15px 0;">
                    <p style="margin: 8px 0;"><strong>Name:</strong> ${match.partner.name}</p>
                    <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${match.partner.email}">${match.partner.email}</a></p>
                    <p style="margin: 8px 0;"><strong>Native Language:</strong> ${match.partner.nativeLanguage}</p>
                    <p style="margin: 8px 0;"><strong>Learning:</strong> ${match.partner.languageLearning}</p>
                    <p style="margin: 8px 0;"><strong>Level:</strong> ${match.partner.languageLevel}</p>
                    <p style="margin: 8px 0;"><strong>Location:</strong> ${match.partner.location}</p>
                    <p style="margin: 8px 0;"><strong>Meeting Type:</strong> ${match.partner.meetingType}</p>
                    <p style="margin: 8px 0;"><strong>Availability:</strong> ${match.partner.availability.join(', ')}</p>
                    ${match.partner.interests ? `<p style="margin: 8px 0;"><strong>Interests:</strong> ${match.partner.interests}</p>` : ''}
                    ${match.partner.occupation ? `<p style="margin: 8px 0;"><strong>Occupation:</strong> ${match.partner.occupation}</p>` : ''}
                    ${match.partner.socialMedia ? `<p style="margin: 8px 0;"><strong>Social Media:</strong> ${match.partner.socialMedia}</p>` : ''}
                  </div>
                  
                  <div style="background: white; padding: 15px; border-radius: 6px; margin: 15px 0;">
                    <strong style="color: #667eea;">✨ Match Reasons:</strong>
                    <ul style="margin: 10px 0; padding-left: 20px; color: #4b5563;">
                      ${match.matchReasons.map(reason => `<li style="margin: 5px 0;">${reason}</li>`).join('')}
                    </ul>
                  </div>
                </div>
              `).join('')}
              
              <div style="background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
                <p style="margin: 0; color: #92400e;">
                  <strong>ℹ️ Hinweis:</strong> Partner-E-Mails werden aktuell NICHT automatisch versendet.<br>
                  Du kannst die Partner manuell kontaktieren mit den E-Mail-Adressen oben.
                </p>
              </div>
              
              <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                <p style="color: #1e40af; margin: 0; font-size: 14px;">
                  📊 <strong>Timestamp:</strong> ${new Date().toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}<br>
                  🔗 <strong>Request ID:</strong> ${requester.id}
                </p>
              </div>
            </div>
          </body>
        </html>
      `;
      
      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`
        },
        body: JSON.stringify({
          from: 'Spontane <onboarding@resend.dev>',
          to: ['rananml00@gmail.com'],
          subject: `🎉 MATCH: ${requester.name} ↔ ${matches.length} Partner${matches.length > 1 ? 's' : ''} (${Math.round(matches[0].score)}% Match)`,
          html: moderatorEmailHtml
        })
      });
      
      const result = await emailResponse.json();
      
      if (emailResponse.ok) {
        console.log(`✅ Admin-E-Mail erfolgreich gesendet an rananml00@gmail.com`);
        return true;
      } else {
        console.error('❌ Fehler beim Senden der Admin-E-Mail:', result);
        return false;
      }
      
    } catch (error) {
      console.error('❌ Fehler beim Senden der Admin-E-Mail:', error);
      return false;
    }
    
  } catch (error) {
    console.error(`Error in sendMatchEmail for ${requester.email}:`, error);
    return false;
  }
}