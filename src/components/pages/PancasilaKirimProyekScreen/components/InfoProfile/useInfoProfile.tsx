import {useMergeState} from '@constants/functional';

const useInfoProfile = () => {
  const [state] = useMergeState({
    isLoading: false,
  });

  const {isLoading}: any = state;
  return {isLoading};
};
export default useInfoProfile;
