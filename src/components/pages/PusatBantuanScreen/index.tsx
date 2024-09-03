import React, {FC, useEffect, useRef} from 'react';
import {BackHandler, Platform, SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';

import {styles} from './style';
import {Header} from '@components/atoms/Header';
import {ContactUs, About} from './organism';

const PusatBantuanScreen: FC = (props: any) => {
  const webViewRef = useRef(null);
  const {type, webviewUrl, title} = props.route.params;

  const onAndroidBackPress = () => {
    if (webViewRef.current) {
      webViewRef.current.goBack();
      return true; // prevent default behavior (exit app)
    }

    return false;
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);

      return () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          onAndroidBackPress,
        );
      };
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header label={title} />
      {type === 'WEBVIEW' && webviewUrl ? (
        <WebView
          ref={webViewRef}
          source={{uri: webviewUrl}}
          allowsBackForwardNavigationGestures={true}
        />
      ) : type === 'CONTACT_US' ? (
        <ContactUs />
      ) : type === 'ABOUT' ? (
        <About />
      ) : null}
    </SafeAreaView>
  );
};

export {PusatBantuanScreen};
