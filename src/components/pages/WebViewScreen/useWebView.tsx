import {WebViewScreenParam} from 'type/screen';
import {useNavigate} from '@hooks/useNavigate';
import {useEffect, useRef} from 'react';
import {useNotificationActions} from '@components/atoms/NotificationController/zustand';
import {isStringContains} from '@constants/functional';
import {WebViewMessageEvent} from 'react-native-webview';

const useWebView = () => {
  const webViewRef = useRef<any>();

  const {getRouteParams, popScreen} = useNavigate<WebViewScreenParam>();
  const {url, data, title} = getRouteParams();
  const {resetState: resetNotificationData} = useNotificationActions();

  const onLoadStart = () => {
    // showLoading();
  };

  const onLoadEnd = () => {
    // dismissLoading();
  };

  const onError = () => {
    // showErrorToast('Terjadi Kesalahan');
  };

  const onMessage = (event: WebViewMessageEvent) => {
    const message = event?.nativeEvent?.data;

    if (!message) {
      return;
    }

    if (isStringContains(message, 'go_back')) {
      return popScreen();
    }
  };

  useEffect(() => {
    return () => {
      resetNotificationData();
    };
  }, []);

  return {
    url,
    data,
    title,
    webViewRef,
    onLoadStart,
    onLoadEnd,
    popScreen,
    onError,
    onMessage,
  };
};
export default useWebView;
