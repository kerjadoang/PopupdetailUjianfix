import {View, Text} from 'react-native';
import React from 'react';
import {SwipeUp} from '@components/atoms';

const ThinkNShareScreen = () => {
  return (
    <View style={{flex: 1}}>
      <SwipeUp
        height={300}
        visible
        children={
          <View>
            <Text>Pahami & Bereaksi</Text>
            <Text>3 Soal</Text>
          </View>
        }
      />
    </View>
  );
};

export {ThinkNShareScreen};
