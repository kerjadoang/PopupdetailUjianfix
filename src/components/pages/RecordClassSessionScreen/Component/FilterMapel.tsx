/* eslint-disable react/no-unstable-nested-components */
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import useFormRecordClassSession from '../useFormRecordClassSession';
import {FlatList} from 'react-native-gesture-handler';

const FilterMapel = () => {
  const {getSubjectsByUserClass} = useFormRecordClassSession();

  const Label = ({item}: any) => {
    return (
      <Pressable key={item.id}>
        <Text style={styles.labelText}>{item.name}</Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter</Text>
      <View style={styles.row}>
        <Text style={styles.subtitle}>Title</Text>
        <Pressable>
          <Text style={[styles.subtitle, {color: Colors.primary.base}]}>
            Pilih Semua
          </Text>
        </Pressable>
      </View>
      <View style={styles.containerList}>
        <FlatList
          numColumns={2}
          contentContainerStyle={styles.container}
          data={getSubjectsByUserClass.data}
          renderItem={Label}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={styles.btnContainer}>
        <Pressable style={styles.btnDisable}>
          <Text style={styles.btnText}>Atur Ulang</Text>
        </Pressable>
        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>Terapkan</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    padding: 16,
  },
  title: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    textAlign: 'center',
    color: Colors.black,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subtitle: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral60,
  },
  btnContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    width: '100%',
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },
  btn: {
    backgroundColor: Colors.primary.base,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '45%',
  },
  btnText: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.white,
    textAlign: 'center',
  },
  btnDisable: {
    borderWidth: 2,
    borderColor: Colors.dark.neutral60,
    backgroundColor: Colors.white,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '45%',
  },
  btnTextDisable: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.dark.neutral60,
    textAlign: 'center',
  },
  containerList: {
    height: '80%',
  },
  labelText: {
    margin: 5,
    backgroundColor: Colors.primary.light3,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
    textAlign: 'center',
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    color: Colors.primary.base,
  },
  labelTextActive: {
    margin: 5,
    backgroundColor: Colors.primary.base,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
    textAlign: 'center',
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
    color: Colors.primary.light3,
  },
});

export default FilterMapel;
