import pool from '../config/db.js'

export const getPlayerBasicInfo = async (playerId) => {
  const query = `
    select * from players where player_id = $1
  `
  const rows = await pool.query(query, [playerId]);
  return rows.rows;
}

export const getPlayerBattingStatsById = async (playerId) => {
  const query = `
    select *, 'Overall' as source from mv_t20_batting_overall where player_id = $1 UNION ALL
    select *, 'International' as source from mv_t20_batting_international where player_id = $1 UNION ALL
    select *, 'Top Leagues' as source from mv_t20_batting_leagues where player_id = $1
    `;
    // select * from mv_t20_batting_others where player_id = $1
  const rows = await pool.query(query, [playerId]);
  return rows.rows;
};

export const getPlayerBowlingStatsById = async (playerId) => {
  const query = `
    select *, 'Overall' as source from mv_t20_bowling_overall where player_id = $1 UNION ALL
    select *, 'International' as source from mv_t20_bowling_international where player_id = $1 UNION ALL
    select *, 'Top Leagues' as source from mv_t20_bowling_leagues where player_id = $1
    `;
    // select * from mv_t20_bowling_others where player_id = $1
  const rows = await pool.query(query, [playerId]);
  return rows.rows;
};

export const getPlayerTeamStat = async (country, gender) => {
  const query = `
  SELECT *
  FROM team_head_to_head_by_team
  WHERE searched_team = $1 and gender = $2 order by matches_played desc LIMIT 5
  `;
  const rows = await pool.query(query, [country, gender]);
  return rows.rows;
}