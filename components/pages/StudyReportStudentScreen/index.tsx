import {ScrollView, View, SafeAreaView, StatusBar} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {Header} from '@components/atoms/Header';
import {styles} from './style';
import {data_slide} from './useDummy';
import useStudyReportStudentScreen from './useStudyReportStudentScreen';
import {Materi, SesiKelas} from './Tab';
import ButtonSlide from './component/ButtonSlide';
import {Ujian} from './Tab/Ujian';
import {Task} from './Tab/Task';
import Colors from '@constants/colors';
import LKSReportTab from './Tab/LKS';

const StudyReportStudentScreen = () => {
  const {
    selectedItem,
    navigation,
    handleSelect,
    subject,
    route,
    onPressBack,
    student,
  } = useStudyReportStudentScreen();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Laporan Belajar'}
          subLabel={subject?.name}
          backgroundColor={Colors.white}
          onPressIconLeft={onPressBack}
        />
      ),
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={'transparent'}
      />
      <View style={{padding: 16}}>
        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollView}
          showsHorizontalScrollIndicator={false}>
          {data_slide?.map((item, key) => (
            <ButtonSlide
              item={item}
              key={key}
              onPress={() => handleSelect(item.id)}
              selectedItem={selectedItem}
            />
          ))}
        </ScrollView>
      </View>
      <View>
        <ScrollView>
          {selectedItem === 1 ? (
            <Materi navigation={navigation} />
          ) : selectedItem === 2 ? (
            <SesiKelas subject={subject} student={student} />
          ) : selectedItem === 3 ? (
            <Ujian
              navigation={navigation}
              subject={subject}
              student={student}
            />
          ) : selectedItem === 4 ? (
            <Task navigation={navigation} subject={subject} student={student} />
          ) : (
            <LKSReportTab
              navigation={navigation}
              route={route}
              subject={subject}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export {StudyReportStudentScreen};
