/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import IconRight from '@assets/svg/ic16_chevron_right.svg';
import RobotSedih from '@assets/svg/robot_sedih.svg';
import {usePTNReportScreen} from '../utils';
import {MainText, MainView} from '@components/atoms';

const CardListItem: FC<{
  type: 'ROW' | 'COLUMN';
  titleHighest: string;
  titleLowest: string;
  data: {highest: []; lowest: []};
  isHideButtonDetail?: boolean;
  historyData?: any;
  services?: string;
}> = ({
  type,
  titleHighest,
  titleLowest,
  data,
  isHideButtonDetail,
  historyData,
  services,
}) => {
  const {navigation} = usePTNReportScreen();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mata Pelajaran</Text>
      {data?.highest && data?.lowest ? (
        <>
          <Text style={[styles.text, {marginBottom: 8}]}>{titleHighest}</Text>
          {data?.highest?.map((value: any, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.number}>{index + 1}</Text>

              {type === 'ROW' ? (
                <>
                  <Text
                    style={[
                      styles.text,
                      {
                        flex: 1,
                        fontSize: 14,
                        lineHeight: 18,
                        color: Colors.dark.neutral100,
                      },
                    ]}>
                    {value?.name}
                  </Text>

                  <Text style={styles.textGrade}>{value?.point}</Text>
                </>
              ) : (
                <View style={{flex: 1}}>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontSize: 14,
                        lineHeight: 18,
                        color: Colors.dark.neutral100,
                      },
                    ]}>
                    {value?.name}
                  </Text>

                  <View style={styles.containerColumn}>
                    <View>
                      <Text style={[styles.text, {marginBottom: 8}]}>
                        Sesi Kelas
                      </Text>

                      <Text style={styles.textGrade}>
                        {value?.total_live_class}
                      </Text>
                    </View>

                    <View>
                      <Text style={[styles.text, {marginBottom: 8}]}>
                        Rekaman Kelas
                      </Text>

                      <Text style={styles.textGrade}>
                        {value?.total_record}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          ))}
          <Text style={[styles.text, {marginVertical: 8}]}>{titleLowest}</Text>
          {data?.lowest?.map((value: any, index) => (
            <View key={index} style={styles.row}>
              <Text style={styles.number}>
                {data?.highest?.length + index + 1}
              </Text>

              {type === 'ROW' ? (
                <>
                  <Text
                    style={[
                      styles.text,
                      {
                        flex: 1,
                        fontSize: 14,
                        lineHeight: 18,
                        color: Colors.dark.neutral100,
                      },
                    ]}>
                    {value?.name}
                  </Text>

                  <Text style={[styles.textGrade, {color: Colors.danger.base}]}>
                    {value?.point}
                  </Text>
                </>
              ) : (
                <View style={{flex: 1}}>
                  <Text
                    style={[
                      styles.text,
                      {
                        fontSize: 14,
                        lineHeight: 18,
                        color: Colors.dark.neutral100,
                      },
                    ]}>
                    {value?.name}
                  </Text>

                  <View style={styles.containerColumn}>
                    <View>
                      <Text style={[styles.text, {marginBottom: 8}]}>
                        Sesi Kelas
                      </Text>

                      <Text
                        style={[styles.textGrade, {color: Colors.danger.base}]}>
                        {value?.total_live_class}
                      </Text>
                    </View>

                    <View>
                      <Text style={[styles.text, {marginBottom: 8}]}>
                        Rekaman Kelas
                      </Text>

                      <Text
                        style={[styles.textGrade, {color: Colors.danger.base}]}>
                        {value?.total_record}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          ))}
          {!isHideButtonDetail ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                navigation.navigate('TryOutDetailHistoryScreen', {
                  id: historyData?.id,
                  dataHistory: historyData,
                });
              }}>
              <Text style={styles.buttonText}>Detail Try Out</Text>
              <IconRight />
            </TouchableOpacity>
          ) : null}
        </>
      ) : (
        <MainView flex={1} alignItems="center">
          <RobotSedih />

          <MainText
            type="SemiBold"
            textAlign="center"
            width={200}
            marginVertical={16}>
            Sepertinya kamu belum mencoba {services}
          </MainText>
        </MainView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 20,
    marginHorizontal: 1,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  containerColumn: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    columnGap: 74,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    marginBottom: 19,
  },
  text: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
  number: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.dark.neutral20,
    borderRadius: 14,
    alignSelf: 'flex-start',
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: Colors.white,
  },
  textGrade: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.primary.base,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 32,
    borderRadius: 20,
    marginTop: 4,
    backgroundColor: Colors.primary.light3,
  },
  buttonText: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.primary.base,
  },
});

export default CardListItem;
