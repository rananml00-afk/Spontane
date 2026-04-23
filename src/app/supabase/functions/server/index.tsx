import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { findMatches, sendMatchEmail, processAllMatches } from "./matcher.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-515521c4/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Debug endpoint to check environment variables (no auth required for easier testing)
app.get("/make-server-515521c4/debug-env", (c) => {
  const resendKey = Deno.env.get('RESEND_API_KEY');
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');
  
  return c.json({ 
    environment: {
      hasResendKey: !!resendKey,
      resendKeyPrefix: resendKey ? resendKey.substring(0, 7) + '...' : 'NOT_SET',
      resendKeyLength: resendKey ? resendKey.length : 0,
      hasSupabaseUrl: !!supabaseUrl,
      hasSupabaseAnonKey: !!supabaseAnonKey
    },
    timestamp: new Date().toISOString()
  });
});

// Speaking Partner submission endpoint
app.post("/make-server-515521c4/speaking-partner", async (c) => {
  try {
    const body = await c.req.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'occupation', 'languageLevel', 'languageLearning', 'nativeLanguage', 'meetingType', 'location', 'consent'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return c.json({ error: `Missing required field: ${field}` }, 400);
      }
    }
    
    if (!body.consent) {
      return c.json({ error: 'User consent is required' }, 400);
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return c.json({ error: 'Invalid email address' }, 400);
    }
    
    // Generate unique ID for the request
    const requestId = `partner_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Store the request in KV store
    const requestData = {
      id: requestId,
      name: body.name,
      email: body.email,
      occupation: body.occupation,
      languageLevel: body.languageLevel,
      languageLearning: body.languageLearning,
      nativeLanguage: body.nativeLanguage,
      meetingType: body.meetingType,
      location: body.location,
      availability: body.availability || [],
      interests: body.interests || '',
      socialMedia: body.socialMedia || '',
      additionalNotes: body.additionalNotes || '',
      notifyOnLaunch: true, // Automatically set to true since it's part of consent
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };
    
    await kv.set(`speaking_partner:${requestId}`, requestData);
    
    console.log(`Speaking partner request received from ${body.email} for ${body.languageLearning} in ${body.location}`);
    
    // AUTOMATIC MATCHING: Find matches for this new request
    let matchCount = 0;
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      
      if (resendApiKey) {
        console.log(`🔍 Starting automatic matching for ${body.email}...`);
        
        // Get all existing requests
        const allRequests = await kv.getByPrefix('speaking_partner:');
        
        // Find matches for the new request (60% threshold = 60 out of 100 points)
        const matches = findMatches(requestData, allRequests, 5, 60);
        
        if (matches.length > 0) {
          console.log(`✅ Found ${matches.length} compatible matches (≥60%) for ${body.email}`);
          matchCount = matches.length;
          
          // Send match notification (only to admin for now)
          const emailSent = await sendMatchEmail(requestData, matches, resendApiKey);
          
          if (emailSent) {
            console.log(`📧 Match notification email sent to admin`);
            
            // Update status to indicate matches were found
            requestData.status = 'matched';
            requestData.matchedAt = new Date().toISOString();
            requestData.matchCount = matches.length;
            await kv.set(`speaking_partner:${requestId}`, requestData);
          }
        } else {
          console.log(`ℹ️ No compatible matches (≥60%) found yet for ${body.email}. Will auto-match when compatible partners submit requests.`);
        }
        
        // Send admin notification about new submission
        const matchStatusHtml = matchCount > 0 
          ? '<p style="background: #d1fae5; padding: 10px; border-radius: 5px;"><strong>✅ Automatic Matching:</strong> ' + matchCount + ' compatible matches (≥60%) found! Match-E-Mail an Admin gesendet.</p>'
          : '<p style="background: #fee2e2; padding: 10px; border-radius: 5px;"><strong>ℹ️ No matches yet:</strong> Will auto-match when compatible partners (≥60%) submit requests.</p>';
        
        const adminEmailHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
            </head>
            <body style="font-family: Arial, sans-serif; padding: 20px;">
              <div style="max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 30px; border-radius: 10px;">
                <h2 style="color: #667eea;">🎯 New Speaking Partner Request</h2>
                <p><strong>Name:</strong> ${body.name}</p>
                <p><strong>Email:</strong> ${body.email}</p>
                <p><strong>Occupation:</strong> ${body.occupation}</p>
                <p><strong>Learning:</strong> ${body.languageLearning}</p>
                <p><strong>Native:</strong> ${body.nativeLanguage}</p>
                <p><strong>Location:</strong> ${body.location}</p>
                <p><strong>Level:</strong> ${body.languageLevel}</p>
                <p><strong>Meeting:</strong> ${body.meetingType}</p>
                ${body.socialMedia ? `<p><strong>Social Media:</strong> ${body.socialMedia}</p>` : ''}
                ${matchStatusHtml}
              </div>
            </body>
          </html>
        `;
        
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: 'Spontane <onboarding@resend.dev>',
            to: ['rananml00@gmail.com'],
            subject: `🎯 New Partner Request: ${body.name} - ${matchCount > 0 ? matchCount + ' Auto-Matched (≥60%)!' : 'Pending'}`,
            html: adminEmailHtml
          })
        });
      } else {
        console.warn('⚠️ RESEND_API_KEY not configured. Skipping automatic matching.');
      }
    } catch (matchError) {
      console.error('❌ Error during automatic matching:', matchError);
      // Don't fail the request if matching fails
    }
    
    return c.json({ 
      success: true, 
      message: 'Request submitted successfully',
      requestId: requestId
    });
    
  } catch (error) {
    console.error('Error processing speaking partner request:', error);
    return c.json({ error: 'Internal server error. Please try again later.' }, 500);
  }
});

// Get all speaking partner requests (for admin use)
app.get("/make-server-515521c4/speaking-partner/requests", async (c) => {
  try {
    const requests = await kv.getByPrefix('speaking_partner:');
    return c.json({ 
      success: true, 
      count: requests.length,
      requests: requests 
    });
  } catch (error) {
    console.error('Error fetching speaking partner requests:', error);
    return c.json({ error: 'Failed to fetch requests' }, 500);
  }
});

// Process all matches and send emails
app.post("/make-server-515521c4/speaking-partner/process-matches", async (c) => {
  try {
    const requests = await kv.getByPrefix('speaking_partner:');
    const matches = findMatches(requests);
    
    for (const match of matches) {
      await sendMatchEmail(match);
    }
    
    return c.json({ 
      success: true, 
      message: 'Matches processed and emails sent successfully',
      matchCount: matches.length
    });
  } catch (error) {
    console.error('Error processing matches:', error);
    return c.json({ error: 'Failed to process matches' }, 500);
  }
});

// TEST EMAIL ENDPOINT - Check if Resend is working
app.post("/make-server-515521c4/test-email", async (c) => {
  try {
    const body = await c.req.json();
    const testEmail = body.email || 'rananml00@gmail.com';
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      return c.json({ 
        success: false, 
        error: 'RESEND_API_KEY not configured' 
      }, 500);
    }

    console.log(`🧪 Sending test email to: ${testEmail}`);

    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: 'Spontane <onboarding@resend.dev>',
        to: [testEmail],
        subject: '🧪 Test Email from Spontane - Resend Configuration Check',
        html: `
          <!DOCTYPE html>
          <html>
            <body style="font-family: Arial, sans-serif; padding: 40px; background: #f3f4f6;">
              <div style="max-width: 600px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px;">
                <h1 style="color: #667eea;">🧪 Test Email Erfolgreich!</h1>
                <p style="font-size: 16px; color: #374151;">
                  Diese Test-E-Mail wurde erfolgreich über Resend versendet.
                </p>
                <div style="background: #d1fae5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                  <strong style="color: #065f46;">✅ Resend funktioniert!</strong>
                  <p style="color: #065f46; margin: 10px 0 0 0;">
                    Dein Resend API Key ist korrekt konfiguriert und E-Mails werden versendet.
                  </p>
                </div>
                <p style="color: #6b7280; font-size: 14px;">
                  <strong>Timestamp:</strong> ${new Date().toISOString()}<br>
                  <strong>Empfänger:</strong> ${testEmail}
                </p>
              </div>
            </body>
          </html>
        `
      })
    });

    const result = await emailResponse.json();
    
    console.log('📧 Resend API Response:', result);

    if (emailResponse.ok) {
      return c.json({ 
        success: true, 
        message: `Test email sent successfully to ${testEmail}`,
        resendResponse: result
      });
    } else {
      // Check for test mode error
      if (result.statusCode === 403 && result.message?.includes('testing emails')) {
        return c.json({
          success: false,
          error: 'RESEND_TEST_MODE',
          message: 'Resend ist im Test-Modus. E-Mails können nur an verifizierte Adressen gesendet werden.',
          instructions: 'Verifiziere eine Domain bei resend.com/domains oder füge die E-Mail-Adresse zu den zugelassenen Test-Empfängern hinzu.',
          resendResponse: result
        });
      }

      return c.json({ 
        success: false, 
        error: 'Email sending failed',
        resendResponse: result
      }, emailResponse.status);
    }
  } catch (error) {
    console.error('Error sending test email:', error);
    return c.json({ 
      success: false, 
      error: 'Internal server error',
      details: error.message 
    }, 500);
  }
});

// RE-MATCH ALL - Send emails to all existing matches
app.post("/make-server-515521c4/speaking-partner/rematch-all", async (c) => {
  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      return c.json({ 
        success: false, 
        error: 'RESEND_API_KEY not configured' 
      }, 500);
    }

    console.log('🔄 Starting RE-MATCH ALL process...');

    // Get all requests
    const allRequests = await kv.getByPrefix('speaking_partner:');
    console.log(`📊 Found ${allRequests.length} total requests`);

    let matchesSent = 0;
    let errors = 0;
    const log: string[] = [];

    // Process each request
    for (const requester of allRequests) {
      try {
        log.push(`\n🔍 Processing: ${requester.name} (${requester.email})`);
        log.push(`   Lernt: ${requester.languageLearning}, Muttersprache: ${requester.nativeLanguage}`);

        // Find matches for this person (60% threshold)
        const matches = findMatches(requester, allRequests, 5, 60);

        if (matches.length > 0) {
          log.push(`   ✅ Found ${matches.length} matches!`);
          
          // Send email
          const emailSent = await sendMatchEmail(requester, matches, resendApiKey);
          
          if (emailSent) {
            matchesSent++;
            log.push(`   📧 Email sent successfully`);
            
            // Update status
            requester.status = 'matched';
            requester.matchedAt = new Date().toISOString();
            requester.matchCount = matches.length;
            await kv.set(`speaking_partner:${requester.id}`, requester);
          } else {
            errors++;
            log.push(`   ❌ Email failed`);
          }
        } else {
          log.push(`   ℹ️ No matches found (need ≥60% compatibility)`);
        }
      } catch (error) {
        errors++;
        log.push(`   ❌ Error: ${error.message}`);
        console.error(`Error processing ${requester.email}:`, error);
      }
    }

    log.push(`\n📊 SUMMARY:`);
    log.push(`   Total requests: ${allRequests.length}`);
    log.push(`   Emails sent: ${matchesSent}`);
    log.push(`   Errors: ${errors}`);

    console.log('🎉 RE-MATCH ALL completed!');
    console.log(log.join('\n'));

    return c.json({
      success: true,
      message: 'Re-matching completed',
      stats: {
        totalRequests: allRequests.length,
        emailsSent: matchesSent,
        errors: errors
      },
      log: log
    });

  } catch (error) {
    console.error('Error in rematch-all:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to process rematch',
      details: error.message 
    }, 500);
  }
});

// Waitlist submission endpoint
app.post("/make-server-515521c4/waitlist", async (c) => {
  try {
    const body = await c.req.json();
    
    // Validate required fields
    if (!body.name || !body.email || !body.emailConsent) {
      return c.json({ error: 'Missing required fields' }, 400);
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return c.json({ error: 'Invalid email address' }, 400);
    }
    
    // Generate unique ID
    const waitlistId = `waitlist_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Store in KV store
    const waitlistData = {
      id: waitlistId,
      name: body.name,
      email: body.email,
      emailConsent: body.emailConsent,
      submittedAt: new Date().toISOString()
    };
    
    await kv.set(`waitlist:${waitlistId}`, waitlistData);
    
    console.log(`Waitlist signup: ${body.email}`);
    
    // Send admin notification
    try {
      const resendApiKey = Deno.env.get('RESEND_API_KEY');
      if (resendApiKey) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: 'Spontane <onboarding@resend.dev>',
            to: ['rananml00@gmail.com'],
            subject: `🎉 New Waitlist Signup: ${body.name}`,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2 style="color: #667eea;">New Waitlist Signup</h2>
                <p><strong>Name:</strong> ${body.name}</p>
                <p><strong>Email:</strong> ${body.email}</p>
                <p><strong>Signed up:</strong> ${new Date().toLocaleString()}</p>
              </div>
            `
          })
        });
      }
    } catch (emailError) {
      console.error('Error sending admin notification:', emailError);
    }
    
    return c.json({ 
      success: true, 
      message: 'Successfully joined waitlist',
      waitlistId: waitlistId
    });
    
  } catch (error) {
    console.error('Error processing waitlist signup:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

// Get all waitlist signups (for admin use)
app.get("/make-server-515521c4/waitlist/signups", async (c) => {
  try {
    const signups = await kv.getByPrefix('waitlist:');
    return c.json({ 
      success: true, 
      count: signups.length,
      signups: signups 
    });
  } catch (error) {
    console.error('Error fetching waitlist signups:', error);
    return c.json({ error: 'Failed to fetch signups' }, 500);
  }
});

// Newsletter signup endpoint
app.post("/make-server-515521c4/newsletter-signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email } = body;
    
    if (!email || !email.includes('@')) {
      return c.json({ error: 'Valid email is required' }, 400);
    }
    
    // Store newsletter signup in KV store
    const key = `newsletter_${Date.now()}_${email}`;
    await kv.set(key, {
      email,
      subscribedAt: new Date().toISOString(),
    });
    
    console.log(`Newsletter signup: ${email}`);
    
    return c.json({ 
      success: true,
      message: 'Successfully subscribed to newsletter'
    });
  } catch (error) {
    console.error('Newsletter signup error:', error);
    return c.json({ error: 'Failed to subscribe to newsletter' }, 500);
  }
});

Deno.serve(app.fetch);