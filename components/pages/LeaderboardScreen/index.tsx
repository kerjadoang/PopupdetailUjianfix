import React from 'react';
import FormLeaderboard from '@components/organism/FormLeaderboard';
import {SafeAreaView} from 'react-native';

const LeaderboardScreen = (params: any) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <FormLeaderboard token={params?.route?.params?.token} />
    </SafeAreaView>
  );
};

export {LeaderboardScreen};
