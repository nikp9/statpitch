import pool from '../config/db.js'

const getPlayerStatsById = async (playerId) => {
  const query = `
    SELECT *
    FROM player_cricket_stats_by_competition
    WHERE player_id = $1;
  `;
  const rows = await pool.query(query, [playerId]);
  return rows.rows;
};

export default getPlayerStatsById;

