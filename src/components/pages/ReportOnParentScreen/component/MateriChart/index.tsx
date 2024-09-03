import React, {FC, useRef, useEffect} from 'react';
import * as echarts from 'echarts/core';
import {SVGRenderer, SvgChart} from '@wuba/react-native-echarts';
import {
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import {BarChart, BarSeriesOption} from 'echarts/charts';
import Colors from '@constants/colors';
import {EChartsOption} from 'echarts';
import {TotalPerDay} from 'type/student-report-material-summary-duration-by-subject-id';
import {CallbackDataParams} from 'echarts/types/dist/shared';

echarts.use([
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  SVGRenderer,
]);

type Props = {
  data: TotalPerDay[];
};

const MateriChart: FC<Props> = ({data}) => {
  const barSeriesOption1: BarSeriesOption = {
    type: 'bar',
    name: 'Durasi Belajar',
    // animation: true,
    color: Colors.primary.base,
    // barGap: '20%',
  };

  const skiaRef = useRef<any>(null);
  useEffect(() => {
    const option: EChartsOption = {
      tooltip: {
        align: 'center',
        trigger: 'axis',

        position: 'top',
        axisPointer: {
          type: 'shadow',
        },
        formatter: function (
          params: CallbackDataParams | CallbackDataParams[],
        ) {
          const data = (params as CallbackDataParams[])?.[0];
          const dataValue = data.value as any[];
          const toolTipText = `${dataValue?.[1]} Jam`;
          return toolTipText;
        },
      },
      dataset: {
        source: data?.map(item => [item?.day || '', item?.hour || 0]),
        // source: [
        //   ['Minggu', 5],
        //   ['Senin', 0],
        //   ['Selasa', 0],
        //   ['Rabu', 1],
        //   ['Kamis', 0],
        //   ['Jumat', 2],
        // ],
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
      series: [barSeriesOption1],
    };

    let chart: any;
    if (skiaRef.current) {
      chart = echarts?.init(skiaRef.current, 'light', {
        renderer: 'svg',
        // width: WINDOW_WIDTH + 300,
        width: (data?.length || 1) * 80,
        height: 400,
      });

      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [data]);
  return <SvgChart ref={skiaRef} />;
};

export default MateriChart;
