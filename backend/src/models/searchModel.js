import pool from '../config/db.js'

export const getSearchList = async () => {
  const query = `
    select player_id, player_name, full_name, cricinfo_name, role, country, gender, img_url from players
  `;
  const rows = await pool.query(query);
  return rows.rows;
};