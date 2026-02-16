import express from 'express';
import { getRecommendations, updateUserInterests } from '../controllers/recommendationController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getRecommendations);
router.put('/interests', auth, updateUserInterests);

export default router;
