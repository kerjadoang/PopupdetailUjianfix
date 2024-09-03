/* eslint-disable react/no-unstable-nested-components */
import {Header} from '@components/atoms/Header';
import React, {useLayoutEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useScreen} from './useScreen';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {StackNavigationProp} from '@react-navigation/stack';
import {Materi} from './Materi';
import {SesiKelas} from './SesiKelas';
import Exam from './Exam';
import Tugas from './Tugas';
import LKSReportTabScreen from './LKS';
import {ParamList} from 'type/screen';

const ReportOnParentScreen = () => {
  // ROUTING
  const route = useRoute<RouteProp<ParamList, 'ReportOnParentScreen'>>();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ReportOnParentScreen'>>();
  const {data, subject}: {data: any; subject: Subject} = route?.params;

  const {selectedItem, setSelectedItem, item} = useScreen();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => <Header label="Laporan Belajar" subLabel={subject.name} />,
    });
  }, []);

  return (
    <View style={styles.body}>
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {item.map((element: any, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedItem(element)}
                style={
                  selectedItem === element ? styles.selectedItem : styles.item
                }>
                <Text
                  style={
                    selectedItem === element
                      ? styles.selectedItemText
                      : styles.itemText
                  }>
                  {element}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <ScrollView>
        {selectedItem === 'Materi' ? (
          <Materi subject={subject} data={data} />
        ) : selectedItem === 'Sesi Kelas' ? (
          <SesiKelas data={data} />
        ) : selectedItem === 'Ujian' ? (
          <Exam subject={subject} data={data} />
        ) : selectedItem === 'PR/Projek/Tugas' ? (
          <Tugas subject={subject} data={data} />
        ) : (
          <LKSReportTabScreen subject={subject} data={data} />
        )}
      </ScrollView>
    </View>
  );
};
export {ReportOnParentScreen};

const styles = StyleSheet.create({
  body: {
    padding: 16,
    backgroundColor: Colors.white,
    height: '100%',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  selectedItem: {
    backgroundColor: Colors.primary.base,
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginHorizontal: 6,
  },
  item: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 7,
    marginHorizontal: 6,
  },
  selectedItemText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.white,
  },
  itemText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral80,
  },
  subjectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  subjectName: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  whiteContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 2,
    padding: 16,
    borderRadius: 15,
    margin: 10,
    backgroundColor: Colors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginVertical: 16,
  },
  btnText: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.primary.base,
    fontFamily: Fonts.SemiBoldPoppins,
  },
  desc: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral60,
  },
});
