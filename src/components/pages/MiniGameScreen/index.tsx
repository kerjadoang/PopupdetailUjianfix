import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Header} from '@components/atoms/Header';
import WebView from 'react-native-webview';
import Colors from '@constants/colors';
import {useEffect, useState} from 'react';
import {getToken} from '@hooks/getToken';
import {RightArrow} from '@assets/images';
import {useNavigation, useRoute} from '@react-navigation/native';
import Config from 'react-native-config';

const MiniGameScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {data, chapterId}: any = route.params;
  const [link, setLink] = useState('');
  const item = data?.[0];

  const minigames = async () => {
    const token = await getToken();
    setLink(
      `${Config.MINI_GAMES || 'https://game.kelaspintar.id'}/${
        item?.name === 'Cocokan Objek'
          ? 'cocokan-objek'
          : item?.name === 'Benar atau Salah'
          ? 'benar-atau-salah'
          : item?.name === 'Pilah Objek'
          ? 'pilah-objek'
          : item?.name === 'Tangkap & Jawab'
          ? 'tangkap-dan-jawab'
          : 'tts'
      }/${chapterId}/${item?.id}/${token}`,
    );
  };

  useEffect(() => {
    minigames();
  }, []);

  return (
    <View style={styles.body}>
      <Header
        label={item?.name}
        colorLabel={'white'}
        iconLeft={<Image source={RightArrow} style={styles.whiteArrow} />}
        onPressIconLeft={() => navigation.goBack()}
        backgroundColor="transparent"
      />
      <WebView
        source={{
          uri: link,
        }}
        onMessage={data => {
          if (data?.nativeEvent?.data === 'finished') {
            navigation.goBack();
          }
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  body: {
    height: '100%',
    width: '100%',
    padding: 20,
    backgroundColor: Colors.primary.base,
  },
  label: {
    color: Colors.white,
  },
  whiteArrow: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    transform: [{rotate: '180deg'}],
  },
});
export {MiniGameScreen};
