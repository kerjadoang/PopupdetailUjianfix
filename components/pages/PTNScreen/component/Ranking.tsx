import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Trophy from '@assets/svg/trophy.svg';
import Trophy2 from '@assets/svg/trophy_blue.svg';
import Trophy3 from '@assets/svg/trophy_pink.svg';
import Crown from '@assets/svg/crown.svg';
import Star3 from '@assets/svg/star_pink.svg';
import Star2 from '@assets/svg/star_blue.svg';
import Star from '@assets/svg/star_yellow.svg';
import Exp from '@assets/svg/exp.svg';
import {Image} from 'react-native';
import Colors from '@constants/colors';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  data: any;
};

const Ranking = ({data}: Props) => {
  let rank1 = data?.find((e: any) => e.ranking === 1);
  let rank2 = data?.find((e: any) => e.ranking === 2);
  let rank3 = data?.find((e: any) => e.ranking === 3);
  return (
    <View style={styles.container}>
      {/* Rank 2 */}
      <View style={styles.box}>
        <View style={{width: '100%', top: 30}}>
          <Star2 width={24} height={24} style={{right: 10}} />
          <Star2 width={12} height={12} style={{left: 5}} />
        </View>
        <View
          style={[
            styles.round,
            {
              borderColor: '#9BBFF5',
            },
          ]}>
          <Image
            style={styles.photo}
            source={{
              uri: rank2?.user?.path_url,
            }}
          />
        </View>
        <View style={{alignItems: 'center', bottom: 15}}>
          <Trophy2 width={19.5} height={24} color={'red'} />
          <Text style={styles.text_rank}>{rank2?.ranking}</Text>
        </View>
        <View
          style={[
            styles.bottom_box,
            {
              backgroundColor: '#9BBFF5',
              height: 62.5,
            },
          ]}>
          <View style={{alignItems: 'center', padding: 10}}>
            <Text
              style={styles.textName}
              numberOfLines={1}
              ellipsizeMode="tail">
              {rank2?.user?.full_name}
            </Text>
            <View style={styles.exp_box}>
              <Exp height={16} width={16} />
              <Text style={styles.sub}>{rank2?.point} XP</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Rank 1 */}
      <View style={[styles.box, {marginHorizontal: 5}]}>
        <View style={{width: '100%', top: 30}}>
          <Star width={24} height={24} style={{right: 10}} />
          <Star width={12} height={12} style={{left: 5}} />
        </View>
        <Crown width={24} height={24} />
        <View
          style={[
            styles.round,
            {
              borderColor: Colors.secondary.base,
            },
          ]}>
          <Image
            style={styles.photo}
            source={{
              uri: rank1?.user?.path_url,
            }}
          />
        </View>
        <View
          style={{
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            position: 'absolute',
          }}>
          <Star width={24} height={24} style={{left: 5}} />
          <Star width={12} height={12} style={{right: 10}} />
        </View>
        <View style={{alignItems: 'center', bottom: 15}}>
          <Trophy width={19.5} height={24} />
          <Text style={styles.text_rank} ellipsizeMode="tail">
            {rank1?.ranking}
          </Text>
        </View>
        <LinearGradient
          colors={[Colors.secondary.base, Colors.secondary.base, '#FFD839']}
          style={[styles.bottom_box, {height: 71}]}>
          <View style={{alignItems: 'center', padding: 10}}>
            <Text style={styles.textName} numberOfLines={1}>
              {rank1?.user?.full_name}
            </Text>
            <View style={styles.exp_box}>
              <Exp height={16} width={16} />
              <Text style={styles.sub}>{rank1?.point} XP</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Rank 3 */}
      <View style={styles.box}>
        <View
          style={{
            width: '100%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          <Star3 width={24} height={24} style={{left: 5}} />
          <Star3 width={12} height={12} style={{right: 10}} />
        </View>
        <View
          style={[
            styles.round,
            {
              borderColor: '#F9B0B1',
            },
          ]}>
          <Image
            style={styles.photo}
            source={{
              uri: rank3?.user?.path_url,
            }}
          />
        </View>
        <View style={{alignItems: 'center', bottom: 15}}>
          <Trophy3 width={19.5} height={24} fill={'#F9B0B1'} />
          <Text style={styles.text_rank}>{rank3?.rank}</Text>
        </View>
        <View
          style={[
            styles.bottom_box,
            {
              backgroundColor: '#F9B0B1',
              height: 55,
            },
          ]}>
          <View style={{alignItems: 'center', padding: 10}}>
            <Text
              style={styles.textName}
              numberOfLines={1}
              ellipsizeMode="tail">
              {rank3?.user?.full_name}
            </Text>
            <View style={styles.exp_box}>
              <Exp height={16} width={16} />
              <Text style={styles.sub}>{rank3?.point} XP</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Ranking;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginVertical: 20,
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
