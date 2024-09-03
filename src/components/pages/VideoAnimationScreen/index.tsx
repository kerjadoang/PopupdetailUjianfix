/* eslint-disable react-hooks/exhaustive-deps */
import {
  Text,
  View,
  Pressable,
  ScrollView,
  TouchableOpacity,
  Platform,
  Image,
  Animated,
  Easing,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Button,
  PopUpVideoNotReady,
  PopUpWithIcon,
  ProgressCircle,
  SwipeUp,
} from '@components/atoms';
import {styles} from './styles';
import Mascot from '@assets/svg/robot_download.svg';
import Mascot2 from '@assets/svg/mascot_delete_video.svg';
import {Header} from '@components/atoms/Header';
import SnackbarResult from '@components/atoms/SnackbarResult';
import Icon from '@assets/svg/ic24_note_add_blue.svg';
import Video from 'react-native-video';
import Ic_mulai from '@assets/svg/ic16_Mulai.svg';
import Icon_download from '@assets/svg/ic_download.svg';
import Icon_green_download from '@assets/svg/ic_already_download.svg';
import Icon_setting from '@assets/svg/ic24_settings_white.svg';
import Icon_play from '@assets/svg/ic64_play.svg';
import Icon_next from '@assets/svg/icon_nextplus5.svg';
import Icon_previous from '@assets/svg/icon_next5.svg';
import Icon_fullscreen from '@assets/svg/ic24_fullscreen_white.svg';
import Icon_sound from '@assets/svg/ic24_volume_on_white.svg';
import Colors from '@constants/colors';
import FastImage from 'react-native-fast-image';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import DetailNote from '../NotesScreen/components/DetailNote';
import {
  NavigationContext,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import useFormVideoAnimation from './useFormVideoAnimation';
import Slider from '@react-native-community/slider';
import Icon_pause from '@assets/svg/ic64_pause.svg';
import Icon_mute from '@assets/svg/ic24_volume_off_white.svg';
import dayjs from 'dayjs';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchEndDurationLearn,
  fetchStartDurationLearn,
  getDetailNoteDestroy,
  videoDestroy,
} from '@redux';
import {modalItems, playbackItems, switchItems} from './useDummy';
import {StackNavigationProp} from '@react-navigation/stack';
import VideoCamera from '@assets/svg/video_white.svg';
import Right from '@assets/svg/ic16_chevron_right_white.svg';
import RightGrey from '@assets/svg/ic_arrow_grey_right.svg';
import IconCheck from '@assets/svg/ic_play_btn_blue.svg';
import RightIcon from '@assets/svg/ic_arrow_right_blue.svg';
import ProviderLPT from '@services/lpt/provider';
import Ic_practice from '@assets/svg/ic32_practice.svg';
import Ic_test from '@assets/svg/ic32_test.svg';
import {SubjectType} from '@constants/subjectType';
import {SwipeUpActionMaterials} from '@components/molecules';
import More from '@assets/svg/ic24_more_blue.svg';
import {ParamList} from 'type/screen';
import {showErrorToast} from '@constants/functional';
import RenderImage from '@components/atoms/RenderImage';
import {IMAGES} from '@constants/image';

const VideoAnimationScreen = ({}: any) => {
  const [count, setCount] = useState(1);
  const dispatch: any = useDispatch();
  const [accordion, setAccordion] = useState(null);
  const [durationId, setDurationId] = useState(0);
  const [settingShow, setSettingShow] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState<boolean>(false);
  const [openMore, setOpenMore] = useState<boolean>(false);
  const [showSnackBar, setShowSnackbar] = useState<boolean>(false);
  const route: any = useRoute();
  const {getUser}: any = useSelector(state => state);
  const {
    chapterData,
    allChapterData,
    type,
    subject,
    isFromGuru,
    isFromSchoolMaterials,
  }: any = route?.params;
  const videoRef = useRef(null);
  dayjs.locale('id');
  const {
    handleFullScreen,
    progress,
    fullScreen,
    image,
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
    handleSectionTime,
    handleSnackbar,
    snackbar,
    videoChoose,
    submit,
    modal,
    show,
    downloaded,
    submitDelete,
    ready,
    videoQuality,
    speed,
    handleControls,
    videoForLocal,
    endXP,
    endShow,
    setEndShow,
    cancelDownload,
    jobId,
    showPopUp,
    setShowPopUp,
    haveVideoToLoad,
    setHaveVideoToLoad,
  } = useFormVideoAnimation(chapterData, videoRef, type);
  const videoUri =
    Platform.OS === 'android' ? `file://${videoForLocal}` : videoForLocal;
  const onCloseDetailNote = useCallback(() => {
    setVisibleDetail(false);
  }, []);

  const fetchDuration = async () => {
    dispatch(
      fetchStartDurationLearn(
        {subject_id: route?.params?.subject_id ?? 0},
        route?.params?.contentType ?? SubjectType?.KPRegular,
        (res: any) => {
          setDurationId(res?.data?.data?.id);
        },
      ),
    );
  };
  const toggleAccordion = (i: any) => {
    if (accordion === i) {
      return setAccordion(null);
    }
    setAccordion(i);
  };

  const handleCreateUserLearnPorgress = async () => {
    try {
      await ProviderLPT?.createUserLearnProgress({
        userId: getUser?.data?.id,
        bodyPayload: {
          chapter_material_id: route?.params?.chapterData?.id,
          is_done: true,
        },
      });
    } catch (error: any) {}
  };

  const toggle = (i: any) => {
    if (count === i) {
      return setCount(1);
    }
    setCount(i);
  };
  useEffect(() => {
    dispatch(getDetailNoteDestroy());
  }, [dispatch]);

  useEffect(() => {
    fetchDuration();

    return () => {
      handleCreateUserLearnPorgress();
      dispatch(
        fetchEndDurationLearn(durationId, () => {
          //   navigation.goBack();
        }),
      );
    };
  }, []);
  const posterUri = video?.thumbnail
    ? video?.thumbnail
    : Image.resolveAssetSource(require('@assets/images/default_video.png')).uri;
  const videoSourceUri = downloaded
    ? `${videoUri}`
    : videoChoose
    ? `${videoChoose}`
    : video?.path_url;

  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'VideoAnimationScreen'>>();
  const navigationContext: any = React.useContext(NavigationContext);
  const [otherShow, setOtherShow] = useState(false);
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
      {fullScreen ? null : (
        <Header
          label={chapterData?.ID ? 'Rekaman Sesi Kelas' : 'Video Animasi'}
          iconRight={
            isFromGuru ? (
              <More />
            ) : !chapterData?.ID ? (
              !allChapterData?.content?.length && (
                <Pressable onPress={() => setVisibleDetail(true)}>
                  <Icon width={24} />
                </Pressable>
              )
            ) : null
          }
          onPressIconRight={() => {
            !isFromGuru ? setVisibleDetail(true) : setOpenMore(true);
          }}
          onPressIconLeft={() => {
            endXP();
            handleCreateUserLearnPorgress();
            dispatch(videoDestroy());
            dispatch(
              fetchEndDurationLearn(durationId, () => {
                if (isFromSchoolMaterials) {
                  navigationContext.pop(3);
                  return;
                }
                navigation.goBack();
              }),
            );
          }}
        />
      )}

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
            <View style={styles.width80p}>
              <Text style={styles.title}>
                {chapterData?.ID
                  ? chapterData?.subject?.name || chapterData?.subject_ptn?.name
                  : null}
              </Text>
              <Text style={styles.title}>
                {chapterData?.ID
                  ? chapterData?.chapter?.name || chapterData?.discussion
                  : chapterData?.title
                  ? chapterData?.title
                  : chapterData?.description || chapterData?.name}
              </Text>
            </View>
            <Pressable onPress={ready ? () => cancelDownload(jobId) : show}>
              <ProgressCircle
                progress={progress}
                size={45}
                strokeWidth={downloaded ? 0 : 3}
                color={'#09B95A'}
                children={
                  downloaded ? (
                    <Icon_green_download
                      width={25}
                      height={25}
                      onPress={show}
                    />
                  ) : ready ? (
                    <Ic_mulai width={25} height={25} />
                  ) : (
                    <Icon_download width={25} height={25} />
                  )
                }
              />
            </Pressable>
          </View>
          <View>
            <Text style={[styles.textAccordion, styles.padding0]}>
              {chapterData?.ID
                ? dayjs(chapterData?.time_start).format(
                    'dddd, MMMM D YYYY  hh:mm',
                  )
                : null}
            </Text>
            {chapterData?.user_name ? (
              <View style={styles.fastImageContainer}>
                <RenderImage
                  style={styles.pp}
                  imageUrl={image?.path_url}
                  placeholder={
                    <Image style={styles.pp} source={IMAGES.imgPlaceHolder} />
                  }
                />
                <Text style={[styles.text, {alignSelf: 'center'}]}>
                  {chapterData?.user_name}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        {chapterData?.ID ? (
          <View style={[styles.contentContainer, styles.extraContent]}>
            <Text style={styles.title}>Catatan</Text>
            <Text style={styles.text}>{chapterData?.description}</Text>
          </View>
        ) : (
          <View style={styles.contentContainer}>
            <View style={styles.switch}>
              {switchItems?.map((item: any) => (
                <Pressable
                  key={item?.id}
                  style={styles.buttonSwtich}
                  onPress={() => toggle(item?.id)}>
                  <Text
                    style={[
                      styles.textSwitch,
                      {
                        color:
                          item?.id === count
                            ? Colors.primary.base
                            : Colors.dark.neutral50,
                      },
                    ]}>
                    {item?.title}
                  </Text>
                </Pressable>
              ))}
            </View>
            <View style={styles.switch}>
              <View
                style={count === 1 ? styles.lineActive : styles.lineDeactive}
              />
              <View
                style={count === 2 ? styles.lineActive : styles.lineDeactive}
              />
            </View>
            <View style={styles.buttonTimeContainer}>
              {count === 1 ? (
                <Text style={styles.description}>
                  {chapterData?.description ||
                    chapterData?.learning_method?.description}
                </Text>
              ) : video?.video_sections ? (
                <View>
                  {video.video_sections.map((item: any, i: any) => (
                    <TouchableOpacity
                      onPress={() => handleSectionTime(item?.timeskip)}
                      style={styles.listContainer}
                      key={i}>
                      <FastImage
                        style={styles.thumbail}
                        source={{
                          uri: item?.thumbnail,
                          priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                      />
                      <Text style={[styles.textList, styles.width70p]}>
                        {item?.section_name}
                      </Text>
                      <Text style={[styles.textList]}>{item?.timeskip}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <Text style={styles.description}>Tidak Ada Video Section</Text>
              )}
            </View>
          </View>
        )}
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
      {modal ? (
        <PopUpWithIcon
          action_2={downloaded ? submitDelete : show}
          action={downloaded ? show : submit}
          icon
          iconName={
            downloaded ? (
              <Mascot2 width={100} height={100} />
            ) : (
              <Mascot width={100} height={100} />
            )
          }
          title={downloaded ? 'Hapus Unduan Video' : 'Unduh Video'}
          twoButton
          textButton={downloaded ? 'Kembali' : 'Unduh'}
          textButton_2={downloaded ? 'Hapus' : 'Kembali'}
          desc={
            downloaded
              ? 'Apakah kamu yakin untuk menghapus unduhan? Video tidak dapat ditonton kembali tanpa koneksi internet.'
              : 'Apakah kamu yakin untuk mengunduh? Video dapat ditonton tanpa koneksi internet setelah selesai diunduh.'
          }
        />
      ) : null}
      <DetailNote
        type="mynotes"
        mode="create"
        visible={visibleDetail}
        onClose={onCloseDetailNote}
        onSuccessSubmit={() => {
          setShowSnackbar(true);
          setVisibleDetail(false);
        }}
        chapterMaterialId={route.params?.chapterData?.id}
        coverScreen
        height={100}
      />
      <SnackbarResult
        label={'Catatan berhasil disimpan.'}
        visible={showSnackBar}
        onPressClose={() => setShowSnackbar(false)}
      />
      <SnackbarResult
        label={
          downloaded
            ? 'Video berhasil diunduh.'
            : 'Unduhan vidio berhasil dihapus.'
        }
        visible={snackbar}
        onPressClose={handleSnackbar}
      />
      {type === 'soal' ? (
        <View style={styles.containerFloat}>
          <Pressable
            style={styles.floatButton}
            onPress={() => setOtherShow(true)}>
            <VideoCamera width={24} height={24} />
            <Text style={styles.textFloat}>Video Lainnya</Text>
            <Right width={16} height={16} />
          </Pressable>
        </View>
      ) : null}
      <SwipeUp
        visible={otherShow}
        onClose={() => setOtherShow(false)}
        height={200}
        children={
          <View style={styles.padding16}>
            <Text style={[styles.title, styles.fontSize20]}>
              Video{' '}
              <Text style={styles.titleGrey}>
                {allChapterData?.content?.length}
              </Text>
              <View />
            </Text>
            <ScrollView>
              <View>
                {allChapterData?.content?.map((item: any, i: any) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.buttonContainer}
                    onPress={() => {
                      navigation.navigate('VideoAnimationScreen', {
                        chapterData: item,
                        allChapterData: allChapterData,
                        type: 'soal',
                      });
                      setOtherShow(false);
                    }}>
                    <View style={styles.subContainer}>
                      <ProgressCircle
                        progress={50}
                        size={64}
                        strokeWidth={6}
                        color={Colors.primary.base}
                        children={<IconCheck width={52} height={52} />}
                      />
                      <View style={[styles.ml20, {width: '100%'}]}>
                        <Text style={styles.subTitle}>
                          Video Animasi | {item?.duration_formatted}
                        </Text>
                        <Text numberOfLines={2} style={styles.title}>
                          {item?.title}
                        </Text>
                      </View>
                    </View>
                    <RightIcon width={25} height={25} />
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        }
      />
      <SwipeUpActionMaterials
        onClose={() => setOpenMore(false)}
        visible={openMore}
        navigation={navigation}
        data={chapterData}
        fromScreen="VideoAnimationScreen"
        screenParams={route?.params}
      />
      <SwipeUp
        visible={endShow}
        onClose={() => setEndShow(false)}
        height={200}
        children={
          <View style={styles.padding16}>
            <Mascot width={100} height={100} style={styles.alignSelfCenter} />
            <Text style={[styles.titleSwipe]}>Video Selesai Ditonton!</Text>
            <Text style={[styles.text, styles.agreementtext]}>
              Sudah paham dengan materi ini di bab ini? Lanjutkan dengan latihan
              atau tes.
            </Text>
            <View style={styles.row}>
              <Pressable
                style={styles.card}
                onPress={() => {
                  setEndShow(false);
                  navigation.navigate('ChapterKPRegularScreen', {
                    subject_data: subject,
                    subject_type: 'KPRegular_Practice',
                  });
                }}>
                <Ic_practice />
                <Text style={[styles.titleSwipe, styles.titlePractice]}>
                  Practice
                </Text>
                <RightGrey width={18} height={18} />
              </Pressable>
              <Pressable
                style={styles.card}
                onPress={() => {
                  setEndShow(false);
                  navigation.navigate('ChapterKPRegularScreen', {
                    subject_data: subject,
                    subject_type: 'KPRegular_Test',
                  });
                }}>
                <Ic_test />
                <Text style={[styles.titleSwipe, styles.titleTest]}>Test</Text>
                <RightGrey width={18} height={18} />
              </Pressable>
            </View>
            <Button
              label="Nanti Saja"
              background="white"
              borderWidth={1}
              color={Colors.primary.base}
              action={() => setEndShow(false)}
            />
          </View>
        }
      />
      <PopUpVideoNotReady close={() => setShowPopUp(false)} show={showPopUp} />
    </View>
  );
};

export {VideoAnimationScreen};
