/* eslint-disable react-native/no-inline-styles */
import React, {FC, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

import Fonts from '@constants/fonts';
import Colors from '@constants/colors';
import provider from '@services/ptn/provider';
import {WIDTH, usePTNReportScreen} from '../../utils';
import {CardListItem, DataTable} from '../';
import api from '@api/index';
import apiWithoutToken from '@api/withoutToken';
import {useNavigation} from '@react-navigation/native';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {dismissLoading, showLoading} from '@constants/functional';
import * as echarts from 'echarts/core';
import {LineChart as LineEchart} from 'echarts/charts';
import {GridComponent, TooltipComponent} from 'echarts/components';
import {SVGRenderer, SkiaChart} from '@wuba/react-native-echarts';
import IconPencil from '@assets/svg/ic32_practice.svg';
import IconChevronRight from '@assets/svg/ic16_chevron_right.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import useDiagnoticTestResult from '@components/pages/DiagnoticTestResultScreen/useDiagnoticTestResult';
echarts.use([SVGRenderer, LineEchart, GridComponent, TooltipComponent]);

const TryOut: FC<{
  valueFilterTypeTryOut: any;
  valueFilterTryOut: any;
  valueFilterMapel: any;
  isFromParent: boolean;
  data: any;
}> = ({
  valueFilterTypeTryOut,
  valueFilterTryOut,
  valueFilterMapel,
  isFromParent,
  data,
}) => {
  const navigation: any = useNavigation();
  const {ptnStore} = usePTNReportScreen();
  const {checkHasDoneMinatBakat} = useDiagnoticTestResult();
  const [passingGrades, setPassingGrades] = useState([]);
  const [chartTryOuts, setChartTryOuts] = useState<any[]>([]);
  const [chartSubjectTryOuts, setChartSubjectTryOuts] = useState<any>([]);
  const [summaryPoint, setSummaryPoint] = useState(null);
  const [historyData, setHistoryData] = useState<any>();

  const handleChartWidth = () => {
    const multiplier = chartTryOuts?.length * 0.25;
    if (chartTryOuts?.length <= 5) {
      return WIDTH;
    }

    return WIDTH * multiplier || WIDTH;
  };

  const getCurrentTryOutPoint = (id: any) => {
    const data = chartTryOuts.find((data: any) => data.id === id);

    return data?.point;
  };

  useLayoutEffect(() => {
    const __getReportGraphTryOut = async () => {
      try {
        showLoading();
        const {
          status,
          data: {data},
        } = await provider.getReportGraphTryOut(ptnStore?.user);

        if (status === 200) {
          setChartTryOuts(data ?? []);
        }
      } catch (_) {
        setChartTryOuts([]);
      } finally {
        dismissLoading();
      }
    };

    __getReportGraphTryOut();
  }, [ptnStore.user]);

  useLayoutEffect(() => {
    const __getReportSubjectGraphTryOut = async () => {
      if (valueFilterMapel) {
        try {
          showLoading();
          const {
            status,
            data: {data},
          } = await provider.getSubjectReportGraphTryout(
            valueFilterMapel,
            ptnStore?.user,
          );

          if (status === 200) {
            setChartSubjectTryOuts(data ?? []);
          }
        } catch (err: any) {
          setChartSubjectTryOuts([]);
        } finally {
          dismissLoading();
        }
      }
    };

    __getReportSubjectGraphTryOut();
  }, [ptnStore.user, valueFilterMapel]);

  useLayoutEffect(() => {
    const __getReportPassingGrade = async () => {
      try {
        showLoading();
        const {
          status,
          data: {data},
        } = await provider.getReportPassingGrade(
          {
            type: valueFilterTypeTryOut,
            tryoutId: valueFilterTryOut,
          },
          ptnStore?.user,
        );

        if (status === 200) {
          setPassingGrades(data ?? []);
        }
      } catch (_) {
        setPassingGrades([]);
      } finally {
        dismissLoading();
      }
    };

    __getReportPassingGrade();
  }, [valueFilterTypeTryOut, valueFilterTryOut, ptnStore?.user]);

  useLayoutEffect(() => {
    const __getReportSummaryPoint = async () => {
      try {
        showLoading();
        const {
          status,
          data: {data},
        } = await provider.getReportSummaryPoint(
          {
            tryoutId: valueFilterTryOut,
            module: valueFilterMapel,
          },
          ptnStore.user,
        );
        if (status === 200) {
          setSummaryPoint(data);
        } else {
          setSummaryPoint(null);
        }
      } catch (_) {
        setSummaryPoint(null);
      } finally {
        dismissLoading();
      }
    };

    __getReportSummaryPoint();
  }, [valueFilterTryOut, valueFilterMapel, ptnStore.user]);

  const getListTryOut = async () => {
    try {
      showLoading();
      let response = await api.get('ptn_soal/v1/report/list-tryout');

      if (ptnStore?.user?.access_token) {
        response = await apiWithoutToken.get('ptn_soal/v1/report/list-tryout', {
          headers: {
            Authorization: `Bearer ${ptnStore?.user?.access_token}`,
          },
        });
      }

      const {
        status,
        data: {data},
      } = response;

      if (status === 200) {
        const currentTryOut = data?.find(
          (item: any) => item?.id === valueFilterTryOut,
        );

        const history = {
          id: currentTryOut?.id,
          register_id: currentTryOut?.register_id,
        };

        setHistoryData(history);
      }
    } catch (_) {
      setHistoryData(null);
    } finally {
      dismissLoading();
    }
  };

  useEffect(() => {
    getListTryOut();
  }, [valueFilterTryOut, ptnStore.user]);

  const tryOutList = chartSubjectTryOuts?.length
    ? chartSubjectTryOuts?.map(
        (value: any) => value?.name,
        // value?.name?.length <= 13
        //   : value?.name?.substring(0, 10) + '...',
      )
    : [];

  const generateSubjectData = (data?: any) => {
    const map = new Map();

    data?.forEach((item: any) => {
      item?.subject?.forEach((subject: any) => {
        const name = subject?.name;
        const point = subject?.point;
        const graphColor = subject?.graph_color;

        map.set(
          name,
          (map.get(name) || []).concat({point: point, graphColor: graphColor}),
        );
      });
    });

    return map;
  };

  const generateSeriesList = () => {
    const seriesList: any[] = [];
    const subjectData = generateSubjectData(chartSubjectTryOuts);
    subjectData?.forEach((data, name) => {
      const series = {
        name,
        symbolSize: 20,
        symbol: 'circle',
        type: 'line',
        smooth: true,
        emphasis: {
          focus: 'series',
        },
        lineStyle: {
          width: 5,
          color: data?.map((item: any) => item?.graphColor)?.[0],
        },
        itemStyle: {
          color: data?.map((item: any) => item?.graphColor)?.[0],
          borderColor: '#fff',
          borderWidth: 3,
          shadowColor: 'rgba(0.2, 0.2, 0.28, 0.2)',
          shadowBlur: 2,
          shadowOffsetY: 0,
          shadowOffsetX: 2,
        },
        data: data?.map((item: any) => item?.point),
      };
      seriesList.push(series);
    });

    return seriesList;
  };

  const skiaRef = useRef<any>(null);
  useEffect(() => {
    const option = {
      xAxis: {
        type: 'category',
        splitLine: {
          show: true,
        },
        axisLabel: {
          fontSize: 16,
        },
        boundaryGap: false,
        data: tryOutList,
      },
      yAxis: {
        type: 'value',
      },
      tooltip: {
        trigger: 'item',
      },
      grid: {
        left: 2,
        bottom: 50,
      },
      series: generateSeriesList(),
    };
    let chart: any;
    const widthChart = generateSeriesList().length * 300;
    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, 'light', {
        renderer: 'svg',
        width: widthChart >= 3000 ? 2500 : widthChart,
        height: 400,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, []);

  return (
    <>
      <DataTable
        datas={passingGrades}
        historyData={historyData}
        point={getCurrentTryOutPoint(valueFilterTryOut)}
      />

      <View style={{marginVertical: 16}}>
        <Text style={[styles.textBold, {marginBottom: 8}]}>
          Laporan Grafik Try Out
        </Text>

        <View style={styles.card}>
          <ScrollView
            horizontal={true}
            persistentScrollbar={true}
            style={{paddingBottom: 12}}>
            <LineChart
              bezier
              width={handleChartWidth()}
              height={220}
              withVerticalLines={false}
              withShadow={false}
              fromZero={true}
              yLabelsOffset={30}
              chartConfig={{
                backgroundGradientFrom: Colors.white,
                backgroundGradientTo: Colors.white,
                color: () => Colors.dark.neutral60,
                decimalPlaces: 0,
                propsForLabels: {
                  fontSize: 12,
                  fontFamily: Fonts.RegularPoppins,
                },
                propsForHorizontalLabels: {
                  dx: handleChartWidth(),
                },
                propsForDots: {
                  strokeWidth: 7,
                  stroke: Colors.primary.base,
                },
              }}
              style={{
                paddingRight: 30,
              }}
              onDataPointClick={({index}) => {
                Toast.show({
                  type: 'labelChart',
                  text2: chartTryOuts?.[index]?.point,
                  text1: chartTryOuts?.[index]?.name,
                  visibilityTime: 5000,
                });
              }}
              data={{
                labels: chartTryOuts?.length
                  ? chartTryOuts?.map((value: any) =>
                      value?.name?.length <= 13
                        ? value?.name
                        : value?.name?.substring(0, 10) + '...',
                    )
                  : [],
                datasets: [
                  {
                    data: chartTryOuts?.length
                      ? chartTryOuts?.map((value: any) => value?.point)
                      : [],
                    strokeWidth: 3,
                    color: () => Colors.primary.base,
                  },
                ],
              }}
            />
          </ScrollView>
        </View>
      </View>

      <CardListItem
        type="ROW"
        titleHighest="Nilai Tertinggi"
        titleLowest="Nilai Terendah"
        data={summaryPoint!}
        historyData={historyData}
        services="Try Out"
      />

      <View style={{marginVertical: 16}}>
        <Text style={[styles.textBold, {marginBottom: 8}]}>
          Grafik Mata Pelajaran Try Out
        </Text>

        <View style={styles.card}>
          <ScrollView
            horizontal={true}
            persistentScrollbar={true}
            style={{paddingBottom: 12}}>
            <SkiaChart ref={skiaRef} />
          </ScrollView>
        </View>
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
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
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

export default TryOut;
