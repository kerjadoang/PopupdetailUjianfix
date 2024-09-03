/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import {Text} from 'react-native-paper';
import AppIntroSlider from 'react-native-app-intro-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '@constants/colors';
import OnboardingImage1 from '@assets/svg/onboarding_1.svg';
import OnboardingImage2 from '@assets/svg/onboarding_2.svg';
import {Keys} from '@constants/keys';

const HEIGHT = Math.round(Dimensions.get('window').height);

const handleMarginBottomDot = (viewImageLayoutProps: {
  y: number;
  height: number;
}) => {
  let viewImageLayoutHeight =
    viewImageLayoutProps.y + viewImageLayoutProps.height;

  if (HEIGHT <= 750 && HEIGHT > 680) {
    viewImageLayoutHeight -= 30;
  } else if (HEIGHT <= 680) {
    viewImageLayoutHeight -= 60;
  } else if (HEIGHT >= 800 && Platform.OS === 'android') {
    viewImageLayoutHeight += 30;
  }

  return viewImageLayoutHeight;
};

type Props = {
  navigation: any;
};

const slides = [
  {
    key: 'one',
    title: 'Selamat Datang!',
    text: 'Belajar, latihan, serta tes kemampuan belajarmu bersama Kelas Pintar.',
    image: <OnboardingImage1 />,
  },
  {
    key: 'two',
    title: 'Solusi Belajar Online',
    text: 'Belajar lebih mudah dan menyenangkan dengan metode pintar, interaktif,\ndan terintegrasi.',
    image: <OnboardingImage2 />,
  },
  {
    key: 'three',
    title: 'Semua Bisa Pintar',
    text: 'Belajar dengan materi pelajaran yang bervariasi, puluhan ribu soal latihan serta penjelasannya dari Kelas Pintar​.',
    image: (
      <Image
        source={require('@assets/images/onboarding_3.png')}
        style={{width: 320, height: 320}}
      />
    ),
  },
];

const OnboardingScreen: FC<Props> = ({navigation}) => {
  const [viewImageLayoutProps, setViewImageLayoutProps] = useState({
    y: 0,
    height: 0,
  });

  const handleDone = async () => {
    await AsyncStorage.setItem(Keys.onboarded, 'true');
    navigation.reset({index: 0, routes: [{name: 'Autentikasi'}]});
  };

  const marginBottom = handleMarginBottomDot(viewImageLayoutProps);

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <TouchableOpacity style={styles.buttonSkip} onPress={handleDone}>
        <Text style={styles.textSkip}>Lewati</Text>
      </TouchableOpacity>

      <AppIntroSlider
        data={slides}
        bottomButton={true}
        onDone={handleDone}
        dotStyle={{
          backgroundColor: Colors.dark.neutral40,
          marginBottom: marginBottom,
        }}
        activeDotStyle={{
          backgroundColor: Colors.primary.base,
          marginBottom: marginBottom,
        }}
        keyExtractor={item => item.key}
        renderNextButton={() => (
          <View style={styles.buttonNext}>
            <Text style={styles.textButton}>Lanjut</Text>
          </View>
        )}
        renderDoneButton={() => (
          <View style={styles.buttonNext}>
            <Text style={styles.textButton}>Mulai</Text>
          </View>
        )}
        renderItem={({item}: any) => (
          <View style={styles.container}>
            <View
              onLayout={event => {
                const {y, height} = event.nativeEvent.layout;
                setViewImageLayoutProps({y, height});
              }}>
              {item.image}
            </View>

            <Text style={styles.textTitle}>{item.title}</Text>
            <Text style={styles.textText}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonSkip: {
    alignSelf: 'flex-end',
    paddingRight: 20,
    paddingTop: 15,
  },
  textSkip: {
    fontFamily: 'Poppins-Regular',
    color: Colors.primary.dark1,
    letterSpacing: 0.25,
  },
  buttonNext: {
    backgroundColor: Colors.primary.base,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  textButton: {
    fontFamily: 'Poppins-Bold',
    color: Colors.white,
    fontSize: 16,
    letterSpacing: 0.25,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 64,
  },
  textTitle: {
    fontSize: 24,
    marginTop: 50,
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
  },
  textText: {
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
    paddingHorizontal: 3,
    marginTop: 8,
    textAlign: 'center',
  },
});

export {OnboardingScreen};
