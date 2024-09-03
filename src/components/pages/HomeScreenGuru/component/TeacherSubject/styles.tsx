import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  tabBar: {
    elevation: 0,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.neutral20,
    backgroundColor: Colors.white,
  },
  tabBarIndicator: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    height: 4,
    backgroundColor: Colors.primary.base,
  },
  containerTab: {
    paddingHorizontal: 2,
    backgroundColor: Colors.white,
  },
  cardTitle: {
    fontFamily: 'Poppins-SemiBold',
    color: Colors.dark.neutral100,
    fontSize: 16,
    lineHeight: 20,
  },
  cardMiddleContainer: {
    width: '95%',
    height: 210,
    backgroundColor: Colors.white,
  },
  cardMiddleContainerScroll: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 14,
    alignItems: 'center',
  },
  subCard: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  lastAccessedContainer: {
    marginTop: 24,
  },
  bottomContainer: {
    width: '100%',
  },
});
