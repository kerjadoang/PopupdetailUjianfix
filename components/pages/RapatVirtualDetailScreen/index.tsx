import {
  Button,
  Header,
  InputText,
  MainText,
  MainView,
  PopUp,
  SwipeUp,
} from '@components/atoms';
import React, {useLayoutEffect} from 'react';
import IconPencil from '@assets/svg/ic_edit.svg';
import Colors from '@constants/colors';
import dayjs from 'dayjs';
import {Pressable, ScrollView} from 'react-native';
import IconLive from '@assets/svg/ic16_live.svg';
import IconCopy from '@assets/svg/ic24_copy_blue.svg';
import IconEdit from '@assets/svg/ic24_edit_2.svg';
import IconDelete from '@assets/svg/ic24_trash_red.svg';
import RobotHapus from '@assets/svg/ic_robot_hapus.svg';
import RobotSedih from '@assets/svg/robot_sedih.svg';
import {showSuccessToast} from '@constants/functional';
import Avatar from '@components/atoms/Avatar';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {styles} from './style';
import {useScreen} from './useScreen';

const RapatVirtualDetailScreen = () => {
  const {
    navigation,
    data,
    startTime,
    endTime,
    detail,
    attandence,
    tabActive,
    setTabActive,
    showMoreSwipeUp,
    setShowMoreSwipeUp,
    showConfirmCancel,
    setShowConfirmCancel,
    cancelVirtualMeeting,
  } = useScreen();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label="Detail Rapat Virtual"
          iconRight={data?.status === 'unstarted' ? <IconPencil /> : null}
          onPressIconRight={() => setShowMoreSwipeUp(true)}
        />
      ),
    });
  }, [navigation]);

  const generateDateTime = () => {
    return `${dayjs(detail?.time_start)
      .locale('id')
      .format('dddd, DD MMM YYYY')} • ${startTime} - ${endTime}`;
  };

  const generateStatusBadge = () => {
    const renderText =
      detail?.status === 'on_going'
        ? 'Sedang berlangsung'
        : 'Belum berlangsung';
    return (
      <MainView
        backgroundColor={
          detail?.status === 'on_going'
            ? Colors.danger.light2
            : Colors.secondary.light2
        }
        style={styles.statusBadgeContainer}>
        {detail?.status === 'on_going' ? (
          <IconLive style={{marginRight: 4}} />
        ) : null}
        <MainText
          color={
            detail?.status === 'on_going'
              ? Colors.danger.base
              : Colors.orange.dark1
          }>
          {renderText ?? '-'}
        </MainText>
      </MainView>
    );
  };

  const renderDividers = () => {
    return <MainView height={4} backgroundColor={Colors.dark.neutral10} />;
  };

  const renderEmpty = () => {
    return (
      <MainView alignItems="center" marginTop={24}>
        <RobotSedih />
        <MainText style={styles.title2} marginTop={12} marginBottom={6}>
          Belum Ada Peserta
        </MainText>

        <MainText
          fontSize={14}
          color={Colors.dark.neutral60}
          textAlign="center">
          Belum ada peserta yang bergabung karena kelas belum berlangsung.
        </MainText>
      </MainView>
    );
  };

  const renderMoreSwipeUp = () => {
    return (
      <MainView padding={16} gap={24}>
        <Pressable
          onPress={() => {
            setShowMoreSwipeUp(false);
            navigation.navigate('RapatVirtualCreateScreen', {
              type: 'edit',
              data: data,
            });
          }}>
          <MainView flexDirection="row" gap={12} alignItems="center">
            <IconEdit />
            <MainText
              fontSize={16}
              color={Colors.dark.neutral100}
              lineHeight={24}>
              Ubah Rapat Virtual
            </MainText>
          </MainView>
        </Pressable>

        <Pressable
          onPress={() => {
            setShowMoreSwipeUp(false);
            setShowConfirmCancel(true);
          }}>
          <MainView flexDirection="row" gap={12} alignItems="center">
            <IconDelete />
            <MainText
              fontSize={16}
              color={Colors.dark.neutral100}
              lineHeight={24}>
              Batalkan Rapat Virtual
            </MainText>
          </MainView>
        </Pressable>
      </MainView>
    );
  };

  const TAB_NAMES = {
    JOIN: 'Hadir',
    NOT_JOIN: 'Tidak Hadir',
  };

  const Tab = createMaterialTopTabNavigator();

  const TabScreen = () => {
    const item = tabActive === 'Hadir' ? 'join' : 'not_join';

    return (
      <ScrollView style={{flex: 1}}>
        <MainView backgroundColor={Colors.white} padding={16}>
          {attandence?.participant?.[item]?.length === 0 ? renderEmpty() : null}

          {attandence?.participant?.[item]?.map((obj: any) => {
            return (
              <MainView
                flexDirection="row"
                gap={8}
                alignItems="center"
                marginBottom={12}>
                <Avatar
                  id={obj?.user?.avatar}
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    overflow: 'hidden',
                  }}
                />
                <MainText>{obj?.user?.full_name}</MainText>
              </MainView>
            );
          })}
        </MainView>
      </ScrollView>
    );
  };

  return (
    <MainView style={styles.component}>
      <ScrollView style={styles.component}>
        {/* START: Header Component */}
        <MainView paddingTop={8} paddingBottom={16} paddingHorizontal={16}>
          <MainText style={styles.title}>{detail?.title ?? '-'}</MainText>
          <MainText
            marginVertical={4}
            fontSize={12}
            color={Colors.dark.neutral100}>
            {generateDateTime()}
          </MainText>
          {generateStatusBadge()}
        </MainView>
        {/* END: Header Component */}

        {renderDividers()}

        {/* START: Description Component */}
        <MainView padding={16}>
          <MainText style={styles.title2} marginBottom={8}>
            Deskripsi
          </MainText>
          <MainText fontSize={14} color={Colors.dark.neutral100}>
            {detail?.description ?? '-'}
          </MainText>
        </MainView>
        {/* END: Description Component */}

        {renderDividers()}

        {/* START: Author Component */}
        <MainView padding={16} flexDirection="row">
          <Avatar id={detail?.user?.avatar} />
          <MainView>
            <MainText style={styles.title2}>Dibuat oleh</MainText>
            <MainText fontSize={14} color={Colors.dark.neutral100}>
              {detail?.user?.full_name ?? '-'}
            </MainText>
          </MainView>
        </MainView>
        {/* END: Author Component */}

        {renderDividers()}

        {/* START: Meeting Link Component */}
        <MainView padding={16}>
          <MainText
            fontSize={14}
            color={Colors.dark.neutral100}
            marginBottom={8}>
            Link Rapat
          </MainText>
          <InputText
            backgroundColor={Colors.dark.neutral20}
            disabled={true}
            onChangeText={() => {}}
            placeholder={detail?.meeting_url}
            disabledRightIcon={false}
            rightIcon={IconCopy}
            onPressIcon={async () => {
              const token = await AsyncStorage.getItem(Keys.token);
              Clipboard.setString(
                `${detail?.meeting_url}${token?.replace(/^"(.*)"$/, '$1')}`,
              );
              showSuccessToast('Tautan Berhasil Disalin');
            }}
          />
        </MainView>
        {/* END: Meeting Link Component */}

        {renderDividers()}

        {/* START: TAB Component */}
        <MainText
          style={styles.title2}
          paddingTop={16}
          paddingLeft={16}
          paddingBottom={4}>
          Peserta
        </MainText>
        {attandence?.participant ? (
          <Tab.Navigator
            style={{height: 300}}
            sceneContainerStyle={{backgroundColor: Colors.white}}
            screenOptions={{
              tabBarStyle: styles.navigatorTabBarStyle,
              tabBarIndicatorStyle: styles.navigatorTabIndicatorStyle,
            }}>
            {Object.values(TAB_NAMES)?.map(_val => {
              return (
                <Tab.Screen
                  key={_val}
                  name={_val}
                  component={TabScreen}
                  listeners={{
                    focus: () => setTabActive(_val),
                  }}
                  options={{
                    tabBarItemStyle: {
                      flexDirection: 'row',
                    },
                    tabBarLabelStyle:
                      tabActive === _val ?? ''
                        ? styles.labelActiveStyle
                        : styles.labelStyle,
                    tabBarLabel: _val,

                    tabBarPressColor: Colors.primary.background2,
                    tabBarStyle: {
                      backgroundColor: Colors.primary.background,
                    },
                  }}
                />
              );
            })}
          </Tab.Navigator>
        ) : null}
        {/* END: TAB Component */}
      </ScrollView>

      {renderDividers()}

      {/* START: Join Btn Component */}
      <MainView padding={16}>
        <Button
          label="Masuk Rapat"
          outline
          isDisabled={detail?.status !== 'on_going'}
          action={() =>
            navigation.navigate('RapatVirtualTestCamerascreen', {
              data: data,
            })
          }
        />
      </MainView>
      {/* END: Join Btn Component */}

      <SwipeUp
        isSwipeLine={true}
        visible={showMoreSwipeUp}
        onClose={() => setShowMoreSwipeUp(false)}
        height={500}
        children={renderMoreSwipeUp()}
      />

      <PopUp
        show={showConfirmCancel}
        Icon={RobotHapus}
        title="Batalkan Rapat Virtual"
        desc="Apakah Anda yakin akan membatalkan rapat virtual?"
        titleCancel="Kembali"
        actionCancel={() => {
          setShowConfirmCancel(false);
        }}
        titleConfirm="Batalkan"
        actionConfirm={() => {
          cancelVirtualMeeting(data?.id);
        }}
      />
    </MainView>
  );
};

export {RapatVirtualDetailScreen};
