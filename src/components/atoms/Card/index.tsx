import {StyleSheet, Text, View, ImageBackground, Pressable} from 'react-native';
import React, {FC} from 'react';
import Colors from '@constants/colors';

type Props = {
  title: string;
  description: string;
  image: any;
  action: any;
};

const Card: FC<Props> = ({title, description, image, action}) => {
  return (
    <Pressable onPress={action} style={styles.item}>
      <ImageBackground
        style={styles.bg}
        imageStyle={{borderRadius: 10}}
        resizeMode={'cover'}
        source={image}>
        <View style={{padding: 10, flex: 1, justifyContent: 'flex-end'}}>
          <Text
            style={[
              styles.title,
              {fontFamily: 'Poppins-Bold', color: Colors.white},
            ]}
            ellipsizeMode="tail"
            numberOfLines={2}>
            {title}
          </Text>
          <Text
            style={[
              styles.title,
              {fontFamily: 'Poppins-Light', fontSize: 11, color: Colors.white},
            ]}
            numberOfLines={1}>
            {description}
          </Text>
        </View>
      </ImageBackground>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: '46%',
    marginHorizontal: '2%',
    marginVertical: 10,
    height: 260,
    borderRadius: 10,
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
    color: '#000',
  },
  bg: {
    flex: 1,
  },
});
