import React from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import {Button, ButtonProps} from '@components/atoms';

import Colors from '@constants/colors';
import MoreIcon from '@assets/svg/ic24_more_gray.svg';
import UsersIcon from '@assets/svg/ic16_users.svg';
import CalendarIcon from '@assets/svg/ic16_calendar.svg';
import {IListScheduledAndNeedToBeCheckResponseData} from '@services/lms/type';
import {convertDate, formatScheduleDate} from '@constants/functional';

type UjianCardItemProps = {
  data?: IListScheduledAndNeedToBeCheckResponseData;
  onPressShowMore?: TouchableOpacityProps['onPress'];
  onPressCheckDetail?: ButtonProps['action'];
  section?: 'perlu_diperiksa' | 'dijadwalkan' | 'riwayat';
};

const formatScheduleEndDate = (endDate: any): string => {
  return `${convertDate(endDate).format('ddd, D MMM YYYY • HH:mm')}`;
};

const UjianCardItem: React.FC<UjianCardItemProps> = props => {
  const isPerluDiperiksa = props.section === 'perlu_diperiksa';
  const isRiwayat = props.section === 'riwayat';
  return (
    <>
      <View style={styles.container}>
        <View style={styles.containerChipsAndMoreBtn}>
          <View style={styles.containerChips}>
            {props.data?.service?.name && (
              <View style={styles.chips}>
                <Text style={styles.chipLabel}>{props.data.service.name}</Text>
              </View>
            )}
            {props.data?.class?.name && (
              <View style={styles.chips}>
                <Text style={styles.chipLabel}>{props.data.class.name}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={props.onPressShowMore}
            style={styles.moreBtn}>
            <MoreIcon />
          </TouchableOpacity>
        </View>
        <View style={styles.containerTitle}>
          <View style={{maxWidth: '70%'}}>
            <Text style={styles.subjectLabel}>{props.data?.subject?.name}</Text>
            <Text style={styles.titleLabel}>{props.data?.title}</Text>
          </View>
          {(isPerluDiperiksa || isRiwayat) && (
            <View style={{maxWidth: '30%'}}>
              <Button
                label={isPerluDiperiksa ? 'Periksa' : 'Detail'}
                outline
                textStyle={{fontSize: 14}}
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 12,
                  alignSelf: 'flex-end',
                }}
                action={() => props.onPressCheckDetail?.()}
              />
            </View>
          )}
        </View>
        <View style={isRiwayat && {gap: 4}}>
          {isRiwayat && (
            <Text
              style={{
                fontFamily: 'Poppins-Regular',
                fontSize: 12,
                color: Colors.dark.neutral60,
              }}>
              Pengerjaan
            </Text>
          )}
          <View style={styles.additionalInformationContainer}>
            <CalendarIcon />
            <Text style={styles.additionalInformationLabel}>
              {formatScheduleDate(
                props.data?.start_time,
                props.data?.end_time,
                true,
              )}
            </Text>
          </View>
          {isRiwayat && (
            <>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  fontSize: 12,
                  color: Colors.dark.neutral60,
                }}>
                Selesai Dinilai
              </Text>
              <View style={styles.additionalInformationContainer}>
                <CalendarIcon />
                <Text style={styles.additionalInformationLabel}>
                  {formatScheduleEndDate(props.data?.completed_at)}
                </Text>
              </View>
            </>
          )}
          {isPerluDiperiksa && (
            <View style={styles.additionalInformationContainer}>
              <UsersIcon />
              <Text style={styles.additionalInformationLabel}>
                {props?.data?.submitted ?? 0} /{' '}
                {props?.data?.total_students ?? 0} murid murid sudah
                mengumpulkan
              </Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    elevation: 4,
    backgroundColor: Colors.white,
    borderRadius: 8,
    gap: 8,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  containerChipsAndMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerChips: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: -8,
  },
  chips: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: Colors.primary.light3,
    borderRadius: 20,
  },
  chipLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.primary.base,
  },
  moreBtn: {paddingLeft: 10},
  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 4,
    alignItems: 'center',
  },
  subjectLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.dark.neutral100,
  },
  titleLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.dark.neutral100,
  },
  additionalInformationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  additionalInformationLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.dark.neutral80,
  },
});

export default UjianCardItem;
