import getPlayerStatsById from '../models/playerModel.js';

const getPlayerStatService = async (playerId) => {
  return await getPlayerStatsById(playerId);
};

export default getPlayerStatService;

