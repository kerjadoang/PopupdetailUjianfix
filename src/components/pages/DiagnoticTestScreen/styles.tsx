import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {Dimensions, StyleSheet} from 'react-native';

const WIDTH = Math.round(Dimensions.get('window').width);

export const styles = StyleSheet.create({
  content: {flex: 1, backgroundColor: Colors.white},
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  containerFinish: {
    backgroundColor: Colors.primary.background,
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
    flex: 1,
  },
  infoHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.primary.light3,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  iconInfo: {
    marginRight: 10,
  },
  textInfo: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.dark.neutral100,
    letterSpacing: 0.25,
    fontFamily: Fonts.RegularPoppins,
  },
  textInfoBold: {
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
  },
  finishButtonContainer: {
    borderRadius: 20,
    backgroundColor: Colors.success.light1,
  },
  finishButton: {
    paddingVertical: 3,
    paddingHorizontal: 12,
    color: Colors.white,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
  },
  nextPrevContainer: {
    // position: 'absolute',
    // bottom: 0,
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 16,
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: '#F1A300',
    borderRadius: 20,
    width: '100%',
    alignSelf: 'center',
    marginVertical: 7,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1A300',
    overflow: 'hidden',
  },
  textCard: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    color: Colors.white,
    letterSpacing: 1,
    fontFamily: Fonts.SemiBoldPoppins,
    paddingLeft: 16,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  backgroundImage: {
    position: 'absolute',
    top: 90,
    left: WIDTH * 0.03,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 16,
    paddingHorizontal: -16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary.background,
    width: WIDTH,
  },
  buttonBottom: {
    width: WIDTH * 0.95,
  },
  finishTitle: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    color: Colors.dark.neutral100,
    letterSpacing: 1,
    fontFamily: Fonts.SemiBoldPoppins,
    textAlign: 'center',
    marginTop: 20,
  },
  finishLabel: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    color: Colors.dark.neutral100,
    letterSpacing: 0.25,
    fontFamily: Fonts.RegularPoppins,
    textAlign: 'center',
  },
  activeCard: {backgroundColor: '#F1A300', opacity: 0.5},
});
