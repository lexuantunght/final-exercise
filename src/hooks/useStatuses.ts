import { useQuery, UseQueryResult } from 'react-query';
import { CONFIG } from '../common/Configuration';
import { GET_ALL_STATUS_KEY } from '../common/QueryKeys';
import { Status } from '../models/Status';
import { getHelper } from '../utils/helper/AxiosHelper';

export default function useFetchStatuses(): UseQueryResult<Status[], Error> {
  return useQuery<Status[], Error>(GET_ALL_STATUS_KEY, async () => {
    const res = await getHelper(`${CONFIG.API_BASE_URL}/statuses`);
    return res.data;
  });
}
