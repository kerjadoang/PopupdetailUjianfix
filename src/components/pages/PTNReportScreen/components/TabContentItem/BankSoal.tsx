/* eslint-disable react-native/no-inline-styles */
import React, {FC, useLayoutEffect, useState} from 'react';
import dayjs from 'dayjs';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {BarChart} from 'react-native-chart-kit-with-pressable-bar-graph';

import Fonts from '@constants/fonts';
import Colors from '@constants/colors';
import api from '@api/index';
import {usePTNReportScreen, WIDTH} from '../../utils';
import {CardListItem} from '../';
import apiWithoutToken from '@api/withoutToken';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import ImproveYourSkillsCard from '@components/pages/TryOutDetailHistoryScreen/component/ImproveYourSkillsCard';
import {useNavigation} from '@react-navigation/native';
import IconPencil from '@assets/svg/ic32_practice.svg';
import IconChevronRight from '@assets/svg/ic16_chevron_right.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import useDiagnoticTestResult from '@components/pages/DiagnoticTestResultScreen/useDiagnoticTestResult';

const BankSoal: FC<{
  valueFilterTryOut: any;
  valueFilterMapel: any;
  isFromParent: boolean;
  data: any;
}> = ({valueFilterTryOut, valueFilterMapel, isFromParent, data}) => {
  const navigation: any = useNavigation();
  const {checkHasDoneMinatBakat} = useDiagnoticTestResult();
  const {ptnStore} = usePTNReportScreen();
  const [summaryPoint, setSummaryPoint] = useState<any>(null);
  const [tryOutDate, setTryOutDate] = useState<any>(null);
  const [graph, setGraph] = useState<any>(null);

  const handleChartWidth = () => {
    const multiplier = graph?.length * 0.2;
    if (graph?.length <= 5) {
      return WIDTH;
    }

    return WIDTH * multiplier || WIDTH;
  };

  useLayoutEffect(() => {
    const __getTryOutDate = async () => {
      try {
        let response = await api.get('ptn_soal/v1/report/list-tryout');

        if (ptnStore?.user?.access_token) {
          response = await apiWithoutToken.get(
            'ptn_soal/v1/report/list-tryout',
            {
              headers: {
                Authorization: `Bearer ${ptnStore?.user?.access_token}`,
              },
            },
          );
        }

        const {
          status,
          data: {data},
        } = response;

        if (status === 200) {
          const res = data?.find(
            (value: any) => value?.id === valueFilterTryOut,
          );

          const register_date_start = res?.register_date_start;
          const time_start = res?.time_start;

          if (register_date_start && time_start) {
            setTryOutDate({
              startRegistrasi: dayjs(register_date_start).format('YYYY-MM-DD'),
              startTryout: dayjs(time_start).format('YYYY-MM-DD'),
            });
          }
        }
      } catch (_) {}
    };

    __getTryOutDate();
  }, [ptnStore?.user?.access_token, valueFilterTryOut]);

  useLayoutEffect(() => {
    const __getGraph = async () => {
      try {
        let response = await api.get(
          `ptn_soal/v1/report/graph?startRegistrasi=${tryOutDate?.startRegistrasi}&startTryout=${tryOutDate?.startTryout}&module=${valueFilterMapel}`,
        );

        if (ptnStore?.user?.access_token) {
          response = await apiWithoutToken.get(
            `ptn_soal/v1/report/graph?startRegistrasi=${tryOutDate?.startRegistrasi}&startTryout=${tryOutDate?.startTryout}&module=${valueFilterMapel}`,
            {
              headers: {
                Authorization: `Bearer ${ptnStore?.user?.access_token}`,
              },
            },
          );
        }

        const {
          status,
          data: {data},
        } = response;

        if (status === 200) {
          setGraph(data);
        }
      } catch (_) {}
    };

    __getGraph();
  }, [ptnStore?.user?.access_token, tryOutDate, valueFilterMapel]);

  useLayoutEffect(() => {
    const __getSummaryTotal = async () => {
      try {
        let response = await api.get(
          `ptn_soal/v1/report/summary-point?module=${valueFilterMapel}&startTryout=${tryOutDate?.startTryout}&startRegistrasi=${tryOutDate?.startRegistrasi}`,
        );

        if (ptnStore?.user?.access_token) {
          response = await apiWithoutToken.get(
            `ptn_soal/v1/report/summary-point?module=${valueFilterMapel}&startTryout=${tryOutDate?.startTryout}&startRegistrasi=${tryOutDate?.startRegistrasi}`,
            {
              headers: {
                Authorization: `Bearer ${ptnStore?.user?.access_token}`,
              },
            },
          );
        }

        const {
          status,
          data: {data},
        } = response;

        if (status === 200) {
          setSummaryPoint(data);
        }
      } catch (_) {}
    };

    __getSummaryTotal();
  }, [ptnStore?.user?.access_token, tryOutDate, valueFilterMapel]);

  const chartData = {
    labels: graph?.length
      ? graph?.map((value: any) => value?.name?.substring(0, 10 - 3) + '...')
      : [],
    datasets: [
      {
        data: graph?.length ? graph?.map((value: any) => value?.point) : [],
      },
    ],
  };

  return (
    <>
      <CardListItem
        type="ROW"
        titleHighest="Nilai Rata - Rata Tertinggi"
        titleLowest="Nilai Rata - Rata Terendah"
        data={summaryPoint!}
        isHideButtonDetail={true}
        services="Bank Soal"
      />

      <View style={[styles.card, {marginVertical: 16}]}>
        <ScrollView
          horizontal={true}
          persistentScrollbar={true}
          style={{paddingBottom: 12}}>
          <BarChart
            width={handleChartWidth()}
            height={320}
            showBarTops={false}
            fromZero
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              barRadius: 3,
              barPercentage: 0.6,
              fillShadowGradientOpacity: 1,
              backgroundGradientFrom: Colors.white,
              backgroundGradientTo: Colors.white,
              color: () => Colors.primary.base,
              labelColor: () => Colors.dark.neutral60,
              decimalPlaces: 0,
              propsForLabels: {
                fontSize: 12,
                fontFamily: Fonts.RegularPoppins,
              },
              propsForHorizontalLabels: {
                dx: handleChartWidth() - 52,
              },
              propsForBackgroundLines: {
                stroke: Colors.dark.neutral20,
              },
            }}
            onDataPointClick={({index}) => {
              Toast.show({
                type: 'labelChart',
                text2: graph?.[index]?.point,
                text1: graph?.[index]?.name,
                visibilityTime: 5000,
              });
            }}
            style={styles.graph}
            data={chartData}
          />
        </ScrollView>
      </View>

      {isFromParent ? (
        <TouchableOpacity
          onPress={() => {
            checkHasDoneMinatBakat(data, navigation);
          }}>
          <View style={styles.diagnosticReportComponent}>
            <Text style={styles.diagnosticReportTitle}>
              Lihat detil rekomendasi dan pilihan universitas favorit anak anda.
            </Text>
            <View style={styles.diagnosticReportFooter}>
              <IconPencil />
              <Text style={styles.diagnosticReportBtnTitle}>
                Laporan Minat & Bakat
              </Text>
              <IconChevronRight />
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <ImproveYourSkillsCard
          isEmptyState={!summaryPoint?.recommendation}
          bankSoalRecommendation={{
            module: summaryPoint?.recommendation?.module,
            subject_name: summaryPoint?.recommendation?.name,
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  colorDark80: {
    color: Colors.dark.neutral80,
  },
  mb16: {
    marginBottom: 16,
  },
  textSize14: {
    fontSize: 14,
  },
  textSize16: {
    fontSize: 16,
  },
  lineHeight18: {
    lineHeight: 18,
  },
  gap4: {
    gap: 4,
  },
  containerRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  containerRowBaselineBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  textBold: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
  },
  textRegular: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral60,
  },
  card: {
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
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: Colors.primary.light3,
    alignSelf: 'flex-start',
    borderRadius: 20,
    color: Colors.primary.base,
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.25,
  },
  buttonPelajari: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  graph: {
    marginLeft: -40,
  },
  diagnosticReportComponent: {
    padding: 12,
    backgroundColor: Colors.primary.light3,
    borderRadius: 10,
  },
  diagnosticReportTitle: {
    color: Colors.primary.dark2,
    fontSize: 12,
    marginBottom: 8,
  },
  diagnosticReportFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  diagnosticReportBtnTitle: {
    flex: 1,
    marginLeft: 8,
    color: Colors.dark.neutral100,
    fontWeight: '600',
  },
});

export default BankSoal;
