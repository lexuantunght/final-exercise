import { AxiosResponse } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import axiosInstance from '../common/axios';
import { CONFIG } from '../common/Configuration';
import { GET_ALL_GROUP_KEY } from '../common/QueryKeys';
import { Group } from '../models/Group';

export default function useFetchGroups(): UseQueryResult<Group[], Error> {
    return useQuery<Group[], Error>(GET_ALL_GROUP_KEY, () =>
        axiosInstance
            .get(`${CONFIG.API_BASE_URL}/groups`)
            .then((res: AxiosResponse<Group[]>) => res.data)
    );
}
