# 🧪 Testing Guide: Automatic Language Partner Matching System

## 🚀 Quick Start - How to Test

### Method 1: Visual Test Dashboard (Recommended)
1. **Open your app with test mode:**
   ```
   Add ?test=true to your URL
   Example: https://your-app.com/?test=true
   ```

2. **You'll see a beautiful test dashboard with:**
   - ✅ Quick test scenario buttons
   - 📊 Real-time test results log
   - 📋 Complete table of all requests
   - 🧪 Three ready-made test scenarios

3. **Run Test Scenarios:**
   - **Perfect Match:** Creates 2 users that match perfectly (German ↔ English)
   - **Multiple Matches:** Creates 4 users where 1 gets 3 matches
   - **No Match:** Creates a user with no compatible matches

4. **Check Results:**
   - Watch the test log in real-time
   - Check your email (rananml00@gmail.com) for match notifications
   - See match counts in the requests table

---

## 📧 What to Expect in Emails

### When Matches Are Found:
You'll receive a beautiful email with:
- 🎉 "Great News! We found X perfect language partners for you!"
- Each match shows:
  - Match score (percentage)
  - Why it's a great match
  - Contact information
  - Language details
- 💡 Pro tips for reaching out
- 💌 Sample introduction message

### Admin Notification:
You (rananml00@gmail.com) will also get:
- Summary of the new request
- Whether matches were found automatically
- Match count if successful

---

## 🧪 Manual Testing with Browser Console

You can also test directly from browser console:

```javascript
// Test 1: Create a German learner
fetch('https://YOUR-PROJECT-ID.supabase.co/functions/v1/make-server-515521c4/speaking-partner', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR-ANON-KEY'
  },
  body: JSON.stringify({
    name: 'Test Maria',
    email: 'rananml00@gmail.com',
    languageLevel: 'intermediate',
    languageLearning: 'German',
    nativeLanguage: 'English',
    meetingType: 'both',
    location: 'Frankfurt',
    availability: ['weekday_evenings'],
    interests: 'travel, books',
    additionalNotes: 'Looking for practice',
    consent: true
  })
}).then(r => r.json()).then(console.log);

// Wait 5 seconds, then create matching partner
setTimeout(() => {
  fetch('https://YOUR-PROJECT-ID.supabase.co/functions/v1/make-server-515521c4/speaking-partner', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR-ANON-KEY'
    },
    body: JSON.stringify({
      name: 'Test Hans',
      email: 'rananml00@gmail.com',
      languageLevel: 'advanced',
      languageLearning: 'English',
      nativeLanguage: 'German',
      meetingType: 'both',
      location: 'Frankfurt',
      availability: ['weekday_evenings'],
      interests: 'travel, technology',
      additionalNotes: 'Native German',
      consent: true
    })
  }).then(r => r.json()).then(console.log);
}, 5000);
```

---

## ✅ Verification Checklist

### 1. Check System Logs (Server)
Look for these messages in your Supabase Edge Function logs:
```
✅ Speaking partner request received from [email]
🔍 Starting automatic matching for [email]
✅ Found [X] matches for [email]
📧 Match notification email sent to [email]
```

### 2. Check Email (rananml00@gmail.com)
You should receive:
- ✉️ Admin notification about new request
- ✉️ Match notification emails (if matches found)

### 3. Check Database
Access: `https://YOUR-PROJECT-ID.supabase.co/functions/v1/make-server-515521c4/speaking-partner/requests`

Should show:
```json
{
  "success": true,
  "count": 2,
  "requests": [
    {
      "id": "partner_...",
      "status": "matched",
      "matchCount": 1,
      "matchedAt": "2026-01-21T..."
    }
  ]
}
```

---

## 🎯 Test Scenarios Explained

### Scenario 1: Perfect Match ✅
**Setup:**
- User A: Learns German, speaks English, Frankfurt
- User B: Learns English, speaks German, Frankfurt

**Expected Result:**
- Both users get match emails
- Match score: ~85-95%
- Match reasons: "Perfect language match!", "Same city"

---

### Scenario 2: Multiple Matches 🔢
**Setup:**
- 3 Spanish speakers learning English
- 1 English speaker learning Spanish

**Expected Result:**
- English speaker gets email with 3 matches
- All 3 Spanish speakers get email with 1 match
- Match scores vary based on location/interests

---

### Scenario 3: No Match ❌
**Setup:**
- User learns Japanese, speaks Korean
- No Korean learners exist

**Expected Result:**
- Request stored successfully
- No match email sent (no compatible partners)
- Admin email shows "No matches yet"
- Will auto-match when compatible partner signs up later

---

## 🐛 Troubleshooting

### No Emails Received?
1. Check spam folder
2. Verify RESEND_API_KEY is set in Supabase
3. Check if email is in Resend allowed domains (test mode restriction)
4. Check server logs for errors

### Matches Not Found?
1. Verify languages are exact matches (case-insensitive)
2. Check minimum score threshold (30 points)
3. Ensure both users have consent: true
4. Check that users aren't already matched

### Server Errors?
1. Check Supabase Edge Function logs
2. Verify matcher.tsx is deployed
3. Check RESEND_API_KEY environment variable
4. Test health endpoint: `/make-server-515521c4/health`

---

## 📊 Match Score Breakdown

Understanding how the algorithm works:

| Criteria | Max Points | When Awarded |
|----------|-----------|--------------|
| **Languages** | 40 | Perfect mutual learning |
| **Location** | 20 | Same city |
| **Meeting Type** | 15 | Same preference |
| **Availability** | 15 | Overlapping schedule |
| **Language Level** | 10 | Compatible levels |
| **Interests** | 10 | Shared hobbies |

**Minimum threshold:** 30 points
**Perfect score:** 100 points

---

## 🎉 Success Indicators

You'll know it's working when:
- ✅ Test users are created successfully
- ✅ Server logs show "Starting automatic matching"
- ✅ Server logs show "Found X matches"
- ✅ Emails arrive within 10-30 seconds
- ✅ Match emails contain detailed partner information
- ✅ Request status changes to "matched" in database

---

## 💡 Pro Testing Tips

1. **Use Your Real Email:** All test emails go to rananml00@gmail.com
2. **Test Different Scenarios:** Try various language combinations
3. **Check Match Quality:** Verify scores make sense
4. **Test Edge Cases:** No matches, partial matches, perfect matches
5. **Clear Database:** Use test dashboard to see all requests

---

## 🆘 Need Help?

If something doesn't work:
1. Open test dashboard: `?test=true`
2. Check test results log for errors
3. Verify all requests in the table
4. Check your email for notifications
5. Review server logs in Supabase

The system should work automatically - no manual intervention needed! 🚀
