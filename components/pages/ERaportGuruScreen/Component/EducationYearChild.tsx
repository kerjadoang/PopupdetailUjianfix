import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Selected from '@assets/svg/Radio_Button_On.svg';
import UnSelected from '@assets/svg/Radio_Button_Off.svg';

type Props = {
  key?: number;
  data: any[];
  year: any;
  yearId: any;
  onPress: (item: any) => void;
};

const EducationYearChild = ({data, year, yearId, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Pilih Tahun Ajaran</Text>
        {data?.map((item: any) => {
          return (
            <View style={styles.item} key={item.id}>
              <Text
                style={
                  year === item.years || yearId === item.id
                    ? styles.textSelected
                    : styles.textDefault
                }>
                {item.years}
              </Text>
              <TouchableOpacity onPress={() => onPress(item)}>
                {year === item.years || yearId === item.id ? (
                  <Selected />
                ) : (
                  <UnSelected />
                )}
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
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

export {EducationYearChild};
