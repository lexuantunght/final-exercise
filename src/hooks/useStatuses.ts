import { AxiosResponse } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import axiosInstance from '../common/axios';
import { CONFIG } from '../common/Configuration';
import { GET_ALL_STATUS_KEY } from '../common/QueryKeys';
import { Status } from '../models/Status';

export default function useFetchStatuses(): UseQueryResult<Status[], Error> {
    return useQuery<Status[], Error>(GET_ALL_STATUS_KEY, () =>
        axiosInstance
            .get(`${CONFIG.API_BASE_URL}/statuses`)
            .then((res: AxiosResponse<Status[]>) => res.data)
    );
}
