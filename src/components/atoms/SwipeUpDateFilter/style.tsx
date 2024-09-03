import Colors from '@constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {marginTop: '5%', paddingHorizontal: '5%'},
  titleContainer: {width: '100%', alignItems: 'center'},
  filterTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    lineHeight: 28,
    color: Colors.dark.neutral100,
  },
  filterRow: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterActive: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: Colors.primary.base,
  },
  filterTextActive: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.white,
  },
  filterDeactive: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: Colors.primary.light3,
  },
  filterTextDeactive: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.primary.base,
  },
  datePickerContainer: {flexDirection: 'row', width: '100%', marginTop: 15},
  chooseDateTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral100,
    marginBottom: 5,
  },
  chooseDateContainer: {
    flexDirection: 'row',
    width: '90%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.dark.neutral10,
    borderRadius: 30,
  },
  chooseDateText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral100,
    paddingLeft: 5,
  },
  iconCalendar: {position: 'absolute', right: 15, top: 5},
  rowButton: {flexDirection: 'row', marginTop: 30, marginBottom: 10},
  buttonContainer: {flex: 1, paddingHorizontal: 5},
  mv15: {marginVertical: 15},
  flex1: {flex: 1},
});
