import {getPlayerBattingStatService, getPlayerBowlingStatService}  from '../services/playerService.js';

export async function getPlayerBattingStats(req, res) {
  try {
    const stats = await getPlayerBattingStatService(req.params.id);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getPlayerBowlingStats(req, res) {
  try {
    const stats = await getPlayerBowlingStatService(req.params.id);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
