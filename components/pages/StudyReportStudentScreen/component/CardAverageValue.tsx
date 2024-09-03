import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

interface IProps {
  type: string;
  title: string;
  data?: any;
}

const CardAverageValue = (props: IProps) => {
  return (
    <View style={[styles.cardContainer, styles.shadowProp]}>
      <View style={styles.subContainer}>
        <Text style={styles.titleCard}>{props?.title}</Text>
        <View style={styles.averageValueContainer}>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text style={[styles.titleCard, styles.countText]}>
              {props?.data?.average_value}
            </Text>
            <View
              style={[
                styles.chip,
                props?.data?.average_value > props?.data?.average_kkm
                  ? styles.good
                  : styles.bad,
              ]}>
              <Text
                style={[
                  styles.font,
                  props?.data?.average_value > props?.data?.average_kkm
                    ? styles.fontGood
                    : styles.fontBad,
                ]}>
                {props?.data?.average_value > props?.data?.average_kkm
                  ? 'Di Atas KKM'
                  : 'Di Bawah KKM'}
              </Text>
            </View>
          </View>
          <Text style={styles.kkmValue}>
            Nilai KKM: {props?.data?.average_kkm}
          </Text>
        </View>
        <View style={{marginTop: 12}}>
          <Text style={styles.secondaryTitle}>Nilai Tertinggi</Text>
        </View>
        <View>
          {props?.data?.highest?.map((item: any, index: any) => {
            return (
              <View key={index} style={styles.averageContainer}>
                <View style={styles.circle}>
                  <Text style={styles.number}>{index + 1}</Text>
                </View>
                <View
                  style={{
                    alignItems: 'flex-start',
                    flex: 1,
                  }}>
                  <Text style={styles.subjectTitle}>
                    {item?.title || item?.chapter || '-'}
                  </Text>
                </View>
                <View>
                  <Text style={{color: Colors.primary.base, fontWeight: '600'}}>
                    {item?.point || item?.value || '0'}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
        <View style={{marginTop: 12}}>
          <Text style={styles.secondaryTitle}>Nilai Terendah</Text>
        </View>
        <View>
          {props?.data?.lowest?.map((item: any, index: any) => {
            return (
              <View key={index} style={styles.averageContainer}>
                <View style={styles.circle}>
                  <Text style={styles.number}>{index + 1}</Text>
                </View>
                <View
                  style={{
                    alignItems: 'flex-start',
                    flex: 1,
                  }}>
                  <Text style={styles.subjectTitle}>
                    {item?.title || item?.chapter}
                  </Text>
                </View>
                <View>
                  <Text style={styles.lowestValue}>
                    {item?.point || item?.value || '0'}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export {CardAverageValue};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 10,
    marginVertical: 16,
  },
  subContainer: {
    flexDirection: 'column',
  },
  averageValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.neutral20,
    paddingBottom: 12,
  },
  button: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  buttonText: {
    color: Colors.primary.base,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    paddingRight: 12,
  },
  titleCard: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    marginBottom: 12,
  },
  countText: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.1,
    paddingRight: 8,
    marginBottom: 0,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chip: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  font: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    letterSpacing: 0.25,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  good: {
    backgroundColor: Colors.success.light2,
    borderRadius: 25,
  },
  bad: {
    backgroundColor: Colors.danger.light2,
    borderRadius: 25,
  },
  fontGood: {
    color: Colors.success.base,
  },
  fontBad: {
    color: Colors.danger.base,
  },
  secondaryTitle: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    fontWeight: '400',
    color: Colors.dark.neutral60,
    lineHeight: 16,
    letterSpacing: 0.25,
  },
  subjectTitle: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 14,
    fontWeight: '400',
    color: Colors.dark.neutral100,
    lineHeight: 18,
    letterSpacing: 0.25,
    width: '90%',
    marginLeft: 8,
  },
  averageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 7,
    alignItems: 'center',
  },
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E7EBEE',
    padding: 4,
  },
  number: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.dark.neutral60,
    lineHeight: 16,
    letterSpacing: 0.25,
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  kkmValue: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    fontWeight: '400',
    color: Colors.dark.neutral60,
    lineHeight: 16,
    letterSpacing: 0.25,
  },
  lowestValue: {color: Colors.danger.base, fontWeight: '600'},
});
