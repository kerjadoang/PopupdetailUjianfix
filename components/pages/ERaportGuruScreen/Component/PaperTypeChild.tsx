import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Selected from '@assets/svg/Radio_Button_On.svg';
import UnSelected from '@assets/svg/Radio_Button_Off.svg';
import {Button} from '@components/atoms';
import {isStringContains} from '@constants/functional';

type Props = {
  key?: number;
  paperList: any;
  alertPaper: any;
  papperType: any;
  setPapperType: (value: any) => void;
  officialPaper: any;
  setOfficialPaper: (item: any) => void;
  onSimpan: () => void;
};

const PaperTypeChild = ({
  paperList,
  alertPaper,
  papperType,
  setPapperType,
  onSimpan,
}: Props) => {
  return (
    <View style={[styles.container]}>
      <Text style={styles.headerTitle}>Atur Kertas</Text>
      <Text
        style={[
          styles.title,
          {fontSize: 16, marginBottom: 0, textAlign: 'left'},
        ]}>
        Ukuran
      </Text>
      {alertPaper ? (
        <Text style={{color: Colors.danger.base}}>
          Ukuran kertas wajib diatur
        </Text>
      ) : null}

      {paperList.map((element: any, index: any) => {
        return (
          <View style={styles.item} key={index}>
            <Text
              style={
                isStringContains(papperType, element)
                  ? styles.textSelected
                  : styles.textDefault
              }>
              {element}
            </Text>
            <TouchableOpacity onPress={() => setPapperType(element)}>
              {isStringContains(papperType, element) ? (
                <Selected />
              ) : (
                <UnSelected />
              )}
            </TouchableOpacity>
          </View>
        );
      })}
      {/* untuk saat ini belum digunakan */}
      {/* <View style={[styles.item, {marginBottom: 20}]}>
        <Text style={styles.kertasDinasText}>Kertas Dinas</Text>
        <View style={[styles.item, {alignItems: 'center'}]}>
          <Text style={{marginRight: 6}}>{officialPaper ? 'Ya' : 'Tidak'}</Text>
          <Switch
            value={officialPaper}
            onValueChange={() => setOfficialPaper(!officialPaper)}
            trackColor={{
              false: Colors.dark.neutral60,
              true: Colors.success.light2,
            }}
            thumbColor={
              officialPaper ? Colors.success.base : Colors.dark.neutral20
            }
          />
        </View>
      </View> */}
      <Button label="Simpan" action={onSimpan} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  kertasDinasText: {
    fontWeight: '600',
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
    fontSize: 16,
    marginBottom: 0,
    textAlign: 'left',
    alignSelf: 'center',
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  textSelected: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.primary.base,
  },
  textDefault: {
    fontWeight: '400',
    fontSize: 16,
    fontFamily: Fonts.RegularPoppins,
    lineHeight: 24,
    color: Colors.black,
  },
});

export {PaperTypeChild};
