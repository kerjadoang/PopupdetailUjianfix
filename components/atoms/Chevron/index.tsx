import React, {FC, useState} from 'react';
import {Pressable, ViewStyle} from 'react-native';
import styles from './styles';
import IcChevronUp from '@assets/svg/ic24_chevron_up_blue.svg';
import IcChevronDown from '@assets/svg/ic24_chevron_down_blue.svg';
import useDidMountEffect from '@hooks/useDidmountEffect';

type Props = {
  isCollapse: boolean;
  onChange?: CallBackWithParams<void, boolean>;
  containerStyle?: ViewStyle;
  width?: number;
  height?: number;
};

const Chevron: FC<Props> = ({
  isCollapse,
  onChange,
  containerStyle,
  height = 24,
  width = 24,
}) => {
  const [tempIsCollapse, setTempIsCollapse] = useState(isCollapse);

  useDidMountEffect(() => {
    onChange?.(tempIsCollapse);
  }, [onChange, tempIsCollapse]);

  useDidMountEffect(() => {
    setTempIsCollapse(isCollapse);
  }, [isCollapse]);

  return (
    <Pressable
      onPress={() => setTempIsCollapse(!tempIsCollapse)}
      style={({pressed}) => [
        styles.container,
        {opacity: pressed ? 0.5 : 1, ...containerStyle},
      ]}>
      {tempIsCollapse ? (
        <IcChevronUp width={width} height={height} />
      ) : (
        <IcChevronDown width={width} height={height} />
      )}
    </Pressable>
  );
};

export {Chevron};
