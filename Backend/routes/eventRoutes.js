// routes/eventRoutes.js
const express = require('express');
const router = express.Router();

const { getAllEvents, createEvent } = require('../controllers/eventController'); // ✅ Import both

router.get('/events', getAllEvents);
router.post('/events', createEvent);

module.exports = router;
