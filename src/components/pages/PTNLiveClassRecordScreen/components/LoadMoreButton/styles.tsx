import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';

export default StyleSheet.create({
  button: {
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 10,
    width: '40%',
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 22,
  },
  textBtn: {
    color: Colors.primary.base,
    fontFamily: 'Poppins-Semibold',
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    marginLeft: 10,
    alignSelf: 'center',
  },
});
