import { Router } from 'express';
const router = Router();
import {getPlayerBattingStats, getPlayerBowlingStats} from '../controllers/playerController.js';

router.get('/:id/batting', getPlayerBattingStats);
router.get('/:id/bowling', getPlayerBowlingStats);

export default router;
