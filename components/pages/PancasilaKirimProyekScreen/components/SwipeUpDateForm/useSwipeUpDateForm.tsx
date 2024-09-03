import {useMergeState} from '@constants/functional';

const useSwipeUpDateForm = () => {
  const [state] = useMergeState({
    isLoading: false,
  });

  const {isLoading}: any = state;
  return {isLoading};
};
export default useSwipeUpDateForm;
