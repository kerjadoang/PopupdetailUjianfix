import Colors from '@constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  basePadding: {
    padding: 16,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 0.5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '100%',
  },
  titleFont: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
    fontSize: 14,
  },
  numberExam: {
    fontFamily: 'Poppins-Regular',
    fontWeight: '600',
    fontSize: 18,
  },
  btn: {
    backgroundColor: Colors.primary.light3,
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 230,
    gap: 4,
  },
  btnText: {
    color: Colors.primary.base,
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
  },
  chip: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  good: {
    backgroundColor: Colors.success.light2,
    borderRadius: 25,
  },
  bad: {
    backgroundColor: Colors.danger.light2,
    borderRadius: 25,
  },
  font: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    fontWeight: '400',
  },
  secondaryTitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    fontWeight: '400',
    color: Colors.dark.neutral60,
  },
  fgood: {
    color: Colors.success.base,
  },
  fbad: {
    color: Colors.danger.base,
  },
});
