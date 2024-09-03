import React from 'react';
import {Pressable, Text} from 'react-native';
import {styles} from '../style';
import MapelMatematika from '@assets/svg/ic56_mapel_matematika.svg';
import {SvgUri} from 'react-native-svg';
import FastImage from 'react-native-fast-image';
type Props = {
  action?: any;
  keys?: any;
  data: any;
};
const ListItem = ({action, keys, data}: Props) => {
  return (
    <Pressable style={[styles.subCard]} key={keys} onPress={action}>
      {data?.path_url?.endsWith('svg') ? (
        <SvgUri uri={data?.path_url} />
      ) : (
        <MapelMatematika width={67} />
      )}
      <Text style={[styles.text, {textAlign: 'center'}]}>{data?.name}</Text>
      <Pressable style={[styles.coinRow, styles.shadowProp]} onPress={action}>
        <FastImage
          source={require('@assets/images/koin_2.png')}
          style={styles.coins}
          resizeMode="cover"
        />
        <Text style={styles.textCoin}>
          {data?.coin_default ? data?.coin_default : 0}
        </Text>
      </Pressable>
    </Pressable>
  );
};

export {ListItem};
