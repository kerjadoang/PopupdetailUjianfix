import React, {useLayoutEffect} from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {SvgUri} from 'react-native-svg';
import {
  _handlerSubstringText,
  hostEndsWith,
  lisFileSvgExtension,
  listFileImageExtension,
} from '@constants/functional';

const ViewPhotoScreen = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const {path_url, header_label}: any = route?.params;
  const imageFileExtension = path_url && path_url?.split('.')?.pop();
  const isAvatarImage = listFileImageExtension.includes(imageFileExtension);
  const isAvatarSvg = lisFileSvgExtension.includes(imageFileExtension);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          styleLabel={styles.headerLabel}
          label={_handlerSubstringText(header_label, 38)}
        />
      ),
    });
  }, []);

  const _renderContentImage = () => {
    return (
      <View style={styles.container}>
        <View style={styles.imageContent}>
          {isAvatarSvg ? (
            <SvgUri uri={path_url} style={styles.image} />
          ) : isAvatarImage ? (
            <Image source={hostEndsWith(path_url ?? '')} style={styles.image} />
          ) : null}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.rootContainer}>
      <ScrollView
        bounces={false}
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        {_renderContentImage()}
      </ScrollView>
    </View>
  );
};

export default ViewPhotoScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: Colors.dark.neutral100,
  },
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContent: {
    backgroundColor: Colors.dark.neutral40,
    height: 330,
    width: 330,
    borderRadius: 10,
  },
  image: {
    borderRadius: 10,
    flex: 1,
    resizeMode: 'cover',
  },
  headerLabel: {
    maxWidth: '60%',
    textAlign: 'center',
  },
});
