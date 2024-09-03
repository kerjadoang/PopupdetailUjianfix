import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {Keys} from '@constants/keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useGetLKSReport} from '@services/lms';
import jwtDecode from 'jwt-decode';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import SoalIcon from '@assets/svg/ic24_LKS.svg';
import {Button} from '@components/atoms';
import {AvgGrade} from '@services/lms/type';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

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
  data?: any;
};

const LKSReportTab: React.FC<ILKSReportTabProps> = props => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'HistoryLKSScreen'>>();

  useEffect(() => {
    const userData = async (): Promise<IBaseJWTUser> => {
      const token = await AsyncStorage.getItem(Keys.token);
      if (token) {
        let userId: IBaseJWTUser = jwtDecode(token);
        return Promise.resolve(userId);
      }
      return Promise.reject({});
    };
    userData();
  }, []);

  const {data: lksReportData} = useGetLKSReport(
    props.data.user_id ?? '',
    props.subject?.id,
  );

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
                navigation.navigate('HistoryLKSScreen', {
                  subject: props.subject ?? {},
                  userId: props?.data.user_id,
                  token: props?.data?.access_token,
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
                  style={{
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    backgroundColor: Colors.green.light2,
                    borderRadius: 20,
                    alignSelf: 'flex-start',
                  }}>
                  <Text
                    style={{
                      color: Colors.success.base,
                      fontFamily: Fonts.RegularPoppins,
                      fontSize: 12,
                    }}>
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
                      return <ChapterMarkList data={mark} index={index + 1} />;
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
});

export default LKSReportTab;
