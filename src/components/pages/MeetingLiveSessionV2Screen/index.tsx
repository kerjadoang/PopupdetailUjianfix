import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import WebView from 'react-native-webview';
import Colors from '@constants/colors';
import {Pressable, Text, View} from 'react-native';
import React from 'react';
import {PopUp, SwipeUp} from '@components/atoms';
import BottomMenu from './components/BottomMenu';
import ClassDetail from './components/ClassDetail';
import {useMeetingLiveSessionV2} from './useMeetingLiveSessionV2';
import {styles} from './styles';

const MeetingLiveSessionScreen = () => {
  const {
    webViewRef,
    showToast,
    callStatus,
    isApproved,
    minutes,
    hours,
    seconds,
    isRejected,
    isShowToastAttachment,
    menuItems,
    isLoading,
    isShowPopup,
    popupData,
    isShowSwipeUpAttachment,
    _handlerHideSwipeUpAttachment,
    _renderSwipeUpAttachment,
    showDescription,
    setShowDescription,
    onWebviewLoadStart,
    onWebviewLoad,
    onWebviewLoadEnd,
    onWebviewMessage,
    zoomUrl,
  } = useMeetingLiveSessionV2();

  return (
    <View style={styles.parentContainer}>
      {zoomUrl ? (
        <WebView
          source={{
            uri: zoomUrl,
          }}
          ref={webViewRef}
          style={styles.webviewContainer}
          javaScriptEnabled={true}
          allowFileAccess={true}
          scalesPageToFit={true}
          originWhitelist={['*']}
          allowsInlineMediaPlayback={true}
          domStorageEnabled={true}
          useWebView2={true}
          mediaPlaybackRequiresUserAction={false}
          incognito={true}
          onMessage={onWebviewMessage}
          onLoad={onWebviewLoad}
          onLoadStart={onWebviewLoadStart}
          onLoadEnd={onWebviewLoadEnd}
          // userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
          contentMode={'mobile'}
        />
      ) : null}

      {showToast && (
        <View style={styles.toastCallContainer}>
          <View style={styles.callContainer}>
            <View style={styles.callSubContainer}>
              <Text style={styles.callTitleLabel}>
                {callStatus?.selected?.title}
              </Text>
              {isApproved && (
                <Text style={styles.durationLabel}>
                  {minutes > 0
                    ? `${hours}:${minutes}:${seconds}`
                    : `${minutes}:${seconds}`}
                </Text>
              )}
            </View>
            {callStatus?.selected?.actionLabel && (
              <Pressable onPress={callStatus?.selected?.onActionLabel}>
                <Text
                  style={[
                    styles.actionLabel,
                    isRejected && {color: Colors.primary.base},
                  ]}>
                  {callStatus?.selected?.actionLabel}
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      )}
      {isShowToastAttachment && (
        <View style={styles.toastAttachmentContainer}>
          <View style={styles.toastAttachmentContent}>
            <Text style={styles.toastAttachmentTitle}>
              {'Gambar telah dikirim!'}
            </Text>

            <Text style={styles.toastAttachmentSubtitle}>
              {'Mohon menunggu Guru untuk menjawab.'}
            </Text>
          </View>
        </View>
      )}
      <BottomMenu menus={menuItems} />

      {isLoading ? <LoadingIndicator /> : null}

      <PopUp
        show={isShowPopup}
        Icon={popupData?.icon}
        title={popupData?.title}
        desc={popupData?.description}
        titleConfirm={popupData?.labelConfirm}
        actionConfirm={popupData?.onPressConfirm}
        titleCancel={popupData?.labelCancel}
        actionCancel={popupData?.onPressCancel}
      />

      <SwipeUp
        height={100}
        visible={isShowSwipeUpAttachment}
        onClose={_handlerHideSwipeUpAttachment}
        children={_renderSwipeUpAttachment()}
      />

      <ClassDetail
        visible={showDescription}
        onClose={() => setShowDescription(false)}
      />
    </View>
  );
};

export default MeetingLiveSessionScreen;
