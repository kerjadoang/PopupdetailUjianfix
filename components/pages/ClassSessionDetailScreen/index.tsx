/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import useClassSessionDetail from './useClassSessionDetail';
import {SvgUri} from 'react-native-svg';
import LiveIcon from '@assets/svg/ic16_live.svg';
import {Button, PopUpVideoNotReady, SwipeUp} from '@components/atoms';
import Video from 'react-native-video';
import Icon_setting from '@assets/svg/ic24_settings_white.svg';
import Icon_play from '@assets/svg/ic64_play.svg';
import Icon_next from '@assets/svg/icon_nextplus5.svg';
import Icon_previous from '@assets/svg/icon_next5.svg';
import Icon_fullscreen from '@assets/svg/ic24_fullscreen_white.svg';
import Icon_sound from '@assets/svg/ic24_volume_on_white.svg';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import useFormVideoAnimation from '@components/pages/VideoAnimationScreen/useFormVideoAnimation';
import Slider from '@react-native-community/slider';
import IconStar from '@assets/svg/ic16_star.svg';
import {styles} from './styles';
import useRecord from '../HistoryAndRecordsScreen/useRecord';
import Icon_pause from '@assets/svg/ic64_pause.svg';
import {useRoute} from '@react-navigation/native';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import {playbackItems} from '../VideoAnimationScreen/useDummy';
import Icon_mute from '@assets/svg/ic24_volume_off_white.svg';
const ClassSessionDetailScreen = () => {
  const route: any = useRoute();
  const {id} = route.params;

  const {
    navigation,
    data,
    classCategory,
    subjectData,
    getButtonColor,
    getButtonBgColor,
    getButtonIsDisabled,
    getButtonLabel,
    getButtonAction,
    ratingUser,
    isLoading,
  } = useClassSessionDetail(id);

  const {dataRecord} = useRecord(id);
  const videoRef = useRef(null);
  const [accordion, setAccordion] = useState(null);
  const [settingShow, setSettingShow] = useState(false);
  const {
    handleControls,
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
    //handleSectionTime,
    speed,
    handleSpeed,
    videoChoose,
    videoQuality,
    fullScreen,
    handleFullScreen,
    showPopUp,
    setShowPopUp,
  } = useFormVideoAnimation(dataRecord, videoRef);

  const modalItems = [
    {
      id: 1,
      title: 'Kecepatan Video',
    },
    {
      id: 2,
      title: 'Kualitas Video',
    },
  ];
  const toggleAccordion = (i: any) => {
    if (accordion === i) {
      return setAccordion(null);
    }
    setAccordion(i);
  };

  const renderBadge = (status: any, start_soon: boolean) => {
    let text = '';
    let bgColor = '';
    let color = '';
    switch (status) {
      case 'on_going':
        text = start_soon ? 'Belum Dimulai' : 'Sedang Berlangsung';
        bgColor = start_soon
          ? Colors?.secondary.light2
          : Colors?.danger?.light2;
        color = start_soon ? Colors?.secondary.dark1 : Colors?.danger.base;
        break;
      case 'finish':
        text = 'Selesai';
        bgColor = Colors.success.light2;
        color = Colors?.success.base;
        break;
      case 'canceled':
        text = 'Dibatalkan';
        bgColor = Colors.dark.neutral10;
        color = Colors.dark.neutral80;
        break;
      default:
        text = 'Belum Berlangsung';
        bgColor = Colors?.secondary.light2;
        color = Colors?.secondary.dark1;
        break;
    }
    return (
      <View
        style={[
          styles.chips,
          {
            marginTop: 4,
            alignSelf: 'flex-start',
            backgroundColor: bgColor,
            flexDirection: 'row',
          },
        ]}>
        {status === 'on_going' && !start_soon ? (
          <LiveIcon width={16} height={16} style={{marginRight: 8}} />
        ) : null}
        <Text style={[styles.chipsText, {color: color}]}>{text}</Text>
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        width: '100%',
      }}>
      {fullScreen ? null : (
        <Header
          label={'Detail Sesi Kelas'}
          onPressIconLeft={() => navigation.goBack()}
        />
      )}
      <ScrollView contentContainerStyle={[{flexGrow: 1}]}>
        {dataRecord?.media?.media || dataRecord?.zoom?.media_id ? (
          <View style={styles.videoContainerStyle}>
            {videoChoose === null ? (
              <View
                style={[
                  styles.videoStyle,
                  {
                    justifyContent: 'center',
                    backgroundColor: Colors.dark.neutral50,
                  },
                ]}>
                <ActivityIndicator
                  size={'small'}
                  style={{alignSelf: 'center'}}
                />
              </View>
            ) : (
              <Video
                ref={videoRef}
                paused={pause}
                source={{uri: `${videoChoose}`}}
                style={fullScreen ? styles.fullscreenVideo : styles.videoStyle}
                resizeMode="contain"
                onLoad={handleLoad}
                poster={video?.thumbnail}
                onProgress={handleProgress}
                onEnd={handleEnd}
                muted={muted}
                rate={speed}
                fullscreen={fullScreen}
              />
            )}

            <Pressable
              style={[styles.controlContainer, {opacity: hide ? 0 : 100}]}
              onPress={handleControls}>
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.time}>{getTimeDisplay()}</Text>
                  <View style={{flexDirection: 'row'}}>
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
          </View>
        ) : null}

        <View style={[styles.container]}>
          <View style={{flexDirection: 'row', marginBottom: 16}}>
            {classCategory?.map((data: any, index: number) => (
              <View style={styles.chips} key={index}>
                <Text style={styles.chipsText}>
                  {data?.name
                    ?.replace('_', ' ')
                    ?.replace('live', 'Langsung')
                    ?.replace('record', 'Rekaman')}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.subjectContainer}>
            <View style={styles.leftSubjectContainer}>
              <Text style={styles.subjectName}>{subjectData?.name}</Text>
              <Text style={styles.subjectTitle}>{subjectData?.title}</Text>
              <Text style={styles.subjectDate}>{subjectData?.date}</Text>
              {renderBadge(subjectData?.status, subjectData?.start_soon)}
            </View>
            {subjectData?.image?.endsWith('svg') ? (
              <SvgUri uri={subjectData.image} height={64} width={64} />
            ) : (
              <Image
                style={{width: 64, height: 64}}
                source={{
                  uri: subjectData.image,
                }}
              />
            )}
          </View>
          {dataRecord?.cancel_reason ? (
            <View>
              <View style={styles.rectangle} />
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Alasan Pembatalan</Text>
                <Text style={styles.descriptionText}>
                  {dataRecord?.cancel_reason || '-'}
                </Text>
              </View>
            </View>
          ) : null}
          <View style={styles.rectangle} />
          {subjectData?.description ? (
            <View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionTitle}>Deskripsi</Text>
                <Text style={styles.descriptionText}>
                  {subjectData?.description || '-'}
                </Text>
              </View>
              <View style={styles.rectangle} />
            </View>
          ) : null}
          <View style={styles.userContainer}>
            {subjectData?.avatar_path_url?.endsWith('svg') ? (
              <SvgUri uri={subjectData.image} height={40} width={40} />
            ) : (
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 25,
                  backgroundColor: Colors.purple.light,
                }}
                source={{
                  uri: subjectData?.avatar_path_url,
                }}
              />
            )}
            <View style={{flexDirection: 'column', marginLeft: 8}}>
              <Text style={styles.userTitleText}>Diajar Oleh</Text>
              <Text style={styles.userName}>
                {data?.user_created_by?.full_name}
              </Text>
            </View>
          </View>
          <View style={styles.rectangle} />
          {subjectData?.status === 'finish' && ratingUser ? (
            <View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.textRatingUser}>Nilai Keaktifan</Text>
                <View style={{flexDirection: 'row'}}>
                  <IconStar width={16} height={16} style={{marginRight: 4}} />
                  <Text style={styles.textRatingNumber}>
                    {ratingUser ? ratingUser : 0}
                  </Text>
                </View>
              </View>
              <View style={styles.rectangle} />
            </View>
          ) : null}
        </View>
      </ScrollView>
      {settingShow ? (
        <SwipeUp
          height={300}
          visible={true}
          onClose={() => setSettingShow(false)}
          children={
            <View style={{padding: 10}}>
              {modalItems?.map((item: any) => (
                <View key={item?.id}>
                  <Pressable
                    style={styles.settingList}
                    onPress={() => toggleAccordion(item?.id)}>
                    <Text style={styles.title}>{item?.title}</Text>
                    {accordion === item?.id ? (
                      <Icons name="chevron-up" size={24} />
                    ) : (
                      <Icons name="chevron-down" size={24} />
                    )}
                  </Pressable>
                  {accordion === item?.id ? (
                    <View>
                      {item?.id === 1 ? (
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
                                <Icons
                                  name="check"
                                  size={24}
                                  color={Colors.primary.base}
                                />
                              ) : null}
                            </Pressable>
                          ))}
                        </View>
                      ) : (
                        <View>
                          {videoQuality?.map(
                            (item: any, i: any, arr: any[]) => (
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
                                    ? item?.resolution.split('x')[1] +
                                      'p (Rendah)'
                                    : i === arr.length - 1
                                    ? item?.resolution.split('x')[1] +
                                      'p (Tinggi)'
                                    : item?.resolution.split('x')[1] + 'p'}
                                </Text>
                                {videoChoose === item?.path_url ? (
                                  <Icons
                                    name="check"
                                    size={24}
                                    color={Colors.primary.base}
                                  />
                                ) : null}
                              </Pressable>
                            ),
                          )}
                        </View>
                      )}
                    </View>
                  ) : null}
                </View>
              ))}
              <Button
                action={() => setSettingShow(!settingShow)}
                label="Tutup"
                top={20}
              />
            </View>
          }
          styleInnerContainer={{padding: 16}}
        />
      ) : null}
      {data?.status !== 'finish' && data?.status !== 'canceled' && (
        <View style={styles.bottomContainer}>
          <Button
            label={getButtonLabel()}
            customDisabled={getButtonIsDisabled()}
            background={getButtonBgColor()}
            color={getButtonColor()}
            action={() => {
              getButtonAction(data);
            }}
          />
        </View>
      )}
      <PopUpVideoNotReady close={() => setShowPopUp(false)} show={showPopUp} />
      {isLoading ? <LoadingIndicator /> : null}
    </View>
  );
};

export {ClassSessionDetailScreen};
