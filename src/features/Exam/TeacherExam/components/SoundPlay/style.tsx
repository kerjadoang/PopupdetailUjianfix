import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  fullRatio: {
    flex: 1,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#333333',
    gap: 2,
  },
  progressBar: {
    width: 200,
    height: 20,
    flex: 1, // Make progress bar fill remaining space
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  playButton: {
    padding: 4,
    borderRadius: 50,
  },
  slider_view: {
    flex: 2,
  },
});
