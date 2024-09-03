import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React, {FC} from 'react';

type Props = {
  title: string;
  image: any;
  action: any;
};

const CardMateri: FC<Props> = ({title, image, action}) => {
  return (
    <Pressable style={[styles.item, styles.shadowProp]} onPress={action}>
      <View style={{padding: 10, flex: 1, justifyContent: 'center'}}>
        <Image source={image} style={styles.image} resizeMode={'cover'} />
        <Text
          style={[styles.title, {fontFamily: 'Poppins-Bold', marginTop: 5}]}
          numberOfLines={1}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

export default CardMateri;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    width: 158,
    margin: 10,
    height: 92,
    backgroundColor: '#E1F4FE',
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
    color: '#000',
  },
  image: {
    width: 20,
    height: 16,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
