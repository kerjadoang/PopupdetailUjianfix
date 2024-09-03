/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {RouteProp, useIsFocused, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {Text} from 'react-native-paper';
import SearchIcon from '@assets/svg/ic_search.svg';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {styles} from './style';
import ApprovedAbsenceTab from './tab/approvedAbsenceTab';
import RejectedAbsenceTab from './tab/rejectedAbsenceTab';
import SearchInput from '@components/atoms/SearchInput';
import PendingAbsenceTab from './tab/pendingAbsenceTab';

const _TabRiwayat: {diterima: string; ditolak: string; menunggu: string} = {
  diterima: 'Diterima',
  ditolak: 'Ditolak',
  menunggu: 'Menunggu Konfirmasi',
};

const TeacherAbsenceHistoryScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'TeacherAbsenceHistoryScreen'>>();
  const Tab = createMaterialTopTabNavigator();
  const [tabActive, setTabActive] = useState<
    'Diterima' | 'Ditolak' | 'Menunggu'
  >('Diterima');
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    setSearchActive(false);
  }, [useIsFocused]);

  return (
    <View style={styles.containerIndex}>
      {searchActive === false ? (
        <Header
          label={'Riwayat Ketidakhadiran'}
          backgroundColor={Colors.white}
          labelContent={
            <Text allowFontScaling={false} style={styles.headerTitle}>
              Kelas Online
            </Text>
          }
          iconRight={<SearchIcon />}
          onPressIconRight={() => {
            setSearchActive(true);
            setSearchKey('');
            setQuery('');
            Keyboard.dismiss();
          }}
        />
      ) : (
        <View style={styles.searchInputContainer}>
          <View style={styles.flex1}>
            <SearchInput
              query={searchKey}
              cancelable={true}
              onPressCancel={() => setSearchActive(false)}
              onChangeText={(txt: any) => {
                setSearchKey(txt);
              }}
              onSubmitEditing={() => {
                setQuery(searchKey);
                Keyboard.dismiss();
              }}
              onClear={() => {
                setSearchKey('');
                setQuery('');
                Keyboard.dismiss();
              }}
            />
          </View>
        </View>
      )}
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            height: 4,
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            backgroundColor: Colors.primary.base,
          },
        }}>
        {route?.params?.role === 'kepsek' && (
          <Tab.Screen
            key={'PendingTab_TAHS'}
            name={_TabRiwayat.menunggu}
            component={() => (
              <PendingAbsenceTab
                isSearchActive={searchActive}
                searchKey={query}
              />
            )}
            listeners={{
              focus: () => setTabActive('Menunggu'),
            }}
            options={{
              tabBarLabelStyle:
                tabActive === _TabRiwayat.menunggu
                  ? styles.labelActiveStyle
                  : styles.labelInactiveStyle,
              tabBarLabel: _TabRiwayat.menunggu,
              tabBarPressColor: 'white',
            }}
          />
        )}
        <Tab.Screen
          key={'ApprovedTab_TAHS'}
          name={_TabRiwayat.diterima}
          component={() => (
            <ApprovedAbsenceTab
              isSearchActive={searchActive}
              searchKey={query}
            />
          )}
          listeners={{
            focus: () => setTabActive('Diterima'),
          }}
          options={{
            tabBarLabelStyle:
              tabActive === _TabRiwayat.diterima
                ? styles.labelActiveStyle
                : styles.labelInactiveStyle,
            tabBarLabel: _TabRiwayat.diterima,
            tabBarPressColor: 'white',
          }}
        />
        <Tab.Screen
          key={'RejectedTab_TAHS'}
          name={_TabRiwayat.ditolak}
          component={() => (
            <RejectedAbsenceTab
              isSearchActive={searchActive}
              searchKey={query}
            />
          )}
          listeners={{
            focus: () => setTabActive('Ditolak'),
          }}
          options={{
            tabBarLabelStyle:
              tabActive === _TabRiwayat.ditolak
                ? styles.labelActiveStyle
                : styles.labelInactiveStyle,
            tabBarLabel: _TabRiwayat.ditolak,
            tabBarPressColor: 'white',
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default TeacherAbsenceHistoryScreen;
