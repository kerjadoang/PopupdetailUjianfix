import React, {FC} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import Star3 from '@assets/svg/star_pink.svg';
import Trophy3 from '@assets/svg/trophy_pink.svg';
import {Image} from 'react-native';
import Exp from '@assets/svg/exp.svg';

type Props = {
  rankData?: any[];
};

const ThirdRank: FC<Props> = ({rankData}) => {
  const rank3 = rankData?.find((e: any) => e.rank === 3) || {};

  return (
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
            uri: rank3?.path_url,
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
          <Text style={styles.textName} numberOfLines={1} ellipsizeMode="tail">
            {rank3?.full_name}
          </Text>
          <View style={styles.exp_box}>
            <Exp height={16} width={16} />
            <Text style={styles.sub}>{rank3?.xp} XP</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ThirdRank;
