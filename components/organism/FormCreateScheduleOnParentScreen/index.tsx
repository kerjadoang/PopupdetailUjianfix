import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {Button, PopUpWithIcon, RadioButton, SwipeUp} from '@components/atoms';
import Logo from '@assets/svg/ic_logo_not_save.svg';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';
import useFormCreateSchedule from './useFormCreateSchedule';

import {FormSelect, SwipeUpContent} from './components';
import IconCalendarBlue from '@assets/svg/ic_calendar_blue.svg';
import {__formatDateTime} from './utils';

const FormCreateScheduleOnParentScreen = () => {
  const {
    modalVisible,
    setModalVisible,
    popUp,
    setPopUp,
    type,
    setType,
    subject,
    form,
    setForm,
    chapter,
    submit,

    isSubmit,
    isShowSwipeUpDatePickerSent,
    setIsShowSwipeUpDatePickerSent,
    isShowSwipeUpDatePickerFinished,
    setIsShowSwipeUpDatePickerFinished,
    valueDatePicker,
    setValueDatePicker,
    navigation,
    __handleSaveDatePicker,
  } = useFormCreateSchedule();

  const formdate = () => {
    return (
      <View>
        {type === 1 ? (
          <View style={{margin: 16}}>
            {subject?.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    setForm({...form, subject_id: item});
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={{padding: 8}}>
                    <Text>{item.name}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        ) : type === 3 ? (
          <View style={{margin: 16}}>
            {chapter?.map((item, index) => {
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    setForm({...form, chapter_id: item});
                    setModalVisible(!modalVisible);
                  }}>
                  <View style={{padding: 8}}>
                    <Text>{item.name}</Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Header
        label="Buat Jadwal Belajar"
        onPressIconLeft={() => navigation.goBack()}
      />
      <View style={styles.contentContainer}>
        <View style={styles.radioContainer}>
          <RadioButton
            type="HORIZONTAL"
            label="Kamu Buat Jadwal Untuk Apa?"
            data={[
              {
                value: 'Belajar',
                icon: (
                  <Icons name="book" color={Colors.dark.neutral50} size={24} />
                ),
              },
              {
                value: 'Latihan',
                icon: (
                  <Icons
                    name="text-box"
                    color={Colors.dark.neutral50}
                    size={24}
                  />
                ),
              },
              {
                value: 'Persiapan Ujian',
                icon: (
                  <Icons
                    name="text-account"
                    color={Colors.dark.neutral50}
                    size={24}
                  />
                ),
              },
            ]}
            onSelect={_value =>
              setForm({...form, sub_type: _value.toLowerCase()})
            }
          />
          <View style={styles.dropdownContainer}>
            <Text style={[styles.text, {fontFamily: 'Poppins-Regular'}]}>
              Mata Pelajaran
            </Text>
            <Pressable
              style={styles.dropdown}
              onPress={() => {
                setType(1);
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.text}>
                {form?.subject_id.name !== undefined
                  ? form.subject_id.name
                  : 'Pilih Mata Pelajaran'}
              </Text>
              <Icons name="chevron-down" size={24} />
            </Pressable>
            <Text style={[styles.text, {fontFamily: 'Poppins-Regular'}]}>
              BAB
            </Text>
            <Pressable
              style={styles.dropdown}
              onPress={() => {
                setType(3);
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.text}>
                {' '}
                {form?.chapter_id.name !== undefined
                  ? form.chapter_id.name
                  : 'Pilih BAB'}
              </Text>
              <Icons name="chevron-down" size={24} />
            </Pressable>
            <FormSelect
              label="Tanggal & Jam Mulai"
              selectedItem={
                form?.time_start
                  ? __formatDateTime(form?.time_start)
                  : 'Pilih Tanggal & Jam'
              }
              rightIcon={<IconCalendarBlue width={24} height={24} />}
              isValueExist={form?.time_start}
              isSubmit={isSubmit && !form?.time_start ? true : false}
              onPress={() => setIsShowSwipeUpDatePickerSent(true)}
            />
            <FormSelect
              label="Tanggal & Jam Selesai"
              selectedItem={
                form?.time_end
                  ? __formatDateTime(form?.time_end)
                  : 'Pilih Tanggal & Jam'
              }
              rightIcon={<IconCalendarBlue width={24} height={24} />}
              isValueExist={form?.time_end}
              isSubmit={isSubmit && !form?.time_end ? true : false}
              onPress={() => setIsShowSwipeUpDatePickerFinished(true)}
            />
          </View>
        </View>
      </View>
      <Button
        label="Simpan"
        bottom={10}
        style={{marginHorizontal: 10}}
        action={() => submit()}
      />

      <SwipeUp
        isSwipeLine={true}
        visible={isShowSwipeUpDatePickerSent}
        onClose={() => setIsShowSwipeUpDatePickerSent(false)}
        height={500}
        children={
          <SwipeUpContent
            title="Pilih Tanggal & Jam Mulai"
            type="DATE"
            selectedItem={valueDatePicker}
            onPress={() => __handleSaveDatePicker('SENT')}
            setSelectedItem={setValueDatePicker}
          />
        }
      />
      <SwipeUp
        isSwipeLine={true}
        visible={isShowSwipeUpDatePickerFinished}
        onClose={() => setIsShowSwipeUpDatePickerFinished(false)}
        height={500}
        children={
          <SwipeUpContent
            title="Pilih Tanggal & Jam Selesai"
            type="DATE"
            selectedItem={valueDatePicker}
            onPress={() => __handleSaveDatePicker('FINISHED')}
            setSelectedItem={setValueDatePicker}
          />
        }
      />

      {modalVisible ? (
        <SwipeUp
          height={500}
          children={formdate()}
          visible={true}
          onClose={() => setModalVisible(!modalVisible)}
        />
      ) : null}
      {popUp ? (
        <PopUpWithIcon
          twoButton
          title={'Jadwal Belum Disimpan'}
          desc={
            'Apakah kamu yakin untuk keluar? Jadwal yang dibuat belum disimpan.'
          }
          action={() => setPopUp(!popUp)}
          action_2={() => navigation.goBack()}
          textButton={'Lanjut'}
          textButton_2={'Keluar'}
          icon
          iconName={<Logo width={100} height={100} />}
        />
      ) : null}
    </ScrollView>
  );
};

export {FormCreateScheduleOnParentScreen};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    flexWrap: 'wrap',
  },
  radioContainer: {
    // width: 350,
    paddingHorizontal: 10,
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.dark.neutral10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    marginVertical: 10,
  },
  dropdownContainer: {
    marginVertical: 25,
  },
});
