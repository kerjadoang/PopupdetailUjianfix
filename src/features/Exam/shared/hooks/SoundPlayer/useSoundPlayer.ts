import {useCallback, useEffect, useState} from 'react';
import TrackPlayer, {
  useProgress,
  usePlaybackState,
} from 'react-native-track-player';

export const useSoundPlayer = (source: string) => {
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(false);
  const progress = useProgress();

  const [position, setPosition] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const playback = usePlaybackState();

  const setSourceUrl = useCallback(async () => {
    await TrackPlayer.add({url: source});
  }, [source]);

  const setCurrentPlayingTime = (val: number) => {
    TrackPlayer.seekTo(val);
  };

  const getPosition = useCallback(async () => {
    const res = await TrackPlayer.getPosition();
    setPosition(res);
  }, []);

  const getduration = useCallback(async () => {
    const res = await TrackPlayer.getDuration();
    setDuration(res);
  }, []);

  const initializeTrackerPlayer = useCallback(() => {
    setIsLoading(true);
    Promise.all([
      TrackPlayer.setupPlayer(),
      setSourceUrl(),
      getPosition(),
      getduration(),
    ])
      .catch(e => setError(e))
      .finally(() => setIsLoading(false));
  }, [getPosition, getduration, setSourceUrl]);

  useEffect(() => {
    initializeTrackerPlayer();
  }, [initializeTrackerPlayer]);

  const play = async () => {
    try {
      setIsLoading(true);
      await TrackPlayer.play();
    } catch (e) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  const pause = async () => {
    await TrackPlayer.pause();
  };

  return {
    getPosition,
    getduration,
    play,
    pause,
    setCurrentPlayingTime,
    setSourceUrl,
    error,
    isLoading,
    progress,
    playback,
    position,
    duration,
  };
};
