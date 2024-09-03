import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import useLkpdStudentScreen from './useLkpdStudentScreen';
import {Header} from '@components/atoms';
import IconSearch from '@assets/svg/ic_search_blue.svg';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Colors from '@constants/colors';
import SearchInput from './components/SearchInput';
import StudentScheduleLkpdTab from './components/StudentScheduleLkpdTab';
import StudentHistoryLkpdTab from './components/StudentHIstoryLkpdTab';

const Tab = createMaterialTopTabNavigator();
export const LKPD_TAB_NAMES = {
  BelumDikerjakan: 'Belum Dikerjakan',
  Riwayat: 'Riwayat',
};

const LkpdStudentScreen = () => {
  const {setLkpdMode, setLkpdSearch, lkpdMode, lkpdSearch, lkpd_id} =
    useLkpdStudentScreen();

  const __renderMyTabBarlabel = useCallback(
    ({children, focused}: {children: string; focused: boolean}) => {
      return (
        <Text
          style={[
            styles.containerTabBarLabel,
            focused && {color: Colors.primary.base},
          ]}>
          {children}
        </Text>
      );
    },
    [],
  );

  return (
    <View style={{flex: 1}}>
      {lkpdMode === 'search' ? (
        <SearchInput
          handleSearch={() => {}}
          query={lkpdSearch}
          setQuery={(text: string) => setLkpdSearch(text)}
          setModalVisible={() => setLkpdMode('default')}
        />
      ) : (
        <Header
          label={'Lembar Kerja Peserta Didik'}
          iconRight={<IconSearch />}
          onPressIconRight={() => {
            setLkpdMode('search');
          }}
        />
      )}
      <View style={styles.cardContainer}>
        <Tab.Navigator
          backBehavior="none"
          sceneContainerStyle={styles.containerTab}
          screenOptions={{
            tabBarStyle: styles.tabBar,
            tabBarIndicatorStyle: styles.tabBarIndicator,
          }}>
          <Tab.Screen
            key={LKPD_TAB_NAMES.BelumDikerjakan}
            name={LKPD_TAB_NAMES.BelumDikerjakan}
            listeners={{
              tabPress: () => {
                if (lkpdMode !== 'default') {
                  setLkpdSearch('');
                  setLkpdMode('default');
                }
              },
            }}
            options={{
              tabBarLabel: __renderMyTabBarlabel,
            }}>
            {props => <StudentScheduleLkpdTab {...props} lkpd_id={lkpd_id} />}
          </Tab.Screen>
          <Tab.Screen
            key={LKPD_TAB_NAMES.Riwayat}
            name={LKPD_TAB_NAMES.Riwayat}
            component={StudentHistoryLkpdTab}
            listeners={{
              tabPress: () => {
                if (lkpdMode !== 'default') {
                  setLkpdSearch('');
                  setLkpdMode('default');
                }
              },
            }}
            options={{
              tabBarLabel: __renderMyTabBarlabel,
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
};

export {LkpdStudentScreen};
