/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {RouteProp, useIsFocused, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
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

const StudentAbsenceHistoryScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'StudentAbsenceHistoryScreen'>>();
  const Tab = createMaterialTopTabNavigator();
  const isFocus = useIsFocused();
  const [tabActive, setTabActive] = useState<
    'Diterima' | 'Ditolak' | 'Menunggu'
  >('Diterima');
  const [searchActive, setSearchActive] = useState<boolean>(false);
  const [searchKey, setSearchKey] = useState<string>('');
  const [classRombelId, setClassRombelId] = useState<any>(false);

  useEffect(() => {
    setSearchActive(false);
    route?.params?.classRombelId &&
      setClassRombelId(route?.params?.classRombelId);
  }, [isFocus]);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {searchActive === false ? (
        <Header
          label={'Riwayat Ketidakhadiran'}
          backgroundColor={Colors.white}
          labelContent={
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 11,
                lineHeight: 16,
              }}>
              {`${route?.params?.className} • Kelas Online`}
            </Text>
          }
          iconRight={<SearchIcon />}
          onPressIconRight={() => {
            setSearchActive(true);
          }}
        />
      ) : (
        <View
          style={{
            width: '100%',
            backgroundColor: 'white',
            flexDirection: 'row',
            paddingVertical: 10,
          }}>
          <View style={{flex: 1}}>
            <SearchInput
              query={searchKey}
              cancelable={true}
              onPressCancel={() => setSearchActive(false)}
              onChangeText={(txt: any) => {
                setSearchKey(txt);
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
        <Tab.Screen
          key={'PendingTab_TAHS'}
          name={_TabRiwayat.menunggu}
          component={() => (
            <PendingAbsenceTab
              isSearchActive={searchActive}
              searchKey={searchKey}
              classRombelId={classRombelId}
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
        <Tab.Screen
          key={'ApprovedTab_TAHS'}
          name={_TabRiwayat.diterima}
          component={() => (
            <ApprovedAbsenceTab
              isSearchActive={searchActive}
              searchKey={searchKey}
              classRombleId={classRombelId}
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
              searchKey={searchKey}
              classRombleId={classRombelId}
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

export default StudentAbsenceHistoryScreen;
