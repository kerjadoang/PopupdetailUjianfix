import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {ListSubjectByPhaseScreenParam, ParamList} from 'type/screen';
import {useNavigate} from '@hooks/useNavigate';
import {useEffect, useState} from 'react';
import {
  useListPhaseClass,
  useUserPhaseClassActions,
} from '@features/IKM/zustand';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMapel} from '@redux';
import {RootState} from 'src/redux/rootReducer';

const useListSubjectByPhase = () => {
  const dispatch = useDispatch();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ListSubjectByPhaseScreen'>>();
  const {getRouteParams, navigateScreen} = useNavigate();
  const {title} = getRouteParams<ListSubjectByPhaseScreenParam>();
  const {getListPhaseClass} = useUserPhaseClassActions();
  const listPhaseClass = useListPhaseClass();

  const [selectedPhase, setSelectedPhase] = useState<{id?: any; name?: any}>({
    id: listPhaseClass?.[0]?.id,
    name: listPhaseClass?.[0]?.name,
  });
  const {mapel}: any = useSelector((state: RootState) => state);

  useEffect(() => {
    getListPhaseClass();
  }, []);

  useEffect(() => {
    dispatch(fetchMapel(selectedPhase?.id) as any);
  }, [selectedPhase]);

  return {
    navigation,
    navigateScreen,
    title,
    listPhaseClass,
    mapel,
    selectedPhase,
    setSelectedPhase,
  };
};
export default useListSubjectByPhase;
