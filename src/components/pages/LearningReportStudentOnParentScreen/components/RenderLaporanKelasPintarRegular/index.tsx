import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ProgressCircle} from '@components/atoms';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import apiWithoutToken from '@api/withoutToken';

const RenderLaporanKelasPintarRegular = ({data}: any) => {
  const [progressData, setProgress] = useState<any>();

  useEffect(() => {
    fetchProgress();
  }, [data]);

  const fetchProgress = async () => {
    try {
      const res = await apiWithoutToken.get(
        `/lpt/v1/report?class_id=${data?.class_id}&user_id=${data?.user_id}`,
        {
          headers: {
            Authorization: `Bearer ${data?.access_token}`,
          },
        },
      );
      if (res?.data?.code === 100) {
        return setProgress(res?.data?.data);
      }
    } catch (err) {
      return;
    }
  };

  const {learn, practice, test} = progressData?.percentage || 0;

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
      }}>
      <View style={styles.column}>
        <ProgressCircle
          size={100}
          color={'#B859FE'}
          strokeWidth={10}
          progress={learn || 0.5}
          children={<Text style={styles.value}>{learn || 0} %</Text>}
        />
        <Text style={styles.title}>Learn</Text>
      </View>

      <View style={styles.column}>
        <ProgressCircle
          size={100}
          color={'#FF9E16'}
          strokeWidth={10}
          progress={practice || 0.5}
          children={<Text>{practice || 0} %</Text>}
        />
        <Text style={styles.title}>Practice</Text>
      </View>
      <View style={styles.column}>
        <ProgressCircle
          size={100}
          color={'#09B95A'}
          strokeWidth={10}
          progress={test || 0.5}
          children={<Text>{test || 0} %</Text>}
        />
        <Text style={styles.title}>Test</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  value: {
    fontSize: 16,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.primary.base,
    fontWeight: '600',
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: Fonts.RegularPoppins,
    color: Colors.primary.base,
    marginTop: 8,
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
  },
});
export {RenderLaporanKelasPintarRegular};
