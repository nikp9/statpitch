import { Router } from 'express';
const router = Router();
import getPlayerStats from '../controllers/playerController.js';

router.get('/:id/stats', getPlayerStats);

export default router;
