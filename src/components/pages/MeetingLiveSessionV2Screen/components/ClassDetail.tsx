import {SwipeUp, SwipeUpProps} from '@components/atoms';
import Colors from '@constants/colors';
import {renderStripe} from '@constants/functional';
import dayjs from 'dayjs';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from 'src/redux/rootReducer';

type DetailItemProps = {
  title: string;
  label: string;
};

const DetailItem: React.FC<DetailItemProps> = props => {
  return (
    <View style={styles.detailItemContainer}>
      <View style={styles.detailItemTitleContainer}>
        <Text style={styles.detailItemTitle}>{props?.title}</Text>
      </View>

      <View style={styles.detailItemLabelContainer}>
        <Text style={styles.detailItemLabel}>{props?.label}</Text>
      </View>
    </View>
  );
};

type ClassDetailProps = {} & Omit<SwipeUpProps, 'height'>;

const ClassDetail: React.FC<ClassDetailProps> = props => {
  const classDetail = useSelector(
    (state: RootState) => state.classSessionDetail,
  ).data;

  const renderDate = () => {
    return classDetail?.data?.time_start
      ? dayjs(classDetail?.data?.time_start)
          .locale('id')
          .format('dddd, D MMM YYYY')
      : '--- ' + classDetail?.data?.time_start
      ? dayjs(classDetail?.data?.time_start).format('HH:mm')
      : '---' + ' - ' + classDetail?.data?.time_finish
      ? dayjs(classDetail?.data?.time_finish).format('HH:mm')
      : '---';
  };

  return (
    <SwipeUp {...props} height={100}>
      <Text style={styles.title}>Live Kelas GURU</Text>
      <View style={styles.container}>
        <DetailItem
          title="Mata Pelajaran"
          label={renderStripe(classDetail?.data?.subject?.name)}
        />
        <DetailItem
          title="Bab"
          label={renderStripe(classDetail?.data?.chapter?.name)}
        />
        <DetailItem title="Tanggal & Waktu" label={renderDate()} />
        <DetailItem
          title="Guru Ahli"
          label={renderStripe(classDetail?.data?.user?.full_name)}
        />
        <DetailItem
          title="Peserta"
          label={`${classDetail?.data?.participant?.length}`}
        />
      </View>
    </SwipeUp>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 16,
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    textAlign: 'center',
    color: Colors.dark.neutral100,
  },
  detailItemContainer: {flexDirection: 'row', gap: 8},
  detailItemTitleContainer: {flex: 1},
  detailItemTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: Colors.dark.neutral100,
  },
  detailItemLabelContainer: {flex: 2},
  detailItemLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.dark.neutral100,
  },
});

export default ClassDetail;
