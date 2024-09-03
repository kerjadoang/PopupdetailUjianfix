import {View, Text} from 'react-native';
import React from 'react';
import {styles} from '../styles';
import Calendar from '@assets/svg/ic_calendar_blue.svg';
import Graduation from '@assets/svg/icon_graduation.svg';
import Right from '@assets/svg/ic_arrow_right_grey.svg';
import dayjs from 'dayjs';

type Props = {
  data?: any;
};
const ScoreSection = ({data}: Props) => {
  const formatDateToCustomFormat = dateString => {
    const formattedDate = dayjs(dateString)
      .locale('id')
      .format('D MMM YYYY • HH:MM');
    return formattedDate;
  };
  return (
    <View style={[styles.shadowProp, styles.card]}>
      <Graduation width={32} height={32} />
      <View style={styles.rowBetween}>
        <View>
          <Text style={styles.textTitleBlack}>{data?.tryout_name}</Text>
          <Text style={styles.textSubTitleGrey}>Waktu Pengerjaan</Text>
          <View style={styles.row}>
            <Calendar width={24} height={24} style={{marginRight: 5}} />
            <Text style={styles.textSubTitle}>
              {formatDateToCustomFormat(data?.time_start)}
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={{alignItems: 'center'}}>
            <Text style={[styles.textTitle, {fontSize: 18}]}>Nilai</Text>
            <Text style={[styles.textBlueBold, {fontSize: 20}]}>
              {data?.point}
            </Text>
          </View>
          <Right width={30} height={30} />
        </View>
      </View>
    </View>
  );
};

export default ScoreSection;
