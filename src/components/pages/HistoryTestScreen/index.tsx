import {Header} from '@components/atoms/Header';
import React from 'react';
import {View, Text} from 'react-native';
import {useRoute} from '@react-navigation/native';

const HistoryTestScreen = () => {
  const route = useRoute();
  const {subjectName} = route.params;
  return (
    <View>
      <Header label="Riwayat Nilai Test" subLabel={subjectName} />
      <Text> hehehehehe</Text>
    </View>
  );
};

export {HistoryTestScreen};
