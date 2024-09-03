import {NavigationContainerRef, useNavigation} from '@react-navigation/native';
import {preventScreenshotsIOS} from '../../utils';
import {dismissLoading} from '@constants/functional';
import {setJSExceptionHandler} from 'react-native-exception-handler';
import {useEffect, useRef} from 'react';
import {errorHandler} from './utils';
import type {ParamList} from 'type/screen';

export const useNavigator = () => {
  const navigation = useNavigation<NavigationContainerRef<ParamList>>();
  const routeRef = useRef<IRouteRef>({screenStack: [], screenName: ''});

  const screenListeners = () => ({
    state: async () => {
      dismissLoading();
      const currentRouteName = navigation?.getCurrentRoute()?.name;
      routeRef.current.screenName = currentRouteName ?? '';
      routeRef.current.screenStack.push(currentRouteName ?? '');
      // eslint-disable-next-line no-console
      console.log(
        '🚀 ~ file: useNavigator.tsx:22 ~ state: ~ currentRouteName:',
        currentRouteName,
      );
      preventScreenshotsIOS();
    },
  });

  useEffect(() => {
    setJSExceptionHandler((error, isFatal) => {
      errorHandler({
        error,
        isFatal,
        route: routeRef.current,
      });
    });
  }, []);

  return {screenListeners};
};
