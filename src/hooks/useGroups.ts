import { useQuery, UseQueryResult } from 'react-query';
import { CONFIG } from '../common/Configuration';
import { GET_ALL_GROUP_KEY } from '../common/QueryKeys';
import { Group } from '../models/Group';
import { getHelper } from '../utils/helper/AxiosHelper';

export default function useFetchGroups(): UseQueryResult<Group[], Error> {
  return useQuery<Group[], Error>(GET_ALL_GROUP_KEY, async () => {
    const res = await getHelper(`${CONFIG.API_BASE_URL}/groups`);
    return res.data;
  });
}
