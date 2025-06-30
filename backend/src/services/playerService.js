import {getPlayerBattingStatsById, getPlayerBowlingStatsById} from '../models/playerModel.js';

export const getPlayerBattingStatService = async (playerId) => {
  return await getPlayerBattingStatsById(playerId);
};

export const getPlayerBowlingStatService = async (playerId) => {
  return await getPlayerBowlingStatsById(playerId);
};

