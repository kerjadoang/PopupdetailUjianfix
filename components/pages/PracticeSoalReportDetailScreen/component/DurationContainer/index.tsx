/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import IconClock from '@assets/svg/ic16_clock.svg';
import Fonts from '@constants/fonts';
import {BarChart} from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Keys} from '@constants/keys';
import api from '@api/index';
import Colors from '@constants/colors';

const WIDTH = Math.round(Dimensions.get('window').width);

const DurationContainer = ({subject}: {subject: any}) => {
  const [durationData, setDurationData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getReport = async () => {
      try {
        const token = await AsyncStorage.getItem(Keys.token);
        const tokenParse = await JSON.parse(token || '');

        const response = await api.get(
          `/lpt/v1/duration/report/${subject?.id}/SOAL`,
          {
            headers: {
              Authorization: `Bearer ${tokenParse}`,
            },
          },
        );

        if (response.status === 200) {
          setDurationData(response.data?.data);
        }

        setIsLoading(false);
      } catch (_) {
        setIsLoading(false);
      }
    };

    getReport();
  }, [subject?.id]);

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
    <View style={styles.whiteContainer}>
      <View style={styles.row}>
        <IconClock width={30} height={30} />
        <Text style={styles.textHeader}>durasi belajar</Text>
      </View>
      <View
        style={[
          styles.row,
          {justifyContent: 'space-between', marginTop: 12, marginBottom: 15},
        ]}>
        <View>
          <Text>Total</Text>
          <Text style={[styles.textHeader, {marginLeft: 0}]}>
            {`${durationData?.total?.hour ?? 0} Jam ${
              durationData?.total?.minute ?? 0
            } Menit`}
          </Text>
        </View>
        <View>
          <Text>Total Minggu Ini</Text>
          <Text style={[styles.textHeader, {marginLeft: 0}]}>
            {`${durationData?.total_per_week?.hour ?? 0} Jam ${
              durationData?.total_per_week?.minute ?? 0
            } Menit`}
          </Text>
        </View>
      </View>
      <Text>Grafik Minggu ini</Text>
      {!isLoading && (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
  );
};

const styles = StyleSheet.create({
  whiteContainer: {
    borderRadius: 15,
    padding: 16,
    marginBottom: 20,
    backgroundColor: Colors.white,
  },
  row: {
    flexDirection: 'row',
  },
  textHeader: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    color: Colors.black,
    textTransform: 'capitalize',
    marginLeft: 10,
  },
});

export {DurationContainer};
