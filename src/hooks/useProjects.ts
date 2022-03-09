import { AxiosResponse } from 'axios';
import { useQuery, UseQueryResult } from 'react-query';
import axiosInstance from '../common/axios';
import { CONFIG } from '../common/Configuration';
import { GET_ALL_PROJECT_KEY } from '../common/QueryKeys';
import { Project } from '../models/Project';

export default function useFetchProjects(): UseQueryResult<Project[], Error> {
    return useQuery<Project[], Error>(GET_ALL_PROJECT_KEY, () =>
        axiosInstance
            .get(`${CONFIG.API_BASE_URL}/projects`)
            .then((res: AxiosResponse<Project[]>) => res.data)
    );
}
