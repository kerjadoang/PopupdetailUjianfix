import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {bgBlueOrnament} from '@assets/images';
import Colors from '@constants/colors';
import {Button, Gender, InputText, PopUp, SwipeUp} from '@components/atoms';
import useProfileEdit from './useProfileEdit';
import {styles} from './style';
import IconHandphone from '@assets/svg/ic_handphone.svg';
import IconAcademic2 from '@assets/svg/ic_academic2.svg';
import IconUser from '@assets/svg/ic_user.svg';
import IconCameraWhite from '@assets/svg/ic_camera_white.svg';
import IconSchool from '@assets/svg/ic_school.svg';
import IconEmail from '@assets/svg/ic_email.svg';
import {Header} from '@components/atoms/Header';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import IconArrowBottomBlue from '@assets/svg/ic_arrow_bottom_blue.svg';
import IconArrowBottomGray from '@assets/svg/ic_arrow_bottom_grey.svg';
import {listClass} from '@constants/listclass';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import Avatar from '@components/atoms/Avatar';

const ProfileEditScreen = () => {
  const {
    isLoading,
    imageUser,
    isShowPopup,
    popupData,
    fullName,
    userClass,
    schoolName,
    genderUser,
    email,
    genderItems,
    isShowSwipeUpAvatar,
    isShowSwipeUpClass,
    initialisationDataSwipeUp,
    isDisableSchoolField,
    userTypeId,
    phoneNumber,
    disable_update_profile,
    _handlerValidateFullName,
    _handlerSelectClass,
    _handlerValidateSchoolName,
    _handlerOnPressGender,
    _handlerValidateEmail,
    _handlerSubmitData,
    _handlerShowSwipeUpAvatar,
    _handlerHideSwipeUpAvatar,
    _handlerShowSwipeUpClass,
    _handlerHideSwipeUpClass,
    _handlerOnPressChangeNumber,
    handleDisabled,
  } = useProfileEdit();

  /*
  USER_TYPE_ID
  1. Murid >> B2C B2B
  2. Orang Tua >> Ngikut anak
  3. Mentor
  4. Kepsek >> B2B B2G
  5. Guru >> B2B
  6. Admin >> B2B
 */

  const isUserTypeStudent = userTypeId == 1;
  const isUserTypeParent = userTypeId == 2;
  const isUserTypeHeadMaster = userTypeId == 4;
  const isUserTypeTeacher = userTypeId == 5;
  const isUserTypeAdmin = userTypeId == 6;

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

  const _renderSwipeUpContentClass = () => {
    return (
      <View style={styles.swipeUpContainerClass}>
        <Text style={styles.swipeUpHeaderTitle}>{'Pilih Kelas'}</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {listClass?.map((value: any, index: number) => {
            const isSelectedItem = userClass?.id === value?.id;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  _handlerSelectClass(value?.id, value?.label);
                }}
                style={styles.swipeUpContentContainer}>
                <Text
                  style={
                    isSelectedItem
                      ? styles.descriptionSwipeUpActive
                      : styles.descriptionSwipeUpPasive
                  }>
                  {value?.label}
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
        </ScrollView>
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
          label={'Edit Profil'}
          colorLabel={Colors.white}
        />
        <Image source={bgBlueOrnament} style={styles.bgBlueOrnament} />

        <View style={styles.cardContainer}>
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <View
                style={
                  isUserTypeParent
                    ? styles.imageOutterParentContainer
                    : isUserTypeHeadMaster || isUserTypeTeacher
                    ? styles.imageOutterTeacherContainer
                    : isUserTypeAdmin
                    ? styles.imageOutterAdminContainer
                    : styles.imageOutterStudentContainer
                }>
                <View style={styles.imageInnerContainer}>
                  <Avatar id={imageUser} style={styles.imageUser} />
                </View>
              </View>

              <TouchableOpacity
                style={styles.cameraIconOutterContainer}
                onPress={_handlerShowSwipeUpAvatar}
                disabled={disable_update_profile}>
                <View
                  style={[
                    styles.cameraIconInnerContainer,
                    {
                      backgroundColor: disable_update_profile
                        ? Colors.dark.neutral50
                        : Colors.primary.base,
                    },
                  ]}>
                  <IconCameraWhite />
                </View>
              </TouchableOpacity>
            </View>

            <InputText
              isNotOutline
              leftIcon={IconUser}
              ledIconColor={Colors.primary.base}
              value={fullName?.value}
              error={!fullName?.isValid}
              errorMessage={fullName?.errorMessage}
              placeholder={'Masukkan nama anda'}
              label={'Nama Lengkap*'}
              onChangeText={text => {
                _handlerValidateFullName(text);
              }}
              bottom={16}
              maxLength={60}
              disabled={disable_update_profile}
            />

            {isUserTypeStudent ? (
              <View style={styles.classContainer}>
                <Text style={styles.phoneHeaderTitle}>{'Kelas*'}</Text>

                <TouchableOpacity
                  onPress={_handlerShowSwipeUpClass}
                  style={styles.phoneCardContainer}
                  disabled={disable_update_profile}>
                  <View style={styles.phoneTextContainer}>
                    <IconAcademic2 style={styles.iconLeft} />
                    <Text
                      style={[
                        styles.phoneTitle,
                        {
                          color: disable_update_profile
                            ? Colors.dark.neutral50
                            : Colors.dark.neutral100,
                        },
                      ]}>
                      {userClass?.label}
                    </Text>
                  </View>

                  <View style={styles.phoneIconContainer}>
                    {disable_update_profile ? (
                      <IconArrowBottomGray style={styles.iconRight} />
                    ) : (
                      <IconArrowBottomBlue style={styles.iconRight} />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            ) : null}

            {isUserTypeStudent ||
            isUserTypeTeacher ||
            isUserTypeHeadMaster ||
            isUserTypeAdmin ? (
              <InputText
                isNotOutline
                leftIcon={IconSchool}
                value={schoolName?.value}
                error={!schoolName.isValid}
                disabled={isDisableSchoolField}
                errorMessage={schoolName?.errorMessage}
                placeholder={'Masukkan nama sekolah'}
                label={'Sekolah'}
                onChangeText={text => {
                  _handlerValidateSchoolName(text);
                }}
                bottom={16}
                maxLength={60}
              />
            ) : null}

            <Gender
              bottom={16}
              selectedGender={genderUser}
              action={text => _handlerOnPressGender(text)}
              data={genderItems}
              disabled={disable_update_profile}
            />

            <InputText
              isNotOutline
              leftIcon={IconEmail}
              ledIconColor={Colors.primary.base}
              value={email?.value}
              error={!email?.isValid}
              errorMessage={email?.errorMessage}
              label={'Email'}
              placeholder={'Masukkan email'}
              onChangeText={text => {
                _handlerValidateEmail(text);
              }}
              maxLength={60}
              bottom={16}
              disabled={disable_update_profile}
            />

            <View style={styles.phoneContainer}>
              <Text style={styles.phoneHeaderTitle}>{'No. HP'}</Text>

              <View style={styles.phoneCardContainer}>
                <View style={styles.phoneTextContainer}>
                  <IconHandphone style={styles.iconLeft} />
                  <Text
                    style={[
                      styles.phoneTitle,
                      {
                        color: disable_update_profile
                          ? Colors.dark.neutral50
                          : Colors.dark.neutral100,
                      },
                    ]}>
                    {phoneNumber}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={_handlerOnPressChangeNumber}
                  style={styles.phoneIconContainer}
                  disabled={disable_update_profile}>
                  <Text
                    style={[
                      styles.phoneChangeTitle,
                      {
                        color: disable_update_profile
                          ? Colors.dark.neutral50
                          : Colors.dark.neutral100,
                      },
                    ]}>
                    {'Ubah'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {!disable_update_profile ? (
              <Button
                label={'Simpan'}
                action={_handlerSubmitData}
                isDisabled={handleDisabled()}
              />
            ) : null}
          </View>
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

      <SwipeUp
        height={100}
        visible={isShowSwipeUpClass}
        onClose={_handlerHideSwipeUpClass}
        children={_renderSwipeUpContentClass()}
      />
    </View>
  );
};

export default ProfileEditScreen;
