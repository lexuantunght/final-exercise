import { useQuery } from 'react-query';
import { CONFIG } from '../common/Configuration';
import { GET_HOME_DATA_KEY } from '../common/QueryKeys';
import { HomeData } from '../models/HomeData';
import { getHelper } from '../utils/helper/AxiosHelper';

export default function useFetchHomeData() {
  return useQuery<HomeData, Error>(GET_HOME_DATA_KEY, async () => {
    const res = await getHelper(`${CONFIG.API_BASE_URL}/homeData`);
    return res.data;
  });
}
