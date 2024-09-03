import React from 'react';
import {Image, Text, View} from 'react-native';
import {Maskot17} from '@assets/images/index';
import {Styles} from '../style';

const TopEmptyComponent = () => {
  return (
    <View style={Styles.topEmptyContainer}>
      <Image source={Maskot17} style={Styles.topEmptyImage} />
      <Text style={Styles.topEmptyText}>Belum Ada Ujian Berlangsung</Text>
    </View>
  );
};

export default TopEmptyComponent;
