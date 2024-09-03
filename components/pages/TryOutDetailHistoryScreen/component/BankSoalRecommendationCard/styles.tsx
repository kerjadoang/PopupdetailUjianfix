import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    flex: 1,
    shadowOpacity: 0.1,
    shadowRadius: 1.84,
    elevation: 2,
    // margin: 6,
    marginVertical: 16,
    justifyContent: 'flex-start',
  },
  borderBlue: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: Colors.primary.base,
  },
  buttonPelajari: {
    backgroundColor: Colors.primary.base,
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
  },
  textBlueBold: {
    fontFamily: 'Poppins-Bold',
    color: Colors.primary.base,
  },
  containerChip: {
    backgroundColor: Colors.primary.light3,
    padding: 8,
    borderRadius: 16,
    alignItems: 'center',
    width: '25%',
    marginBottom: 16,
  },
});
