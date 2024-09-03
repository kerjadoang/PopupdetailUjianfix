import React, {FC, memo} from 'react';
import {View, Modal} from 'react-native';
import styles from './styles';
import Colors from '@constants/colors';
import {VideoView, Props as VideoViewProps} from '@livekit/react-native';
import {Header} from '@components/atoms';

type Props = {
  visible: boolean;
  subLabel?: string;
  onPressMonitor: CallBackWithParams<void, boolean>;
  videoTrack: VideoViewProps['videoTrack'];
};

const MonitoringModal: FC<Props> = memo(
  ({videoTrack, visible, onPressMonitor, subLabel}) => {
    return (
      <Modal visible={visible} animationType="slide">
        <View style={styles.modalContainerView}>
          <Header
            label="Monitoring"
            subLabel={subLabel}
            backgroundColor={Colors.dark.neutral100}
            colorLabel={Colors.white}
            onPressIconLeft={() => onPressMonitor(false)}
          />
          <VideoView videoTrack={videoTrack} style={styles.modalVideoView} />
        </View>
      </Modal>
    );
  },
);

export default MonitoringModal;
