import {useMergeState} from '@constants/functional';

const useInputFormKirimProyek = () => {
  const [state] = useMergeState({
    isLoading: false,
  });

  const {isLoading}: any = state;
  return {isLoading};
};
export default useInputFormKirimProyek;
