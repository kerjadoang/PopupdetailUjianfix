import React, {useLayoutEffect} from 'react';
import {Image, ScrollView, View} from 'react-native';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@components/atoms/Header';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import useViewAttachment from './useViewAttachment';
import Colors from '@constants/colors';
import WhiteArrowLeft from '@assets/svg/ic_arrow_left_white.svg';

const ViewAttachmentScreen = () => {
  const navigation: any = useNavigation();
  const {isLoading, imageUrl, fileUrl} = useViewAttachment();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          colorLabel={Colors.white}
          backgroundColor={Colors.backgroundViewAttachment}
          iconLeft={<WhiteArrowLeft />}
          onPressIconLeft={() => navigation.goBack()}
          label={'Preview'}
        />
      ),
    });
  }, []);

  const _renderContentImage = () => {
    return (
      <View style={styles.container}>
        <View style={styles.imageContent}>
          <Image source={{uri: imageUrl}} style={styles.image} />
        </View>
      </View>
    );
  };

  const _renderContentFile = () => {
    return (
      <View style={styles.container}>
        <View style={styles.imageContent}>
          <Image source={{uri: fileUrl}} style={styles.image} />
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={styles.rootContainer}>
        <ScrollView
          bounces={false}
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          {imageUrl ? _renderContentImage() : _renderContentFile()}
        </ScrollView>
      </View>

      {isLoading ? <LoadingIndicator /> : null}
    </>
  );
};

export default ViewAttachmentScreen;
