/* eslint-disable react-native/no-inline-styles */
import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from './style';
import IconExam from '@assets/svg/icon_exam.svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '@constants/colors';
import {useNavigation} from '@react-navigation/native';
import {ParamList} from 'type/screen';
import {StackNavigationProp} from '@react-navigation/stack';
import useExam from './useExam';

const Exam = ({subject}) => {
  const {getMapelExamValue}: any = useExam(subject);
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'HistoryExamScreen'>>();

  return (
    <View style={[styles.container, styles.basePadding]}>
      {/* Total Ulangan */}
      <View
        style={[
          styles.card,
          styles.shadowProp,
          styles.basePadding,
          {marginBottom: 16},
        ]}>
        <View style={{marginBottom: 12}}>
          <Text style={styles.titleFont}>Total Ulangan/Ujian Selesai</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
          <IconExam width={24} height={24} />
          <Text style={styles.numberExam}>
            {getMapelExamValue?.data?.data?.total_exam} Ujian
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Pressable
            style={styles.btn}
            onPress={() =>
              navigation.navigate('HistoryExamScreen', {
                subject: subject,
              })
            }>
            <Text style={styles.btnText}>Riwayat Ujian</Text>
            <Icon name="chevron-right" size={12} color={Colors.primary.base} />
          </Pressable>
        </View>
      </View>
      {/* Nilai rerata Ulangan */}
      <View style={[styles.card, styles.shadowProp, styles.basePadding]}>
        <View style={{marginBottom: 12}}>
          <Text style={styles.titleFont}>Rata-rata Nilai</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 4,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <Text style={styles.numberExam}>
              {getMapelExamValue?.data?.data?.average_value}
            </Text>
            <View
              style={[
                styles.chip,
                getMapelExamValue?.data?.data?.average_value >
                getMapelExamValue?.data?.data?.average_kkm
                  ? styles.good
                  : styles.bad,
              ]}>
              <Text
                style={[
                  styles.font,
                  getMapelExamValue?.data?.data?.average_value >
                  getMapelExamValue?.data?.data?.average_kkm
                    ? styles.fgood
                    : styles.fbad,
                ]}>
                {getMapelExamValue?.data?.data?.average_value >
                getMapelExamValue?.data?.data?.average_kkm
                  ? 'Di Atas KKM'
                  : 'Di Bawah KKM'}
              </Text>
            </View>
          </View>

          <View>
            <Text style={styles.secondaryTitle}>
              Nilai KKM: {getMapelExamValue?.data?.data?.average_kkm}
            </Text>
          </View>
        </View>

        <View style={{marginVertical: 12}}>
          <Text style={styles.secondaryTitle}>Nilai Tertinggi</Text>
        </View>
        <View>
          {getMapelExamValue?.data?.data?.highest?.map(
            (item: any, index: any) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 4,
                    marginVertical: 7,
                  }}>
                  <View>
                    <Text>{index + 1}</Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'flex-start',
                      flex: 1,
                    }}>
                    <Text>{item.title}</Text>
                  </View>
                  <View>
                    <Text
                      style={{color: Colors.primary.base, fontWeight: '600'}}>
                      {item.point}
                    </Text>
                  </View>
                </View>
              );
            },
          )}

          {getMapelExamValue?.data?.data?.highest === null && (
            <View
              style={{
                alignItems: 'flex-start',
                flex: 1,
              }}>
              <Text>[NULL]</Text>
            </View>
          )}
        </View>
        <View style={{marginVertical: 12}}>
          <Text style={styles.secondaryTitle}>Nilai Terendah</Text>
        </View>
        <View>
          {getMapelExamValue?.data?.data?.lowest?.map(
            (item: any, index: any) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 4,
                    marginVertical: 7,
                  }}>
                  <View>
                    <Text>{index + 1}</Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'flex-start',
                      flex: 1,
                    }}>
                    <Text>{item.title}</Text>
                  </View>
                  <View>
                    <Text
                      style={{color: Colors.primary.base, fontWeight: '600'}}>
                      {item.point}
                    </Text>
                  </View>
                </View>
              );
            },
          )}
          {getMapelExamValue?.data?.data?.lowest === null && (
            <View
              style={{
                alignItems: 'flex-start',
                flex: 1,
              }}>
              <Text>[LOWEST NULL]</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Exam;
