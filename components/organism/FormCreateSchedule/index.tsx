import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import {Button, DateTimePicker, RadioButton, SwipeUp} from '@components/atoms';
import Logo from '@assets/svg/ic_logo_not_save.svg';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';
import {PopUpWithIcon} from '@components/atoms/PopUpWithIcon';
import useFormCreateSchedule from './useFormCreateSchedule';
import dayjs from 'dayjs';

const FormCreateSchedule = () => {
  const {
    modalVisible,
    setModalVisible,
    popUp,
    setPopUp,
    type,
    setType,
    startDate,
    setStarDate,
    endDate,
    setEndDate,
    subject,
    form,
    setForm,
    chapter,
    generateDate,
    submit,
    navigation,
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
        ) : type === 2 ? (
          <View>
            <DateTimePicker
              selected={startDate}
              onChange={setStarDate}
              generateDate={generateDate()}
            />
            <View style={{marginVertical: 16}}>
              <Button
                label="Pilih"
                bottom={10}
                style={{marginHorizontal: 10}}
                action={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        ) : type === 4 ? (
          <View>
            <DateTimePicker
              selected={endDate}
              onChange={setEndDate}
              generateDate={generateDate()}
            />
            <View style={{marginVertical: 16}}>
              <Button
                label="Pilih"
                bottom={10}
                style={{marginHorizontal: 10}}
                action={() => setModalVisible(!modalVisible)}
              />
            </View>
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
            <Text style={[styles.text, {fontFamily: 'Poppins-Regular'}]}>
              Tanggal & Jam Mulai
            </Text>
            <Pressable
              style={styles.dropdown}
              onPress={() => {
                setType(2);
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.text}>
                {form?.time_start !== ''
                  ? dayjs(form?.time_start).format('dd, DD/MM/YY HH:mm')
                  : 'Pilih Tanggal & Jam Mulai'}
              </Text>
              <Icons name="calendar-week" size={24} />
            </Pressable>
            <Text style={[styles.text, {fontFamily: 'Poppins-Regular'}]}>
              Tanggal & Jam Selesai
            </Text>
            <Pressable
              style={styles.dropdown}
              onPress={() => {
                setType(4);
                setModalVisible(!modalVisible);
              }}>
              <Text style={styles.text}>
                {form?.time_finish !== ''
                  ? dayjs(form?.time_finish).format('dd, DD/MM/YY HH:mm')
                  : 'Pilih Tanggal & Jam Selesai'}
              </Text>
              <Icons name="calendar-week" size={24} />
            </Pressable>
          </View>
        </View>
      </View>
      <Button
        label="Simpan"
        bottom={10}
        style={{marginHorizontal: 10}}
        action={() => submit()}
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

export default FormCreateSchedule;

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
