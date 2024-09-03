import Avatar from '@components/atoms/Avatar';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  img?: any;
  name: string;
  date: string;
  score: number;
  unfinish?: boolean;
  avatar?: string;
};

const CardStudent = ({name, date, score = 0, unfinish, avatar}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Avatar style={styles.iconContainer} id={avatar || ''} />
        <View style={styles.center}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}>
            {unfinish ? 'Tidak Mengumpulkan' : date}
          </Text>
        </View>
      </View>
      <View style={score === 0 ? styles.scoreRed : styles.score}>
        <Text style={score === 0 ? styles.scoreTextRed : styles.scoreTextGreen}>
          {score}
        </Text>
      </View>
    </View>
  );
};
export {CardStudent};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    fontFamily: Fonts.SemiBoldPoppins,
    color: Colors.black,
  },
  date: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: Fonts.RegularPoppins,
    color: Colors.dark.neutral60,
  },
  scoreTextGreen: {
    color: Colors.success.base,
    fontSize: 16,
    fontWeight: '600',
  },
  scoreTextRed: {
    color: Colors.danger.base,
    fontSize: 16,
    fontWeight: '600',
  },
  score: {
    borderRadius: 25,
    width: 40,
    height: 40,
    backgroundColor: Colors.success.light2,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  scoreRed: {
    borderRadius: 25,
    width: 40,
    height: 40,
    backgroundColor: Colors.danger.light2,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: Colors.violet.light2,
  },
  row: {
    flexDirection: 'row',
  },
  center: {
    flexDirection: 'column',
    marginLeft: 12,
  },
});
