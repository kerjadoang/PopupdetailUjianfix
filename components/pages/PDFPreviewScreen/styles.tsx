import {Dimensions, StyleSheet} from 'react-native';
import Colors from '@constants/colors';
const {width, height} = Dimensions.get('screen');

export default StyleSheet.create({
  bodyContainer: {
    backgroundColor: Colors.white,
    height: '100%',
  },
  sliderContainer: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  noMediaContainer: {width: '100%', alignItems: 'center', marginTop: '20%'},
  noMediaText: {fontFamily: 'Poppins-Regular', fontSize: 16},
  image: {
    width,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  item: {
    position: 'relative',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    width,
    height,
  },
  footerContainer: {
    flex: 0.08,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    elevation: 17,
    flexDirection: 'row',
  },
  paginationText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: Colors.primary.base,
  },
  prevIcon: {
    width: 50,
    height: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    transform: [{rotateY: '180deg'}],
  },
  nextIcon: {
    width: 50,
    height: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 0,
  },
});
