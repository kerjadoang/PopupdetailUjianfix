import {Dimensions, StyleSheet} from 'react-native';
import Colors from '@constants/colors';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {backgroundColor: Colors.dark.neutral80, height: height / 3},
  sliderContainer: {
    flex: 1,
  },
  image: {
    width,
    height: height / 3,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: width - 32,
  },
  noMediaContainer: {width: '100%', alignItems: 'center', marginTop: '20%'},
  noMediaText: {fontFamily: 'Poppins-Regular', fontSize: 16},
  pdf: {
    flex: 1,
    width: width - 32,
    height: height / 3,
  },
  innerContainer: {flex: 0.1, backgroundColor: 'white', flexDirection: 'row'},
  topIconBackContainer: {
    flex: 0.5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: '5%',
    transform: [{rotateY: '180deg'}],
  },
  titleContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: Colors.dark.neutral100,
  },
  topRightIconContainer: {
    flex: 0.5,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  addNotesIconContainer: {marginTop: 10},
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
  floatingButtonContainer: {width: '100%', position: 'absolute', bottom: '10%'},
  floatingButton: {marginHorizontal: '25%'},
  marginHorizontal: {
    marginHorizontal: 16,
  },
});
