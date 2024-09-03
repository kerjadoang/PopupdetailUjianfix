import React, {FC} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import Crown from '@assets/svg/crown.svg';
import Trophy from '@assets/svg/trophy.svg';
import Star from '@assets/svg/star_yellow.svg';
import Exp from '@assets/svg/exp.svg';
import {Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '@constants/colors';

type Props = {
  rankData?: any[];
};

const FirstRank: FC<Props> = ({rankData}) => {
  const rank1 = rankData?.find((e: any) => e.rank === 1) || {};
  return (
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
            uri: rank1?.path_url,
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
          {rank1?.rank}
        </Text>
      </View>
      <LinearGradient
        colors={[Colors.secondary.base, Colors.secondary.base, '#FFD839']}
        style={[styles.bottom_box, {height: 71}]}>
        <View style={{alignItems: 'center', padding: 10}}>
          <Text style={styles.textName} numberOfLines={1}>
            {rank1?.full_name}
          </Text>
          <View style={styles.exp_box}>
            <Exp height={16} width={16} />
            <Text style={styles.sub}>{rank1?.xp} XP</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default FirstRank;
