import {StyleSheet} from 'react-native';
import Colors from '@constants/colors';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.white,
  },
  rowItem: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  text: {
    fontFamily: 'Poppins-Bold',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 24,
    display: 'flex',
    alignItems: 'center',
    letterSpacing: 0.01,
    color: '#1D252D',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary.light3,
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  textInfo: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.25,
    color: '#1D252D',
    marginLeft: 5,
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    padding: 16,
    alignSelf: 'center',
    marginVertical: 10,
    height: 72,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  rowButton: {
    marginTop: 10,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  rowText: {width: '90%', minHeight: 50, justifyContent: 'center'},
});
