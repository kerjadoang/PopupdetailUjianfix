import {useState} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';

export const useRouteApp = () => {
  const isLoading = useSelector((state: RootState) => state.getLoading.data);
  const [showAPILog, setShowAPILog] = useState<boolean>(false);
  const onPressApiLog = () => setShowAPILog(!showAPILog);

  return {isLoading, showAPILog, onPressApiLog};
};
