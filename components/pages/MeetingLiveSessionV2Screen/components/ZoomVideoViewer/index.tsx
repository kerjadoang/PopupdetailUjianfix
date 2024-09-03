import React, {FC} from 'react';
import {View} from 'react-native';
import styles from './styles';
// import {ZoomUsVideoView} from 'react-native-zoom-us';

export type ZoomVideoViewerProps = {
  onMeetingStatusEnded: () => void;
  onMeetingStatusLeaveBO: () => void;
};

const ZoomVideoViewer: FC<ZoomVideoViewerProps> = () => {
  return (
    <View style={styles.customViewer}>
      {/* <ZoomUsVideoView
        style={styles.customViewer}
        layout={[zoomActiveShareConfig]}
      /> */}
      {/* <ZoomUsVideoView
        style={styles.customViewer}
        layout={[isShareScreen ? zoomActiveShareConfig : zoomActiveConfig]}
      /> */}
      {/* {isShareScreen && ( */}
      {/* <ZoomUsVideoView
          style={styles.activeCamera}
          layout={[zoomActiveCameraConfig(teacherIndex)]}
        /> */}
      {/* )} */}
    </View>
  );
};

export default ZoomVideoViewer;
