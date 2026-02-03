# Backend Deployment Guide (Render.com)

## Step-by-Step Deployment Instructions

### Prerequisites
- GitHub account with the repo pushed
- Render.com account (sign up with Kalvium community Google email)
- MongoDB Atlas account with a connection string (or local MongoDB URI)

### Step 1: Prepare Your Backend for Deployment

1. **Ensure `Procfile` exists** in the `Backend/` folder (should be present now):
   ```
   web: node server.js
   ```

2. **Ensure `package.json` has a start script:**
   ```json
   "scripts": {
     "start": "node server.js",
     "dev": "nodemon server.js"
   }
   ```

3. **Create `.env` file in Backend folder** with:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```
   (Render will inject `PORT` automatically, but keep this for local testing)

4. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Add Procfile and deployment config"
   git push origin main
   ```

### Step 2: Deploy on Render.com

1. **Log in to Render.com** using your Kalvium community Google account.

2. **Click "New"** → **"Web Service"**

3. **Connect GitHub repository:**
   - Select your S81_Lakshmi_capstone_UniTrack repo
   - Give it a name: `unitrack-backend` (or similar)

4. **Configure the service:**
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node Backend/server.js`
     (Important: If your Backend is in a subdirectory, use the full path)
   - **Root Directory:** `/` (or leave blank)

5. **Add Environment Variables:**
   - Click "Advanced" → "Add Environment Variable"
   - Add:
     - `MONGO_URI` = your MongoDB Atlas connection string
     - `NODE_ENV` = `production`

6. **Select Plan:** Free tier is fine for testing

7. **Click "Create Web Service"**

Render will start building and deploying. Wait 5–10 minutes for deployment to complete.

### Step 3: Verify Deployment

Once deployment is successful:
1. Render will show your live URL (e.g., `https://unitrack-backend.onrender.com`)
2. Test the backend by visiting: `https://unitrack-backend.onrender.com/api/events` (should return JSON or error message)
3. Copy this URL and **add it to your README.md** under "Deployed Backend Link"

### Step 4: Add Link to README

Update the main [README.md](README.md) with:

```markdown
## 🚀 Deployed Backend

**Backend API Link:** [https://your-deployed-link.onrender.com](https://your-deployed-link.onrender.com)

All API endpoints are accessible via this URL.
```

### Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails | Check `Procfile` syntax and ensure `npm install` runs without errors locally |
| Server crashes | Check environment variables (especially `MONGO_URI`) are set correctly in Render dashboard |
| Port issues | Ensure you're using `process.env.PORT` in `server.js` (already done) |
| MongoDB connection error | Verify MongoDB Atlas connection string and whitelist Render IPs in MongoDB security settings |

### Next Steps

- Record a 3+ minute video walkthrough (see `RECORDING_CHECKLIST.txt`)
- Test API endpoints using Postman or curl
- Update frontend to use the deployed backend URL

---

For questions, refer to Render's documentation: https://docs.render.com/
