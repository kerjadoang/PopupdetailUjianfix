import {StyleSheet, View, Text, Pressable} from 'react-native';
import React, {FC} from 'react';
import Colors from '@constants/colors';
import HighScoreItem from '@components/atoms/HighScoreItem';
import useRankTable from './useRankTable';

type Props = {
  data?: any;
};

const RankTable: FC<Props> = () => {
  const {rank, navigation} = useRankTable();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Papan Peringkat</Text>
      <View style={[styles.shadowProp, styles.card]}>
        <HighScoreItem data={rank?.data} />
        <View style={styles.centering}>
          <Pressable
            onPress={() => navigation.navigate('LeaderboardScreen')}
            style={styles.button}>
            <Text style={styles.textBtn}>Lihat Selengkapnya</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default RankTable;

const styles = StyleSheet.create({
  centering: {
    justifyContent: 'center',
    marginVertical: 8,
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  textBtn: {
    color: Colors.primary.base,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    marginTop: 16,
  },
  hr: {
    borderWidth: 0.17,
    opacity: 0.2,
    marginVertical: 10,
    backgroundColor: Colors.primary.light3,
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
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    borderRadius: 10,
    paddingVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    fontFamily: 'Poppins-Regular',
    color: Colors.dark.neutral100,
    marginBottom: 16,
  },
});
