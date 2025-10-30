# 🔧 AI Troubleshooting Guide - Healthcare AI Assistant

## ✅ What Was Fixed

### 1. **Updated API Key**
- **Old Key:** `AIzaSyACwYfsZWwWRUGhFlR28xwnli5dTNqmfR8`
- **New Key:** `AIzaSyCPJYlKpIqOXE3g6EzKhuiwiyYlEPqW0nI`

### 2. **Changed AI Model**
- **Old Model:** `gemini-2.5-pro` (May not be available yet)
- **New Model:** `gemini-1.5-flash` (Stable and widely available)

### 3. **Enhanced Error Handling**
- ✅ Detailed error messages for different HTTP status codes
- ✅ Network connectivity error detection
- ✅ API key validation error messages
- ✅ Model availability error messages
- ✅ Console logging for debugging

### 4. **Added Diagnostic Features**
- ✅ AI Connection Test Button on homepage
- ✅ Real-time status indicator
- ✅ Detailed console logging
- ✅ `testGeminiConnection()` function for troubleshooting

---

## 🧪 How to Test AI Connection

### Method 1: Using Test Button (Recommended)
1. Open the application: `http://localhost:8000/index%20(1).html`
2. Look for the **"AI Health Assistant"** card in the sidebar
3. Click the **"🧪 Test AI Connection"** button
4. Wait for the test to complete
5. Check the result:
   - ✅ **Green "Connected"** = AI is working!
   - ❌ **Red "Failed"** = See error details below

### Method 2: Using Browser Console
1. Press **F12** to open Developer Tools
2. Go to the **Console** tab
3. Type: `healthcareAI.testGeminiConnection()`
4. Press **Enter**
5. Check the detailed logs:

```
🧪 Testing Gemini AI Connection...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔑 API Key: Present (AIzaSyCPJYlKp...)
🎯 Model: gemini-1.5-flash
🌐 API URL: https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📤 Sending request to: https://...
📥 Response status: 200
✅ Response received successfully
💬 AI Response: Hello! I'm working correctly...
✅ Connection Test PASSED
```

---

## 🔍 Diagnosing Common Errors

### Error 1: API Key Invalid (403 Forbidden)
**Symptoms:**
- Status: `403`
- Message: "API key is invalid or lacks permissions"

**Possible Causes:**
- ❌ API key is incorrect
- ❌ API key doesn't have Gemini API enabled
- ❌ API key restrictions (IP, HTTP referrer, etc.)

**Solution:**
1. Verify API key in Google Cloud Console
2. Enable "Generative Language API" for your project
3. Check API key restrictions
4. Create a new API key if needed

**How to Verify:**
```javascript
// Check in browser console:
console.log('Current API Key:', GEMINI_CONFIG.API_KEY);
```

---

### Error 2: Model Not Found (404 Not Found)
**Symptoms:**
- Status: `404`
- Message: "Model 'gemini-1.5-flash' not found"

**Possible Causes:**
- ❌ Model name is misspelled
- ❌ Model is not available in your region
- ❌ Model requires different API version

**Solution:**
1. Try alternative models:
   - `gemini-1.5-flash` (Fast, recommended)
   - `gemini-1.5-pro` (Advanced)
   - `gemini-pro` (Stable)

2. Update model in `main.js`:
```javascript
const GEMINI_CONFIG = {
    API_KEY: 'AIzaSyCPJYlKpIqOXE3g6EzKhuiwiyYlEPqW0nI',
    MODEL: 'gemini-1.5-flash', // Try: 'gemini-pro' or 'gemini-1.5-pro'
    API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
};
```

---

### Error 3: Network Error (Failed to Fetch)
**Symptoms:**
- Message: "Failed to fetch" or "NetworkError"
- Console shows CORS or network errors

**Possible Causes:**
- ❌ No internet connection
- ❌ Firewall blocking requests
- ❌ CORS issues (when running locally)
- ❌ Google services blocked in your region

**Solution:**
1. Check internet connection
2. Try accessing: https://ai.google.dev/ (should load)
3. Disable browser extensions (ad blockers, etc.)
4. Try different browser (Chrome recommended)
5. Check firewall settings

---

### Error 4: Invalid Request (400 Bad Request)
**Symptoms:**
- Status: `400`
- Message: "Invalid request"

**Possible Causes:**
- ❌ Request format is incorrect
- ❌ Model parameters are invalid
- ❌ API version mismatch

**Solution:**
Check the request format in console and verify it matches the API documentation.

---

### Error 5: Rate Limit (429 Too Many Requests)
**Symptoms:**
- Status: `429`
- Message: "Rate limit exceeded"

**Possible Causes:**
- ❌ Too many requests in short time
- ❌ Free tier quota exhausted

**Solution:**
1. Wait a few minutes before retrying
2. Check your quota in Google Cloud Console
3. Consider upgrading to paid tier

---

## 📋 Checklist: Is Everything Configured Correctly?

### ✅ API Key Configuration
- [ ] API key is 39 characters long
- [ ] API key starts with `AIza`
- [ ] API key is correctly placed in `main.js`
- [ ] No extra spaces or quotes around key

### ✅ Google Cloud Setup
- [ ] "Generative Language API" is enabled
- [ ] API key has no restrictions OR restrictions allow your domain
- [ ] Billing is enabled (if using paid features)
- [ ] Project quota is not exhausted

### ✅ Network & Browser
- [ ] Internet connection is working
- [ ] Can access https://ai.google.dev/
- [ ] Browser console shows no CORS errors
- [ ] JavaScript is enabled
- [ ] No ad-blockers interfering

### ✅ Code Configuration
- [ ] Model name is correct in `GEMINI_CONFIG`
- [ ] API URL matches the model name
- [ ] No typos in configuration
- [ ] Server is running (`http://localhost:8000`)

---

## 🎯 Step-by-Step Verification

### Step 1: Verify API Key Format
```javascript
// Open browser console (F12) and run:
console.log('API Key Length:', GEMINI_CONFIG.API_KEY.length);
console.log('API Key Prefix:', GEMINI_CONFIG.API_KEY.substring(0, 4));

// Expected output:
// API Key Length: 39
// API Key Prefix: AIza
```

### Step 2: Test Network Connection
```javascript
// Test if you can reach Google AI API:
fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + GEMINI_CONFIG.API_KEY)
  .then(r => r.json())
  .then(d => console.log('Available models:', d))
  .catch(e => console.error('Network error:', e));
```

### Step 3: Test AI Response
```javascript
// Run the built-in test:
healthcareAI.testGeminiConnection();

// Or test manually:
healthcareAI.callGeminiAI('Say hello in one sentence', {})
  .then(response => console.log('AI Response:', response))
  .catch(error => console.error('Error:', error));
```

---

## 🔧 Manual API Key Update

If you need to change the API key without editing files:

```javascript
// In browser console (F12):
GEMINI_CONFIG.API_KEY = 'YOUR_NEW_API_KEY_HERE';
console.log('✅ API Key updated to:', GEMINI_CONFIG.API_KEY.substring(0, 15) + '...');

// Test immediately:
healthcareAI.testGeminiConnection();
```

---

## 📊 Understanding Console Logs

When AI functions are called, you'll see detailed logs:

```
🤖 Calling Gemini AI...
📝 Prompt: Hello! Can you briefly confirm you are working?
🔑 API Key: AIzaSyCPJY...
🎯 Model: gemini-1.5-flash
📤 Sending request to: https://generativelanguage.googleapis.com/...
📥 Response status: 200
✅ Response received successfully
💬 AI Response: Hello! I'm working correctly...
```

### Log Status Meanings:
- 🤖 = AI function started
- 📝 = Shows the prompt being sent
- 🔑 = Confirms API key is present
- 📤 = Request being sent
- 📥 = Response received
- ✅ = Success
- ❌ = Error occurred

---

## 🎨 Visual Error Indicators

### In the Application:
- **🟢 Green Badge** = AI is connected and working
- **🔴 Red Badge** = AI connection failed
- **🟡 Yellow Badge** = AI not tested yet

### Error Messages:
- **⚠️ Network Error** = Check internet connection
- **⚠️ API Key Error** = Verify your API key
- **⚠️ Model Error** = Try a different model
- **⚠️ AI Service Error** = Temporary issue, try again

---

## 🚀 Quick Fix Checklist

If AI is not working, try these in order:

1. **Click "Test AI Connection" button** on homepage
2. **Open browser console (F12)** and check for errors
3. **Verify API key** is correct in `main.js`
4. **Try a different model** (gemini-1.5-flash → gemini-pro)
5. **Check internet connection**
6. **Try different browser** (Chrome recommended)
7. **Disable browser extensions** temporarily
8. **Clear browser cache** and reload
9. **Check Google Cloud Console** for API status
10. **Create a new API key** if all else fails

---

## 💡 Still Not Working?

### Get Detailed Error Information:
1. Open the application
2. Press **F12** to open Developer Tools
3. Go to **Console** tab
4. Click "Test AI Connection" button
5. **Copy all red error messages**
6. Share them for specific troubleshooting

### Common Solutions:
- **403 Error** → Check API key and enable Generative Language API
- **404 Error** → Change model to `gemini-pro`
- **Network Error** → Check firewall/proxy settings
- **CORS Error** → Use `http://localhost:8000` (not `file://`)

---

## 📞 Support Resources

- **Google AI Documentation:** https://ai.google.dev/docs
- **API Key Management:** https://console.cloud.google.com/apis/credentials
- **Enable APIs:** https://console.cloud.google.com/apis/library
- **Gemini API Pricing:** https://ai.google.dev/pricing

---

## ✅ Success Indicators

You'll know AI is working when:
- ✅ Test button shows green "Connected" status
- ✅ Console shows "✅ Connection Test PASSED"
- ✅ No red errors in browser console
- ✅ AI responses appear in results page
- ✅ AI insights generate automatically

---

## 🎉 Expected Behavior

When AI is working correctly:

1. **Homepage:** Test button returns success
2. **Results Page:** AI insights generate automatically
3. **Results Page:** Clicking AI questions shows responses
4. **Recommendations Page:** AI assistant answers questions
5. **Console:** No red error messages

---

**Last Updated:** October 31, 2025  
**API Key:** AIzaSyCPJYlKpIqOXE3g6EzKhuiwiyYlEPqW0nI  
**Model:** gemini-1.5-flash  
**Status:** Enhanced error handling active ✅
