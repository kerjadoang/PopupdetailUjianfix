import React, {useLayoutEffect} from 'react';
import {
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '@constants/colors';
import {PopUp, ProgressCircle} from '@components/atoms';
import {styles} from './style';
import {Header} from '@components/atoms/Header';
import IconPlay from '@assets/svg/ic_play.svg';
import IconTrashRed from '@assets/svg/ic_trash_red.svg';
import useSavedVideo from './useSavedVideo';
import {Image} from 'react-native';
import {Maskot8} from '@assets/images';
import SnackbarResult from '@components/atoms/SnackbarResult';
import {_handlerFormatBytes} from '@constants/functional';

const SavedVideoScreen = () => {
  const {
    isLoading,
    navigation,
    isShowPopUp,
    popupData,
    listSavedVideo,
    isShowSnackBar,
    snackBarData,
    _handlerPulltoRefresh,
    _handlerShowPopUpDelete,
    _handlerOnPressCloseSnackBar,
  } = useSavedVideo();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label={'Video Tersimpan'} />,
    });
  }, []);

  const _renderNoData = () => {
    return (
      <View style={styles.noDataContainer}>
        <Image source={Maskot8} style={styles.noDataIcon} />
        <Text style={styles.noDataTitle}>{'Belum Ada Video Tersimpan'}</Text>
        <Text style={styles.noDataSubtitle}>
          {'Video yang diunduh akan tampil disini.'}
        </Text>
      </View>
    );
  };

  const _renderContent = () => {
    return (
      <View style={styles.container}>
        {listSavedVideo?.map((value: any, index: any) => {
          const {title, user_id, file_id, duration, size, service, id} =
            value || false;
          const chapterData = {
            id,
            user_id,
            file_id,
            title,
            duration,
            size,
            service,
          };

          return (
            <View key={index} style={styles.card}>
              <TouchableOpacity
                style={styles.leftContainer}
                onPress={() => {
                  navigation?.navigate('VideoAnimationScreen', {chapterData});
                }}>
                <ProgressCircle
                  progress={0}
                  size={65}
                  strokeWidth={3}
                  color={Colors.primary.base}
                  children={
                    <View style={styles.playContainer}>
                      <IconPlay
                        width={24}
                        height={24}
                        style={styles.playIcon}
                      />
                    </View>
                  }
                />

                <View style={styles.textContainer}>
                  <Text style={styles.subtitle}>{service}</Text>
                  <Text style={styles.title}>{title}</Text>
                  <Text
                    style={
                      styles.subtitle
                    }>{`${duration} • ${_handlerFormatBytes(size)}`}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  _handlerShowPopUpDelete(id);
                }}>
                <IconTrashRed width={24} height={24} />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  };

  const _renderRootContent = () => {
    return (
      <View style={styles.rootContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              progressViewOffset={50}
              refreshing={isLoading ? true : false}
              onRefresh={() => _handlerPulltoRefresh()}
            />
          }
          contentContainerStyle={styles.contentContainerStyle}>
          {listSavedVideo && listSavedVideo?.length != 0
            ? _renderContent()
            : _renderNoData()}
        </ScrollView>

        <PopUp
          show={isShowPopUp}
          Icon={popupData?.icon}
          title={popupData?.title}
          desc={popupData?.description}
          titleConfirm={popupData?.labelConfirm}
          actionConfirm={popupData?.onPressConfirm}
          titleCancel={popupData?.labelCancel}
          actionCancel={popupData?.onPressCancel}
        />

        <SnackbarResult
          visible={isShowSnackBar}
          label={snackBarData?.label}
          onPressClose={_handlerOnPressCloseSnackBar}
        />
      </View>
    );
  };

  return <>{_renderRootContent()}</>;
};

export default SavedVideoScreen;
