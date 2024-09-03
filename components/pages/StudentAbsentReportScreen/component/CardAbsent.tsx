import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {_handlerConvertAllDate} from '@constants/functional';
import ArrowRight from '@assets/svg/ic_arrow_right_blue.svg';

type Props = {
  data: any;
  action: () => void;
};

const CardAbsent = ({data, action}: Props) => {
  return (
    <Pressable onPress={action} style={styles.container}>
      <View>
        <Text style={styles.title}>{data?.attendance_type || '--'}</Text>
        <Text>
          <Text style={styles.reason}>{data?.days || 0} Hari : </Text>
          {data?.days > 1
            ? `${_handlerConvertAllDate(
                data?.start_date,
              )} - ${_handlerConvertAllDate(data?.end_date)}`
            : _handlerConvertAllDate(data?.start_date)}
        </Text>
        <Text style={styles.reason}>{data?.reason}</Text>
      </View>
      {data?.absent_id !== 0 ? <ArrowRight /> : null}
    </Pressable>
  );
};
export {CardAbsent};

const styles = StyleSheet.create({
  title: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    color: Colors.primary.base,
    textTransform: 'capitalize',
  },
  reason: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
    textTransform: 'capitalize',
  },
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.neutral10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
