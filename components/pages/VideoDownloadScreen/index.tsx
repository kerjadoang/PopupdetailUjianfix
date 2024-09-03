import React from 'react';
import Colors from '@constants/colors';
import useVideoDownload from './useVideoDownload';
import IconArrowRghtBlue from '@assets/svg/ic_arrow_right_blue.svg';
import ProgressBar from '@components/atoms/ProgressBar';
import {styles} from './style';
import {Header} from '@components/atoms/Header';
import {Switch} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button, SwipeUp} from '@components/atoms';
import {_handlerCapitalizeFirstLetter} from '@constants/functional';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

const VideoDownloadScreen = () => {
  const {
    isShowSwipeUp,
    listQualityVideo,
    selectedQualityVideo,
    availableStorage,
    totalStorage,
    availableStorageInPercent,
    currentSwitchCondition,
    _handlerOnPressSetPreferedQualityVideo,
    _handlerSelectedQualityVideo,
    _handlerShowSwipeUp,
    _handlerHideSwipeUp,
    _handlerSwitchCondition,
  } = useVideoDownload();
  const navigation: any = useNavigation();
  const {resolution, description} = selectedQualityVideo || false;
  const titleSelected =
    description && resolution
      ? `${_handlerCapitalizeFirstLetter(description)} (${resolution})p`
      : '-';

  const _renderSwipeUpContent = () => {
    return (
      <View style={styles.swipeUpContainer}>
        <Text style={styles.titleSwipeUp}>{'Kualitas Video'}</Text>

        {listQualityVideo &&
          listQualityVideo?.map((value: any, index: number) => {
            const {id, resolution, description} = value;
            const isSelectedItem = selectedQualityVideo?.id === id;
            const title = `${_handlerCapitalizeFirstLetter(
              description,
            )} (${resolution})p`;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  _handlerSelectedQualityVideo(value);
                }}
                style={styles.swipeUpContentContainer}>
                <Text
                  style={
                    isSelectedItem
                      ? styles.descriptionSwipeUpActive
                      : styles.descriptionSwipeUpPasive
                  }>
                  {title}
                </Text>

                <View
                  style={
                    isSelectedItem
                      ? styles.outterDotActive
                      : styles.outterDotPassive
                  }>
                  <View style={styles.innerDot} />
                </View>
              </TouchableOpacity>
            );
          })}

        <Button
          top={16}
          label={'Terapkan'}
          action={_handlerOnPressSetPreferedQualityVideo}
        />
      </View>
    );
  };

  return (
    <View style={styles.rootContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <Header label={'Unduhan Video'} />

        <View style={styles.container}>
          <View style={styles.card}>
            <Text style={styles.title}>{'Unduh hanya menggunakan wifi'}</Text>
            <Switch
              thumbColor={
                currentSwitchCondition
                  ? Colors.success.light1
                  : Colors.dark.neutral60
              }
              onValueChange={(val: any) => {
                _handlerSwitchCondition(val);
              }}
              value={currentSwitchCondition || false}
              trackColor={{
                false: Colors.dark.neutral40,
                true: Colors.success.light2,
              }}
            />
          </View>

          <View style={styles.greyLine} />

          <TouchableOpacity onPress={_handlerShowSwipeUp} style={styles.card}>
            <Text style={styles.title}>{'Kualitas Video'}</Text>

            <View style={styles.rightContentContainer}>
              <Text style={styles.descriptionQualityVideo}>
                {titleSelected}
              </Text>
              <IconArrowRghtBlue width={24} height={24} />
            </View>
          </TouchableOpacity>

          <View style={styles.greyLine} />

          <View style={styles.cardMemoryContainer}>
            <View style={styles.cardMemory}>
              <Text style={styles.title}>{'Memori Internal'}</Text>
              <Text
                style={
                  styles.description
                }>{`${availableStorage}/${totalStorage}`}</Text>
            </View>
            <ProgressBar progress={availableStorageInPercent || '0%'} />
          </View>

          <View style={styles.greyLine} />

          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              navigation.navigate('SavedVideoScreen', {});
            }}>
            <Text style={styles.title}>{'Video tersimpan'}</Text>

            <IconArrowRghtBlue width={24} height={24} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      <SwipeUp
        height={140}
        visible={isShowSwipeUp}
        onClose={_handlerHideSwipeUp}
        children={_renderSwipeUpContent()}
      />
    </View>
  );
};

export default VideoDownloadScreen;
