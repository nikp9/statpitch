import {getSearchListService} from '../services/searchService.js';

export async function getSearchList(_, res) {
  try {
    const stats = await getSearchListService();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}