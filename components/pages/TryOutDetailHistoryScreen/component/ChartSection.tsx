import {View, Text, Pressable, ScrollView, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../styles';
import Down from '@assets/svg/ic24_chevron_down_blue.svg';
import Calendar from '@assets/svg/ic_calendar_blue.svg';
import Colors from '@constants/colors';
import dayjs from 'dayjs';
import {Button, SwipeUp} from '@components/atoms';
import {LoadingIndicator} from '@components/atoms/LoadingIndicator';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {BarChart} from 'react-native-chart-kit-with-pressable-bar-graph';

type Props = {
  data?: any;
  dataBarTPS?: any;
  dataBarSaintek?: any;
  dataBarSoshum?: any;
  formStateRef?: any;
};

const ChartSection = ({
  data,
  dataBarTPS,
  dataBarSaintek,
  dataBarSoshum,
  formStateRef,
}: Props) => {
  const formatDateToCustomFormat = (dateString: any) => {
    const formattedDate = dayjs(dateString)
      .locale('id')
      .format('D MMM YYYY • HH:MM');
    return formattedDate;
  };
  const [type, setType] = useState('tps');
  const [choose, setChoose] = useState(type);
  const [show, setShow] = useState(false);
  const WIDTH = Math.round(Dimensions.get('window').width);

  let selectedDataBar: any;
  if (type === 'tps') {
    selectedDataBar = dataBarTPS;
  } else if (type === 'saintek') {
    selectedDataBar = dataBarSaintek;
  } else if (type === 'soshum') {
    selectedDataBar = dataBarSoshum;
  }

  const handleChartWidth = () => {
    const multiplier = selectedDataBar?.labels?.length * 0.2;
    if (selectedDataBar?.labels?.length <= 5) {
      return WIDTH;
    }

    return WIDTH * multiplier || WIDTH;
  };
  return (
    <View style={[styles.shadowProp, styles.card]}>
      <Text style={styles.textTitleBlack}>{data?.tryout_name}</Text>
      <View style={styles.rowBetween}>
        <View>
          <Text style={styles.textSubTitleGrey}>Dikumpulkan</Text>
          <View style={styles.row}>
            <Calendar width={24} height={24} style={{marginRight: 5}} />
            <Text style={styles.textSubTitle}>
              {formatDateToCustomFormat(data?.time_start)}
            </Text>
          </View>
        </View>
        <Pressable style={styles.dropDown} onPress={() => setShow(!show)}>
          <Text style={styles.textBlueBold}>{type?.toUpperCase()}</Text>
          <Down width={24} height={24} style={{marginLeft: 5}} />
        </Pressable>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        {data?.length === 0 ? (
          <LoadingIndicator />
        ) : (
          <BarChart
            width={handleChartWidth()}
            height={320}
            showBarTops={false}
            fromZero={true}
            fromNumber={data?.max_point_tps}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
              barRadius: 3,
              barPercentage: 0.6,
              fillShadowGradientOpacity: 1,
              backgroundGradientFrom: Colors.white,
              backgroundGradientTo: Colors.white,
              decimalPlaces: 0,
              color: () => Colors.primary.base,
              labelColor: () => Colors.dark.neutral60,
              propsForLabels: {
                fontSize: 10,
                fontFamily: 'Poppins-Regular',
              },
              propsForHorizontalLabels: {
                dx: handleChartWidth() - 52,
              },
              propsForBackgroundLines: {
                stroke: Colors.dark.neutral60,
              },
            }}
            onDataPointClick={({index}) => {
              Toast.show({
                type: 'labelChart',
                text2: selectedDataBar?.datasets?.[0]?.point?.[index],
                text1: selectedDataBar?.datasets?.[0]?.labelFull?.[index],
                visibilityTime: 5000,
              });
            }}
            style={{
              marginLeft: -40,
            }}
            data={selectedDataBar}
          />
        )}
      </ScrollView>
      <SwipeUp
        visible={show}
        height={200}
        onClose={() => setShow(!show)}
        children={
          <View style={{padding: 16}}>
            <Text style={styles.textTitle}>Filter Tipe Try Out</Text>
            {Object?.keys(formStateRef?.current?.module).map(
              (moduleName: any, index: number) => (
                <Pressable
                  key={index}
                  style={[styles.row, {marginVertical: 5}]}
                  onPress={() => setChoose(moduleName)}>
                  <View
                    style={
                      choose === moduleName
                        ? styles.circleActive
                        : styles.circleInActive
                    }
                  />
                  <Text style={styles.textSubTitleBigBlack}>
                    {moduleName?.toUpperCase()}
                  </Text>
                </Pressable>
              ),
            )}
            <View style={styles.rowBetween}>
              <Button label="Atur Ulang" isDisabled style={{width: '47%'}} />
              <Button
                label="Terapkan"
                style={{width: '47%'}}
                action={() => {
                  setType(choose);
                  setShow(!show);
                }}
              />
            </View>
          </View>
        }
      />
    </View>
  );
};

export default ChartSection;
