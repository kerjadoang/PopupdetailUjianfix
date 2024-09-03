import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import IconRight from '@assets/svg/ic16_chevron_right.svg';
import Fonts from '@constants/fonts';
import {convertDateTime, convertToRupiah} from '@constants/functional';
const AdministrativeCard = ({data, onPress}: any) => {
  const payment_notes = data?.payment_notes?.payment_for_notes;
  return (
    <View style={styles.card}>
      <View style={styles.cardContainer}>
        <View style={styles.leftCard}>
          <Text style={styles.title}>
            {data?.payment_for_name ? data.payment_for_name : '-'}
          </Text>
          <Text style={styles.amount}>
            {data?.nominal ? 'Rp. ' + convertToRupiah(data.nominal) : '-'}
          </Text>
          <Text style={styles.notes}>
            Catatan: {payment_notes ? payment_notes : '-'}
          </Text>
        </View>
        <View style={styles.RightCard}>
          <Text style={styles.date}>{convertDateTime(data?.payment_date)}</Text>
          <View
            style={[
              styles.chips,
              {
                backgroundColor:
                  data?.status !== 'diterima'
                    ? Colors.danger.light2
                    : Colors.success.light2,
              },
            ]}>
            {data?.status === 'diterima' ? (
              <Text style={styles.chipsText}>Diterima</Text>
            ) : (
              <Text style={[styles.chipsText, {color: Colors.danger.base}]}>
                Ditolak
              </Text>
            )}
          </View>
        </View>
      </View>
      <View style={styles.rectangle} />
      <TouchableOpacity style={styles.bottomCard} onPress={onPress}>
        <Text style={styles.bottomTitle}>Lihat bukti pembayaran</Text>
        <IconRight />
      </TouchableOpacity>
    </View>
  );
};

export default AdministrativeCard;
const window = Dimensions.get('window');
const styles = StyleSheet.create({
  card: {
    marginTop: 16,
    padding: 16,
    paddingBottom: 13,
    borderRadius: 10,
    backgroundColor: Colors.white,
    flexDirection: 'column',
    flexWrap: 'wrap',
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 4,
    width: window.width * 0.9,
    marginHorizontal: 3,
  },
  cardContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    justifyContent: 'space-between',
    width: window.width * 0.83,
  },
  leftCard: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  RightCard: {
    flexDirection: 'column',
  },
  chips: {
    backgroundColor: Colors.success.light2,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 20,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  title: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
    fontWeight: '600',
  },
  amount: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.1,
    color: Colors.dark.neutral100,
    fontWeight: '600',
    paddingTop: 4,
    paddingBottom: 14,
  },
  notes: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
    fontWeight: '400',
  },
  date: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 11,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.dark.neutral80,
    fontWeight: '400',
  },
  chipsText: {
    fontFamily: Fonts.RegularPoppins,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.25,
    color: Colors.success.base,
    fontWeight: '400',
    textAlign: 'center',
  },
  rectangle: {
    borderTopWidth: 1,
    borderColor: Colors.dark.neutral20,
    marginHorizontal: -16,
  },
  bottomCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 13,
  },
  bottomTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0.25,
    color: Colors.primary.base,
    fontWeight: '600',
  },
});
