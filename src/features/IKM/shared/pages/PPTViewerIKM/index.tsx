import {Header, PopUpVideoNotReady} from '@components/atoms';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {PPTViewerIKMScreenParam, ParamList} from 'type/screen';
import {styles} from './style';
import {apiGet} from '@api/wrapping';
import {URL_PATH} from '@constants/url';
import {
  dismissLoading,
  htmlObjectTagWrapping,
  isStringContains,
  showErrorToast,
  showLoading,
} from '@constants/functional';
import WebView from 'react-native-webview';
import {useNavigate} from '@hooks/useNavigate';

const PPTViewerIKMScreen = () => {
  const navigation: any =
    useNavigation<StackNavigationProp<ParamList, 'PPTViewerIKMScreen'>>();
  const {getRouteParams} = useNavigate();
  const {data, title} = getRouteParams<PPTViewerIKMScreenParam>();
  const webViewRef = useRef<any>();
  const [isPPT, setIsPPT] = useState<boolean>(true);
  const [showPopUp, setShowPopUp] = useState<boolean>(false);
  const [media, setMedia] = useState({
    ID: '000000000000000000000000',
    path_url: '',
    status: '',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={title} />,
    });
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await apiGet({
        url: URL_PATH.get_file_html(data?.file_id),
      });
      setMedia({
        ID: res?.ID,
        path_url: res?.path_url,
        status: res?.status,
      });

      if (!isStringContains(res?.path_url, 'ppt')) {
        setIsPPT(false);
      }
    } catch (err: any) {
      showErrorToast(err, {visibilityTime: 3000});
      if (isStringContains(err, 'tidak ditemukan')) {
        return navigation.goBack();
      }
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  useEffect(() => {
    if (media?.status === 'process') {
      setShowPopUp(true);
    }
  }, [media?.status]);

  const injectedJavaScript = `
  (function() {
    var elementsToHide = document.querySelectorAll('.office-doc-top-menu, .office-doc-command-bar');
    for (var i = 0; i < elementsToHide.length; i++) {
      elementsToHide[i].style.display = 'none';
    }})();`;

  const handleWebViewRef = (ref: any) => {
    webViewRef.current = ref;
  };

  return (
    <View style={styles.container}>
      {media?.path_url ? (
        <>
          <View style={styles.mediaContainer}>
            <WebView
              ref={handleWebViewRef}
              originWhitelist={['*']}
              source={{
                uri: isPPT
                  ? `https://view.officeapps.live.com/op/view.aspx?src=${media?.path_url}`
                  : '',
                html: isPPT
                  ? undefined
                  : htmlObjectTagWrapping(media?.path_url),
              }}
              onLoad={() => dismissLoading()}
              onLoadStart={() => showLoading()}
              onLoadEnd={() => dismissLoading()}
              onError={() => dismissLoading()}
              javaScriptEnabled={true}
              scalesPageToFit={true}
              javaScriptCanOpenWindowsAutomatically={true}
              injectedJavaScriptBeforeContentLoaded={injectedJavaScript}
              scrollEnabled={false}
              allowsInlineMediaPlayback={true}
              allowsProtectedMedia={true}
              mediaPlaybackRequiresUserAction={true}
              androidLayerType="hardware"
              contentMode="recommended"
              automaticallyAdjustContentInsets={false}
            />
          </View>
          <View style={styles.descriptionContainer}>
            <ScrollView
              style={styles.descriptionInnerContainer}
              showsVerticalScrollIndicator={false}>
              <View style={styles.descriptionTitleContainer}>
                <Text style={styles.descriptionTitle}>{data?.title}</Text>
              </View>
              <View style={styles.descriptionBodyContainer}>
                <Text style={styles.descriptionBody}>{data?.description}</Text>
              </View>
            </ScrollView>
          </View>
        </>
      ) : null}

      <PopUpVideoNotReady
        close={() => setShowPopUp(false)}
        show={showPopUp}
        type="presentation"
      />
    </View>
  );
};

export default PPTViewerIKMScreen;
