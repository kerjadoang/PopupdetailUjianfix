import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  header: {
    height: 250,
  },
  styleLabel: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    paddingTop: 10,
  },
  bgBlueOrnament: {
    resizeMode: 'cover',
    width: '100%',
    position: 'absolute',
    zIndex: -1,
    backgroundColor: '#F9FCFF',
  },
  cardContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    backgroundColor: Colors.primary.background,
    paddingBottom: 32,
    height: '100%',
  },
  rightTitle: {
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 18,
    color: Colors.black,
  },
  emptyContainer: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    padding: 16,
    borderRadius: 15,
    elevation: 8,
    flexDirection: 'row',
  },
  textEmpty: {
    color: Colors.dark.neutral80,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    marginTop: 15,
    width: '70%',
    textAlignVertical: 'center',
    fontFamily: Fonts.RegularPoppins,
  },
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
    fontFamily: Fonts.SemiBoldPoppins,
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    marginLeft: 10,
    alignSelf: 'center',
  },
});
