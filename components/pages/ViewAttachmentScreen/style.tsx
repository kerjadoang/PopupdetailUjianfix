import Colors from '@constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: Colors.backgroundViewAttachment,
  },
  headerContainer: {
    backgroundColor: Colors.backgroundViewAttachment,
  },
  container: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContent: {
    backgroundColor: Colors.dark.neutral40,
    height: 330,
    width: 330,
    borderRadius: 10,
  },
  image: {
    borderRadius: 10,
    flex: 1,
    resizeMode: 'cover',
  },
});
