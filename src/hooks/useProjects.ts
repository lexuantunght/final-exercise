import { useQuery } from 'react-query';
import { CONFIG } from '../common/Configuration';
import { GET_ALL_PROJECT_KEY } from '../common/QueryKeys';
import { Project } from '../models/Project';
import { getHelper } from '../utils/helper/AxiosHelper';

type ProjectsResponse = {
  projects: Project[];
  totalRecords: number;
};

export default function useFetchProjects(
  query: Record<string, number | string>
) {
  return useQuery<ProjectsResponse, Error>(
    [GET_ALL_PROJECT_KEY, query],
    async () => {
      const queryParams: string[] = [];
      Object.keys(query).forEach((queryKey) => {
        queryParams.push(`${queryKey}=${query[queryKey]}`);
      });
      const res = await getHelper(
        `${CONFIG.API_BASE_URL}/projects?${queryParams.join('&')}`
      );
      return res.data;
    }
  );
}
