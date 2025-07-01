import {getPlayerBattingStatsById, getPlayerBowlingStatsById, getPlayerTeamStat} from '../models/playerModel.js';

export const getPlayerStatService = async (player_id, country, gender) => {
  const [batting, bowling, team_stat] = await Promise.all([
    getPlayerBattingStatsById(player_id),
    getPlayerBowlingStatsById(player_id),
    getPlayerTeamStat(country, gender)
  ])
  const result = {
    batting,
    bowling,
    team_stat
  }
  return result;
};