import React, {useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {History, Settings} from './Tab';
import useERaport from './useERaport';
import {StackNavigationProp} from '@react-navigation/stack';
import {ParamList} from 'type/screen';

const ERaportGuruScreen = () => {
  const {classes_data} = useERaport();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ERaportGuruScreen'>>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header label={'Bagikan e-Rapor'} subLabel={classes_data?.name} />
      ),
    });
  }, []);

  const tab = ['Bagikan', 'Riwayat Pembagian'];
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <View style={styles.body}>
      <View style={styles.tabContainer}>
        {tab.map((element: string, index: number) => {
          return (
            <Pressable
              key={index}
              onPress={() => setSelectedTab(index)}
              style={
                selectedTab === index ? styles.activeTab : styles.nonActiveTab
              }>
              <Text
                style={
                  selectedTab === index
                    ? styles.activeText
                    : styles.nonActiveText
                }>
                {element}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <View>{selectedTab === 0 ? <Settings /> : <History />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.white,
  },
  tabContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
  },
  activeTab: {
    borderBottomColor: Colors.primary.base,
    borderBottomWidth: 2,
    width: '50%',
    alignItems: 'center',
    paddingBottom: 16,
  },
  nonActiveTab: {
    width: '50%',
    alignItems: 'center',
    paddingBottom: 16,
  },
  activeText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.primary.base,
  },
  nonActiveText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral80,
  },
});
export {ERaportGuruScreen};
