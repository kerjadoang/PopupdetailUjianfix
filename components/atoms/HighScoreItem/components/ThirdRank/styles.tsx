import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';

export default StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  round: {
    borderWidth: 3,
    borderRadius: 100,
    bottom: 5,
    width: 60,
    height: 60,
  },
  photo: {
    width: 55,
    height: 55,
    borderRadius: 100,
  },
  text_rank: {
    position: 'absolute',
    fontSize: 12,
    color: '#002E6D',
    fontFamily: 'Poppins-Bold',
  },
  textName: {
    fontFamily: 'Poppins-Bold',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 18,
    width: 70,
    color: Colors.primary.dark1,
    alignSelf: 'center',
  },
  bottom_box: {
    width: 100,
    bottom: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
  },
  exp_box: {
    flexDirection: 'row',
    marginTop: 5,
  },
  sub: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: '#002E6D',
  },
});
