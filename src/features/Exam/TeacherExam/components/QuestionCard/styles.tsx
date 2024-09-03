import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';

export default StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.dark.neutral40,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitleBlue: {
    fontSize: 18,
    color: Colors.primary.base,
  },
  headerTitleBlack: {
    fontSize: 18,
    color: Colors.dark.neutral100,
  },
  headerRightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  numberContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: Colors.dark.neutral10,
  },
  pencil: {padding: 9, backgroundColor: Colors.primary.light3},
  trash: {backgroundColor: Colors.white},
  editContainer: {
    marginVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    width: '40%',
    backgroundColor: Colors.primary.light1,
    paddingHorizontal: 30,
  },
});
