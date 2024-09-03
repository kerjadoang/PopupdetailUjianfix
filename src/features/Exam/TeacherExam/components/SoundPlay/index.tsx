import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import Colors from './component/colors';
//import Colors from '@constraint/colors';
//import { useSoundPlayer } from '@features/Exam/shared/hooks/SoundPlayer/useSoundPlayer';
import { useSoundPlayer } from './component/useSoundPlayer';
import { State } from 'react-native-track-player';
import { ActivityIndicator } from 'react-native-paper';
import { styles } from './style';

interface SoundPlayerProps {
  source: string;
}

const SoundPlayer: React.FC<SoundPlayerProps> = ({ source }) => {
  const { play, pause, playback, progress, setCurrentPlayingTime } =
    useSoundPlayer(source);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    const padStart = minutes < 10 ? 1 : 2;
    return `${minutes.toString().padStart(padStart, '0')}:${remainingSeconds
      .toString()
      .padStart(2, '0')}`;
  };

  const duration = formatTime(progress.duration);
  const currentTimePlaying = formatTime(progress.position);

  const isPlaying = playback === State.Playing;
  const isBuffering = playback === State.Buffering;

  return (
    <View style={styles.progressBarContainer}>
      <TouchableOpacity onPress={isPlaying ? pause : play} style={styles.playButton}>
        {isBuffering ? (
          <ActivityIndicator size={30} color="white" />
        ) : (
          <MaterialCommunityIcons
            name={isPlaying ? 'pause' : 'play'}
            size={30}
            color="white"
          />
        )}
      </TouchableOpacity>

      <View style={styles.slider_view}>
        <Slider
          minimumValue={0}
          maximumValue={Math.floor(progress.duration)}
          minimumTrackTintColor={Colors.white}
          maximumTrackTintColor={Colors.dark.neutral10}
          thumbTintColor={Colors.white}
          onValueChange={val => setCurrentPlayingTime(val)}
          value={Math.floor(progress.position)}
        />
      </View>
      <View style={styles.fullRatio}>
        <Text style={styles.text}>
          {currentTimePlaying} / {duration}
        </Text>
      </View>
    </View>
  );
};

export default SoundPlayer;
