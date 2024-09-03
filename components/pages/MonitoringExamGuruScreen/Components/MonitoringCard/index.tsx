import React, {FC} from 'react';
import {View, Text, Pressable} from 'react-native';
import styles from './styles';
import {VideoView} from '@livekit/react-native';
import {Participant, Track} from 'livekit-client';
import {MainText} from '@components/atoms';
import Colors from '@constants/colors';
import Fonts from '@constants/fonts';

type Props = {
  onPressMonitor: CallBackWith2Params<void, boolean, Participant>;
  item: Participant;
  violationData?: IUjianViolation;
};

const MonitoringCard: FC<Props> = ({item, onPressMonitor, violationData}) => {
  const currentStudent = violationData?.student_exam?.find(
    student => student?.user_id === Number(item.identity),
  );

  return (
    <Pressable
      onPress={() => onPressMonitor(true, item)}
      style={styles.pressableVideoView}>
      <View style={styles.containerVideoView}>
        <VideoView
          videoTrack={item.getTrack(Track.Source.Camera)?.videoTrack}
          style={styles.videoView}
        />
      </View>
      <Text style={styles.textVideoView}>{item.name}</Text>
      {!!currentStudent?.student_exam_violation?.length && (
        <MainText color={Colors.danger.base} fontFamily={Fonts.SemiBoldPoppins}>
          {currentStudent.student_exam_violation?.length}x Peringatan
        </MainText>
      )}
    </Pressable>
  );
};

export default MonitoringCard;
