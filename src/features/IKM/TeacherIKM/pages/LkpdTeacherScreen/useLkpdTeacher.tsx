import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {ParamList} from 'type/screen';
import {useNavigate} from '@hooks/useNavigate';
import {useTeacherLkpdActions} from './zustand';
import {useEffect} from 'react';
import {useFetchAllSubjectActions} from '@features/IKM/zustand';

const useLkpdTeacher = () => {
  const {resetState: resetStateLKPD} = useTeacherLkpdActions();
  const {getAllSubject, resetState: resetAllSubject} =
    useFetchAllSubjectActions();

  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'LkpdTeacherScreen'>>();

  const {navigateScreen} = useNavigate();

  useEffect(() => {
    getAllSubject({
      type: 'lkpd',
    });

    return () => {
      resetAllSubject();
      resetStateLKPD();
    };
  }, []);

  return {
    navigation,
    navigateScreen,
  };
};
export default useLkpdTeacher;
