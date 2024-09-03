import Colors from '@constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -40,
  },
  imageOutterContainer: {
    padding: 4,
    width: 80,
    height: 80,
    backgroundColor: Colors.yellow,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
  },
  imageInnerContainer: {
    padding: 4,
    width: 72,
    height: 72,
    backgroundColor: Colors.white,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageUser: {
    resizeMode: 'contain',
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  badgeNameContainer: {
    flexDirection: 'row',
    marginBottom: 4,
    alignSelf: 'center',
  },
  badgeName: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.primary.base,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginRight: 4,
  },
  iconEditContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeClassContainer: {
    flexDirection: 'row',
    maxWidth: '90%',
    alignSelf: 'center',
    backgroundColor: Colors.yellow,
    paddingHorizontal: 10,
    borderRadius: 30,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  badgeClassText: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.primary.base,
    fontWeight: '600',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginRight: 4,
  },
});
