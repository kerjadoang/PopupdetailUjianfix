import {type NativeLayoutUnit} from 'react-native-zoom-us/native';

export const zoomActiveConfig: NativeLayoutUnit = {
  kind: 'active',
  x: 0,
  y: 0,
  width: 1,
  height: 1,
};

export const zoomActiveShareConfig: NativeLayoutUnit = {
  kind: 'active-share',
  x: 0,
  y: 0,
  width: 1,
  height: 1,
};

export const zoomActiveCameraConfig: (
  teacherIndex?: any,
) => NativeLayoutUnit = (teacherIndex?: any) => {
  return {
    kind: 'active',
    // The percent of video view (required)
    x: 0,
    y: 0,
    width: 1,
    height: 1,
    // Enable border (optional)
    border: true,
    // Disable show user name (optional)
    showUsername: false,
    // Show audio off (optional)
    showAudioOff: false,
    // Background color (optional)
    background: 'transparent',
    userIndex: teacherIndex,
    aspectMode: 1,
  };
};

export const zoomSelfCameraConfig: NativeLayoutUnit = {
  kind: 'preview',
  // The percent of video view (required)
  x: 0.73,
  y: 0.73,
  width: 0.25,
  height: 0.2,
  // Enable border (optional)
  border: true,
  // Disable show user name (optional)
  showUsername: false,
  // Show audio off (optional)
  showAudioOff: true,
  // Background color (optional)
  background: '#ccc',
};
