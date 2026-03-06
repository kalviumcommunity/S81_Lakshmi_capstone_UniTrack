import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from './models/Event.js';
import User from './models/User.js';

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected for seeding');

        // find an admin or faculty to be creator, or any user
        let creator = await User.findOne({ role: 'faculty' });
        if (!creator) {
            creator = await User.findOne({ role: 'admin' });
        }
        if (!creator) {
            // fallback
            creator = await User.findOne();
        }

        if (!creator) {
            console.log('No users found. Please register at least one user.');
            process.exit(1);
        }

        const creatorId = creator._id;

        const dummyEvents = [
            { title: "Kare Hackathon 2026", desc: "A 48-hour coding marathon", category: "academic", venue: "Kare Campus" },
            { title: "AI & ML Workshop", desc: "Learn AI/ML basics", category: "workshop", venue: "Seminar Hall 1" },
            { title: "Kare Sports Fest", desc: "Annual sports competition", category: "sports", venue: "Kare Ground" },
            { title: "Cultural Night", desc: "Showcase your talents", category: "cultural", venue: "Main Auditorium" },
            { title: "Web Dev Bootcamp", desc: "React and Node.js deep dive", category: "academic", venue: "Lab 4" },
            { title: "Robotics Expo", desc: "Exhibition of latest robots", category: "academic", venue: "Kare Exhibition Hall" },
            { title: "Cybersecurity Seminar", desc: "Learn how to secure apps", category: "workshop", venue: "Room 101" },
            { title: "Blockchain Hackathon", desc: "Build Web3 solutions at Kare", category: "academic", venue: "Kare IT Block" },
            { title: "Music Concert", desc: "Live music performances", category: "cultural", venue: "Open Air Theatre" },
            { title: "Startup Pitch", desc: "Pitch your ideas to investors", category: "other", venue: "Incubation Center" },
            { title: "Chess Tournament", desc: "University level chess", category: "sports", venue: "Student Center" },
            { title: "IoT Workshop", desc: "Hands-on with Arduino & Pi", category: "workshop", venue: "Electronics Lab" },
            { title: "Design Sprint", desc: "UX/UI design competition", category: "academic", venue: "Design Studio" },
            { title: "Kare CodeFest", desc: "Competitive programming", category: "academic", venue: "Kare Lab 2" },
            { title: "Debate Competition", desc: "Inter-department debate", category: "other", venue: "Lecture Hall B" },
            { title: "Ethical Hacking", desc: "Hands-on hacking session", category: "workshop", venue: "Room 205" },
            { title: "VR/AR Exhibition", desc: "Experience virtual reality", category: "academic", venue: "Kare Innovation Lab" },
            { title: "Photography Contest", desc: "Capture the best moments", category: "cultural", venue: "Campus Wide" },
            { title: "Marathon", desc: "5K run for health", category: "sports", venue: "Kare Sports Complex" },
            { title: "Cloud Computing 101", desc: "AWS basics", category: "workshop", venue: "Online / Lab 1" },
            { title: "Kare AI Hackathon", desc: "Build intelligent systems", category: "academic", venue: "Kare Campus" },
            { title: "Drama Festival", desc: "Annual theatre performances", category: "cultural", venue: "Auditorium" },
            { title: "Basketball Finals", desc: "Inter-college finals", category: "sports", venue: "Kare Indoor Court" },
            { title: "Resume Building", desc: "Prepare for placements", category: "workshop", venue: "Placement Cell" },
            { title: "FinTech Hackathon", desc: "Financial tech solutions", category: "academic", venue: "Kare Campus" },
            { title: "Open Source Day", desc: "Contribute to OSS", category: "academic", venue: "Lab 3" },
            { title: "Art Exhibition", desc: "Student artworks", category: "cultural", venue: "Fine Arts Dept" },
            { title: "Yoga & Wellness", desc: "Mindfulness and health", category: "other", venue: "Kare Yoga Center" },
            { title: "Data Science Contest", desc: "Kaggle style competition", category: "academic", venue: "Data Center" },
            { title: "Gaming Tournament", desc: "Esports championship", category: "other", venue: "Student Lounge" }
        ];

        const generateRandomDate = () => {
            const today = new Date();
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + Math.floor(Math.random() * 60) - 5); // From 5 days ago to 55 days into the future
            return futureDate;
        };

        const generateRandomTime = () => {
            const hours = Math.floor(Math.random() * 8) + 9; // 9 AM to 5 PM
            return `${hours.toString().padStart(2, '0')}:00`;
        };

        const eventsToInsert = dummyEvents.map(evt => {
            const eventDate = generateRandomDate();
            // Just for testing, let's artificially set one to today or very specific days if needed
            return {
                title: evt.title,
                description: evt.desc,
                date: eventDate,
                time: generateRandomTime(),
                venue: evt.venue,
                category: evt.category,
                maxParticipants: Math.floor(Math.random() * 100) + 20,
                createdBy: creatorId,
                status: eventDate < new Date() ? 'completed' : 'upcoming'
            };
        });

        const latest = eventsToInsert[0];

        // Let's force some to be exactly today so that testing is easy
        const today = new Date();
        eventsToInsert[0].date = today;
        eventsToInsert[1].date = today;
        eventsToInsert[2].date = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

        await Event.insertMany(eventsToInsert);
        console.log(`Successfully added ${eventsToInsert.length} dummy events!`);

        process.exit(0);
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seedData();
