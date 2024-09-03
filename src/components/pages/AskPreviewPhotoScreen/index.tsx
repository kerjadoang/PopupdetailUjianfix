import {StyleSheet, Image, View} from 'react-native';
import React from 'react';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
const AskPreviewPhotoScreen = () => {
  const route = useRoute();
  const {imageUri}: any = route?.params;

  return (
    <SafeAreaView style={styles.content}>
      <Header
        label="Preview Photo"
        colorLabel={Colors.white}
        backgroundColor="#1D252D"
      />
      <View style={styles.imageContent}>
        <Image
          source={{uri: imageUri}}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

export {AskPreviewPhotoScreen};

const styles = StyleSheet.create({
  image: {
    width: 328,
    height: 328,
    borderRadius: 10,
  },
  imageContent: {justifyContent: 'center', alignItems: 'center', flex: 1},
  content: {
    flex: 1,
    backgroundColor: '#1D252D',
  },
});
