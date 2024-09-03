import {useMergeState} from '@constants/functional';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useEffect} from 'react';
import {ParamList} from 'type/screen';

const useProjectPancasila = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ProjectPancasilaScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'ProjectPancasilaScreen'>>();
  const serviceType = route.params.service_type;
  const [state] = useMergeState({
    isLoading: false,
  });

  useEffect(() => {
    // console.log('Route service type: ' + serviceType);
  }, []);

  const onIconNotePress = () => {
    navigation.navigate('PancasilaNotesScreen', {
      title: 'Projek Pancasila',
      service_type: serviceType,
    });
  };

  const {isLoading}: any = state;
  return {isLoading, serviceType, onIconNotePress};
};
export default useProjectPancasila;
