import React, {useCallback, useMemo} from 'react';
import {styles} from './style';
import {Pressable, ScrollView, Text, View} from 'react-native';
import IconInformation from '@assets/svg/ic_information.svg';
import IconArrowRightGrey from '@assets/svg/ic_arrow_right_grey.svg';
import {useNavigation} from '@react-navigation/native';
import {INavigation} from 'type/screen';
import {FlatList} from 'react-native-gesture-handler';

const HelpCenterWidget = () => {
  const navigation = useNavigation<INavigation<'HomeScreen'>>();

  const initialisationData = useMemo(
    () => [
      {
        id: 1,
        label: 'Tanya Jawab (FAQ)',
        onPress: () => {
          navigation.navigate('PusatBantuanScreen', {
            type: 'WEBVIEW',
            webviewUrl: 'https://www.kelaspintar.id/bantuan',
            title: 'FAQ',
          });
        },
      },
      {
        id: 2,
        label: 'Kebijakan Privasi',
        onPress: () => {
          navigation.navigate('PusatBantuanScreen', {
            type: 'WEBVIEW',
            webviewUrl: 'https://www.kelaspintar.id/kebijakan-privasi',
            title: 'Kebijakan Privasi',
          });
        },
      },
      {
        id: 3,
        label: 'Syarat & Ketentuan',
        onPress: () => {
          navigation.navigate('PusatBantuanScreen', {
            type: 'WEBVIEW',
            webviewUrl: 'https://www.kelaspintar.id/syarat-dan-ketentuan',
            title: 'Syarat & Ketentuan',
          });
        },
      },
      {
        id: 4,
        label: 'Hubungi Kami',
        onPress: () => {
          navigation.navigate('PusatBantuanScreen', {
            type: 'CONTACT_US',
            title: 'Hubungi Kami',
          });
        },
      },
      {
        id: 5,
        label: 'Tentang & Nilai Aplikasi',
        onPress: () => {
          navigation.navigate('PusatBantuanScreen', {
            type: 'ABOUT',
            title: 'Tentang',
          });
        },
      },
    ],
    [],
  );

  const renderHelpCenterItem = useCallback(
    ({item, index}: IFlatListItem<(typeof initialisationData)[0]>) => {
      return (
        <Pressable
          key={index}
          style={styles.contentContainer}
          onPress={item?.onPress}>
          <Text style={styles.contentTitle}>{item?.label}</Text>
          <IconArrowRightGrey width={26} height={26} />
        </Pressable>
      );
    },
    [],
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <IconInformation style={styles.headerIcon} />
        <Text style={styles.headerTitle}>{'Pusat Bantuan'}</Text>
      </View>

      <ScrollView horizontal={false} style={{width: '100%', height: '100%'}}>
        <ScrollView
          horizontal={true}
          scrollEnabled={false}
          style={{width: '100%', height: '100%'}}
          contentContainerStyle={{width: '100%', height: '100%'}}>
          <FlatList
            data={initialisationData}
            scrollEnabled={false}
            contentContainerStyle={{width: '100%', height: '100%'}}
            style={{width: '100%', height: '100%'}}
            renderItem={renderHelpCenterItem}
          />
        </ScrollView>
      </ScrollView>

      {/* {initialisationData?.map((value, index): any => {
        return (
          <Pressable
            key={index}
            style={styles.contentContainer}
            onPress={value.onPress}>
            <Text style={styles.contentTitle}>{value?.label}</Text>
            <IconArrowRightGrey width={26} height={26} />
          </Pressable>
        );
      })} */}
    </View>
  );
};

export {HelpCenterWidget};
