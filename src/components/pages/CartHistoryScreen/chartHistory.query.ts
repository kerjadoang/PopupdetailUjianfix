import {apiPost} from '@api/wrapping';
import {BASE_NAME_UAA} from '@constants/url';
import {useMutation} from '@tanstack/react-query';

export const useAssignAnak = () => {
  const {mutate, data, isPending} = useMutation({
    mutationKey: ['ASSIGN_ANAK'],
    mutationFn: async (body: {child_id: number; package_id: number}) => {
      const res = await apiPost({
        url: `${BASE_NAME_UAA}/user/assignPackage`,
        body,
      });

      return res;
    },
  });

  return {
    assignAnak: mutate,
    data,
    isPending,
  };
};
