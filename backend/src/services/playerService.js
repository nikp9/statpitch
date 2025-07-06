import {getPlayerBasicInfo, getPlayerBattingStatsById, getPlayerBowlingStatsById, getPlayerTeamStat} from '../models/playerModel.js';

export const getPlayerStatService = async (player_id, country, gender) => {
  const [player_info, batting, bowling, team_stat] = await Promise.all([
    getPlayerBasicInfo(player_id),
    getPlayerBattingStatsById(player_id),
    getPlayerBowlingStatsById(player_id),
    getPlayerTeamStat(country, gender)
  ])
  const result = {
    player_info,
    batting,
    bowling,
    team_stat
  }
  return result;
};