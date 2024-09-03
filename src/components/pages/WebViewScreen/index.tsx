import React from 'react';
import {View} from 'react-native';
import useWebView from './useWebView';
import {Header} from '@components/atoms';
import WebView from 'react-native-webview';
import styles from './styles';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import {DEFAULT_INJECTED_JS} from './utils';
const WebViewScreen = () => {
  const {
    title,
    url,
    webViewRef,
    onLoadStart,
    onLoadEnd,
    onError,
    popScreen,
    onMessage,
  } = useWebView();

  return (
    <View style={{flex: 1}}>
      {/* Header */}
      <Header
        label={title}
        styleContainer={{height: 48, paddingVertical: 0}}
        styleLabel={{fontSize: 12}}
        onPressIconLeft={() => popScreen()}
      />

      <WebView
        source={{uri: url}}
        originWhitelist={['*']}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        onError={onError}
        ref={webViewRef}
        scalesPageToFit={false}
        setBuiltInZoomControls={false}
        javaScriptEnabled
        style={styles.webViewContainer}
        startInLoadingState={true}
        injectedJavaScript={DEFAULT_INJECTED_JS()}
        renderLoading={() => <LoadingIndicator />}
        onShouldStartLoadWithRequest={() => true}
        onMessage={onMessage}
        // renderError={(errDomain, errCode, errDesc) =>
        //   renderEmptyState(errDomain, errCode, errDesc)
        // }
      />
      {/* {renderEmptyState()} */}
    </View>
  );
};

export {WebViewScreen};
