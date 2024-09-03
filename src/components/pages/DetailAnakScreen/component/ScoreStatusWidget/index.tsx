import React from 'react';
import {Text, Pressable, View, StyleSheet} from 'react-native';
import Coin from '@assets/svg/ic_coin_16x16.svg';
import Xp from '@assets/svg/ic_xp_16x16.svg';
import ChevronRight from '@assets/svg/ic_chevron_right_16x16.svg';
import Colors from '@constants/colors';
import {useNavigation} from '@react-navigation/native';

const ScoreStatusWidget = ({data, coin, xp}) => {
  const navigation: any = useNavigation();
  return (
    <View style={styles.statusContainer}>
      <Pressable
        style={styles.coinContainer}
        onPress={() =>
          navigation.navigate('HomeCoinScreen', {
            data: data,
          })
        }>
        <Coin />
        <Text style={styles.titleSnachbar}>{coin || '0'} Koin</Text>
        <ChevronRight />
      </Pressable>

      <View style={styles.separator} />

      <Pressable
        style={styles.coinContainer}
        onPress={() =>
          navigation.navigate('LeaderboardScreen', {
            token: data?.access_token,
          })
        }>
        <Xp />
        <Text style={styles.titleSnachbar}>{xp || '0'} XP</Text>
        <ChevronRight />
      </Pressable>
    </View>
  );
};

export {ScoreStatusWidget};

const styles = StyleSheet.create({
  statusContainer: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    marginHorizontal: 16,
    borderRadius: 30,
    justifyContent: 'space-around',
  },
  coinContainer: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'center',
    borderRadius: 30,
    height: 32,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  titleSnachbar: {
    fontFamily: 'Poppins-SemiBold',
    fontStyle: 'normal',
    fontSize: 14,
    color: Colors.dark.neutral100,
  },
  separator: {
    width: 1,
    height: 22,
    alignSelf: 'center',
    backgroundColor: Colors.dark.neutral40,
  },
});
