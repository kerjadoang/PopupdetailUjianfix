import React, {useLayoutEffect, useRef} from 'react';
import {View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Header} from '@components/atoms';
import WebView from 'react-native-webview';
import {ParamList} from 'type/screen';
import {dismissLoading, showLoading} from '@constants/functional';
import {URL_PATH} from '@constants/url';
import {apiPost} from '@api/wrapping';

const JitsiScreen = () => {
  const webViewRef = useRef(null);
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'JitsiScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'JitsiScreen'>>();
  const {meeting_url, id} = route.params.data;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header onPressIconLeft={onLeaveMeeting} />,
    });
  }, [navigation]);

  const onLeaveMeeting = async () => {
    try {
      showLoading();

      await apiPost({
        url: URL_PATH.post_leave_virtual_meeting(id ?? 0),
      });

      navigation.goBack();
    } catch (error) {
    } finally {
      dismissLoading();
    }
  };
  return (
    <View style={{backgroundColor: 'black', flex: 1}}>
      <WebView
        ref={webViewRef}
        style={{flex: 2}}
        source={{
          uri: meeting_url,
          // uri: `${link_url || meeting_url}${route.params?.token?.replace(
          //   /^"(.*)"$/,
          //   '$1',
          // )}`,
        }}
        useWebView2={true}
        // userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        allowsInlineMediaPlayback={true}
        bounces={false}
      />
    </View>
  );
};

export default JitsiScreen;
