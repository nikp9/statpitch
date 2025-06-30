import pool from '../config/db.js'

export const getPlayerBattingStatsById = async (playerId) => {
  const query = `
    select * from mv_t20_batting_overall where player_id = $1 UNION ALL
    select * from mv_t20_batting_international where player_id = $1 UNION ALL
    select * from mv_t20_batting_leagues where player_id = $1 UNION ALL
    select * from mv_t20_batting_others where player_id = $1
  `;
  const rows = await pool.query(query, [playerId]);
  return rows.rows;
};

export const getPlayerBowlingStatsById = async (playerId) => {
  const query = `
    select * from mv_t20_bowling_overall where player_id = $1 UNION ALL
    select * from mv_t20_bowling_international where player_id = $1 UNION ALL
    select * from mv_t20_bowling_leagues where player_id = $1 UNION ALL
    select * from mv_t20_bowling_others where player_id = $1
  `;
  const rows = await pool.query(query, [playerId]);
  return rows.rows;
};