import {View, Text, Pressable} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {styles} from './styles';
import {Header} from '@components/atoms/Header';
import Icon_list from '@assets/svg/view-list.svg';
import {InputText, SwipeUp} from '@components/atoms';
import FastImage from 'react-native-fast-image';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import useHots from './useHots';
import WebView from 'react-native-webview';
import {StackNavigationProp} from '@react-navigation/stack';
import Lock from '@assets/svg/ic24_lock.svg';
import {htmlObjectTagWrapping} from '@constants/functional';
const HotsScreen = () => {
  const [show, setShow] = useState(false);

  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'HotsScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'HotsScreen'>>();
  const webViewRef = useRef(null);
  const {chapterData, title, question_service_type_id}: any = route.params;
  const {
    videoChoose,
    endXP,
    fileType,
    listPrincipal,
    selectedItem,
    setSelectedItem,
  } = useHots(chapterData, question_service_type_id, webViewRef, title);

  useEffect(() => {
    navigation.addListener('beforeRemove', () => {
      endXP();
    });
  }, []);
  const handleNavigationStateChange = navState => {
    if (navState.url === videoChoose?.path_url) {
      return;
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <Header label={title} />
        <View style={styles.videoContainerStyle}>
          {videoChoose?.path_url ? (
            <WebView
              ref={webViewRef}
              originWhitelist={['*']}
              source={{
                uri: fileType
                  ? `https://view.officeapps.live.com/op/view.aspx?src=${videoChoose?.path_url}`
                  : '',
                html: htmlObjectTagWrapping(videoChoose?.path_url),
              }}
              onNavigationStateChange={handleNavigationStateChange}
              userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36"
              contentMode="desktop"
              automaticallyAdjustContentInsets={false}
              style={styles.videoStyle}
            />
          ) : (
            <View style={styles.videoStyle} />
          )}
        </View>
        <View style={{padding: 16}}>
          <Text style={styles.title}>
            {selectedItem ? selectedItem?.name : chapterData?.chapter?.name}
          </Text>
          <InputText
            placeholder="Tulis pembahasan di sini..."
            backgroundColor="#F5F7F9"
            multiline
            inputTextStyle={styles.input}
          />
        </View>
      </ScrollView>
      {/* {fileType ? ( */}
      <Pressable style={styles.button} onPress={() => setShow(!show)}>
        <Icon_list width={24} height={24} />
        <Text style={styles.textButton}> Pokok Bahasan</Text>
      </Pressable>
      {/* ) : null} */}
      {show ? (
        <SwipeUp
          height={300}
          visible={show}
          onClose={() => setShow(!show)}
          children={
            <View style={styles.containerSwipe}>
              <Text style={[styles.modalTitle]}>Pokok Bahasan</Text>
              {/* <View style={styles.searchBar}>
                <Pressable style={styles.iconSearch}>
                  <Icon_search width={24} height={24} />
                </Pressable>
                <TextInput
                  placeholder={'Cari Kata Kunci'}
                  style={styles.search}
                />
              </View> */}
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{height: 300}}>
                {listPrincipal?.map((item: any, i: any) => (
                  <Pressable
                    style={styles.listContainer}
                    key={i}
                    disabled={item?.unlocked ? false : true}
                    onPress={() => setSelectedItem(item)}>
                    <FastImage
                      style={styles.thumbail}
                      source={{
                        uri: item?.path_url,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text style={[styles.textList, {width: '70%'}]}>
                      {item?.name}
                    </Text>

                    {item?.unlocked ? (
                      <View style={styles.empty} />
                    ) : (
                      <Lock width={20} height={20} />
                    )}
                  </Pressable>
                ))}
              </ScrollView>
              <Pressable
                style={[styles.button, {width: '90%'}]}
                onPress={() => setShow(!show)}>
                <Text style={styles.textButton}>Kembali</Text>
              </Pressable>
            </View>
          }
        />
      ) : null}
    </SafeAreaView>
  );
};

export {HotsScreen};
