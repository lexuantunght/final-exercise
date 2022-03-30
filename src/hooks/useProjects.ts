import { useQuery } from 'react-query';
import { CONFIG } from '../common/Configuration';
import { GET_ALL_PROJECT_KEY } from '../common/QueryKeys';
import { Project } from '../models/Project';
import { getHelper } from '../utils/helper/AxiosHelper';

export default function useFetchProjects() {
  return useQuery<Project[], Error>(GET_ALL_PROJECT_KEY, async () => {
    const res = await getHelper(`${CONFIG.API_BASE_URL}/projects`);
    return res.data;
  });
}
