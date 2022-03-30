import { useQuery, UseQueryResult } from 'react-query';
import { CONFIG } from '../common/Configuration';
import { GET_ALL_MEMBER_KEY } from '../common/QueryKeys';
import { Member } from '../models/Member';
import { getHelper } from '../utils/helper/AxiosHelper';

export default function useFetchMemers(): UseQueryResult<Member[], Error> {
  return useQuery<Member[], Error>(GET_ALL_MEMBER_KEY, async () => {
    const res = await getHelper(`${CONFIG.API_BASE_URL}/members`);
    return res.data;
  });
}
