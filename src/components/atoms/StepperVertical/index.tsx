import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import IconCopyBlue from '@assets/svg/ic_copy_blue.svg';
import Config from 'react-native-config';

type Props = {
  onCopy: () => void;
};
const StepperVertical = ({onCopy}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View style={styles.lineContainer}>
          <View style={styles.verticalLine} />
          <View style={styles.dotLine} />
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.title}>{'Buka browser dan ketik'}</Text>
            <TouchableOpacity
              onPress={onCopy}
              style={styles.subscribeContainer}>
              <Text style={styles.titleBlue}>
                {Config.LINK_LANGGANAN || 'kelaspintar.id/berlangganan'}
              </Text>
              <View>
                <IconCopyBlue width={24} height={24} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.lineContainer}>
          <View style={styles.verticalLine} />
          <View style={styles.dotLine} />
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.title}>{'Masuk dengan akun Kelas Pintar'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.lineEndContainer}>
          <View style={styles.verticalEndLine} />
          <View style={styles.dotEndLine} />
        </View>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.title}>
              {
                'Pilih paket belajar, segera lakukan pembayaran dan kamu siap belajar dengan Kelas Pintar!'
              }
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export {StepperVertical};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  contentContainer: {
    flexDirection: 'row',
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
  },
  lineEndContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: 40,
  },
  verticalLine: {
    backgroundColor: Colors.primary.base,
    width: 3,
    height: '100%',
  },
  verticalEndLine: {
    backgroundColor: Colors.primary.base,
    width: 3,
    height: '50%',
  },
  dotLine: {
    position: 'absolute',
    height: 15,
    width: 15,
    borderRadius: 30,
    backgroundColor: Colors.primary.base,
  },
  dotEndLine: {
    position: 'absolute',
    top: '40%',
    height: 15,
    width: 15,
    borderRadius: 30,
    backgroundColor: Colors.primary.base,
  },
  cardContainer: {
    paddingVertical: 12,
    flex: 1,
  },
  card: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 8,
    elevation: 5,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral80,
    fontWeight: '400',
    fontFamily: 'Poppins-Regular',
  },
  subscribeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleBlue: {
    fontSize: 14,
    lineHeight: 22,
    marginRight: 4,
    color: Colors.primary.base,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
  },
});
