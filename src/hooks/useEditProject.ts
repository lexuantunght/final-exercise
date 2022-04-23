import { useMutation } from 'react-query';
import { CONFIG } from '../common/Configuration';
import { putHelper } from '../utils/helper/AxiosHelper';

export default function useEditProject() {
  return useMutation(
    async ({
      projectNumber,
      data,
    }: {
      projectNumber?: number | string;
      data: any;
    }) => {
      const res = await putHelper(
        `${CONFIG.API_BASE_URL}/projects/${projectNumber}`,
        data
      );
      return res;
    }
  );
}
