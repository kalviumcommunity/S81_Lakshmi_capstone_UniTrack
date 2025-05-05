# Capstone UniTrack

Here's a detailed model for an Event Management and Attendance System for a University, including students' login, faculty login, and admin login. I'll also include additional features to make it more comprehensive.


---

Core Functionalities:

1. User Roles & Logins:

Student Login: Register for events, check attendance, receive notifications.

Faculty Login: Create events, mark attendance, analyze participation.

Admin Login: Manage events, users, and analytics.



2. Event Management:

Event creation, editing, and deletion.

Event categorization (workshops, cultural fests, technical events, etc.).

Capacity limits for each event.



3. Student Attendance System:

QR Code/Face Recognition for attendance marking.

Manual attendance marking by faculty if needed.

Live attendance tracking for faculty and admin.



4. Event Registration & Participation:

Students can browse and register for upcoming events.

Confirmation emails and reminders.

Event feedback collection after participation.





---

Additional Features:

✅ Event Notifications & Reminders – Students get reminders before events.
✅ Event Certificates Generation – Auto-generate certificates for attendees.
✅ Leaderboard & Rewards – Track student participation, award points.
✅ Automated Reports & Analytics – Graphs on attendance trends.
✅ Multimedia Gallery – Upload event photos and videos.
✅ Discussion Forums – Students can discuss upcoming events.
✅ Integration with University Portal – Sync with LMS or ERP.


---

Database Model (ER Diagram Concept)

1. Users Table

UserID (PK)

Name

Email

Password

Role (Student/Faculty/Admin)


2. Events Table

EventID (PK)

Title

Description

Date & Time

Venue

CreatedBy (FacultyID)

MaxParticipants


3. Event Registration Table

RegID (PK)

StudentID (FK)

EventID (FK)

RegistrationStatus


4. Attendance Table

AttendanceID (PK)

EventID (FK)

StudentID (FK)

AttendanceStatus (Present/Absent)

Timestamp



---

Tech Stack (Suggested)

🔹 Frontend: React.js
🔹 Backend: Node.js 
🔹 Database: Mongodb
🔹 Authentication: OAuth (Google Login)
🔹 QR Code API: For easy attendance marking
🔹 Cloud Storage: Firebase for images/certificates

Day-by day plan 

Day 1: Setup & GitHub Project
Create a GitHub repository for your capstone project.

Initialize a README file with project details and plan.

Set up the repository on GitHub.

Push the repository to GitHub.

Day 2: Low-Fidelity Design
Create a low-fidelity design (wireframes, rough sketches) of your project using Figma or any other tool.

Define the major user interfaces and flows.

Day 3: High-Fidelity Design
Create a high-fidelity design with more detailed UI/UX using tools like Figma or Adobe XD.

Make sure the design reflects a polished version of your low-fidelity designs.

Day 4: Project Milestones & GitHub Projects
Set up GitHub Projects to track milestones and daily tasks.

Add at least 10 entries for tasks (e.g., Create Event, Implement Login, API endpoints) with deadlines.

Day 5: Setup Backend Server & GET API
Set up your Express backend server.

Implement a GET API endpoint (e.g., fetch events, fetch users).

Test the GET API with Postman.

Day 6: POST API
Implement POST API endpoint for event creation (e.g., create event, register attendance).

Test the POST API with Postman.

Day 7: PUT API
Implement PUT API endpoint for updating an event (e.g., update event details).

Test the PUT API with Postman.

Day 8: Deployed Backend Server
Deploy your backend server to Heroku/Render (or any other service).

Ensure the backend is accessible publicly.

Day 9: Database Schema Creation
Create database schemas (MongoDB, PostgreSQL) for User, Event, and Attendance.

Set up relationships between entities (e.g., user-event attendance).

Day 10: Database Read and Write
Implement read and write operations for database (create, read, update, delete events).

Test CRUD operations via your backend API.

Day 11: Implement Authentication (Username/Password)
Implement user authentication using JWT or session-based authentication.

Allow users to sign up, log in, and access secured routes.

Test authentication endpoints.

Day 12: Initialize React Frontend
Initialize a React app with Vite.

Set up routing, layout components, and basic UI (home page, login page).

Day 13: Created Frontend Components (React)
Create frontend components for handling events (Event List, Event Card).

Connect the frontend with your backend (using Axios or Fetch) to fetch data from your GET API.

Day 14: Matching Design and End State
Ensure that your frontend design matches the high-fidelity design you created earlier.

Make necessary changes to match the look and feel.

Day 15: Implement File Upload Functionality
Implement file upload (e.g., for event images, documents) using a third-party API or custom backend.

Test file upload functionality.

Day 16: Authentication (3rd Party, e.g., Google)
Implement Google OAuth authentication (or any other third-party authentication).

Ensure users can log in via Google or another provider.

Day 17: Update/Delete Entities in React
Implement update and delete functionality in the React frontend for managing events.

Test the update and delete features.

Day 18: Using JWTs in Application
Integrate JWT authentication into your frontend for user sessions.

Ensure that only authenticated users can perform specific actions (e.g., creating events).

Day 19: Deploy Frontend Server
Deploy the frontend server (using Netlify, Vercel, or GitHub Pages).

Ensure that both backend and frontend work together properly after deployment.

Day 20: Final Testing and Debugging
Perform end-to-end testing for both frontend and backend.

Fix any issues, improve performance, and finalize the project.

Day 21: Final Submission
Finalize your README.md with project instructions, setup, and usage.