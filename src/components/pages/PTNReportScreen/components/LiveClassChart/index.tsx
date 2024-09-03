import React, {FC, useRef, useEffect} from 'react';
import styles from './styles';
import * as echarts from 'echarts/core';
import {SkiaChart} from '@wuba/react-native-echarts';
import {
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import {BarChart, BarSeriesOption} from 'echarts/charts';
import {CanvasRenderer} from 'echarts/renderers';
import Colors from '@constants/colors';
import {EChartsOption} from 'echarts';

echarts.use([
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer,
]);

type Props = {
  data: PTNReportLiveClassSubject[];
};

const LiveClassChart: FC<Props> = ({data}) => {
  const barSeriesOption1: BarSeriesOption = {
    type: 'bar',
    name: 'Sesi Kelas',
    // animation: true,
    color: Colors.primary.base,
    // barGap: '20%',
  };

  const barSeriesOption2: BarSeriesOption = {
    type: 'bar',
    name: 'Rekaman Sesi Kelas ',
    // animation: true,
    color: Colors.primary.light2,
  };

  const skiaRef = useRef<any>(null);

  useEffect(() => {
    const option: EChartsOption = {
      tooltip: {
        trigger: 'axis',
        position: 'top',
        axisPointer: {
          type: 'shadow',
        },
      },
      dataset: {
        source: data.map(item => [
          item?.name || '',
          item?.total_live_class || 0,
          item?.total_record || 0,
        ]),
      },
      grid: {
        left: 2,
        bottom: 50,
      },
      // Declare an x-axis (category axis).
      // The category map the first column in the dataset by default.
      xAxis: {
        type: 'category',
        axisLabel: {
          formatter: function (name) {
            if (name.length > 10) {
              return name.substring(0, 4) + '..';
            }
            return name;
          },
          showMaxLabel: true,
          align: 'center',
        },

        axisTick: {alignWithLabel: true},
      },
      yAxis: {
        position: 'right',
      },
      // Declare several 'bar' series,
      // every series will auto-map to each column by default.
      series: [barSeriesOption1, barSeriesOption2],
    };

    let chart: any;
    if (skiaRef.current) {
      chart = echarts.init(skiaRef.current, 'light', {
        renderer: 'svg',
        // width: WINDOW_WIDTH + 300,
        width: data.length * 80,
        height: 400,
      });

      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [data]);

  return <SkiaChart ref={skiaRef} style={styles.container} />;
};

export default LiveClassChart;
