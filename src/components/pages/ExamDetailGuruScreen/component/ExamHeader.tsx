import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import IconUjian from '@assets/svg/ic64_ujian.svg';
import IconPrTugas from '@assets/svg/ic64_pr_tugas.svg';
import Fonts from '@constants/fonts';
import Colors from '@constants/colors';

type Props = {
  title: string;
  chapter: string;
  isLkpd?: boolean;
};
const ExamHeader = ({title, chapter, isLkpd = false}: Props) => {
  return (
    <View style={styles.container}>
      {!isLkpd ? (
        <IconUjian width={65} height={65} style={styles.icon} />
      ) : (
        <IconPrTugas width={65} height={65} style={styles.icon} />
      )}
      <View style={{width: '80%'}}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.chapter}>{chapter}</Text>
      </View>
    </View>
  );
};
export {ExamHeader};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chapter: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  title: {
    fontWeight: '600',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral60,
    fontFamily: Fonts.SemiBoldPoppins,
    flexWrap: 'wrap',
  },
  icon: {
    marginRight: 10,
  },
});
