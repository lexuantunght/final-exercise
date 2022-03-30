import { useMutation } from 'react-query';
import { CONFIG } from '../common/Configuration';
import { postHelper } from '../utils/helper/AxiosHelper';

export default function useAddProject() {
  return useMutation(async (project: any) => {
    const res = await postHelper(`${CONFIG.API_BASE_URL}/projects`, project);
    return res;
  });
}
