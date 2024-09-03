import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const useDiagnoticDescription = () => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'DiagnoticDescriptionScreen'>
    >();
  const route: any =
    useRoute<RouteProp<ParamList, 'DiagnoticDescriptionScreen'>>();
  return {navigation, route};
};

export {useDiagnoticDescription};
