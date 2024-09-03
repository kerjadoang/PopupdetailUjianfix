import React, {FC} from 'react';
import Video from 'react-native-video';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useMergeState} from '@constants/functional';
import IconPlay from '@assets/svg/ic64_play.svg';
import IconPause from '@assets/svg/ic64_pause.svg';
import IconSkipForward from '@assets/svg/icon_nextplus5.svg';
import IconSkipBackward from '@assets/svg/icon_next5.svg';
import IconSound from '@assets/svg/ic24_volume_on_white.svg';
import IconMuted from '@assets/svg/ic24_volume_off_white.svg';
import Fonts from '@constants/fonts';
import Colors from '@constants/colors';
import Slider from '@react-native-community/slider';
import {PopUpVideoNotReady} from '../PopUpVideoNotReady';

type Props = {
  thumbnail?: string;
  uri: string;
  status?: string;
  fetch?: () => void;
};

const VideoPlayer: FC<Props> = ({thumbnail, uri, status, fetch}) => {
  const [state, setState] = useMergeState({
    isLoading: false,
    videoRefference: null,
    paused: true,
    muted: false,
    currentTime: 0,
    sliderValue: 0,
    duration: 0,
    isShowFrameControl: true,
    fullScreen: false,
    showPopUp: false,
  });

  const {
    videoRefference,
    paused,
    muted,
    currentTime,
    sliderValue,
    duration,
    isShowFrameControl,
    showPopUp,
  }: any = state;

  const _handlerOnProgressVideo = (progress: any) => {
    // console.log('progress', progress?.currentTime);
    setState({
      currentTime: progress?.currentTime,
      sliderValue: progress?.currentTime / duration,
    });
  };

  const _handlerOnLoadVideo = (data: any) => {
    setState({
      duration: data?.duration,
    });
  };

  const _handlerEndVideo = () => {
    setState({
      currentTime: 0,
      sliderValue: 0,
      paused: true,
      isShowFrameControl: true,
    });
  };

  const _handlerShowFrameControl = () => {
    setState({
      isShowFrameControl: true,
      // paused: true,
    });
  };

  const _handlerHideFrameControl = () => {
    setState({
      isShowFrameControl: false,
    });
  };

  const _handlerOnPressIconMute = () => {
    setState({
      muted: !muted,
    });
  };

  const _handlerSkipBackward = () => {
    const newTime = currentTime - 5;

    if (newTime >= 0) {
      setState({
        currentTime: newTime,
        sliderValue: newTime / duration,
      });
      videoRefference?.current?.seek(newTime);
    }
  };

  const _handlerOnPressPlayButton = () => {
    if (status === 'process') {
      if (fetch) {
        fetch();
      }
      setState({showPopUp: true});
      return;
    }
    setState({
      paused: false,
    });
  };

  const _handlerOnPressPausedButton = () => {
    setState({
      paused: true,
    });
  };

  const _handlerSkipForward = () => {
    const newTime = currentTime + 5;

    if (newTime < duration) {
      setState({
        currentTime: newTime,
        sliderValue: newTime / duration,
      });
      videoRefference?.current?.seek(newTime);
    }
  };

  const _handlerOnChangeSlider = (value: any) => {
    const newTime = value * duration;
    videoRefference?.current?.seek(newTime);
    // console.log('value', value);

    setState({
      sliderValue: value,
      currentTime: newTime,
    });
  };

  const _handlerOnChangeSliderComplete = (value: any) => {
    const newTime = value * duration;
    videoRefference?.current?.seek(newTime);

    setState({
      sliderValue: 0,
      currentTime: 0,
    });
  };

  const _handlerFormatTime = (timeInSeconds: any) => {
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math?.floor(timeInSeconds % 60);
    const pad = (num: number) => (num < 10 ? `0${num}` : num);
    return `${pad(minutes)}:${pad(seconds)}`;
  };

  const videoDuration = `${_handlerFormatTime(
    currentTime,
  )} / ${_handlerFormatTime(duration)}`;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          _handlerShowFrameControl();
        }}>
        <Video
          ref={videoRefference}
          paused={paused}
          poster={thumbnail}
          muted={muted}
          source={{uri: `${uri ?? ''}`}}
          style={styles.videoStyle}
          resizeMode={'contain'}
          onLoad={_handlerOnLoadVideo}
          onProgress={_handlerOnProgressVideo}
          onEnd={_handlerEndVideo}
        />
      </Pressable>

      {isShowFrameControl ? (
        <Pressable
          style={styles.controlFrame}
          onPress={() => {
            _handlerHideFrameControl();
          }}>
          <View style={styles.control}>
            {/* <View style={styles.iconSettingContainer}>
              <IconSetting
                width={24}
                height={24}
                onPress={_handlerOnPressIconSetting}
              />
            </View> */}

            <View style={styles.controlMain}>
              <IconSkipBackward
                width={40}
                height={40}
                onPress={_handlerSkipBackward}
              />

              {paused ? (
                <IconPlay
                  width={56}
                  height={56}
                  style={styles.iconPlay}
                  onPress={_handlerOnPressPlayButton}
                />
              ) : (
                <IconPause
                  width={56}
                  height={56}
                  style={styles.iconPlay}
                  onPress={_handlerOnPressPausedButton}
                />
              )}

              <IconSkipForward
                width={40}
                height={40}
                onPress={_handlerSkipForward}
              />
            </View>

            <View style={styles.bottomSection}>
              <Text style={styles.timeTitle}>{videoDuration}</Text>

              <View style={styles.row}>
                {muted ? (
                  <IconSound
                    width={24}
                    height={24}
                    style={styles.iconSound}
                    onPress={_handlerOnPressIconMute}
                  />
                ) : (
                  <IconMuted
                    width={24}
                    height={24}
                    style={styles.iconSound}
                    onPress={_handlerOnPressIconMute}
                  />
                )}

                {/* {fullScreen ? (
                  <IconMinimizeFullScreen
                    width={24}
                    height={24}
                    onPress={_handlerOnPressFullScreen}
                  />
                ) : (
                  <IconFullScreen
                    width={24}
                    height={24}
                    onPress={_handlerOnPressFullScreen}
                  />
                )} */}
              </View>
            </View>
          </View>

          <View style={styles.sliderContainer}>
            <Slider
              minimumTrackTintColor={Colors.yellow}
              maximumTrackTintColor={Colors.white}
              thumbTintColor={Colors.primary.base}
              value={sliderValue}
              onValueChange={_handlerOnChangeSlider}
              onSlidingComplete={_handlerOnChangeSliderComplete}
            />
          </View>
        </Pressable>
      ) : null}
      <PopUpVideoNotReady
        close={() => setState({showPopUp: false})}
        show={showPopUp}
      />
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoStyle: {
    width: '100%',
    height: 232,
  },
  controlFrame: {
    position: 'absolute',
    backgroundColor: Colors.backgroundColorModal,
    width: '100%',
    height: '100%',
  },
  control: {
    width: '100%',
    height: '100%',
    paddingTop: 12,
    paddingHorizontal: 12,
    flex: 1,
  },
  iconSettingContainer: {
    alignItems: 'flex-end',
  },
  controlMain: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPlay: {
    marginHorizontal: 24,
  },

  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeTitle: {
    fontSize: 12,
    lineHeight: 16,
    color: Colors.white,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
    alignSelf: 'flex-end',
  },
  iconSound: {
    marginRight: 12,
  },
  sliderContainer: {
    marginTop: 8,
    justifyContent: 'center',
    height: 20,
  },
  row: {
    flexDirection: 'row',
  },
});
