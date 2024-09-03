/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, ScrollView, Image} from 'react-native';
import IconArrowLeftWhite from '@assets/svg/ic_arrow_left_white.svg';
import {bgBlueOrnament} from '@assets/images';
import {Header} from '@components/atoms/Header';
import Colors from '@constants/colors';
import ScheduleClass from './components/ScheduleClass';
import RecordSessionClass from './components/RecordSessionClass';
import {RecordLiveClass} from './components/RecordLiveClass';
import usePTNLiveClass from './usePTNLiveClass';
import {styles} from './styles';

const PTNLiveClassHomeScreen = () => {
  const {
    classSession,
    classSessionRekaman,
    onJoinLiveClass,
    onRecordLiveClass,
    onSeeAllRecording,
    onSeeSchedule,
    onCardJoinLiveClassPress,
  } = usePTNLiveClass();
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flexGrow: 1}}>
        <Header
          iconLeft={<IconArrowLeftWhite width={24} height={24} />}
          label={'Live Class'}
          styleLabel={styles.styleLabel}
          backgroundColor="transparent"
          colorLabel={Colors.white}
        />
        <Image source={bgBlueOrnament} style={styles.bgBlueOrnament} />
        <View style={styles.cardContainer}>
          <ScheduleClass
            data={classSession}
            onCardJoinLiveClassPress={onCardJoinLiveClassPress}
            onJoin={onJoinLiveClass}
            onSeeSchedule={onSeeSchedule}
          />
          <RecordSessionClass
            data={classSessionRekaman}
            onRecord={onRecordLiveClass}
            onSeeAllRecording={onSeeAllRecording}
          />
          <RecordLiveClass />
        </View>
      </ScrollView>
    </View>
  );
};

export {PTNLiveClassHomeScreen};
