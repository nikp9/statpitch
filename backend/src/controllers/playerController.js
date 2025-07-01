import {getPlayerStatService}  from '../services/playerService.js';

export async function getPlayerStats(req, res) {
  try {
    const player_id = req.params.id;
    const { country, gender } = req.query;
    const stats = await getPlayerStatService(player_id, country, gender);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}