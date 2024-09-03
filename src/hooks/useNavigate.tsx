import {NavigationRouteContext, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {ParamList} from 'type/screen';

export function useNavigate<T = any>() {
  const route = React.useContext(NavigationRouteContext);
  const navigation = useNavigation() as unknown as StackNavigationProp<
    ParamList,
    any
  >;

  const navigateScreen: <U>(screen: keyof ParamList, params?: U) => void = <U,>(
    screen: keyof ParamList,
    params?: U,
  ) => {
    if (!navigation) {
      return;
    }

    navigation?.navigate(screen as any, params);
  };

  const popScreen: VoidCallBack = (count?: number) => {
    if (!navigation) {
      return;
    }

    if (!navigation?.canGoBack()) {
      return;
    }

    return navigation?.pop(count);
  };

  const resetNavigate = (screen: keyof ParamList, param?: object) => {
    if (!navigation) {
      return;
    }

    navigation?.reset({
      index: 0,
      routes: [{name: screen as never, params: param as never}],
    });
  };

  const getRouteParams: <U = T>() => U = <U,>() => {
    if (!route) {
      return {} as U;
    }

    return (route?.params as U) || ({} as U);
  };

  const getRouteNames: CallBack<string> = () => {
    if (route) {
      return route?.name;
    }

    const routeIndex = navigation?.getState()?.index;

    if (routeIndex === undefined) {
      return '';
    }

    const navRoute = navigation?.getState()?.routes[routeIndex];
    return navRoute?.name;
  };

  return {
    navigation,
    navigateScreen,
    popScreen,
    resetNavigate,
    getRouteParams,
    getRouteNames,
  };
}
