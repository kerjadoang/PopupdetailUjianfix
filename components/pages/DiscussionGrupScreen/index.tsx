import React from 'react';
import {
  Image,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {styles} from './style';
import {Header} from '@components/atoms/Header';
import useDiscussionGrup from './useDiscussionGrup';
import Colors from '@constants/colors';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import IconSearchBlue from '@assets/svg/ic_search_blue.svg';
import IconAddMemberWhite from '@assets/svg/ic_add_member_white.svg';
import IconMoreBlue from '@assets/svg/ic24_more_blue.svg';
import IconMoreWhite from '@assets/svg/ic24_more_white.svg';
import IconEditBlue from '@assets/svg/ic16_edit_blue.svg';
import IconCameraWhite from '@assets/svg/ic24_camera_white.svg';
import IconSetAdminBlue from '@assets/svg/ic24_set_admin_blue.svg';
import IconDeleteMemberBlue from '@assets/svg/ic24_delete_member_blue.svg';
import IconLeftGroupBlue from '@assets/svg/ic24_left_group_blue.svg';
import IconOpenEyeBlue from '@assets/svg/blue_eye.svg';
import {
  bgBlueOrnament,
  IconGroupAvatar,
  PlaceholderAvatar,
} from '@assets/images';
import {Button, InputText, PopUp, SwipeUp} from '@components/atoms';
import RenderImage from '@components/atoms/RenderImage';

const DiscussionGrupScreen = () => {
  const {
    groupData,
    isShowPopup,
    popupData,
    isShowSwipeUpMoreUser,
    isShowSwipeUpEditGroup,
    isShowSwipeUpChangeGroupName,
    groupName,
    initialEditGroupData,
    selectedUser,
    isShowSwipeUpMoreGroup,
    _handlerOnCloseSwipeUpMoreGroup,
    _handlerOnCloseSwipeUpEditGroup,
    _handlerOnCloseSwipeUpChangeGroupName,
    _handlerOnCloseSwipeUpMoreUser,
    _handlerShowSwipeUpChangeGroupName,
    _handlerShowSwipeUpEditGroup,
    _handlerShowSwipeUpMoreUser,
    _handlerShowSwipeUpMoreGroup,
    _handlerOnChangeGroupName,
    _handlerSubmitChangeGroupName,
    _handlerAddDeleteAdmin,
    _handlerDeleteMemberConfirmation,
    _handlerSeeDetailMember,
    _handlerOnPressLeaveGroup,
    _handlerSetActiveSearch,
    _handlerNavigationToAddMemberScreen,
  } = useDiscussionGrup();

  const totalMember = groupData?.users?.length || 0;
  const groupAvatar = groupData?.path_url;
  const isCurrentUserAdminGroup = groupData?.is_current_user_admin;

  const _renderSwipeUpEditGroup = () => {
    return (
      <View style={styles.swipeUpContainer}>
        {initialEditGroupData?.map((value: any, index: any) => {
          return (
            <View key={index}>
              <TouchableOpacity
                style={styles.swipeUpEditGroupCard}
                key={index}
                onPress={value?.onPress}>
                {value?.icon}
                <Text style={styles.swipeUpEditGroupCardTitle}>
                  {value?.label}
                </Text>
              </TouchableOpacity>

              {index != initialEditGroupData?.length - 1 ? (
                <View style={styles.gap} />
              ) : null}
            </View>
          );
        })}
      </View>
    );
  };

  const _renderSwipeUpChangeGroupName = () => {
    return (
      <View style={styles.swipeUpContainer}>
        <Text style={styles.swipeUpHeadTitle}>{'Ubah Nama Grup'}</Text>

        <InputText
          backgroundColor={Colors.dark.neutral10}
          label={'Nama Grup'}
          value={groupName}
          placeholder={'Masukkan nama grup...'}
          onChangeText={val => {
            _handlerOnChangeGroupName(val);
          }}
        />

        <View style={styles.swipeUpButtonContainer}>
          <Button
            outline
            style={{width: '48%'}}
            label={'Batal'}
            action={() => {
              _handlerOnCloseSwipeUpChangeGroupName();
            }}
          />
          <Button
            isDisabled={groupName.length == 0}
            style={{width: '48%'}}
            label={'Simpan'}
            action={() => {
              _handlerSubmitChangeGroupName();
            }}
          />
        </View>
      </View>
    );
  };

  const _renderSwipeUpMoreGroup = () => {
    return (
      <View style={styles.swipeUpContainer}>
        <TouchableOpacity
          style={styles.swipeUpEditGroupCard}
          onPress={() => {
            _handlerOnPressLeaveGroup();
          }}>
          <IconLeftGroupBlue width={24} height={24} />
          <Text style={styles.swipeUpEditGroupCardTitle}>{'Keluar Grup'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const _renderSwipeUpMoreUser = () => {
    return (
      <View style={styles.swipeUpContainer}>
        {isCurrentUserAdminGroup ? (
          <>
            <TouchableOpacity
              style={styles.swipeUpMoreUserCard}
              onPress={() => {
                _handlerAddDeleteAdmin();
              }}>
              <IconSetAdminBlue width={24} height={24} />
              <Text style={styles.swipeUpEditGroupCardTitle}>
                {selectedUser.isUserAdmin
                  ? 'Batalkan Admin Grup'
                  : 'Jadikan Admin Grup'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.swipeUpMoreUserCard}
              onPress={() => {
                _handlerDeleteMemberConfirmation();
              }}>
              <IconDeleteMemberBlue width={24} height={24} />
              <Text style={styles.swipeUpEditGroupCardTitle}>
                {'Hapus Anggota'}
              </Text>
            </TouchableOpacity>
          </>
        ) : null}

        <TouchableOpacity
          style={{...styles.swipeUpMoreUserCard, marginBottom: 0}}
          onPress={() => {
            _handlerSeeDetailMember();
          }}>
          <IconOpenEyeBlue width={24} height={24} />
          <Text style={styles.swipeUpEditGroupCardTitle}>{'Lihat Detail'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const _renderContent = () => {
    return (
      <View style={styles.container}>
        <View style={styles.headIconContainer}>
          <RenderImage
            imageUrl={groupAvatar}
            style={styles.headIcon}
            placeholder={
              <Image source={IconGroupAvatar} style={styles.headIcon} />
            }
          />

          {isCurrentUserAdminGroup ? (
            <TouchableOpacity
              onPress={() => {
                _handlerShowSwipeUpEditGroup();
              }}
              style={styles.iconCameraWhiteOutterContainer}>
              <View style={styles.iconCameraWhiteInnerContainer}>
                <IconCameraWhite width={16} height={16} />
              </View>
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.headTextContainer}>
          <Text style={styles.headTitle}>{groupData?.name}</Text>

          {isCurrentUserAdminGroup ? (
            <TouchableOpacity
              onPress={() => {
                _handlerShowSwipeUpChangeGroupName();
              }}>
              <IconEditBlue width={16} height={16} />
            </TouchableOpacity>
          ) : null}
        </View>

        <View style={styles.rowSpaceBetween}>
          <Text style={styles.headSubtitle}>{`${totalMember} Anggota`}</Text>

          <TouchableOpacity
            onPress={() => {
              _handlerSetActiveSearch();
            }}>
            <IconSearchBlue width={24} height={24} />
          </TouchableOpacity>
        </View>

        {isCurrentUserAdminGroup ? (
          <TouchableOpacity
            onPress={() => {
              _handlerNavigationToAddMemberScreen();
            }}
            style={styles.addMemberContainer}>
            <View style={styles.iconAddMemberContainer}>
              <IconAddMemberWhite width={22} height={17} />
            </View>

            <Text style={styles.cardTitle}>{'Tambah Anggota'}</Text>
          </TouchableOpacity>
        ) : null}

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          data={groupData?.users}
          onEndReachedThreshold={0.25}
          keyExtractor={(_, idx): any => idx}
          renderItem={({item, index}) => _renderCard(item, index)}
          // ListEmptyComponent={_renderNoData()}
          // onEndReached={onEndReach}
        />
      </View>
    );
  };

  const _renderCard = (item: any, index: any) => {
    const userId = item?.id;
    const userAvatar = item?.path_url;
    const userName = item?.full_name;
    const isUserOnline = item?.is_online || false;
    const isUserAdmin = item?.is_admin || false;

    /*
      USER_TYPE_ID
      1. Murid >> B2C B2B
      2. Orang Tua >> Ngikut anak
      3. Mentor
      4. Kepsek >> B2B B2G
      5. Guru >> B2B
      6. Admin >> B2B
    */
    const userRole =
      item?.user_type_id == 2
        ? 'Orang Tua'
        : item?.user_type_id == 3
        ? 'Mentor'
        : item?.user_type_id == 4
        ? 'Kepala Sekolah'
        : item?.user_type_id == 5
        ? 'Guru'
        : item?.user_type_id == 6
        ? 'Admin'
        : 'Murid';

    return (
      <View key={index} style={styles.rowSpaceBetween}>
        <View style={styles.row}>
          <RenderImage
            imageUrl={userAvatar}
            style={styles.cardIcon}
            placeholder={
              <Image source={PlaceholderAvatar} style={styles.cardIcon} />
            }
          />

          <View>
            <Text style={styles.cardTitle} numberOfLines={2}>
              {userName}
            </Text>
            <View style={styles.row}>
              {isUserOnline ? (
                <>
                  <Text style={styles.cardRoleTitle}>{`${userRole} • `}</Text>
                  <Text style={styles.cardOnlineTitle}>{'Online'}</Text>
                </>
              ) : (
                <Text style={styles.cardRoleTitle}>{userRole}</Text>
              )}
            </View>
          </View>
        </View>

        <View style={styles.row}>
          {isUserAdmin ? (
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeTitle}>{'Admin Grup'}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            onPress={() => {
              _handlerShowSwipeUpMoreUser(userId, userName, isUserAdmin);
            }}>
            <IconMoreBlue width={24} height={24} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header
        iconLeft={<IconArrowLeftWhite width={24} height={24} />}
        styleContainer={{paddingTop: 28}}
        label={'Grup Diskusi'}
        styleLabel={styles.styleHeaderLabel}
        colorLabel={Colors.white}
        iconRight={<IconMoreWhite width={24} height={24} />}
        backgroundColor={'transparent'}
        onPressIconRight={() => {
          _handlerShowSwipeUpMoreGroup();
        }}
      />

      <Image source={bgBlueOrnament} style={styles.bgBlueOrnament} />

      <View style={styles.rootContainer}>{_renderContent()}</View>

      <SwipeUp
        height={100}
        visible={isShowSwipeUpMoreGroup}
        onClose={_handlerOnCloseSwipeUpMoreGroup}
        children={_renderSwipeUpMoreGroup()}
      />

      <SwipeUp
        height={100}
        visible={isShowSwipeUpMoreUser}
        onClose={_handlerOnCloseSwipeUpMoreUser}
        children={_renderSwipeUpMoreUser()}
      />

      <SwipeUp
        height={100}
        visible={isShowSwipeUpEditGroup}
        onClose={_handlerOnCloseSwipeUpEditGroup}
        children={_renderSwipeUpEditGroup()}
      />

      <SwipeUp
        height={100}
        visible={isShowSwipeUpChangeGroupName}
        onClose={_handlerOnCloseSwipeUpChangeGroupName}
        children={_renderSwipeUpChangeGroupName()}
      />

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

      {/* {isLoading ? <LoadingIndicator /> : null} */}
    </SafeAreaView>
  );
};

export default DiscussionGrupScreen;
