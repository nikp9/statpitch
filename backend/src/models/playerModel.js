import pool from '../config/db.js'

const getPlayerStatsById = async (playerId) => {
  const query = `
    select * from mv_t20_batting_overall where player_id = $1 UNION ALL
    select * from mv_t20_batting_international where player_id = $1 UNION ALL
    select * from mv_t20_batting_leagues where player_id = $1 UNION ALL
    select * from mv_t20_batting_others where player_id = $1
  `;
  const rows = await pool.query(query, [playerId]);
  return rows.rows;
};

export default getPlayerStatsById;

