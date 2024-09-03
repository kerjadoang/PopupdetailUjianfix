import {useMergeState} from '@constants/functional';

const useDescriptionForm = () => {
  const [state] = useMergeState({
    isLoading: false,
  });

  const {isLoading}: any = state;
  return {isLoading};
};
export default useDescriptionForm;
