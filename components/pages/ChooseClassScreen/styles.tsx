import Colors from '@constants/colors';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  listContent: {
    padding: 15,
  },
  contentHeader: {
    flexDirection: 'row',
  },
  contentClass: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.01,
    display: 'flex',
    color: '#1D252D',
  },
  buttonClass: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '47%',
    // padding: 16,
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    height: 48,
    marginRight: 10,
    marginBottom: 10,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 5,
  },
});
