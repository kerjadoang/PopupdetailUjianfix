import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {IconGroupAvatar, bgBlueOrnament} from '@assets/images';
import {Button, InputText, PopUp, SwipeUp} from '@components/atoms';
import {styles} from './style';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import IconCameraWhite from '@assets/svg/ic_camera_white.svg';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import useDiscussionCreateGroupScreen from './useDiscussionCreateGroupScreen';
import {SvgUri} from 'react-native-svg';
import {lisFileSvgExtension} from '@constants/functional';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';

const DiscussionCreateGroupScreen = () => {
  const {
    isLoading,
    isShowPopup,
    popupData,
    groupName,
    isShowSwipeUpAvatar,
    initialisationDataSwipeUp,
    tempAttachmentUri,
    _handlerValidateGroupName,
    _handlerSubmitData,
    _handlerShowSwipeUpAvatar,
    _handlerHideSwipeUpAvatar,
    _handlerOnPressGoBack,
  } = useDiscussionCreateGroupScreen();

  const imageGroup = tempAttachmentUri || IconGroupAvatar;
  const userAvatarExtension =
    tempAttachmentUri && tempAttachmentUri?.split('.')?.pop();
  const isAvatarSvg = lisFileSvgExtension.includes(userAvatarExtension);

  const _renderSwipeUpContentAvatar = () => {
    return (
      <View style={styles.swipeUpContainer}>
        {initialisationDataSwipeUp?.map((value: any, index: any) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.swipeUpContent}
              onPress={value?.onPress}>
              {value?.icon}
              <Text style={styles.swipeUpTitle}>{value?.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.rootContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={styles.contentContainerStyle}>
        <Header
          backgroundColor={'transparent'}
          iconLeft={<IconArrowLeftWhite width={24} height={24} />}
          onPressIconLeft={() => {
            _handlerOnPressGoBack();
          }}
          label={'Membuat Grup'}
          colorLabel={Colors.white}
        />
        <Image source={bgBlueOrnament} style={styles.bgBlueOrnament} />

        <View style={styles.cardContainer}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <View style={styles.imageInnerContainer}>
                {tempAttachmentUri && isAvatarSvg ? (
                  <SvgUri uri={tempAttachmentUri} style={styles.imageUser} />
                ) : (
                  <Image
                    source={
                      tempAttachmentUri ? {uri: tempAttachmentUri} : imageGroup
                    }
                    style={styles.imageUser}
                  />
                )}
              </View>

              <TouchableOpacity
                style={styles.cameraIconOutterContainer}
                onPress={_handlerShowSwipeUpAvatar}>
                <View style={styles.cameraIconInnerContainer}>
                  <IconCameraWhite />
                </View>
              </TouchableOpacity>
            </View>

            <InputText
              isNotOutline
              value={groupName?.value}
              error={!groupName?.isValid}
              errorMessage={groupName?.errorMessage}
              placeholder={'Masukkan nama grup'}
              label={'Nama Grup'}
              onSubmitEditing={() => {
                _handlerSubmitData();
              }}
              onChangeText={text => {
                _handlerValidateGroupName(text);
              }}
              maxLength={60}
            />
          </View>

          <Button
            isDisabled={!groupName?.isValid}
            label={'Simpan'}
            action={_handlerSubmitData}
          />
        </View>
      </ScrollView>

      {isLoading ? <LoadingIndicator /> : null}

      <PopUp
        show={isShowPopup}
        Icon={popupData?.icon}
        title={popupData?.title}
        desc={popupData?.description}
        titleConfirm={popupData?.labelConfirm}
        actionConfirm={popupData?.onPressConfirm}
        titleCancel={popupData?.labelCancel}
        actionCancel={popupData?.onPressCancel}
      />

      <SwipeUp
        height={100}
        visible={isShowSwipeUpAvatar}
        onClose={_handlerHideSwipeUpAvatar}
        children={_renderSwipeUpContentAvatar()}
      />
    </View>
  );
};

export default DiscussionCreateGroupScreen;
