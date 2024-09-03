/* eslint-disable react-native/no-inline-styles */
import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SvgUri} from 'react-native-svg';
import {Button} from 'react-native-paper';

import {styles} from './style';
import Colors from '@constants/colors';
import {Keys} from '@constants/keys';
import api from '@api/index';
import Bg from '@assets/svg/bg_blue_ornament.svg';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import ChevronRight from '@assets/svg/ic_chevron_right_16x16.svg';
import IconLearnSVG from '@assets/svg/ic32_learn.svg';
import IconPracticeSVG from '@assets/svg/ic32_practice.svg';
import IconTestSVG from '@assets/svg/ic32_test.svg';
import {ProgressCircle} from '@components/atoms';
import IconClock from '@assets/svg/ic16_clock.svg';
import {BarChart} from 'react-native-chart-kit';

import {StackNavigationProp} from '@react-navigation/stack';
import {SubjectType} from '@constants/subjectType';
import {ParamList} from 'type/screen';

const WIDTH = Math.round(Dimensions.get('window').width);

const Card = ({
  LeftIcon,
  title,
  user_progress,
  subTitle,
  onPress,
}: {
  LeftIcon: any;
  title: string;
  user_progress: number;
  subTitle: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={{alignSelf: 'flex-start'}}>{LeftIcon}</View>

      <View style={{flex: 1}}>
        <Text style={[styles.textBold, styles.cardTitle]}>{title}</Text>

        <Text style={[styles.textNormal, styles.cardSubTitle]}>
          <Text
            style={[
              styles.textBold,
              {color: Colors.dark.neutral100, fontSize: 14, lineHeight: 18},
            ]}>
            {user_progress}
          </Text>{' '}
          {subTitle}
        </Text>
      </View>

      <ChevronRight />
    </TouchableOpacity>
  );
};

type Props = {
  route: any;
};

const KPRegularLaporanDetailScreen: FC<Props> = ({route}) => {
  const navigation =
    useNavigation<
      StackNavigationProp<ParamList, 'KPRegularLaporanDetailScreen'>
    >();
  const oldNavigation: any = useNavigation();
  const [report, setReport] = useState<any>(null);
  const [durationData, setDurationData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  const {
    params: {subject_id, icon_mobile, user},
  } = route;

  useEffect(() => {
    const getAllReport = async () => {
      try {
        const token = await AsyncStorage.getItem(Keys.token);
        const tokenParse = await JSON.parse(token || '');

        const response = await api.get(`/lpt/v1/report/${subject_id}`, {
          headers: {
            Authorization: `Bearer ${user?.access_token || tokenParse}`,
          },
        });

        if (response.status === 200) {
          setReport(response.data?.data || null);
        }
      } catch (err) {
        return;
      }
    };

    const getDurationReport = async () => {
      try {
        const token = await AsyncStorage.getItem(Keys.token);
        const tokenParse = await JSON.parse(token || '');
        const {
          status,
          data: {data},
        } = await api.get(`/lpt/v1/duration/report/${subject_id}/KP_REGULER`, {
          headers: {
            Authorization: `Bearer ${user?.access_token || tokenParse}`,
          },
        });

        if (status === 200) {
          setDurationData(data);
        }

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };

    getAllReport();
    getDurationReport();
  }, [subject_id, user?.access_token]);

  const __parseDurationDataToChart = useCallback(() => {
    return durationData?.total_per_day?.reduce(
      (prev: any, curr: any) => {
        prev.labels.push(curr?.day);
        prev.datasets[0].data.push(curr?.hour);
        return prev;
      },
      {
        labels: [],
        datasets: [{data: []}],
      },
    );
  }, [durationData?.total_per_day]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.primary.base,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={{height: 297 * 0.31}}>
          <Bg width={'100%'} height={297} style={{position: 'absolute'}} />

          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconArrowLeftWhite />
            </TouchableOpacity>

            <View style={{flex: 1, alignItems: 'center'}}>
              <Text style={[styles.textBold, styles.headerTextTitle]}>
                Laporan Belajar
              </Text>

              <Text style={[styles.textNormal, styles.headerTextSubTitle]}>
                Kelas Pintar Regular
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.bodySectionFirst}>
            <ProgressCircle
              progress={report?.total_progress_percentage}
              size={64}
              strokeWidth={6}
              color={Colors.primary.base}
              children={<SvgUri uri={icon_mobile} width={32} height={32} />}
            />

            <View>
              <Text style={[styles.textBold, styles.bodySectionFirstTextTitle]}>
                {report?.subject?.name}
              </Text>

              <Text
                style={[styles.textBold, styles.bodySectionFirstTextSubTitle]}>
                {report?.total_chapter} Bab {'\u2022'} Progres:{' '}
                {report?.total_progress_percentage}%
              </Text>
            </View>
          </View>

          <View style={styles.bodySectionSecond}>
            <Card
              LeftIcon={<IconLearnSVG />}
              title="Learn"
              user_progress={report?.total_history?.learn?.user_progress}
              subTitle={`dari ${report?.total_history?.learn?.total_materi} materi dipelajari`}
              onPress={() =>
                navigation.navigate('ChapterKPRegularScreen', {
                  ...report?.subject,
                  subject_type: SubjectType?.KPRegular.Learn,
                })
              }
            />

            <View style={styles.lineHorizontal} />

            <Card
              LeftIcon={<IconPracticeSVG />}
              title="Practice"
              user_progress={report?.total_history?.practice?.user_progress}
              subTitle={`dari ${report?.total_history?.practice?.total_materi} materi latihan dikerjakan`}
              onPress={() =>
                navigation.navigate('ChapterKPRegularScreen', {
                  ...report?.subject,
                  subject_type: SubjectType?.KPRegular?.Practice,
                })
              }
            />

            <View style={styles.lineHorizontal} />

            <Card
              LeftIcon={<IconTestSVG />}
              title="Test"
              user_progress={report?.total_history?.test?.user_progress}
              subTitle={`dari ${report?.total_history?.test?.total_materi} materi ujian dikerjakan`}
              onPress={() =>
                navigation.navigate('ChapterKPRegularScreen', {
                  ...report?.subject,
                  subject_type: SubjectType?.KPRegular.Test,
                })
              }
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 16,
              }}>
              <View>
                <Text style={[styles.textNormal, styles.bodyTextAverage]}>
                  {'Rata-rata Nilai\nTes Adaptif'}
                </Text>

                <Text style={[styles.textBold, styles.bodyTextAverageNumber]}>
                  {report?.average_test?.find(
                    (value: any) => value?.test_name === 'Test Adaptif',
                  )?.average || 0}
                </Text>
              </View>

              <View>
                <Text style={[styles.textNormal, styles.bodyTextAverage]}>
                  {'Rata-rata Nilai\nTes Soal Pilihan Ganda'}
                </Text>

                <Text style={[styles.textBold, styles.bodyTextAverageNumber]}>
                  {report?.average_test?.find(
                    (value: any) => value?.test_name === 'Soal Pilihan Ganda',
                  )?.average || 0}
                </Text>
              </View>
            </View>

            <Button
              onPress={() =>
                oldNavigation.navigate('KPRegularHistoryScoreScreen', {
                  report,
                  user,
                })
              }
              labelStyle={[
                styles.textBold,
                {color: Colors.primary.base, fontSize: 14},
              ]}
              icon="chevron-right"
              contentStyle={{flexDirection: 'row-reverse'}}
              style={{alignSelf: 'center'}}
              buttonColor={Colors.primary.light3}>
              Riwayat Nilai Test
            </Button>
          </View>

          <View style={[{marginTop: 16}, styles.bodySectionSecond]}>
            <View style={{gap: 8, alignItems: 'center', flexDirection: 'row'}}>
              <IconClock width={24} height={24} />

              <Text
                style={[
                  styles.textBold,
                  {
                    fontSize: 14,
                    lineHeight: 18,
                    letterSpacing: 0.25,
                    color: Colors.dark.neutral100,
                  },
                ]}>
                Durasi Belajar
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 12,
                marginBottom: 15,
              }}>
              <View>
                <Text
                  style={[styles.textNormal, {color: Colors.dark.neutral60}]}>
                  Total
                </Text>

                <Text
                  style={[
                    styles.textBold,
                    {color: Colors.dark.neutral100, marginLeft: 0},
                  ]}>
                  {`${durationData?.total?.hour ?? 0} Jam ${
                    durationData?.total?.minute ?? 0
                  } Menit`}
                </Text>
              </View>

              <View>
                <Text
                  style={[styles.textNormal, {color: Colors.dark.neutral60}]}>
                  Total Minggu Ini
                </Text>

                <Text
                  style={[
                    styles.textBold,
                    {color: Colors.dark.neutral100, marginLeft: 0},
                  ]}>
                  {`${durationData?.total_per_week?.hour ?? 0} Jam ${
                    durationData?.total_per_week?.minute ?? 0
                  } Menit`}
                </Text>
              </View>
            </View>

            <Text style={[styles.textNormal, {color: Colors.dark.neutral60}]}>
              Grafik Minggu ini
            </Text>

            {isLoading ? null : (
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                <BarChart
                  width={WIDTH}
                  height={220}
                  showBarTops={false}
                  fromZero={true}
                  yAxisLabel=""
                  yAxisSuffix="j"
                  chartConfig={{
                    barRadius: 3,
                    barPercentage: 0.6,
                    fillShadowGradientFromOpacity: 1,
                    fillShadowGradientToOpacity: 1,
                    backgroundGradientFrom: Colors.white,
                    backgroundGradientTo: Colors.white,
                    color: () => Colors.primary.base,
                    labelColor: () => Colors.dark.neutral60,
                    decimalPlaces: 0,
                    propsForLabels: {
                      fontSize: 14,
                      fontFamily: 'Poppins-Regular',
                    },
                    propsForHorizontalLabels: {
                      dx: WIDTH + 6,
                    },
                    propsForBackgroundLines: {
                      stroke: Colors.dark.neutral20,
                    },
                  }}
                  style={{
                    marginTop: 12,
                    paddingRight: 7,
                  }}
                  data={__parseDurationDataToChart()}
                />
              </ScrollView>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export {KPRegularLaporanDetailScreen};
