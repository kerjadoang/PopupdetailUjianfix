import React from 'react';
import {StyleSheet, Text, Pressable, Image} from 'react-native';
import {SvgUri} from 'react-native-svg';
import Colors from '@constants/colors';
type Props = {
  index?: number;
  onPress?: any;
  pressableStyle?: any;
  imageStyle?: any;
  title?: string;
  data?: any;
};

const ImageSubjects = ({
  index,
  onPress,
  pressableStyle,
  data,
  imageStyle,
}: Props) => {
  const imgUrl = data?.icon_path_url;
  return (
    <Pressable
      key={index}
      onPress={onPress}
      style={[pressableStyle, styles.iconContainer]}>
      {imgUrl?.endsWith('svg') ? (
        <SvgUri uri={imgUrl} />
      ) : (
        <Image
          style={imageStyle}
          source={{
            uri: imgUrl,
          }}
        />
      )}
      <Text style={[styles.title]}>{data?.name ? data.name : '-'}</Text>
    </Pressable>
  );
};

export {ImageSubjects};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    color: Colors.dark.neutral100,
  },
  iconContainer: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
});
