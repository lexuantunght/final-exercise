import { useMutation } from 'react-query';
import { CONFIG } from '../common/Configuration';
import { deleteHelper } from '../utils/helper/AxiosHelper';

export default function useDeleteProject() {
  return useMutation(async (projectNumbers: number[]) => {
    const res = await deleteHelper(
      `${CONFIG.API_BASE_URL}/projects?projectNumbers=${projectNumbers.join(
        ','
      )}`
    );
    return res;
  });
}
