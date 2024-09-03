import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '@constants/colors';
import IconLaporan from '@assets/svg/laporan.svg';
import Fonts from '@constants/fonts';

interface ICardLearningReportStudent {
  children: any;
  title: string;
  next: boolean;
  nextAction?: () => void;
}

const CardLearningReportStudent = ({
  title,
  children,
  next,
  nextAction,
}: ICardLearningReportStudent) => {
  return (
    <View style={[styles.shadowProp, styles.card]}>
      <View style={styles.header}>
        <View style={styles.headerLeftContainer}>
          <IconLaporan width={24} height={24} />
          <Text style={{fontFamily: Fonts.RegularPoppins}}>
            {title || 'Laporan Belajar'}
          </Text>
        </View>
        {next && (
          <Pressable onPress={nextAction}>
            <Icon name="chevron-right" size={16} color={Colors.primary.base} />
          </Pressable>
        )}
      </View>
      <View style={{padding: 16}}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: Colors.primary.light3,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // height: 48,
    padding: 16,
  },
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 0.5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 8,
  },
});
export {CardLearningReportStudent};
