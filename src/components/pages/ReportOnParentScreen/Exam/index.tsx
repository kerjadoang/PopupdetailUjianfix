/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {styles} from './style';
import IconExam from '@assets/svg/icon_exam.svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '@constants/colors';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {ParamList} from 'type/screen';
import {StackNavigationProp} from '@react-navigation/stack';
import apiWithoutToken from '@api/withoutToken';
import {IStudentReportExamBySubject} from 'type/student-report-exam-by-subject';
import Fonts from '@constants/fonts';

const Exam = ({subject, data}: any) => {
  const isFocus = useIsFocused();
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'ReportOnParentScreen'>>();
  const [exam, setExam] = useState<IStudentReportExamBySubject>();

  const fetchExam = async () => {
    apiWithoutToken
      .get(`/lms/v1/student-report/exam?subject=${subject?.id}`, {
        headers: {
          Authorization: `Bearer ${data?.access_token}`,
        },
      })
      .then(response => {
        setExam(response?.data?.data);
      });
  };

  useEffect(() => {
    fetchExam();
  }, [isFocus]);

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
          <Text style={styles.numberExam}>{exam?.total_exam} Ujian</Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Pressable
            style={styles.btn}
            onPress={() =>
              navigation.navigate('HistoryExamScreenParent', {
                subject: subject,
                data: data,
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
            <Text style={styles.numberExam}>{exam?.average_value}</Text>
            <View
              style={[
                styles.chip,
                (exam?.average_value || 0) > (exam?.average_kkm || 0)
                  ? styles.good
                  : styles.bad,
              ]}>
              <Text
                style={[
                  styles.font,
                  (exam?.average_value || 0) > (exam?.average_kkm || 0)
                    ? styles.fgood
                    : styles.fbad,
                ]}>
                {(exam?.average_value || 0) > (exam?.average_kkm || 0)
                  ? 'Di Atas KKM'
                  : 'Di Bawah KKM'}
              </Text>
            </View>
          </View>

          <View>
            <Text style={styles.secondaryTitle}>
              Nilai KKM: {exam?.average_kkm}
            </Text>
          </View>
        </View>

        <View style={{marginVertical: 12}}>
          <Text style={styles.secondaryTitle}>Nilai Tertinggi</Text>
        </View>
        <View>
          {exam?.highest?.map((item: any, index: any) => {
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
                    {item.title}
                  </Text>
                </View>
                <View>
                  <Text style={{color: Colors.primary.base, fontWeight: '600'}}>
                    {item.point}
                  </Text>
                </View>
              </View>
            );
          })}

          {exam?.highest === null && (
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
          {exam?.lowest?.map((item: any, index: any) => {
            return (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  gap: 4,
                  marginVertical: 7,
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
                  }}>
                  <Text>{index + 1}</Text>
                </View>
                <View
                  style={{
                    alignItems: 'flex-start',
                    flex: 1,
                  }}>
                  <Text style={{fontFamily: Fonts.SemiBoldPoppins}}>
                    {item.title}
                  </Text>
                </View>
                <View>
                  <Text style={{color: Colors.primary.base, fontWeight: '600'}}>
                    {item.point}
                  </Text>
                </View>
              </View>
            );
          })}
          {exam?.lowest === null && (
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

export default Exam;
