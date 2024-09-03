import {Header} from '@components/atoms';
import Colors from '@constants/colors';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useLayoutEffect} from 'react';
import {View, Text, StyleSheet, Pressable, PressableProps} from 'react-native';
import {List} from 'react-native-paper';
import ChevronDown from '@assets/svg/blue_arrow_down.svg';
import ChevronUp from '@assets/svg/blueArrowUp.svg';
import ChevronRight from '@assets/svg/ic16_chevron_right.svg';
import {IHistoryLKSReportResponseData} from '@services/lms/type';
import Fonts from '@constants/fonts';
import dayjs from 'dayjs';
import {useGetLKSHistoryReport} from '@services/lms';

type HistoryItemProps = {
  data: IHistoryLKSReportResponseData;
  onPress?: PressableProps['onPress'];
  tokenAnak?: string;
  navigation?: StackNavigationProp<ParamList, 'HistoryLKSScreen'>;
};

const HistoryItem: React.FC<HistoryItemProps> = props => {
  return (
    <List.Accordion
      title={
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 14,
              color: Colors.dark.neutral100,
            }}>
            {props.data.chapter_name ?? 'Nama Chapter'}
          </Text>
        </View>
      }
      right={props => (props.isExpanded ? <ChevronUp /> : <ChevronDown />)}
      style={{backgroundColor: Colors.white}}>
      {props.data?.list?.map(listItem => {
        return (
          <Pressable
            onPress={() =>
              props.navigation?.navigate('ExplanationScreen', {
                isFromHistoryLks: true,
                historyId: listItem.id,
                tokenAnak: props.tokenAnak,
              })
            }
            style={{paddingVertical: 8, paddingHorizontal: 10}}>
            <View
              style={{
                borderRadius: 10,
                elevation: 4,
                backgroundColor: Colors.white,
                paddingHorizontal: 16,
                paddingVertical: 12,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
              }}>
              <View style={{gap: 4, flexGrow: 1}}>
                {listItem.created_at && (
                  <Text
                    style={{
                      fontFamily: Fonts.RegularPoppins,
                      fontSize: 11,
                      color: Colors.dark.neutral60,
                    }}>
                    {dayjs
                      .tz(listItem.created_at, 'Asia/Jakarta')
                      .locale('id')
                      .format('DD MMM YYYY')}
                  </Text>
                )}
                <View>
                  <Text
                    style={{
                      fontFamily: Fonts.SemiBoldPoppins,
                      color: Colors.dark.neutral100,
                      fontSize: 14,
                    }}>
                    {listItem.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.RegularPoppins,
                      color: Colors.dark.neutral60,
                      fontSize: 14,
                    }}>
                    {listItem.correct_answer} Benar • {listItem.wrong_answer}{' '}
                    Salah • {listItem.pass_answer} Dilewati
                  </Text>
                  <Text
                    style={{
                      fontFamily: Fonts.RegularPoppins,
                      color: Colors.dark.neutral60,
                      fontSize: 14,
                    }}>
                    Durasi Pengerjaan: {listItem.duration} menit
                  </Text>
                </View>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: Fonts.SemiBoldPoppins,
                    color: Colors.dark.neutral60,
                    fontSize: 14,
                    textAlign: 'center',
                  }}>
                  Nilai
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.SemiBoldPoppins,
                    color: Colors.primary.base,
                    fontSize: 20,
                    textAlign: 'center',
                  }}>
                  {listItem.point}
                </Text>
              </View>
              <ChevronRight />
            </View>
          </Pressable>
        );
      })}
    </List.Accordion>
  );
};

const HistoryLKSScreen: React.FC = () => {
  const navigation =
    useNavigation<StackNavigationProp<ParamList, 'HistoryLKSScreen'>>();
  const route = useRoute<RouteProp<ParamList, 'HistoryLKSScreen'>>();

  const {subject, userId, token} = route.params;

  const {data: lksHistoryReport} = useGetLKSHistoryReport(userId, subject.id);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <Header
          label={'Riwayat Nilai LKS'}
          subLabel={subject?.name ?? 'Mata Pelajaran'}
        />
      ),
    });
  }, []);

  return (
    <View style={styles.container}>
      {lksHistoryReport?.data?.map(itemHistory => {
        return (
          <HistoryItem
            data={itemHistory}
            navigation={navigation}
            tokenAnak={token}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});

export default HistoryLKSScreen;
