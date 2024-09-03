import Colors from '@constants/colors';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    paddingTop: 18,
    paddingBottom: 18,
    paddingHorizontal: 16,
  },
  titleContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  title: {fontSize: 18, color: Colors.primary.base},
  errorContentContainer: {
    width: '100%',
    padding: 20,
    marginTop: 16,
    backgroundColor: Colors.danger.light2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.danger.base,
  },
  errorTitle: {
    fontSize: 16,
    color: Colors.danger.base,
    marginBottom: 16,
  },
  errorItemContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  errorTextItem: {
    fontSize: 16,
    color: Colors.danger.base,
    flex: 1,
  },
  dot: {
    width: 6,
    height: 6,
    backgroundColor: Colors.danger.base,
    borderRadius: 6 / 2,
    marginTop: 6,
  },
});
