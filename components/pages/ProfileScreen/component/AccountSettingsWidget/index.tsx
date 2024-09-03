import React, {useCallback} from 'react';
import {Text, Pressable, View} from 'react-native';
import {styles} from './style';
import IconSettings from '@assets/svg/ic_setting.svg';
import IconArrowRightGrey from '@assets/svg/ic_arrow_right_grey.svg';
import {SwipeUp} from '@components/atoms';
import useAccountSettingsWidget from './useAccountSettingsWidget';
import {SCREEN_NAME} from '@constants/screen';
import SwipeupChangeAccount from './SwipeupChangeAccount';
import FlatlistWrapper from '@components/atoms/FlatlistWrapper';

const AccountSettingsWidget = (props: any) => {
  const {
    initialisationData,
    navigation,
    isShowSwipeUp,
    allChildrenData,
    _handlerCloseSwipeUp,
    _handlerChangeAccount,
  }: any = useAccountSettingsWidget(props);

  const renderButtonSettings = useCallback(({item: value, index}: any) => {
    return (
      <Pressable
        key={index}
        style={styles.contentContainer}
        onPress={value?.onPress}>
        <Text style={styles.contentTitle}>{value?.label}</Text>
        <IconArrowRightGrey width={26} height={26} />
      </Pressable>
    );
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <IconSettings style={styles.headerIcon} />
          <Text style={styles.headerTitle}>{'Pengaturan Akun'}</Text>
        </View>

        <FlatlistWrapper
          data={initialisationData}
          renderItem={renderButtonSettings}
        />
      </View>

      <SwipeUp
        height={100}
        visible={isShowSwipeUp}
        onClose={_handlerCloseSwipeUp}
        children={
          <SwipeupChangeAccount
            allChildrenData={allChildrenData}
            onPressChangeAccount={_handlerChangeAccount}
            onPressAddChildren={() => {
              _handlerCloseSwipeUp();
              navigation.navigate(
                SCREEN_NAME.LinkAccountScreen as never,
                {
                  title: 'orangtua',
                } as never,
              );
            }}
          />
        }
      />
    </>
  );
};

export {AccountSettingsWidget};
