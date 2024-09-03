import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {useGetLKSReport} from '@services/lms';
import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import SoalIcon from '@assets/svg/ic24_LKS.svg';
import {Button} from '@components/atoms';
import {AvgGrade} from '@services/lms/type';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';

type ChapterMarkListProps = {
  data: AvgGrade;
  index: number;
  pointColor?: string;
};

const ChapterMarkList: React.FC<ChapterMarkListProps> = props => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: Colors.dark.neutral20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: Fonts.SemiBoldPoppins,
            fontSize: 12,
            color: Colors.dark.neutral60,
          }}>
          {props.index}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: Fonts.RegularPoppins,
          color: Colors.dark.neutral100,
          fontSize: 14,
          flexGrow: 1,
        }}>
        {props.data.chapter_name}
      </Text>
      <Text
        style={{
          fontFamily: Fonts.SemiBoldPoppins,
          color: props.pointColor ?? Colors.primary.base,
          fontSize: 14,
        }}>
        {props.data.poin}
      </Text>
    </View>
  );
};

type ILKSReportTabProps = {
  subject?: IBaseSubject;
  navigation: StackNavigationProp<ParamList, 'StudyReportStudentScreen'>;
  route: RouteProp<ParamList, 'StudyReportStudentScreen'>;
};

const LKSReportTab: React.FC<ILKSReportTabProps> = props => {
  const {getUser} = useSelector((state: RootState) => state);
  const student_id = props?.route?.params?.student?.id ?? getUser?.data?.id;
  const {data: lksReportData} = useGetLKSReport(student_id, props.subject?.id);

  const returnStyleKKM = (background?: boolean) => {
    switch (lksReportData?.data?.label_avg) {
      case 'Di Atas KKM':
        return background ? styles.kkmSuccesBg : styles.kkmSuccesText;
      case 'Di Bawah KKM':
        return background ? styles.kkmFailedBg : styles.kkmFailedText;
      case 'KKM Belum Di Atur':
        return background ? styles.kkmNotSetBg : styles.kkmNotSetText;
      default:
        return {};
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{gap: 8}}>
        <View style={{padding: 10}}>
          <View
            style={{
              padding: 16,
              backgroundColor: Colors.white,
              borderRadius: 10,
              elevation: 4,
              gap: 12,
            }}>
            <Text
              style={{
                fontFamily: Fonts.SemiBoldPoppins,
                fontSize: 14,
                color: Colors.dark.neutral100,
              }}>
              Total Soal Selesai
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 14}}>
              <SoalIcon />
              <Text
                style={{
                  fontFamily: Fonts.SemiBoldPoppins,
                  color: Colors.dark.neutral100,
                  fontSize: 18,
                }}>
                {lksReportData?.data?.total_lks} Soal
              </Text>
            </View>
            <Button
              background={Colors.primary.light3}
              label="Riwayat Nilai LKS"
              color={Colors.primary.base}
              action={() =>
                props.navigation.navigate('HistoryLKSScreen', {
                  subject: props.subject ?? {},
                  userId: student_id,
                })
              }
              style={{
                alignSelf: 'center',
                paddingHorizontal: 16,
                paddingVertical: 5,
              }}
            />
          </View>
        </View>

        <View style={{padding: 10}}>
          <View
            style={{
              padding: 16,
              backgroundColor: Colors.white,
              borderRadius: 10,
              elevation: 4,
              gap: 12,
            }}>
            <Text
              style={{
                fontFamily: Fonts.SemiBoldPoppins,
                fontSize: 14,
                color: Colors.dark.neutral100,
              }}>
              Rata-rata Nilai
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <Text
                style={{
                  fontFamily: Fonts.SemiBoldPoppins,
                  fontSize: 18,
                  color: Colors.dark.neutral100,
                }}>
                {lksReportData?.data?.total_avg}
              </Text>
              <View style={{flexGrow: 1}}>
                <View
                  style={[
                    {
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 20,
                      alignSelf: 'flex-start',
                    },
                    returnStyleKKM(true),
                  ]}>
                  <Text
                    style={[
                      {
                        fontFamily: Fonts.RegularPoppins,
                        fontSize: 12,
                      },
                      returnStyleKKM(),
                    ]}>
                    {lksReportData?.data?.label_avg}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontFamily: Fonts.RegularPoppins,
                  fontSize: 12,
                  color: Colors.dark.neutral60,
                }}>
                Nilai KKM: {lksReportData?.data?.kkm}
              </Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: Colors.dark.neutral20,
                flexGrow: 1,
              }}
            />
            <View style={{gap: 8}}>
              {lksReportData?.data?.avg_tertinggi &&
                lksReportData.data?.avg_tertinggi?.length > 0 && (
                  <>
                    <Text
                      style={{
                        fontFamily: Fonts.RegularPoppins,
                        color: Colors.dark.neutral60,
                        fontSize: 12,
                      }}>
                      Nilai Tertinggi
                    </Text>
                    {lksReportData?.data?.avg_tertinggi?.map((mark, index) => {
                      return (
                        <ChapterMarkList
                          key={index}
                          data={mark}
                          index={index + 1}
                        />
                      );
                    })}
                  </>
                )}
              {lksReportData?.data?.avg_terendah &&
                lksReportData.data?.avg_terendah?.length > 0 && (
                  <>
                    <Text
                      style={{
                        fontFamily: Fonts.RegularPoppins,
                        color: Colors.dark.neutral60,
                        fontSize: 12,
                      }}>
                      Nilai Terendah
                    </Text>
                    {lksReportData?.data?.avg_terendah?.map((mark, index) => {
                      return (
                        <ChapterMarkList
                          data={mark}
                          key={index}
                          index={index + 1}
                          pointColor={Colors.danger.base}
                        />
                      );
                    })}
                  </>
                )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
  },
  kkmSuccesText: {
    color: Colors.success.base,
  },
  kkmSuccesBg: {
    backgroundColor: Colors.green.light2,
  },
  kkmFailedBg: {
    backgroundColor: Colors.danger.light2,
  },
  kkmFailedText: {
    color: Colors.danger.base,
  },
  kkmNotSetBg: {
    backgroundColor: Colors.bookmark.light2,
  },
  kkmNotSetText: {
    color: Colors.bookmark.dark1,
  },
});

export default LKSReportTab;
