import { useQuery, UseQueryResult } from 'react-query';
import { CONFIG } from '../common/Configuration';
import { GET_PROJECT_BY_NUMBER } from '../common/QueryKeys';
import { Project } from '../models/Project';
import { getHelper } from '../utils/helper/AxiosHelper';

export default function useGetProject(
  projectNumber: number
): UseQueryResult<Project, Error> {
  return useQuery<Project, Error>(
    [GET_PROJECT_BY_NUMBER, projectNumber],
    async () => {
      const res = await getHelper(
        `${CONFIG.API_BASE_URL}/projects/${projectNumber}`
      );
      return res.data;
    }
  );
}
