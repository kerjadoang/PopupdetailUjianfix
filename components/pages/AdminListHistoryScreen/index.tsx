import React, {useLayoutEffect} from 'react';
import {Header, InputText, PopUp} from '@components/atoms';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import useAdminListHistoryScreen from './useAdminListHistoryScreen';
import IconArrowRightBlue from '@assets/svg/ic_arrow_right_blue.svg';
import IconSearchBlue from '@assets/svg/ic_search_blue.svg';
import IconCloseGrey from '@assets/svg/x.svg';
import {styles} from './style';
import {Maskot10, Maskot11} from '@assets/images';
import {useRoute} from '@react-navigation/native';
import Colors from '@constants/colors';
import Avatar from '@components/atoms/Avatar';

const AdminListHistoryScreen = () => {
  const {
    isLoading,
    isShowPopup,
    popupData,
    listData,
    navigation,
    isOnSearching,
    searchQuery,
    _handlerOnPressSubmitSearch,
    _handlerOnPressActiveSearching,
    _handlerOnPressNotActiveSearching,
    _handlerOnChangeSearching,
    _handlerOnPressClearSearchQuery,
    _handlerOnPressNavigateToAdminListDetailScreen,
  } = useAdminListHistoryScreen();

  const route = useRoute();
  const {rombel_class_school_name}: any = route?.params;

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
              placeholderTextColor={Colors.dark.neutral50}
              backgroundColor={Colors.dark.neutral10}
              returnKeyType={'search'}
              value={searchQuery}
              maxLength={60}
              onChangeText={(val: any) => {
                _handlerOnChangeSearching(val);
              }}
              onSubmitEditing={() => {
                _handlerOnPressSubmitSearch();
              }}
              leftIcon={IconSearchBlue}
              rightIcon={searchQuery.length > 0 ? IconCloseGrey : null}
              onPressIcon={() => {
                _handlerOnPressClearSearchQuery();
              }}
              placeholder={'Cari Murid'}
            />

            <TouchableOpacity
              style={{
                alignSelf: 'center',
                marginLeft: -10,
              }}
              onPress={() => {
                _handlerOnPressNotActiveSearching();
              }}>
              <Text style={styles.headCancelTitle}>{'Batal'}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Header
            label={'Riwayat Administrasi'}
            subLabel={rombel_class_school_name}
            iconRight={<IconSearchBlue width={24} height={24} />}
            onPressIconRight={() => {
              _handlerOnPressActiveSearching();
            }}
          />
        )}
      </>
    );
  };

  const _renderEmptyContent = () => {
    return (
      <View style={styles.emptyContentContainer}>
        {isOnSearching ? (
          <View>
            <Image source={Maskot10} style={styles.emptyContentIcon} />
            <Text style={styles.emptyContentTitle}>
              {'Pencarian Tidak Ditemukan'}
            </Text>
            <Text style={styles.emptyContentSubtitle}>
              {`Hasil pencarian "${searchQuery}" nihil.\nCoba masukkan kata kunci lainnya!`}
            </Text>
          </View>
        ) : (
          <View>
            <Image source={Maskot11} style={styles.emptyContentIcon} />
            <Text style={styles.emptyContentTitle}>
              {'Murid Tidak Ditemukan'}
            </Text>
          </View>
        )}
      </View>
    );
  };

  const _renderCard = (item: any, index: number) => {
    const {full_name, registration_number, avatar, id} = item || false;

    return (
      <View key={index}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            _handlerOnPressNavigateToAdminListDetailScreen(
              id,
              full_name,
              rombel_class_school_name,
              registration_number,
            );
          }}>
          <View style={styles.row}>
            <Avatar id={avatar} style={styles.cardIcon} />

            <View>
              <Text style={styles.cardTitle}>{full_name}</Text>
              <Text style={styles.cardSubtitle}>{`NIS: ${
                registration_number || '-'
              }`}</Text>
            </View>
          </View>

          <IconArrowRightBlue width={24} height={24} />
        </TouchableOpacity>

        {index != listData?.length - 1 ? <View style={styles.gap} /> : null}
      </View>
    );
  };

  const _renderContent = () => {
    const {rombel_user_amount, rombel_user} = listData || false;

    return (
      <>
        <Text
          style={styles.userAmountTitle}>{`${rombel_user_amount} Murid`}</Text>

        <ScrollView
          contentContainerStyle={styles.contentContainerStyle}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          {rombel_user &&
            rombel_user?.map((item: any, index: number) =>
              _renderCard(item, index),
            )}
        </ScrollView>

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
    <View style={styles.content}>
      {isLoading ? (
        <LoadingIndicator />
      ) : listData?.rombel_user && listData?.rombel_user?.length != 0 ? (
        _renderContent()
      ) : (
        _renderEmptyContent()
      )}
    </View>
  );
};

export {AdminListHistoryScreen};
