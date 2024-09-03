import React, {useLayoutEffect} from 'react';
import {Button, Header, PopUp} from '@components/atoms';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import useAdminVerificationScreen from './useAdminListVerificationScreen';
import IconArrowRightGrey from '@assets/svg/ic_arrow_right_grey.svg';
import IconUploadWhite from '@assets/svg/ic24_upload_white.svg';
import {styles} from './style';
import {Maskot11} from '@assets/images';

const AdminListVerificationScreen = () => {
  const {
    isLoading,
    isShowPopup,
    popupData,
    listData,
    navigation,
    _handlerOnPressUploadEvidence,
    _handlerNavigateToAdminListScreen,
  } = useAdminVerificationScreen();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => _renderHeader(),
    });
  }, []);

  const _renderHeader = () => {
    return <Header label={'Verifikasi Administrasi'} />;
  };

  const _renderEmptyContent = () => {
    return (
      <>
        <View style={styles.emptyContentContainer}>
          <View>
            <Image source={Maskot11} style={styles.emptyContentIcon} />
            <Text style={styles.emptyContentTitle}>
              {'Kelas Tidak Ditemukan'}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            action={() => {
              _handlerOnPressUploadEvidence();
            }}
            iconLeft={<IconUploadWhite width={24} height={24} />}
            label={'Unggah Bukti Pembayaran'}
          />
        </View>
      </>
    );
  };

  const _renderCard = (item: any, index: number) => {
    const {class_name, count, class_id} = item || false;

    return (
      <View key={index}>
        <TouchableOpacity
          onPress={() => {
            _handlerNavigateToAdminListScreen(class_name, class_id);
          }}
          style={styles.card}>
          <Text style={styles.cardTitle}>{class_name}</Text>

          <View style={styles.row}>
            {count > 0 ? (
              <Text
                style={
                  styles.cardSubtitle
                }>{`${count} belum diverifikasi`}</Text>
            ) : null}
            <IconArrowRightGrey width={16} height={16} />
          </View>
        </TouchableOpacity>

        {index != listData?.length - 1 ? <View style={styles.gap} /> : null}
      </View>
    );
  };

  const _renderContent = () => {
    return (
      <>
        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          {listData &&
            listData?.map((item: any, index: number) =>
              _renderCard(item, index),
            )}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button
            action={() => {
              _handlerOnPressUploadEvidence();
            }}
            iconLeft={<IconUploadWhite width={24} height={24} />}
            label={'Unggah Bukti Pembayaran'}
          />
        </View>

        {/* <SwipeUp
          height={100}
          visible={isShowSwipeUp}
          children={_renderSwipeUpContent()}
        /> */}

        <PopUp
          show={isShowPopup}
          Icon={popupData?.icon}
          title={popupData?.title}
          desc={popupData?.description}
          titleConfirm={popupData?.labelConfirm}
          actionConfirm={popupData?.onPressConfirm}
          titleCancel={popupData?.labelCancel}
          actionCancel={popupData?.onPressCancel}
          close={popupData?.onPressCancel}
        />
      </>
    );
  };

  return (
    <View style={styles.rootContainer}>
      {isLoading ? (
        <LoadingIndicator />
      ) : listData && listData?.length != 0 ? (
        _renderContent()
      ) : (
        _renderEmptyContent()
      )}
    </View>
  );
};

export {AdminListVerificationScreen};
