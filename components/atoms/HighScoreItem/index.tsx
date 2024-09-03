import {StyleSheet, View} from 'react-native';
import React from 'react';
import Colors from '@constants/colors';
import SecondRank from './components/SecondRank';
import ThirdRank from './components/ThirdRank';
import FirstRank from './components/FirstRank';

type Props = {
  data: any;
};

const HighScoreItem = ({data}: Props) => {
  return (
    <View style={styles.container}>
      {/* Rank 2 */}
      <SecondRank rankData={data} />

      {/* Rank 1 */}
      <FirstRank rankData={data} />

      {/* Rank 3 */}
      <ThirdRank rankData={data} />
    </View>
  );
};

export default HighScoreItem;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  round: {
    borderWidth: 3,
    borderRadius: 100,
    bottom: 5,
    width: 60,
    height: 60,
  },
  photo: {
    width: 55,
    height: 55,
    borderRadius: 100,
  },
  text_rank: {
    position: 'absolute',
    fontSize: 12,
    color: '#002E6D',
    fontFamily: 'Poppins-Bold',
  },
  textName: {
    fontFamily: 'Poppins-Bold',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    width: 70,
    color: Colors.primary.dark1,
    alignSelf: 'center',
  },
  bottom_box: {
    width: 100,
    bottom: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  exp_box: {
    flexDirection: 'row',
    marginTop: 5,
  },
  sub: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: '#002E6D',
  },
});
