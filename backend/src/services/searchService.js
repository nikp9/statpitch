import {getSearchList} from '../models/searchModel.js';

export const getSearchListService = async () => {
  return await getSearchList();
};