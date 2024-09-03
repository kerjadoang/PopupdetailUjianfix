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
import useTugas from './useTugas';
import Fonts from '@constants/fonts';

const Tugas = ({subject, data}: any) => {
  const {tugas}: any = useTugas(subject, data);
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
          <Text style={styles.titleFont}>Total PR, Projek & Tugas Selesai</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 4}}>
          <IconExam width={24} height={24} />
          <Text style={styles.numberExam}>{tugas?.task_done || '0'}</Text>
        </View>
        <View style={{marginVertical: 4}}>
          <Text>
            Total PR, Projek & Tugas Tidak Dikerjakan: {tugas?.task_undone}
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Pressable
            style={styles.btn}
            onPress={() =>
              navigation.navigate('HistoryTugasScreen', {
                subject: subject,
              })
            }>
            <Text style={styles.btnText}>Riwayat PR/Projek/Tugas</Text>
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
            <Text style={styles.numberExam}>{tugas?.average_value}</Text>
            <View
              style={[
                styles.chip,
                tugas?.average_value > tugas?.average_kkm
                  ? styles.good
                  : styles.bad,
              ]}>
              <Text
                style={[
                  styles.font,
                  tugas?.average_value > tugas?.average_kkm
                    ? styles.fgood
                    : styles.fbad,
                ]}>
                {tugas?.average_value > tugas?.average_kkm
                  ? 'Di Atas KKM'
                  : 'Di Bawah KKM'}
              </Text>
            </View>
          </View>

          <View>
            <Text style={styles.secondaryTitle}>
              Nilai KKM: {tugas?.average_kkm}
            </Text>
          </View>
        </View>

        <View style={{marginVertical: 12}}>
          <Text style={styles.secondaryTitle}>Nilai Tertinggi</Text>
        </View>
        <View>
          {tugas?.highest?.map((item: any, index: any) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: 4,
                  marginVertical: 7,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: Colors.neutral.neutral200,
                    padding: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 22,
                    width: 22,
                    borderRadius: 22,
                    marginRight: 8,
                  }}>
                  <Text>{index + 1}</Text>
                </View>
                <View
                  style={{
                    alignItems: 'flex-start',
                    flex: 1,
                  }}>
                  <Text style={{fontFamily: Fonts.SemiBoldPoppins}}>
                    {item.title || item.chapter}
                  </Text>
                </View>
                <View>
                  <Text style={{color: Colors.primary.base, fontWeight: '600'}}>
                    {item.point || item.value}
                  </Text>
                </View>
              </View>
            );
          })}

          {tugas?.highest === null && (
            <View
              style={{
                alignItems: 'flex-start',
                flex: 1,
              }}>
              <Text>Belum ada data</Text>
            </View>
          )}
        </View>
        <View style={{marginVertical: 12}}>
          <Text style={styles.secondaryTitle}>Nilai Terendah</Text>
        </View>
        <View>
          {tugas?.lowest?.map((item: any, index: any) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: 4,
                  marginVertical: 7,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: Colors.neutral.neutral200,
                    padding: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 22,
                    width: 22,
                    borderRadius: 22,
                    marginRight: 8,
                  }}>
                  <Text>{index + 1}</Text>
                </View>
                <View
                  style={{
                    alignItems: 'flex-start',
                    flex: 1,
                  }}>
                  <Text style={{fontFamily: Fonts.SemiBoldPoppins}}>
                    {item.title || item.chapter}
                  </Text>
                </View>
                <View>
                  <Text style={{color: Colors.danger.base, fontWeight: '600'}}>
                    {item.point || item.value}
                  </Text>
                </View>
              </View>
            );
          })}
          {tugas?.lowest === null && (
            <View
              style={{
                alignItems: 'flex-start',
                flex: 1,
              }}>
              <Text>Belum ada data</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Tugas;
