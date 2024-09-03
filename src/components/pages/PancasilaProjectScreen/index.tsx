import {Image, View} from 'react-native';
import React from 'react';
import {styles} from './styles';
import usePancasilaProjectScreen from './usePancasilaProjectScreen';
import {Header} from '@components/atoms';
import {bgBlueOrnament} from '@assets/images';
import {ProjectList} from './Tab/ProjectList';
import {ProjectHistory} from './Tab/ProjectHistory';
import Colors from '@constants/colors';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import IconNote from '@assets/svg/ic24_note.svg';

const PancasilaProjectScreen = () => {
  const {tabActive, Tab, TabLabel, handleOnPressTab, navigation} =
    usePancasilaProjectScreen();

  return (
    <View style={{flex: 1}}>
      <Header
        label={'Projek Pancasila'}
        backgroundColor={'transparent'}
        colorLabel={Colors.white}
        iconLeft={<IconArrowLeftWhite width={24} height={24} />}
        iconRight={<IconNote width={24} height={24} />}
        onPressIconRight={() => {
          navigation.navigate('PancasilaNotesScreen', {
            title: 'Projek Pancasila',
          });
        }}
      />
      <Image source={bgBlueOrnament} style={styles.bgBlueOrnament} />
      <View style={[styles.cardContainer]}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: styles.navigatorTabBarStyle,
            tabBarIndicatorStyle: styles.navigatorTabIndicatorStyle,
          }}>
          <Tab.Screen
            key={'ProjectList'}
            name={TabLabel?.list}
            component={ProjectList}
            listeners={{
              focus: () => handleOnPressTab(TabLabel?.list),
            }}
            options={{
              tabBarLabelStyle:
                tabActive === TabLabel?.list
                  ? styles.labelActiveStyle
                  : styles.labelStyle,
              tabBarLabel: TabLabel?.list,
              tabBarPressColor: 'white',
            }}
          />
          <Tab.Screen
            key={'ProjectHistory'}
            name={TabLabel?.history}
            component={ProjectHistory}
            listeners={{
              focus: () => handleOnPressTab(TabLabel?.history),
            }}
            options={{
              tabBarLabelStyle:
                tabActive === TabLabel?.history
                  ? styles.labelActiveStyle
                  : styles.labelStyle,
              tabBarLabel: TabLabel?.history,
              tabBarPressColor: 'white',
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export {PancasilaProjectScreen};
