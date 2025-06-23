import getPlayerStatService  from '../services/playerService.js';

async function getPlayerStats(req, res) {
  try {
    const stats = await getPlayerStatService(req.params.id);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export default getPlayerStats;
