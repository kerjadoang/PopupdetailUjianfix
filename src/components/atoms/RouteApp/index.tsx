/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import {SafeAreaView, StatusBar, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Draggable from 'react-native-draggable';
import {CaptureProtectionProvider} from 'react-native-capture-protection';
import generatedGitInfo from '../../../generatedGitInfo.json';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {LoadingIndicator} from '../LoadingIndicator';
import ApiLog from './components/ApiLog';
import {Navigator} from './components';
import {styles} from './styles';
import {useRouteApp} from './useRouteApp';
import {toastConfig} from './utils';
import NotificationController from '../NotificationController';
import '../../../constant/extensions';
import Colors from '../../../constant/colors';
import InAppPurchaseController from '../InAppPurchaseController';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import AuthController from '../AuthController';

const queryClient = new QueryClient();

export const RouteApp = () => {
  const {isLoading, showAPILog, onPressApiLog} = useRouteApp();

  return (
    <CaptureProtectionProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={styles.safeAreaView}>
          <StatusBar
            translucent
            animated
            barStyle={'dark-content'}
            backgroundColor={'transparent'}
          />

          {/* nyalakan code saat push playstore/appstore */}
          {generatedGitInfo.gitBranch !== 'production' ? (
            <View style={{zIndex: 99}}>
              <Draggable
                x={15}
                y={100}
                renderSize={35}
                renderColor={Colors.primary.light1}
                renderText="API"
                isCircle
                shouldReverse
                onPressIn={onPressApiLog}
              />
            </View>
          ) : null}

          <GestureHandlerRootView style={styles.gestureHandlerStyle}>
            <NavigationContainer>
              {/* List Screen */}
              <Navigator />
              {/* API LOG */}
              {showAPILog ? <ApiLog /> : null}
              {/* Toast */}
              <Toast
                config={toastConfig}
                position={'bottom'}
                visibilityTime={3000}
              />
              {/* Push Notification */}
              <NotificationController />
              <InAppPurchaseController />
              <AuthController />
            </NavigationContainer>
          </GestureHandlerRootView>
          {/* LOADING COMPONENT */}
          {isLoading ? <LoadingIndicator useModal={false} /> : null}
        </SafeAreaView>
      </QueryClientProvider>
    </CaptureProtectionProvider>
  );
};
