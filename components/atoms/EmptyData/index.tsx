import React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import {IMAGES} from '@constants/image';

type EmptyDataProps = {
  title: string;
  description: string;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  image?: keyof typeof IMAGES;
};

const EmptyData: React.FC<EmptyDataProps> = props => {
  return (
    <View style={styles.container}>
      <Image
        source={props.image ? IMAGES[props.image] : IMAGES.maskotNotFound}
        style={styles.img}
      />
      <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
      <Text style={[styles.description, props.descriptionStyle]}>
        {props.description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: '80%',
    marginTop: 30,
    alignSelf: 'center',
  },
  img: {width: 120, height: 120},
  title: {
    marginTop: 12,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    textAlign: 'center',
  },
  description: {
    marginTop: 6,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});

export default EmptyData;
