import React, {useLayoutEffect} from 'react';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import useDiscussionGrupSearchMemberScreen from './useDiscussionGrupSearchMemberScreen';
import Colors from '@constants/colors';
import {InputText, SwipeUp} from '@components/atoms';
import IconSetAdminBlue from '@assets/svg/ic24_set_admin_blue.svg';
import IconSearchBlue from '@assets/svg/ic_search_blue.svg';
import IconDeleteMemberBlue from '@assets/svg/ic24_delete_member_blue.svg';
import IconOpenEyeBlue from '@assets/svg/blue_eye.svg';
import {SvgUri} from 'react-native-svg';
import {hostEndsWith} from '@constants/functional';
import IconMoreBlue from '@assets/svg/ic24_more_blue.svg';
import {Maskot11} from '@assets/images';

const DiscussionGrupSearchMemberScreen = () => {
  const navigation: any = useNavigation();
  const {
    isLoading,
    searchQuery,
    listMember,
    selectedUser,
    isShowSwipeUpMoreUser,
    _handlerAddDeleteAdmin,
    _handlerSeeDetailMember,
    _handlerDeleteMemberConfirmation,
    _handlerOnCloseSwipeUpMoreUser,
    _handlerOnChangeSearching,
    _handlerSetNotActiveSearch,
    _handlerShowSwipeUpMoreUser,
    _handlerOnSubmitSearch,
  } = useDiscussionGrupSearchMemberScreen();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => _renderHeader(),
    });
  }, [searchQuery]);

  const isCurrentUserAdminGroup = listMember?.is_current_user_admin;

  const _renderHeader = () => {
    return (
      <View style={styles.headerOnSearchingContainer}>
        <InputText
          top={-6}
          width={'90%'}
          backgroundColor={Colors.dark.neutral10}
          returnKeyType={'search'}
          value={searchQuery}
          maxLength={60}
          onChangeText={(val: any) => {
            _handlerOnChangeSearching(val);
          }}
          onSubmitEditing={() => {
            _handlerOnSubmitSearch();
          }}
          leftIcon={IconSearchBlue}
          placeholder={'Cari'}
        />

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            marginLeft: -10,
          }}
          onPress={() => {
            _handlerSetNotActiveSearch();
          }}>
          <Text style={styles.headCancelTitle}>{'Batal'}</Text>
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

  const _renderNoData = () => {
    return (
      <View style={styles.noDataContainer}>
        <View>
          <Image source={Maskot11} style={styles.noDataIcon} />
          <Text style={styles.noDataTitle}>{'Anggota Tidak Ditemukan'}</Text>
          <Text style={styles.noDataDescription}>
            {`Keanggotaan “${searchQuery}” nihil.\nCoba kembali dengan nama lainnya.`}
          </Text>
        </View>
      </View>
    );
  };

  const _renderContent = () => {
    return (
      <View style={styles.container}>
        {listMember?.users && listMember?.users?.length != 0 ? (
          <Text
            style={
              styles.headSubtitle
            }>{`${listMember?.users?.length} anggota ditemukan`}</Text>
        ) : null}

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          data={listMember?.users}
          ListEmptyComponent={_renderNoData()}
          onEndReachedThreshold={0.25}
          // onEndReached={onEndReach}
          keyExtractor={(_, idx): any => idx}
          renderItem={({item, index}) => _renderCard(item, index)}
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

    // console.log('abcde item>>>', JSON.stringify(item, null, 2));

    return (
      <View key={index} style={styles.rowSpaceBetween}>
        <View style={styles.row}>
          {!userAvatar ? null : userAvatar?.endsWith('.svg') ? (
            <SvgUri uri={userAvatar} style={styles.cardIcon} />
          ) : (
            <Image
              source={hostEndsWith(userAvatar ?? '')}
              style={styles.cardIcon}
            />
          )}

          <View>
            <Text style={styles.cardTitle}>{userName}</Text>
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
    <>
      <View style={styles.rootContainer}>{_renderContent()}</View>

      <SwipeUp
        height={100}
        visible={isShowSwipeUpMoreUser}
        onClose={_handlerOnCloseSwipeUpMoreUser}
        children={_renderSwipeUpMoreUser()}
      />

      {isLoading ? <LoadingIndicator /> : null}
    </>
  );
};

export default DiscussionGrupSearchMemberScreen;
