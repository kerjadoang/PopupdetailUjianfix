import {StyleSheet, Text, View, Image} from 'react-native';
import React, {FC} from 'react';
import Colors from '@constants/colors';

type Props = {
  title: string;
  icon: any;
};

const Title: FC<Props> = ({title, icon}) => {
  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.image} resizeMode={'contain'} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 13,
    height: 13,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    color: Colors.dark.neutral100,
    fontSize: 14,
    marginLeft: 5,
  },
});
