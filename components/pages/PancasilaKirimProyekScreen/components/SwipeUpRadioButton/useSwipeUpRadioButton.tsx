import {useMergeState} from '@constants/functional';

const useSwipeUpRadioButton = () => {
  const [state] = useMergeState({
    isLoading: false,
  });

  const {isLoading}: any = state;
  return {isLoading};
};
export default useSwipeUpRadioButton;
