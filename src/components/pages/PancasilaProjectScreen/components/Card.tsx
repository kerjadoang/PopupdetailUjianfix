import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LiveIcon from '@assets/svg/ic16_live.svg';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {Button} from '@components/atoms';
import 'dayjs/locale/id';
import {SvgUri} from 'react-native-svg';
import IconCalendar from '@assets/svg/ic16_calendar.svg';
import IcCheckGreen from '@assets/svg/ic16_check_green.svg';
import {convertDate} from '@constants/functional';
const Card = ({data, onPress}: any) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.containerTitle}>
        <View style={styles.containerTitleCard}>
          <Text style={styles.titleCard}>{data?.type || 'Fase A'}</Text>
        </View>
        <View style={[styles.containerTitleCard, styles.containerClass]}>
          <Text style={[styles.titleCard, styles.titleClass]}>
            {data?.class?.name || '-'}
          </Text>
        </View>
        {data?.project?.is_recommended ? (
          <View
            style={[styles.containerTitleCard, styles.containerRekomendasi]}>
            <Text style={[styles.titleCard, styles.titleRekomendasi]}>
              Rekomendasi
            </Text>
          </View>
        ) : null}
      </View>
      <Text style={styles.examName}>{data?.project?.title}</Text>
      <Text style={styles.examTitle}>{data?.description ?? ''}</Text>

      <View style={styles.dateContainer}>
        <View style={styles.dateColumn}>
          <Text style={styles.gaveText}>{'Diberikan'}</Text>
          <View style={{flexDirection: 'row', marginTop: 4}}>
            <IconCalendar width={12} height={12} />
            <Text style={styles.examDate}>
              {`${convertDate(data?.time_start).format('ddd, D MMM YYYY')}`}
            </Text>
          </View>
        </View>
        <View style={styles.dateColumn}>
          <Text style={styles.gaveText}>{'Selesai'}</Text>
          <View style={{flexDirection: 'row', marginTop: 4}}>
            <IconCalendar width={12} height={12} />
            <Text style={styles.examDate}>
              {`${convertDate(data?.time_finish).format('ddd, D MMM YYYY')}`}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.personContainer}>
        {data?.avatar_icon_url?.endsWith('svg') ? (
          <SvgUri
            uri={data?.sender?.icon_path_url}
            height={32}
            width={32}
            style={{borderRadius: 20}}
          />
        ) : (
          <Image
            style={styles.avatar}
            source={{
              uri: data?.sender?.icon_path_url,
            }}
          />
        )}
        <Text style={styles.personName}>{data?.sender?.full_name ?? '-'}</Text>
      </View>
      <View style={styles.rectangle} />
      <View>
        {data?.status == 'berlangsung' ? (
          <View style={styles.cardBottom}>
            <View style={{flexDirection: 'row', marginRight: 12}}>
              <LiveIcon style={{marginRight: 9}} />
              <Text style={styles.examType}>Sedang berlangsung</Text>
            </View>
            <Button
              label="Detail"
              style={styles.button}
              fontSize={14}
              action={onPress}
            />
          </View>
        ) : data?.status === 'batal' ? (
          <View style={styles.cardBottom}>
            <Text style={[styles.examType, {color: Colors.danger.base}]}>
              Dibatalkan
            </Text>
            <Button
              label="Detail"
              style={styles.button}
              fontSize={14}
              action={onPress}
            />
          </View>
        ) : (
          <View style={styles.cardBottom}>
            <View style={styles.doneRow}>
              <IcCheckGreen width={16} height={16} style={{marginRight: 8}} />
              <Text style={[styles.examType, {color: Colors.success.base}]}>
                Projek Selesai
              </Text>
            </View>

            <Button
              label="Detail"
              style={styles.button}
              fontSize={14}
              action={onPress}
            />
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default Card;
const styles = StyleSheet.create({
  card: {
    padding: 16,
    flexDirection: 'column',
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 4,
    marginHorizontal: 3,
    marginVertical: 16,
  },
  containerTitleCard: {
    backgroundColor: Colors.primary.light3,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
  },
  titleCard: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.primary.base,
    textAlign: 'center',
    letterSpacing: 0.25,
  },
  gaveText: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral60,

    letterSpacing: 0.25,
  },
  containerClass: {
    backgroundColor: Colors.secondary.light2,
  },
  titleClass: {
    color: Colors.orange.dark1,
  },
  containerRekomendasi: {
    backgroundColor: Colors.success.light2,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
  },
  titleRekomendasi: {
    color: Colors.success.base,
  },
  leftCard: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  examName: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    marginVertical: 4,
    color: Colors.dark.neutral100,
    paddingTop: 4,
  },
  examTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 1,
    color: Colors.dark.neutral100,
    paddingTop: 2,
  },
  examDate: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
    paddingLeft: 4,
  },
  examType: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.danger.base,
  },
  containerTitle: {
    flexDirection: 'row',
  },
  personName: {
    fontFamily: Fonts.RegularPoppins,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: Colors.dark.neutral100,
    marginLeft: 6,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  cardBottom2: {
    marginTop: 12,
    marginHorizontal: 12,
  },
  rectangle: {
    borderTopWidth: 1,
    borderColor: Colors.dark.neutral20,
    marginHorizontal: -16,
    marginTop: 16,
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  personImage: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: Colors.purple.light,
    marginRight: 12,
  },
  dateContainer: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: Colors.purple.light,
  },
  dateColumn: {
    flexDirection: 'column',
  },
  personContainer: {flexDirection: 'row', alignItems: 'center', marginTop: 4},
  doneRow: {
    flexDirection: 'row',
  },
});
