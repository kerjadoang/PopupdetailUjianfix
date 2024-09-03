/* eslint-disable react-hooks/exhaustive-deps */
import {
  Text,
  View,
  Pressable,
  ScrollView,
  Platform,
  Image,
  Animated,
  Easing,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Button, PopUpVideoNotReady, SwipeUp} from '@components/atoms';
import {Header} from '@components/atoms/Header';
import Video from 'react-native-video';
import Icon_setting from '@assets/svg/ic24_settings_white.svg';
import Icon_play from '@assets/svg/ic64_play.svg';
import Icon_next from '@assets/svg/icon_nextplus5.svg';
import Icon_previous from '@assets/svg/icon_next5.svg';
import Icon_fullscreen from '@assets/svg/ic24_fullscreen_white.svg';
import Icon_sound from '@assets/svg/ic24_volume_on_white.svg';
import Colors from '@constants/colors';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import Icon_pause from '@assets/svg/ic64_pause.svg';
import Icon_mute from '@assets/svg/ic24_volume_off_white.svg';
import dayjs from 'dayjs';
import {showErrorToast} from '@constants/functional';
import {styles} from './styles';
import useVideoPlayerIkm from './useVideoPlayerIkm';
import useFormVideoAnimation from '@components/pages/VideoAnimationScreen/useFormVideoAnimation';
import RobotUpload from '@assets/svg/robot_upload.svg';

import {
  modalItems,
  playbackItems,
} from '@components/pages/VideoAnimationScreen/useDummy';

const VideoPlayerIkmScreen = () => {
  const [accordion, setAccordion] = useState(null);
  const [settingShow, setSettingShow] = useState(false);
  const videoRef = useRef(null);
  dayjs.locale('id');
  const {data, userRole} = useVideoPlayerIkm();

  const {
    handleFullScreen,
    fullScreen,
    pause,
    handlePause,
    sliderValue,
    handleSkipForward,
    handleSkipBackward,
    handleLoad,
    handleProgress,
    handleSliderChange,
    handleEnd,
    handleSlidingComplete,
    getTimeDisplay,
    handleMute,
    muted,
    hide,
    video,
    handleResolution,
    handleSpeed,
    videoChoose,
    downloaded,
    videoQuality,
    speed,
    handleControls,
    videoForLocal,
    showPopUp,
    setShowPopUp,
    haveVideoToLoad,
    setHaveVideoToLoad,
  } = useFormVideoAnimation(data, videoRef, '');

  const videoUri =
    Platform.OS === 'android' ? `file://${videoForLocal}` : videoForLocal;

  const toggleAccordion = (i: any) => {
    if (accordion === i) {
      return setAccordion(null);
    }
    setAccordion(i);
  };

  const posterUri = video?.thumbnail
    ? video?.thumbnail
    : Image.resolveAssetSource(require('@assets/images/default_video.png')).uri;
  const videoSourceUri = downloaded
    ? `${videoUri}`
    : videoChoose
    ? `${videoChoose}`
    : video?.path_url;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (videoSourceUri === undefined || video?.status === 'failed') {
      setHaveVideoToLoad(false);

      video?.status === 'failed'
        ? showErrorToast('Gagal menampilkan video.')
        : null;

      return;
    }

    setHaveVideoToLoad(true);
  }, [videoSourceUri]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: hide ? 0 : 100,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, hide]);

  const renderSettingSpeed = () => {
    const items = modalItems?.[0];
    return (
      <View>
        <Pressable
          style={styles.settingList}
          onPress={() => toggleAccordion(items?.id)}>
          <Text style={styles.title}>{items?.title}</Text>
          {accordion === items?.id ? (
            <Icons name="chevron-up" size={24} />
          ) : (
            <Icons name="chevron-down" size={24} />
          )}
        </Pressable>

        {accordion === items?.id ? (
          <View>
            {playbackItems?.map((item, i) => (
              <Pressable
                style={styles.accordion}
                key={i}
                onPress={() => handleSpeed(item)}>
                <Text
                  style={
                    speed === item?.speed
                      ? styles.textAccordionChoosen
                      : styles.textAccordion
                  }>
                  {item?.speed === 1
                    ? item?.speed + '.0x' + ' (Normal)'
                    : item?.speed + 'x'}
                </Text>
                {speed === item?.speed ? (
                  <Icons name="check" size={24} color={Colors.primary.base} />
                ) : null}
              </Pressable>
            ))}
          </View>
        ) : null}
      </View>
    );
  };

  const renderSettingQuality = () => {
    const items = modalItems?.[1];
    return (
      <View>
        <Pressable
          style={styles.settingList}
          onPress={() => toggleAccordion(items?.id)}>
          <Text style={styles.title}>{items?.title}</Text>
          {accordion === items?.id ? (
            <Icons name="chevron-up" size={24} />
          ) : (
            <Icons name="chevron-down" size={24} />
          )}
        </Pressable>

        {accordion === items?.id ? (
          <View>
            <View>
              {videoQuality?.map((item: any, i: any, arr: any[]) => (
                <Pressable
                  style={styles.accordion}
                  key={i}
                  onPress={() => handleResolution(i)}>
                  <Text
                    style={
                      videoChoose === item?.path_url
                        ? styles.textAccordionChoosen
                        : styles.textAccordion
                    }>
                    {i === 0
                      ? item?.resolution.split('x')[1] + 'p (Rendah)'
                      : i === arr.length - 1
                      ? item?.resolution.split('x')[1] + 'p (Tinggi)'
                      : item?.resolution.split('x')[1] + 'p'}
                  </Text>
                  {videoChoose === item?.path_url ? (
                    <Icons name="check" size={24} color={Colors.primary.base} />
                  ) : null}
                </Pressable>
              ))}
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {fullScreen ? null : <Header label={'Video Tutorial'} />}

      <View style={styles.videoContainerStyle}>
        {haveVideoToLoad ? (
          <Video
            ref={videoRef}
            paused={pause}
            source={{uri: videoSourceUri}}
            style={fullScreen ? styles.fullscreenVideo : styles.videoStyle}
            resizeMode={'contain'}
            onLoad={handleLoad}
            poster={posterUri}
            onProgress={handleProgress}
            onEnd={handleEnd}
            muted={muted}
            rate={speed}
            fullscreen={fullScreen}
          />
        ) : (
          <View style={styles.videoStyle} />
        )}

        <Animated.View
          style={[
            styles.animatedContainer,
            {
              opacity: fadeAnim,
            },
          ]}>
          <Pressable style={styles.controlContainer} onPress={handleControls}>
            <View style={styles.control}>
              <Icon_setting
                width={25}
                height={25}
                style={styles.setting}
                onPress={() => setSettingShow(true)}
              />
              <View style={styles.controlMain}>
                <Icon_previous
                  width={56}
                  height={56}
                  style={styles.play}
                  onPress={handleSkipBackward}
                />
                {pause ? (
                  <Icon_play
                    width={56}
                    height={56}
                    style={styles.play}
                    onPress={handlePause}
                  />
                ) : (
                  <Icon_pause
                    width={56}
                    height={56}
                    style={styles.play}
                    onPress={handlePause}
                  />
                )}
                <Icon_next
                  width={56}
                  height={56}
                  style={styles.play}
                  onPress={handleSkipForward}
                />
              </View>
            </View>
            <View style={styles.sliderContainer}>
              <View style={styles.iconFullscreenContainer}>
                <Text style={styles.time}>{getTimeDisplay()}</Text>
                <View style={styles.flexRow}>
                  {muted ? (
                    <Icon_mute width={21} height={17} onPress={handleMute} />
                  ) : (
                    <Icon_sound width={21} height={17} onPress={handleMute} />
                  )}
                  <Icon_fullscreen
                    width={21}
                    height={17}
                    onPress={handleFullScreen}
                  />
                </View>
              </View>
              <Slider
                style={styles.slider}
                minimumTrackTintColor={Colors.yellow}
                maximumTrackTintColor={Colors.white}
                thumbTintColor={Colors.primary.base}
                value={sliderValue}
                onValueChange={handleSliderChange}
                onSlidingComplete={handleSlidingComplete}
              />
            </View>
          </Pressable>
        </Animated.View>
      </View>
      <ScrollView
        style={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headerContent}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.title}>{data?.title}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      {settingShow ? (
        <SwipeUp
          height={300}
          visible={true}
          onClose={() => setSettingShow(false)}
          children={
            <View style={styles.padding10}>
              {renderSettingSpeed()}
              {videoQuality ? renderSettingQuality() : null}

              <Button
                action={() => setSettingShow(!settingShow)}
                label="Tutup"
                top={20}
              />
            </View>
          }
          styleInnerContainer={styles.padding16}
        />
      ) : null}

      <PopUpVideoNotReady
        overrideTitle={userRole === 'GURU'}
        title={'Dalam Proses Unggahan Lampiran'}
        close={() => setShowPopUp(false)}
        show={showPopUp}
        Icon={RobotUpload}
      />
    </View>
  );
};

export {VideoPlayerIkmScreen};
