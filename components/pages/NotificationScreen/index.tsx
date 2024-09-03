import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {Header} from '@components/atoms/Header';
import PromoTab from './PromoTab';
import AktivitasTab from './AktivitasTab';
import {SwipeUp} from '@components/atoms';
import CheckIcon from '@assets/svg/check.svg';
import useNotification from './useNotification';
import {styles} from './style';
import SettingIcon from '@assets/svg/ic_option.svg';

const NotificationScreen = () => {
  const {
    Tab,
    isDisplay,
    setIsDisplay,
    handleMarkAllNotif,
    TabLabel,
    tabActive,
    handleOnPressTab,
  } = useNotification();

  const renderMarkAllNotifPopUp = () => {
    return (
      <View style={styles.childrenContainer}>
        <TouchableOpacity
          onPress={() => handleMarkAllNotif()}
          style={styles.bodyButtonContainer}>
          <View style={styles.checkIconContainer}>
            <CheckIcon />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => handleMarkAllNotif()}
              style={styles.descriptionContainer}>
              <Text style={styles.description}>Tandai semua telah dibaca</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.background}>
      <Header
        label="Notifikasi"
        iconRight={<SettingIcon />}
        withoutBackButton={true}
        onPressIconRight={() => {
          setIsDisplay(true);
        }}
        styleContainer={styles.headerStyle}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.navigatorTabBarStyle,
          tabBarIndicatorStyle: styles.navigatorTabIndicatorStyle,
        }}>
        <Tab.Screen
          key={'NotifActivity'}
          name={TabLabel?.activity}
          component={AktivitasTab}
          listeners={{
            focus: () => handleOnPressTab(TabLabel?.activity),
          }}
          options={{
            tabBarLabelStyle:
              tabActive === TabLabel?.activity
                ? styles.labelActiveStyle
                : styles.labelStyle,
            tabBarLabel: TabLabel?.activity,
            tabBarPressColor: 'white',
          }}
        />
        <Tab.Screen
          key={'NotifPromo'}
          name={TabLabel?.promo}
          component={PromoTab}
          listeners={{
            focus: () => handleOnPressTab(TabLabel?.promo),
          }}
          options={{
            tabBarLabelStyle:
              tabActive === TabLabel?.promo
                ? styles.labelActiveStyle
                : styles.labelStyle,
            tabBarLabel: TabLabel?.promo,
            tabBarPressColor: 'white',
          }}
        />
      </Tab.Navigator>
      {isDisplay && (
        <SwipeUp
          height={80}
          visible={isDisplay}
          isSwipeLine={true}
          onClose={() => setIsDisplay(false)}
          children={renderMarkAllNotifPopUp()}
        />
      )}
    </SafeAreaView>
  );
};

export default NotificationScreen;
