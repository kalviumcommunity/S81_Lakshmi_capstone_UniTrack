# Video Walkthrough Recording Checklist (Backend Deployment)

## Requirements ✓
- ✓ Video duration: **3+ minutes**
- ✓ Camera: **ON (face visible)** throughout
- ✓ Screen sharing: **ENTIRE SCREEN** (not just a tab)
- ✓ Recording tool: **Google Meet** with kalvium.community email
- ✓ Access: Set to **"Anyone with the link can edit"** after recording
- ✓ File name: `YourName_SquadName_BackendDeployment` (e.g., `Lakshmi_Squad7_BackendDeployment`)
- ✓ Audio: Clear, optimal levels, minimal background noise

---

## Suggested 3-Minute Script

### 0:00 – 0:30 | Intro & Project Overview
**What to show:**
- Quick intro: "Hi, I'm [Your Name], Squad [#]. This is my UniTrack Capstone backend deployment."
- Briefly show the GitHub repo structure (Backend folder, package.json, server.js)
- Mention: "I'm deploying a Node.js + Express backend with MongoDB to Render.com"

**Key points to mention:**
- Tech stack: Node.js, Express, MongoDB, Mongoose
- Backend handles: user auth, event management, attendance, leaderboard

---

### 0:30 – 1:15 | Deployment Process
**What to show:**
1. Open Render.com dashboard
2. Click "New" → "Web Service"
3. Connect GitHub repository (show the S81_Lakshmi_capstone_UniTrack repo)
4. Configure the service:
   - Environment: Node
   - Build command: `npm install`
   - Start command: `node Backend/server.js`
5. Show adding environment variables (MONGO_URI, NODE_ENV)
6. Click "Create Web Service"

**What to say:**
- "I'm using Render.com, which auto-builds and deploys Node.js apps directly from GitHub."
- "The Procfile tells Render how to start the server."
- "Environment variables store sensitive data like MongoDB connection strings."

---

### 1:15 – 2:15 | Monitoring Deployment
**What to show:**
1. Show the Render deployment logs scrolling (building dependencies, etc.)
2. Wait for "Your service is live!" message
3. Copy the generated URL (e.g., `https://unitrack-backend.onrender.com`)
4. Open a new browser tab and test the endpoint: `https://your-url/api/events`
5. Show JSON response (or error) to confirm the backend is running

**What to say:**
- "Render is building dependencies and starting the server... this usually takes 3-5 minutes."
- "Once deployment is complete, we get a live URL. Let me test one of the API endpoints."
- "The backend is successfully deployed and responding to requests!"

---

### 2:15 – 3:00 | Documentation & Summary
**What to show:**
1. Open the README.md file
2. Scroll to the "Deployed Backend Link" section
3. Show that the Render URL has been added
4. Mention the DEPLOYMENT_GUIDE.md (walk through briefly)
5. Optionally, show a quick test with Postman or curl:
   ```
   curl https://your-url/api/events
   ```

**What to say:**
- "I've added the deployed link to the README for easy reference."
- "The backend is now live and accessible from anywhere."
- "The deployment is automated — any push to the GitHub repo will trigger a new build on Render."
- "Next steps: connect the frontend to this API and test the full application."

---

### 3:00 – 3:15 | Closing
- Summarize: "We've successfully deployed the UniTrack backend to Render.com with MongoDB integration."
- Mention the deployment link in the README.
- Say: "All API endpoints are now accessible via the live URL."
- Closing remarks: "The backend is ready for frontend integration and testing."

---

## Recording Tips

1. **Pacing:** Speak clearly and at a moderate pace. Pause slightly when clicking or waiting for builds.
2. **Pointer:** Move the cursor slowly and deliberately; highlight relevant elements as you explain.
3. **Troubleshooting:** If you make a mistake, pause and restart the sentence. You can trim later.
4. **Visibility:** Ensure code, URLs, and terminal output are readable on screen (zoom in if needed).
5. **Continuity:** Keep recording running throughout; don't stop and restart (unless critical).

---

## After Recording

1. **Stop recording** in Google Meet and save the file.
2. **Rename the file** using the required syntax:
   ```
   YourName_SquadName_BackendDeployment
   ```
3. **Upload to Google Drive** or leave in Meet recording location.
4. **Share the link:**
   - Right-click on file → "Share"
   - Change access: "Anyone with the link can edit"
   - Copy the shareable link
5. **Paste the link** in your assignment submission.

---

## Checklist Before Submitting

- [ ] Video is 3+ minutes long
- [ ] Camera is ON and visible throughout
- [ ] Entire screen is shared (not just a tab)
- [ ] Audio is clear and background noise is minimal
- [ ] File name follows the required syntax
- [ ] Link access is set to "Anyone with the link can edit"
- [ ] Backend link is added to README.md
- [ ] Deployed backend is fully functional (tested with API call)

---

**Good luck with your submission! 🚀**
