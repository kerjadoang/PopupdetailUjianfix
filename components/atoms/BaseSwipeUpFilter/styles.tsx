import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';

export default StyleSheet.create({
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
    gap: 12,
  },
  filterActive: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: Colors.primary.base,
  },
  filterDeactive: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: Colors.primary.light3,
  },
  filterTextActive: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 22,
    paddingHorizontal: 10,
    color: Colors.white,
  },
  filterTextDeactive: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 22,
    paddingHorizontal: 10,
    color: Colors.primary.base,
  },
  titleContainer: {width: '100%', alignItems: 'center'},
  rowButton: {flexDirection: 'row', marginTop: 30, marginBottom: 10},
  buttonContainer: {flex: 1, paddingHorizontal: 5},
  mv15: {marginVertical: 15},
  flex1: {flex: 1},
  container: {marginTop: '5%', paddingHorizontal: '5%'},
});
