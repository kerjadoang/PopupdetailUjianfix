import React, {FC} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import Star2 from '@assets/svg/star_blue.svg';
import Trophy2 from '@assets/svg/trophy_blue.svg';
import Exp from '@assets/svg/exp.svg';
import {Image} from 'react-native';

type Props = {
  rankData?: any[];
};

const SecondRank: FC<Props> = ({rankData}) => {
  const rank2 = rankData?.find((e: any) => e.rank === 2) || {};
  return (
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
            uri: rank2?.path_url,
          }}
        />
      </View>
      <View style={{alignItems: 'center', bottom: 15}}>
        <Trophy2 width={19.5} height={24} color={'red'} />
        <Text style={styles.text_rank}>{rank2?.rank}</Text>
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
          <Text style={styles.textName} numberOfLines={1} ellipsizeMode="tail">
            {rank2?.full_name}
          </Text>
          <View style={styles.exp_box}>
            <Exp height={16} width={16} />
            <Text style={styles.sub}>{rank2?.xp} XP</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SecondRank;
