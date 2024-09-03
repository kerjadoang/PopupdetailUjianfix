import {useMergeState} from '@constants/functional';

const useSubmitForm = () => {
  const [state] = useMergeState({
    isLoading: false,
  });

  const {isLoading}: any = state;
  return {isLoading};
};
export default useSubmitForm;
