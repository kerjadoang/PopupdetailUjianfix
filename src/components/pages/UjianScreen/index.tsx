import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {SCREEN_NAME} from '@constants/screen';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useLayoutEffect} from 'react';
import HistoryIcon from '@assets/svg/ic24_history_blue.svg';
import TabBarLabel from '@components/atoms/TabBarLabel';
import PerluDiperiksaTab from './PerluDiperiksaTab';
import DijadwalkanTab from './DijadwalkanTab';
import {Pressable, StatusBar, Text, View} from 'react-native';
import PaketSoalIcon from '@assets/svg/ic24_paketSoal.svg';
import ChevronRightIcon from '@assets/svg/ic16_chevron_right.svg';

const Tab = createMaterialTopTabNavigator();

const UjianScreen: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<ParamList, 'UjianScreen'>>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label="Ujian"
          iconRight={<HistoryIcon />}
          onPressIconRight={() => navigation.navigate('RiwayatUjianScreen')}
        />
      ),
    });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <StatusBar barStyle={'dark-content'} />
      <Pressable
        style={{
          margin: 16,
          padding: 16,
          borderRadius: 10,
          backgroundColor: Colors.primary.light4,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
        }}
        onPress={() => navigation.navigate('PaketSoalSubjectListScreen')}>
        <PaketSoalIcon />
        <View style={{flexGrow: 1}}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 14,
              color: Colors.primary.base,
            }}>
            Paket Soal
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins-Regular',
              fontSize: 12,
              color: Colors.dark.neutral80,
            }}>
            Buat dan kelola soal ujian
          </Text>
        </View>
        <ChevronRightIcon />
      </Pressable>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            height: 45,
            elevation: 0,
            borderBottomWidth: 1,
            borderBottomColor: Colors.dark.neutral20,
          },
          tabBarIndicatorStyle: {
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            height: 4,
            backgroundColor: Colors.primary.base,
          },
        }}>
        <Tab.Screen
          name={SCREEN_NAME.PerluDiperiksaTab}
          component={PerluDiperiksaTab}
          options={{
            tabBarLabel: props => (
              <TabBarLabel {...props} title="Perlu Diperiksa" />
            ),
          }}
        />
        <Tab.Screen
          name={SCREEN_NAME.DijadwalkanTab}
          component={DijadwalkanTab}
          options={{
            tabBarLabel: props => (
              <TabBarLabel {...props} title="Dijadwalkan" />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default UjianScreen;
