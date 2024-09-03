import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {styles} from '../styles';
import Calendar from '@assets/svg/ic_calendar_blue.svg';
import People from '@assets/svg/ic16_users.svg';
import 'dayjs/locale/id';
import {convertDate, isDeepEqual} from '@constants/functional';
import {MainView} from '@components/atoms';

type Props = {
  item: any;
  onPressDetailHistory: VoidCallBack;
};

const propsAreEqual = (prevProps: Props, nextProps: Props) =>
  isDeepEqual(prevProps.item, nextProps.item);

const HistoryCard = React.memo(({item, onPressDetailHistory}: Props) => {
  return (
    <Pressable
      key={item?.id}
      style={[styles.shadowProp, styles.card]}
      disabled={item?.assessment_status === 'Menunggu Penilaian' ? true : false}
      onPress={onPressDetailHistory}>
      <View style={styles.row}>
        <Text style={styles.textSubTitleBlue}>{item?.tryout_type}</Text>
        <Text style={styles.textSubTitleGreen}>selesai</Text>
      </View>

      <View
        style={[styles.rowBetween, styles.marginTop8, {alignItems: 'center'}]}>
        <Text style={styles.textTitleBlack}>{item?.tryout_name}</Text>
        {item?.assessment_status === 'Menunggu Penilaian' ? (
          <Text
            style={[
              styles.textSubTitleBlue,
              {color: 'black', width: 108, textAlign: 'center'},
            ]}>
            Menunggu Penilaian
          </Text>
        ) : (
          <Pressable
            style={[styles.buttonJoin, styles.borderBlue]}
            onPress={onPressDetailHistory}>
            <Text style={styles.textBlueBold}>Detail</Text>
          </Pressable>
        )}
      </View>
      <View style={[styles.rowBetween, styles.marginTop8]}>
        <View>
          <Text style={styles.textSubTitleGrey}>{item?.subtitle}</Text>
          {item?.note_group?.map((item: any, i: number) => {
            const [startDateTime, endDateTime] = item?.description.split(' - ');
            const endDate = convertDate(endDateTime).format(
              'ddd, D MMMM YYYY • HH:mm',
            );
            const isDateRange =
              convertDate(startDateTime).isValid() &&
              convertDate(endDateTime).isValid();
            // const convertedRange = `${startDate} - ${endDate}`;
            const convertedRange = `${endDate}`;
            return (
              <View key={i} style={styles.row}>
                {item?.icon === 'calendar' ? (
                  <Calendar width={16} style={{marginRight: 5}} />
                ) : (
                  <People width={16} style={{marginRight: 5}} />
                )}
                <Text style={styles.textSubTitle}>
                  {isDateRange ? convertedRange : item?.description}
                </Text>
              </View>
            );
          })}
        </View>
        {item?.assessment_status === 'Sudah Dinilai' ? (
          <MainView flex={1} alignItems="center">
            <Text style={styles.textSubTitleGrey}>Nilai</Text>
            <Text style={styles.textBlueBold}>{item.value}</Text>
          </MainView>
        ) : null}
      </View>
    </Pressable>
  );
}, propsAreEqual);

export {HistoryCard};
