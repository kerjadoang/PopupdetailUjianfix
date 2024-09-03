import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from '../styles';
import Clock from '@assets/svg/ic16_clock_grey.svg';
import Graduation from '@assets/svg/icon_graduation.svg';
import Right from '@assets/svg/ic_arrow_right_grey.svg';
import dayjs from 'dayjs';

type Props = {
  data?: any;
  action?: () => void;
};
const ListScore = ({data, action}: Props) => {
  const formatDateToCustomFormat = (dateString: any) => {
    const formattedDate = dayjs(dateString)
      .locale('id')
      .format('D MMM YYYY • HH:MM');
    return formattedDate;
  };
  return (
    <TouchableOpacity style={[styles.shadowProp, styles.card]} onPress={action}>
      <Graduation width={32} height={32} />
      <Text style={styles.textSubTitleGrey}>
        {formatDateToCustomFormat(data?.subject?.created_at)}
      </Text>
      <View style={styles.rowBetween}>
        <View>
          <Text style={styles.textTitleBlack}>{data?.subject?.name}</Text>
          <Text style={styles.textSubTitleGrey}>
            {data?.correct_answer} Benar • {data?.wrong_answer} Salah •{' '}
            {data?.pass_answer} Dilewati
          </Text>
          <View style={styles.row}>
            <Text style={styles.textSubTitleGrey}>Durasi Pengerjaan:</Text>
            <Clock width={16} height={16} style={{marginRight: 5}} />
            <Text style={styles.textSubTitleGrey}>
              {data?.duration ?? 0} Menit
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <Text style={[styles.textTitle, {fontSize: 18}]}>Nilai</Text>
            <Text style={[styles.textBlueBold, {fontSize: 20}]}>
              {data?.point}
            </Text>
          </View>
          <Right width={30} height={30} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListScore;
