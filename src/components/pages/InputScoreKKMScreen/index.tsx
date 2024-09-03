import {View, ScrollView, Text} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Header} from '@components/atoms/Header';
import {styles} from './styles';

import {DropDown} from './Component/DropDown';
import {slide} from './useDummy';
import {ChooseItem} from './Component/ChooseItem';
import {PopUp, SwipeUp} from '@components/atoms';
import SwipeUpEdit from './Component/SwipeUpEdit';
import SwipeUpFilter from './Component/SwipeUpFilter';
import useFormInputScoreKKM from './useFormInputScoreKKM';
import {SwipeUpFilterClass} from './Component/SwipeUpFilterClass';
import SwipeUpAddSkills from './Component/SwipeUpAddSkills';
import SwipeUpAddExtra from './Component/SwipeUpAddExtra';
import SwipeUpEditExtra from './Component/SwipeUpEditExtra';
import {ParamList} from 'type/screen';

const InputScoreKKMScreen = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'InputScoreKKMScreen'>>();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header label={'Input Nilai KKM'} backgroundColor="white" />
      ),
    });
  }, [navigation]);

  const [subject, setSubject] = useState(null);
  const {
    data,
    getClass,
    firstClass,
    firstAcademic,
    allKnowledge,
    submitEdit,
    allSkills,
    handleClassSelected,
    handleDateSelected,
    selectedClass,
    selectedDate,
    show,
    setShow,
    allExtra,
    popUp,
    setPopUp,
    submitCount,
    allKKMValue,
    submitEditSkills,
    submitAddSkills,
    submitAddExtra,
    selectedExtra,
    setSelectedExtra,
    submitEditExtra,
    submitDelete,
    setAllKKMValue,
    submitDeleteExtra,
    submitDeleteSkills,
    deleteInfo,
    setDeleteInfo,
  } = useFormInputScoreKKM();

  return (
    <View style={styles.container}>
      <ChooseItem
        handleFilter={() => setPopUp(1)}
        handleFilterClass={() => {
          setPopUp(3);
        }}
        choosenClass={selectedClass}
        choosenDate={selectedDate}
        firstClass={firstClass}
        firstAcademic={firstAcademic}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <DropDown
          data={slide}
          dataListKnowledge={allKnowledge}
          dataListSkills={allSkills}
          dataListExtra={allExtra}
          handleEdit={(item: any) => {
            setPopUp(2);
            setSubject(item);
          }}
          handleDelete={(subjectId: any, name: any, title: any) => {
            setDeleteInfo({subjectId, name, title});
            setShow(!show);
          }}
          handleSwipeAddSkills={() => setPopUp(4)}
          handleSwipeAddExtra={() => setPopUp(5)}
          handleEditExtra={(item: any) => {
            setSelectedExtra(item);
            setPopUp(6);
          }}
          handleDeleteExtra={(subjectId: any, name: any, title: any) => {
            setPopUp(7);
            setDeleteInfo({subjectId, name, title});
            setShow(!show);
          }}
        />
      </ScrollView>
      {/* Filter Date */}
      <SwipeUp
        visible={popUp === 1 ? true : false}
        height={200}
        onClose={() => setPopUp(0)}
        children={
          <SwipeUpFilter
            handleCancel={() => setPopUp(0)}
            data={data}
            type={popUp}
            handleApplyDate={(item: any) => {
              handleDateSelected(item);
              setPopUp(0);
            }}
            selectedDate={selectedDate}
            firstAcademic={firstAcademic}
          />
        }
      />
      {/* Filter Class */}
      <SwipeUp
        visible={popUp === 3 ? true : false}
        height={200}
        onClose={() => setPopUp(0)}
        children={
          <SwipeUpFilterClass
            handleCancel={() => setPopUp(0)}
            data={getClass}
            type={popUp}
            handleApplyClass={(item: any) => {
              handleClassSelected(item);
              setPopUp(0);
            }}
            firstClass={firstClass}
            selectedClass={selectedClass}
          />
        }
      />
      {/* Edit */}
      <SwipeUp
        visible={popUp === 2 ? true : false}
        onClose={() => {
          setAllKKMValue([]);
          return setPopUp(0);
        }}
        height={200}
        children={
          <SwipeUpEdit
            handleCancel={() => setPopUp(0)}
            handleSubmit={(item: any, mcc_id: any) => {
              submitEdit(item);
              submitEditSkills(item, mcc_id);
              setAllKKMValue([]);
              setPopUp(0);
            }}
            setAllKKMValue={setAllKKMValue}
            data={subject}
            academic_year_id={selectedDate ? selectedDate : firstAcademic}
            class_id={selectedClass ? selectedClass : firstClass}
            handleCount={(item: any, value: any) => submitCount(item, value)}
            allKKMValue={allKKMValue}
          />
        }
      />
      {/* Add Skills */}
      <SwipeUp
        visible={popUp === 4 ? true : false}
        onClose={() => setPopUp(0)}
        height={200}
        children={
          <SwipeUpAddSkills
            handleCancel={() => setPopUp(0)}
            data={subject}
            setAllKKMValue={setAllKKMValue}
            academic_year_id={selectedDate ? selectedDate : firstAcademic}
            class_id={selectedClass ? selectedClass : firstClass}
            handleCount={(item: any, value: any) => submitCount(item, value)}
            allKKMValue={allKKMValue}
            handleSubmit={(item: any) => {
              submitAddSkills(item);
              setPopUp(0);
            }}
          />
        }
      />
      {/* Add Extra */}
      <SwipeUp
        visible={popUp === 5 ? true : false}
        onClose={() => setPopUp(0)}
        height={200}
        children={
          <SwipeUpAddExtra
            handleCancel={() => setPopUp(0)}
            data={subject}
            academic_year_id={selectedDate ? selectedDate : firstAcademic}
            class_id={selectedClass ? selectedClass : firstClass}
            handleSubmit={(item: any) => submitAddExtra(item)}
          />
        }
      />
      {/* Edit Extra */}
      <SwipeUp
        visible={popUp === 6 ? true : false}
        height={200}
        onClose={() => setPopUp(0)}
        children={
          <SwipeUpEditExtra
            data={selectedExtra}
            handleSubmit={(item: any) => submitEditExtra(item)}
            handleCancel={() => setPopUp(0)}
          />
        }
      />
      {/* popup delete */}
      <PopUp
        title={`Hapus KKM ${deleteInfo?.title}`}
        desc={
          <>
            Apakah Anda yakin untuk menghapus Mapel
            <Text style={styles.bold}> {deleteInfo?.name}</Text>dari daftar{' '}
            {deleteInfo?.title}?
          </>
        }
        titleCancel={'Hapus'}
        actionConfirm={() => setShow(!show)}
        actionCancel={() => {
          deleteInfo?.title === 'Ekstrakulikuler'
            ? submitDeleteExtra(deleteInfo)
            : deleteInfo?.title === 'Keterampilan'
            ? submitDeleteSkills(deleteInfo)
            : submitDelete(
                deleteInfo,
                selectedDate,
                selectedClass,
                firstAcademic,
                firstClass,
              );
        }}
        show={show}
        titleConfirm={'Batalkan'}
      />
    </View>
  );
};

export {InputScoreKKMScreen};
