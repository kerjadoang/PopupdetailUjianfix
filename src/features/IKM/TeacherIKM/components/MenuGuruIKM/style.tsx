import Colors from '@constants/colors';
import Fonts from '@constants/fonts';
import {Dimensions, StyleSheet} from 'react-native';

const numColumns = 3;
export const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    flexDirection: 'row', // membuat kolom berdasarkan arah row
    flexWrap: 'wrap', // wrap item ke baris baru jika tidak cukup tempat
    marginBottom: 16,
  },
  item: {
    alignItems: 'center',
    width: Dimensions.get('window').width / numColumns - 10, // mengatur lebar item
    padding: 5,
    marginVertical: 8,
  },
  unreadsContainer: {
    position: 'absolute',
    right: 30,
    top: 0,
    backgroundColor: Colors.danger.base,
    width: 20,
    height: 20,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadsTitle: {
    fontSize: 11,
    lineHeight: 16,
    color: Colors.white,
    fontWeight: '600',
    fontFamily: Fonts.SemiBoldPoppins,
  },
  itemText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontStyle: 'normal',
    color: Colors.dark.neutral100,
  },
  row: {
    flex: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    paddingHorizontal: 10,
  },

  button: {
    backgroundColor: Colors.primary.light3,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  centering: {
    justifyContent: 'center',
    marginVertical: 4,
    alignItems: 'center',
    width: '100%',
  },
  textBtn: {
    color: Colors.primary.base,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
  },
});
