# 🎯 Admin Portal Quick Access Guide

## 🌐 Admin Portal URL

**Production (Live):**
```
https://mithungangadharaiah.github.io/PWA_HealthMetrics/admin-dashboard.html
```

**Local (Testing):**
```
https://localhost:8443/admin-dashboard.html
```

---

## 🔐 Login Credentials

**Admin Email:** `mithunglares@gmail.com`

> ⚠️ **IMPORTANT:** Only this email address has admin access. Anyone else will see "Access Denied"

---

## 📊 Admin Dashboard Layout

When you sign in, you'll see:

```
╔════════════════════════════════════════════════════════════════╗
║                    📊 Admin Dashboard                          ║
║              Health Metrics User Analytics                     ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌──────────┐║
║  │👥 Total    │  │✅ Active   │  │📊 Total    │  │🤖 AI     │║
║  │   Users    │  │   Today    │  │   Tests    │  │ Requests │║
║  │    25      │  │     8      │  │    150     │  │    3     │║ ← Check here!
║  └────────────┘  └────────────┘  └────────────┘  └──────────┘║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║  🤖 AI Access Requests (Pending Approval)    ← MAIN SECTION   ║
╠════════════════════════════════════════════════════════════════╣
║  Email          Name     Requested        Status    Actions   ║
║  ───────────────────────────────────────────────────────────  ║
║  user@test.com  John     Oct 3, 2:30 PM   ⏳ Pending  ✅ ❌  ║
║  jane@test.com  Jane     Oct 3, 1:15 PM   ⏳ Pending  ✅ ❌  ║
║  bob@test.com   Bob      Oct 2, 5:00 PM   ⏳ Pending  ✅ ❌  ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║  👥 Recent Users                                               ║
╠════════════════════════════════════════════════════════════════╣
║  Email         Name    AI Access  Tests  Last Login  Actions  ║
║  ───────────────────────────────────────────────────────────  ║
║  admin@...     Admin   ✅ Enabled  25    Oct 3, 3:00  [Disable]║
║  user@...      John    ❌ Disabled  5    Oct 3, 2:30  [Enable] ║
║  jane@...      Jane    ❌ Disabled  3    Oct 3, 1:15  [Enable] ║
╚════════════════════════════════════════════════════════════════╝
```

---

## ✅ How to Approve AI Requests (Step by Step)

### Method 1: Approve Pending Requests (Recommended)

**Step 1:** Open admin dashboard URL in your browser

**Step 2:** Sign in with Google
- Use: `mithunglares@gmail.com`
- Click "Sign in with Google"
- Choose your account

**Step 3:** Look at the **"🤖 AI Requests"** stat
- Top right corner of statistics section
- Shows number of pending requests
- Example: "🤖 AI Requests: 3" means 3 people waiting

**Step 4:** Scroll to **"🤖 AI Access Requests"** section
- Below the statistics
- Shows table of pending requests

**Step 5:** Review each request
- Check user email (legitimate?)
- Check request date/time
- Decide if you want to grant access

**Step 6:** Click **[✅ Approve]** button
- Next to the user you want to approve
- Browser will ask "Approve AI access for this user?"
- Click "OK"

**Step 7:** Done! ✅
- Request disappears from pending list
- User gets instant AI access
- User can now use AI features

---

### Method 2: Manually Enable AI for Any User

**Use this when:**
- You want to grant AI access without waiting for request
- You want to give yourself AI access for testing
- You want to revoke AI access from someone

**Steps:**

1. **Scroll to "Recent Users" section**
   - Shows all registered users

2. **Find the user in the table**
   - Look at "AI Access" column
   - ✅ Enabled = Has AI access
   - ❌ Disabled = No AI access

3. **Click the action button**
   - **[Enable AI]** - Give AI access
   - **[Disable AI]** - Revoke AI access

4. **Confirm the action**
   - Click "OK" when prompted

5. **Done! Changes apply immediately**

---

## 🧪 Testing the System

### Test as a Regular User:

1. **Sign out** of your admin account
2. **Sign in** with a different Google account (test account)
3. Open: `https://mithungangadharaiah.github.io/PWA_HealthMetrics/HealthMetrics.html`
4. Complete 60-second health monitoring
5. Click **"🤖 AI Analysis"** button
6. You should see: **"🔒 AI Analysis Feature Locked"**
7. Click **"📝 Request AI Access"**
8. See confirmation: **"✅ Request Submitted!"**

### Test as Admin (Approve the Request):

1. **Sign back in** to admin dashboard
2. You should now see **"🤖 AI Requests: 1"**
3. Scroll to **"AI Access Requests"** section
4. See your test account's request
5. Click **[✅ Approve]**
6. Request disappears

### Test AI Access After Approval:

1. **Go back** to HealthMetrics.html (as test user)
2. **Refresh** the page (important!)
3. Complete monitoring again
4. Click **"🤖 AI Analysis"**
5. This time it should **work!** ✅
6. You'll see AI-enhanced health insights

---

## 💡 Quick Actions

### Grant Yourself AI Access (for Testing):

1. Open admin dashboard
2. Sign in with `mithunglares@gmail.com`
3. Scroll to "Recent Users"
4. Find your own email
5. Click **[Enable AI]**
6. Done! Now you can test AI features

### Check Who Has AI Access:

1. Open admin dashboard
2. Look at "Recent Users" table
3. Check "AI Access" column
4. ✅ = User has access
5. ❌ = User doesn't have access

### Revoke Someone's AI Access:

1. Open admin dashboard
2. Find user in "Recent Users"
3. Click **[Disable AI]**
4. Confirm
5. Done! They can no longer use AI

---

## 🐛 Troubleshooting

### "I don't see any pending requests"

**This is normal if:**
- System just deployed
- No users have requested access yet

**To test:**
- Create a test request (see "Testing" section above)

### "I can't sign in to admin dashboard"

**Check:**
- Are you using `mithunglares@gmail.com`?
- Only this email has admin access
- Other emails will see "Access Denied"

### "Approval button doesn't work"

**Check:**
- Did you update Firestore security rules?
- Go to Firebase Console → Firestore → Rules
- Copy rules from `firestore.rules` file
- Click "Publish"

### "User still can't access AI after approval"

**Solution:**
- User needs to refresh the page
- Have them sign out and sign back in
- Check Firestore: users/{userId}/aiEnabled should be `true`

---

## 📱 Mobile Access

You can manage AI permissions from your phone!

1. Open **Safari** (iPhone) or **Chrome** (Android)
2. Navigate to admin dashboard URL
3. Sign in with Google
4. Approve/deny requests on the go!

**Tip:** Bookmark the admin URL on your phone for quick access

---

## 🔒 Security Notes

- Only `mithunglares@gmail.com` can access admin dashboard
- All other emails see "Access Denied"
- To add more admins, update `ADMIN_EMAILS` in `firebase-config-production.js`
- Firebase security rules protect the database

---

## 📊 Monitoring Dashboard

Keep an eye on these metrics:

- **🤖 AI Requests**: Number waiting for approval (keep this low!)
- **👥 Total Users**: All registered users
- **✅ Active Today**: Users active in last 24 hours
- **📊 Total Tests**: Health monitoring sessions completed

---

## 🎯 Best Practices

### Approve if:
- ✅ User has 3+ health monitoring sessions
- ✅ Legitimate email address
- ✅ Active engagement with app

### Deny if:
- ❌ Brand new user (0 sessions)
- ❌ Spam/suspicious email
- ❌ Obvious bot account

### Daily Routine:
1. Check admin dashboard once a day
2. Review pending AI requests
3. Approve legitimate users
4. Deny spam/suspicious accounts
5. Monitor AI usage (future feature)

---

## 📞 Quick Reference

| What | Where |
|------|-------|
| **Admin URL** | https://mithungangadharaiah.github.io/PWA_HealthMetrics/admin-dashboard.html |
| **Admin Email** | mithunglares@gmail.com |
| **Main Section** | "🤖 AI Access Requests (Pending Approval)" |
| **Action Buttons** | [✅ Approve] or [❌ Deny] |
| **Manual Control** | "Recent Users" → [Enable AI] / [Disable AI] |

---

## 🚀 Next Steps

1. ✅ Open admin dashboard now
2. ✅ Sign in and explore
3. ✅ Enable AI for yourself (for testing)
4. ✅ Test the request workflow
5. ✅ Bookmark the URL for easy access

---

**Ready to manage AI permissions!** 🎉

Open the admin portal: **[Click Here](https://mithungangadharaiah.github.io/PWA_HealthMetrics/admin-dashboard.html)**
