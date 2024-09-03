import React, {FC} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {Pressable} from 'react-native';
import {Image} from 'react-native';
import {SvgFromUri} from 'react-native-svg';

type Props = {
  index: number;
  onPress: () => void;
  imageUrl?: string;
  title: string;
};

const SwipeUpCardItem: FC<Props> = ({
  index,
  onPress,
  imageUrl,
  title,
}: Props) => {
  const renderThumbnail = () => {
    if (!imageUrl) {
      return <View style={styles.slideImageEmpty} />;
    }

    if (imageUrl?.endsWith('.svg')) {
      return <SvgFromUri uri={imageUrl} />;
    }

    return <Image source={{uri: imageUrl}} />;
  };

  return (
    <Pressable key={index} onPress={onPress}>
      <View style={styles.slideContainer}>
        <View style={styles.slideImageContainer}>{renderThumbnail()}</View>
        <View style={styles.slideTitleContainer}>
          <Text allowFontScaling={false} style={styles.slideTitle}>
            {title}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default SwipeUpCardItem;
