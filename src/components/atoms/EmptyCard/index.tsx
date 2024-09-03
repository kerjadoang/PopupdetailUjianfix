import {View, Text, Image, StyleSheet} from 'react-native';
import Colors from '@constants/colors';
import React from 'react';

type Props = {
  title: string;
  image: any;
};

const EmptyCard = ({image, title}: Props) => {
  return (
    <View style={styles.container}>
      <Image source={image} style={{width: 80, height: 80}} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export {EmptyCard};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '400',
    color: Colors.dark.neutral80,
  },
});
