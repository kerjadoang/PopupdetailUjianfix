import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from '../Button';

type Props = {
  title?: string;
  level: number;
  test: number;
  time?: string;
  minGrade?: string;
  action: () => void;
};
const MCQStart = ({title, level, test, time, minGrade, action}: Props) => {
  // <SwipeUp
  //   visible={up}
  //   height={400}
  //   children={
  //     <MCQStart
  //       level={2}
  //       test={10}
  //       time={'20 Menit'}
  //       action={() => {
  //         console.log('swipeUp clicked, Start');
  //       }}
  //     />
  //   }
  // />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title || 'Soal Pilihan Ganda'}</Text>
      <View style={styles.row}>
        <Text style={styles.item}>Level {level}</Text>
        <Text style={styles.item}>{test} Soal</Text>
        <Text style={styles.item}>{time}</Text>
      </View>
      <Text style={styles.desc}>
        Dapatkan nilai{' '}
        {
          <Text style={{fontFamily: Fonts.SemiBoldPoppins}}>
            {minGrade || '70%'} atau lebih
          </Text>
        }
        untuk melanjutkan ke level berikutnya.
      </Text>
      <Button label="Mulai" action={action} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 0,
  },
  title: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 20,
    textAlign: 'center',
    color: Colors.dark.neutral100,
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '15%',
  },
  item: {
    fontFamily: Fonts.RegularPoppins,
    color: Colors.primary.base,
    backgroundColor: Colors.primary.light2,
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  desc: {
    marginVertical: 16,
    fontSize: 16,
    color: Colors.dark.neutral100,
  },
});
export default MCQStart;
