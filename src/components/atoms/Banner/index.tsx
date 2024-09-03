/* eslint-disable react-native/no-inline-styles */
import React, {FC} from 'react';
import {TouchableOpacity, ImageBackground} from 'react-native';

type Props = {
  action?: any;
  backgroundImage?: any;
  backgroundSVG?: any;
  height: number | string;
};

const Banner: FC<Props> = ({
  action,
  backgroundImage,
  backgroundSVG,
  height,
}) => {
  return (
    (backgroundImage || backgroundSVG) && (
      <TouchableOpacity onPress={action} style={{height, borderRadius: 10}}>
        {backgroundImage ? (
          <ImageBackground
            resizeMode="cover"
            source={backgroundImage}
            style={{flex: 1}}
          />
        ) : (
          backgroundSVG
        )}
      </TouchableOpacity>
    )
  );
};

export {Banner};
