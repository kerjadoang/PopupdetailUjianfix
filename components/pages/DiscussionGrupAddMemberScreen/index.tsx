import React, {useLayoutEffect} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import {useNavigation} from '@react-navigation/native';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import useDiscussionGrupAddMemberScreen from './useDiscussionGrupAddMemberScreen';
import IconArrowLeftBlue from '@assets/svg/blueArrowLeft.svg';
import IconCloseGrey from '@assets/svg/ic20_x_grey.svg';
import IconSearchBlue from '@assets/svg/ic_search_blue.svg';
import {Button, CCheckBox, InputText} from '@components/atoms';
import Colors from '@constants/colors';
import {SvgUri} from 'react-native-svg';
import {
  _handlerRoleName,
  hostEndsWith,
  lisFileSvgExtension,
  listFileImageExtension,
} from '@constants/functional';
import Avatar from '@components/atoms/Avatar';

const DiscussionGrupAddMemberScreen = () => {
  const navigation: any = useNavigation();
  const {
    isLoading,
    isOnSearching,
    searchQuery,
    listPotensialRoleHeadMaster,
    listPotensialRoleTeacher,
    listPotensialRoleAdmin,
    listPotensialRoleHeadMasterTemporary,
    listPotensialRoleTeacherTemporary,
    listPotensialRoleAdminTemporary,
    isCheckedAll,
    isCheckedAllTemporary,
    _handlerSetNotActiveSearch,
    _handlerSetActiveSearch,
    _handlerOnChangeSearching,
    _handlerOnPressCheckBox,
    _handlerOnPressCheckBoxTemporary,
    _handlerOnPressCheckBoxAll,
    _handlerOnPressCheckBoxAllTemporary,
    _handlerOnPressSubmitData,
    _handlerOnSubmitSearch,
  } = useDiscussionGrupAddMemberScreen();

  const isSearchEmpty = !searchQuery || searchQuery?.length == 0;

  const listHeadMaster = isSearchEmpty
    ? listPotensialRoleHeadMaster
    : listPotensialRoleHeadMasterTemporary;

  const listTeacher = isSearchEmpty
    ? listPotensialRoleTeacher
    : listPotensialRoleTeacherTemporary;

  const listAdmin = isSearchEmpty
    ? listPotensialRoleAdmin
    : listPotensialRoleAdminTemporary;

  const isListValid =
    listPotensialRoleTeacher.length != 0 ||
    listPotensialRoleHeadMaster.length != 0 ||
    listPotensialRoleAdmin.length != 0;

  const listAll =
    isListValid &&
    listPotensialRoleTeacher?.concat(
      listPotensialRoleHeadMaster,
      listPotensialRoleAdmin,
    );

  const listAllMemberChecked =
    listAll &&
    listAll?.length != 0 &&
    listAll?.filter((item: any) => item?.isChecked === true);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => _renderHeader(),
    });
  }, [isOnSearching, searchQuery]);

  const _renderHeader = () => {
    return (
      <>
        {isOnSearching ? (
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
        ) : (
          <View style={styles.headerContainer}>
            <IconArrowLeftBlue
              width={16}
              height={16}
              onPress={() => {
                navigation.goBack();
              }}
            />

            <View style={styles.labelContainer}>
              <Text style={styles.label}>{'Tambah Anggota'}</Text>
            </View>

            <IconSearchBlue
              width={24}
              height={24}
              onPress={() => {
                _handlerSetActiveSearch();
              }}
            />
          </View>
        )}
      </>
    );
  };

  const _renderCard = (value: any, index: number, data: any, role: string) => {
    const {user_type_id, isChecked, full_name, avatar, id} = value || false;

    return (
      <View key={index}>
        <View style={styles.card}>
          <View style={styles.row}>
            <Avatar id={avatar} style={styles.cardAvatar} />

            <View>
              <Text style={styles.cardNameTitle}>{full_name}</Text>
              <Text style={styles.cardRoleTitle}>
                {_handlerRoleName(user_type_id)}
              </Text>
            </View>
          </View>

          <CCheckBox
            isChecked={isChecked}
            onPressCheck={() => {
              if (isSearchEmpty) {
                _handlerOnPressCheckBox(index + 1, id, data, role);
              } else {
                _handlerOnPressCheckBoxTemporary(index + 1, id, data, role);
              }
            }}
          />
        </View>

        {index != data.length - 1 ? (
          <View style={styles.gapVertical20} />
        ) : null}
      </View>
    );
  };

  const _renderContent = () => {
    return (
      <View style={styles.container}>
        {listAllMemberChecked && listAllMemberChecked?.length != 0 ? (
          <View>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={styles.row}>
              {listAllMemberChecked?.map((value: any, index: number) => {
                const {full_name, path_url, id, user_type_id} = value;
                const userAvatarExtension =
                  path_url && path_url?.split('.')?.pop();
                const isAvatarImage =
                  listFileImageExtension.includes(userAvatarExtension);
                const isAvatarSvg =
                  lisFileSvgExtension.includes(userAvatarExtension);

                /*
                  USER_TYPE_ID
                  1. Murid >> B2C B2B
                  2. Orang Tua >> Ngikut anak
                  3. Mentor
                  4. Kepsek >> B2B B2G
                  5. Guru >> B2B
                  6. Admin >> B2B
                */

                const data =
                  user_type_id == 4
                    ? listPotensialRoleHeadMaster
                    : user_type_id == 6
                    ? listPotensialRoleAdmin
                    : listPotensialRoleTeacher;

                const role =
                  user_type_id == 4
                    ? 'HEADMASTER'
                    : user_type_id == 6
                    ? 'ADMIN'
                    : 'TEACHER';

                const idx = data.findIndex((item: any) => item?.id == id);

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      _handlerOnPressCheckBox(idx + 1, id, data, role);
                    }}
                    style={styles.checkedCard}>
                    <View style={styles.checkedAvatarContainer}>
                      {path_url && isAvatarSvg ? (
                        <SvgUri uri={path_url} style={styles.checkedAvatar} />
                      ) : path_url && isAvatarImage ? (
                        <Image
                          source={hostEndsWith(path_url ?? '')}
                          style={styles.checkedAvatar}
                        />
                      ) : null}
                      <IconCloseGrey
                        style={styles.checkedAvatarCloseIcon}
                        width={20}
                        height={20}
                      />
                    </View>

                    <Text style={styles.checkedTitle}>{full_name}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <View style={styles.lineGrey} />
          </View>
        ) : null}

        <View style={styles.selectAllCard}>
          <Text style={styles.selectAllTitle}>{'Pilih semua'}</Text>

          <CCheckBox
            isChecked={isSearchEmpty ? isCheckedAll : isCheckedAllTemporary}
            onPressCheck={() => {
              if (isSearchEmpty) {
                _handlerOnPressCheckBoxAll();
              } else {
                _handlerOnPressCheckBoxAllTemporary();
              }
            }}
          />
        </View>

        {listHeadMaster && listHeadMaster?.length != 0 ? (
          <View>
            <Text style={styles.sectionHeadTitle}>{'Kepala Sekolah'}</Text>

            {listHeadMaster?.map((value: any, index: number) => {
              return _renderCard(value, index, listHeadMaster, 'HEADMASTER');
            })}
          </View>
        ) : null}

        {listTeacher && listTeacher?.length != 0 ? (
          <View style={styles.sectionTop16}>
            <Text style={styles.sectionHeadTitle}>{'Guru'}</Text>

            {listTeacher?.map((value: any, index: number) => {
              return _renderCard(value, index, listTeacher, 'TEACHER');
            })}
          </View>
        ) : null}

        {listAdmin && listAdmin?.length != 0 ? (
          <View style={styles.sectionTop16}>
            <Text style={styles.sectionHeadTitle}>{'Admin'}</Text>

            {listAdmin?.map((value: any, index: number) => {
              return _renderCard(value, index, listAdmin, 'ADMIN');
            })}
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <>
      <View style={styles.rootContainer}>
        <ScrollView
          bounces={false}
          automaticallyAdjustKeyboardInsets={true}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          {_renderContent()}
        </ScrollView>

        <View style={styles.buttonAddContainer}>
          <Button
            action={() => {
              _handlerOnPressSubmitData();
            }}
            label={'Tambahkan'}
          />
        </View>
      </View>

      {isLoading ? <LoadingIndicator /> : null}
    </>
  );
};

export default DiscussionGrupAddMemberScreen;
