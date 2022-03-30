import { AxiosResponse } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import axiosInstance from '../common/axios';
import { CONFIG } from '../common/Configuration';
import { GET_ALL_MEMBER_KEY } from '../common/QueryKeys';
import { Member } from '../models/Member';

export default function useFetchMembers(): UseQueryResult<Member[], Error> {
  return useQuery<Member[], Error>(GET_ALL_MEMBER_KEY, () =>
    axiosInstance
      .get(`${CONFIG.API_BASE_URL}/members`)
      .then((res: AxiosResponse<Member[]>) => res.data)
  );
}
