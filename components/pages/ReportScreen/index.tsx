/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import {Pressable, ScrollView, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {Header} from '@components/atoms/Header';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';

import {styles} from './style';
import {data_slide} from './useDummy';
import useFormReport from './useFormReport';
import {Materi, SesiKelas} from './Tab';
import PopUpComponent from './component/popUpComponent';
import ListBab from './component/popUpContent/listBab';
import Exam from './Tab/Exam';
import Tugas from './Tab/Tugas';
import LKSReportTabScreen from './Tab/LKS';

const ReportScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'ReportScreen'>>();
  const {subject} = route.params;

  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ReportScreen'>>();
  const {
    setSelectedItem,
    selectedItem,
    chapterChoosed,
    setChapterChoosed,
    chapterData,
    popUpVisible,
    handleSetPopUpVisible,
    popUpHeaderVisible,
  } = useFormReport(subject);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Laporan Belajar'}
          subLabel={subject?.name ?? 'Mata Pelajaran'}
        />
      ),
    });
  }, []);

  function handleSelect(item: any) {
    setSelectedItem(item);
  }

  return (
    <View style={styles.container}>
      <View>
        <ScrollView horizontal contentContainerStyle={styles.scrollView}>
          {data_slide.map((item, key) => (
            <Pressable
              key={key}
              style={[
                styles.unChoose,
                item.id === selectedItem && styles.choose,
              ]}
              onPress={() => handleSelect(item.id)}>
              <Text
                style={
                  (styles.textUnchoose,
                  item.id === selectedItem && styles.textChoose)
                }>
                {item.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <View>
        <ScrollView>
          {selectedItem === 1 ? (
            <Materi
              subject={subject}
              chapterChoosed={chapterChoosed}
              handleShowPopUp={handleSetPopUpVisible}
            />
          ) : selectedItem === 2 ? (
            <SesiKelas />
          ) : selectedItem === 3 ? (
            <Exam subject={subject} />
          ) : selectedItem === 4 ? (
            <Tugas subject={subject} />
          ) : (
            <LKSReportTabScreen subject={subject} />
          )}
        </ScrollView>
      </View>
      <PopUpComponent
        isOpenPopUp={popUpVisible}
        handleShowPopUp={() => {
          handleSetPopUpVisible(true);
        }}
        popUpContent={
          <ListBab
            chapterData={chapterData}
            setChapterChoosed={setChapterChoosed}
            handleShowPopUp={handleSetPopUpVisible}
            chapterChoosed={chapterChoosed}
          />
        }
        showHeader={popUpHeaderVisible}
        handleClosePopUp={() => {
          handleSetPopUpVisible(false);
        }}
      />
    </View>
  );
};

export {ReportScreen};
