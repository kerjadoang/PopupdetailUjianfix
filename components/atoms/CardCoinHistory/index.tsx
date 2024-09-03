import Colors from '@constants/colors';
import {View, Text, Image, StyleSheet} from 'react-native';
import {KoinIcon} from '@assets/images';
import React from 'react';
import dayjs from 'dayjs';

type Props = {
  type: string;
  label: string;
  date: string;
  nominal: number;
  colors: string;
};

const CardCoinHistory = ({type, label, date, nominal, colors}: Props) => {
  const formatedDate = (x: any) => dayjs(x).format('DD MMM YYYY hh:mm');

  return (
    <View style={styles.container}>
      <View style={styles.mid}>
        <Image source={KoinIcon} style={styles.icon} />
        <View>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.date}>{formatedDate(date)}</Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text style={[styles.nominal, {color: colors}]}>
          {!(type === 'tanya' || type === 'expired') ? '+' : null}
          {nominal} Koin
        </Text>
      </View>
    </View>
  );
};
export {CardCoinHistory};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    width: '100%',
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 45,
    height: 45,
    marginRight: 12,
  },
  mid: {
    flexDirection: 'row',
  },
  label: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    textTransform: 'capitalize',
    color: Colors.dark.neutral80,
  },
  right: {
    justifyContent: 'center',
  },
  date: {
    fontFamily: 'Poppins-Light',
    color: Colors.dark.neutral80,
  },
  nominal: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
    textAlign: 'center',
  },
});
